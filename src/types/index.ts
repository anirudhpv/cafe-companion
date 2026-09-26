export interface MenuItem {
  id: string;
  name: string;
  menuDisplayName?: string;
  category: 'Hot Brew' | 'Cold Brew' | 'Sandwich' | 'Pancake' | 'Shareable Bites';
  pronunciation?: string;
  tagline: string;
  price: string;
  dietary: string[];
  caffeine: 'High' | 'Medium' | 'Low' | 'Zero';
  image: string;
  baseIngredients: string[];
  isUnfamiliar: boolean;
  briefDesc: string;
}

export interface ItemExplanation {
  itemName: string;
  pronunciation: string;
  origin: string;
  whatItIs: string;
  flavorProfile: {
    intensity: string;
    sweetness: string;
    acidity: string;
    texture: string;
  };
  ingredientsBreakdown: string[];
  dietaryNotes: string;
  whyTryIt: string;
  source?: string;
}

export interface Attendee {
  id: string;
  name: string;
  avatar: string;
  role: string;
  companyOrProject: string;
  currentProject: string;
  techStack: string[];
  interests: string[];
  tableNumber: string;
  openToChat: boolean;
  vibe: 'Coding intensely' | 'Open for coffee chat' | 'Brainstorming ideas' | 'Looking for co-founder';
  checkedInAt: string;
}

export interface IcebreakerResult {
  targetName: string;
  compatibilityTag: string;
  icebreakers: string[];
  collaborativeIdea: string;
  source?: string;
}

export interface RecommendationResult {
  recommendations: Array<{
    item: MenuItem;
    reasoning: string;
    matchScore: string;
  }>;
  sommelierNote: string;
  source?: string;
}
