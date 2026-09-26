import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import dotenv from 'dotenv';
import { MENU_ITEMS, MenuItem } from './data/menu.js';
import { INITIAL_ATTENDEES, Attendee } from './data/attendees.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = new Hono();
app.use('*', cors());

// In-memory state for the pop-up session
let attendees: Attendee[] = [...INITIAL_ATTENDEES];
let roomFeedback: Array<{ id: string; rating: number; vibeComment: string; timestamp: string }> = [
  { id: '1', rating: 5, vibeComment: 'Amazing lo-fi music & high energy builders!', timestamp: '15:30' },
  { id: '2', rating: 4, vibeComment: 'Could use another pour-over station, great crowd though.', timestamp: '15:45' }
];

// Resilient Gemini AI Caller (prioritizes Gemini 3.8 Flash, fails over gracefully if capacity spike)
async function generateGeminiJson(prompt: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    return null;
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  // Prioritize Gemini 3.8 Flash, failover to active Gemini 3 Flash / Flash Latest on 503 demand spikes
  const models = ['gemini-3.8-flash', 'gemini-3-flash-preview', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
  
  for (const modelName of models) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: { responseMimeType: 'application/json' }
      });
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      return { data: JSON.parse(text || '{}'), modelUsed: modelName };
    } catch (e: any) {
      console.warn(`Candidate ${modelName} unavailable (${e.message?.slice(0, 80)}...), trying next...`);
    }
  }
  return null;
}

// 1. Health & Config status
app.get('/api/health', (c) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '');
  return c.json({
    status: 'ok',
    geminiConfigured: hasKey,
    model: 'gemini-3.8-flash',
    event: 'Google Cloud Builder Pop-Up',
  });
});

// 2. Menu Endpoints
app.get('/api/menu', (c) => {
  return c.json({ items: MENU_ITEMS });
});

app.post('/api/menu/explain', async (c) => {
  const body = (await c.req.json().catch(() => ({}))) as { itemId?: string; itemName?: string; userQuestion?: string };
  const item = MENU_ITEMS.find(m => m.id === body.itemId || m.name.toLowerCase() === body.itemName?.toLowerCase());
  
  const targetName = item ? item.name : (body.itemName || 'Specialty Drink');
  const targetDesc = item ? `${item.tagline}. Ingredients: ${item.baseIngredients.join(', ')}` : '';

  const prompt = `You are an expert café barista & sensory sommelier at the Google Cloud Builder Pop-Up.
A guest has never had this unfamiliar menu item: "${targetName}".
Context: ${targetDesc}
User question (if any): "${body.userQuestion || 'What is this, what does it taste like, and will I like it?'}"

Respond in STRICT JSON with the following schema:
{
  "itemName": "${targetName}",
  "pronunciation": "Phonetic pronunciation guide",
  "origin": "Country / cultural origin story in 1 short sentence",
  "whatItIs": "Clear, friendly explanation in 2 short sentences for someone who has never heard of it",
  "flavorProfile": {
    "intensity": "Rating e.g. 4/5",
    "sweetness": "Rating e.g. 2/5",
    "acidity": "Rating e.g. 3/5",
    "texture": "Texture e.g. Silky, crisp, fizzy, dense"
  },
  "ingredientsBreakdown": ["Item 1", "Item 2"],
  "dietaryNotes": "Allergen / dietary insights",
  "whyTryIt": "Convincing 1-line reason to order it today at the pop-up"
}`;

  const geminiResult = await generateGeminiJson(prompt);

  if (geminiResult && geminiResult.data) {
    return c.json({ ...geminiResult.data, source: geminiResult.modelUsed });
  }

  // Graceful fallback for mock testing before API key entry or total offline
  return c.json({
    itemName: targetName,
    pronunciation: item?.pronunciation || 'Classic',
    origin: 'Specialty Coffee Tradition',
    whatItIs: `${targetName} is crafted with artisan precision. ${item?.briefDesc || 'A distinct cafe creation.'}`,
    flavorProfile: {
      intensity: '4/5',
      sweetness: '2/5',
      acidity: '3/5',
      texture: 'Rich & Velvety'
    },
    ingredientsBreakdown: item?.baseIngredients || ['Espresso', 'Filtered Water'],
    dietaryNotes: item?.dietary.join(', ') || 'Vegetarian friendly',
    whyTryIt: 'Perfect if you love intense, authentic flavors without excessive sweetness.',
    source: 'local-sommelier-curated'
  });
});

// 3. Conversational Menu Recommender
app.post('/api/menu/recommend', async (c) => {
  const body = (await c.req.json().catch(() => ({}))) as { query?: string; preferences?: string[] };
  const query = body.query || 'I want good energy';

  const menuContext = MENU_ITEMS.map(m => 
    `- ${m.name} (${m.category}, ${m.price}): ${m.tagline}. Ingredients: ${m.baseIngredients.join(', ')}. Caffeine: ${m.caffeine}. Dietary: ${m.dietary.join(', ')}`
  ).join('\n');

  const prompt = `You are an AI Café Sommelier assisting developers at the Google Cloud Builder Pop-Up.
Available Café Menu:
${menuContext}

Guest Request: "${query}"
Preferences: ${body.preferences ? body.preferences.join(', ') : 'None specified'}

Recommend the top 1 or 2 best matching items from the menu.
Respond in STRICT JSON format:
{
  "recommendations": [
    {
      "itemId": "exact matching item id from menu e.g. cortado or affogato or matcha-tonic",
      "reasoning": "1-2 punchy sentences explaining why this exact drink or bite suits their mood/task",
      "matchScore": "e.g. 98%"
    }
  ],
  "sommelierNote": "A warm, witty barista tip for their coding session"
}`;

  const geminiResult = await generateGeminiJson(prompt);

  if (geminiResult && geminiResult.data?.recommendations) {
    const hydratedRecs = (geminiResult.data.recommendations || []).map((rec: any) => {
      const found = MENU_ITEMS.find(m => m.id === rec.itemId) || MENU_ITEMS[0];
      return { ...rec, item: found };
    });
    return c.json({
      recommendations: hydratedRecs,
      sommelierNote: geminiResult.data.sommelierNote,
      source: geminiResult.modelUsed
    });
  }

  // Fallback
  const matched = MENU_ITEMS[0];
  return c.json({
    recommendations: [
      {
        item: matched,
        reasoning: `Based on "${query}", this provides clean energy and exceptional balanced taste.`,
        matchScore: '96%'
      }
    ],
    sommelierNote: 'Curated for your current coding flow at the Google Cloud Pop-Up.',
    source: 'local-sommelier-curated'
  });
});

// 4. IRL Attendees & Check-in
app.get('/api/attendees', (c) => {
  return c.json({ attendees });
});

app.post('/api/attendees', async (c) => {
  const body = (await c.req.json().catch(() => ({}))) as Omit<Attendee, 'id' | 'checkedInAt'>;
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  const newAttendee: Attendee = {
    ...body,
    name: body.name || 'Anonymous Builder',
    id: `att-${Date.now()}`,
    checkedInAt: timeStr,
    avatar: body.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(body.name || 'builder')}`,
    role: body.role || 'Developer',
    companyOrProject: body.companyOrProject || 'Pop-Up Attendee',
    currentProject: body.currentProject || 'Exploring AI Agents',
    techStack: body.techStack || ['Google Cloud', 'Gemini'],
    interests: body.interests || ['Tech', 'Coffee'],
    tableNumber: body.tableNumber || 'Table 1',
    openToChat: body.openToChat ?? true,
    vibe: body.vibe || 'Open for coffee chat'
  };

  attendees.unshift(newAttendee);
  return c.json({ success: true, attendee: newAttendee });
});

// 5. AI Icebreaker & Matchmaker
app.post('/api/attendees/icebreaker', async (c) => {
  const body = (await c.req.json().catch(() => ({}))) as { myId?: string; targetId?: string };
  const me = attendees.find(a => a.id === body.myId) || attendees[0];
  const target = attendees.find(a => a.id === body.targetId) || attendees[1];

  const prompt = `You are an IRL Social Facilitator AI at the Google Cloud Builder Pop-Up.
Person A (Initiator):
Name: ${me.name}
Role: ${me.role} at ${me.companyOrProject}
Working on: ${me.currentProject}
Tech Stack: ${me.techStack.join(', ')}
Interests: ${me.interests.join(', ')}

Person B (Fellow attendee sitting at ${target.tableNumber}):
Name: ${me.id === target.id ? 'A Fellow Builder' : target.name}
Role: ${target.role} at ${target.companyOrProject}
Working on: ${target.currentProject}
Tech Stack: ${target.techStack.join(', ')}
Interests: ${target.interests.join(', ')}
Current Vibe: ${target.vibe}

Generate 3 natural, non-cringe, authentic conversation starters / icebreakers for Person A to walk up and talk to Person B in the café.
Also suggest one potential mini-project idea they could pair-program on today.

STRICT JSON schema:
{
  "targetName": "${target.name}",
  "compatibilityTag": "Catchy 3-word reason they should chat (e.g. 'Cloud Run Enthusiasts', 'Frontend + AI Synergy')",
  "icebreakers": [
    "First natural icebreaker referencing their current build",
    "Second casual icebreaker connecting a shared tech interest",
    "Third witty coffee/café related question"
  ],
  "collaborativeIdea": "A 1-sentence hackathon synergy or collab idea"
}`;

  const geminiResult = await generateGeminiJson(prompt);

  if (geminiResult && geminiResult.data) {
    return c.json({ ...geminiResult.data, source: geminiResult.modelUsed });
  }

  return c.json({
    targetName: target.name,
    compatibilityTag: 'High Tech Synergies',
    icebreakers: [
      `"Hey ${target.name}, saw you're working on ${target.currentProject}. How are you finding it?"`,
      `"I noticed you use ${target.techStack[0] || 'GCP'} too — what are you building at this Builder Pop-Up?"`,
      `"Are you trying the ${MENU_ITEMS[0].name} today? How's the coffee?"`
    ],
    collaborativeIdea: 'You could collaborate on deploying agent workflows with Cloud Run.',
    source: 'local-facilitator-curated'
  });
});

// 6. "Understand the Room" (Café Sentiment & Wait Times)
app.get('/api/room/status', (c) => {
  const openCount = attendees.filter(a => a.openToChat).length;
  const busyCount = attendees.filter(a => !a.openToChat).length;
  return c.json({
    activeBuilders: attendees.length,
    openToConnect: openCount,
    focusMode: busyCount,
    estimatedWaitTime: '4 - 6 mins (Barista active)',
    currentVibe: 'High Productivity & Great Coffee',
    feedback: roomFeedback
  });
});

app.post('/api/room/feedback', async (c) => {
  const body = (await c.req.json().catch(() => ({}))) as { rating?: number; vibeComment?: string };
  const entry = {
    id: String(Date.now()),
    rating: body.rating || 5,
    vibeComment: body.vibeComment || 'Great vibe!',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  roomFeedback.unshift(entry);
  return c.json({ success: true, entry });
});

const PORT = 3001;
console.log(`Café Companion Hono Backend running on http://localhost:${PORT}`);
serve({
  fetch: app.fetch,
  port: PORT
});
