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
  openToChat: boolean; // "Headphones on" vs "Open to chat"
  vibe: 'Coding intensely' | 'Open for coffee chat' | 'Brainstorming ideas' | 'Looking for co-founder';
  checkedInAt: string;
}

export const INITIAL_ATTENDEES: Attendee[] = [
  {
    id: 'att-1',
    name: 'Ananya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    role: 'AI Engineer',
    companyOrProject: 'FinTech Startup',
    currentProject: 'Building multimodal agent workflows with Gemini & LangGraph',
    techStack: ['Python', 'Gemini Flash', 'Cloud Run', 'pgvector'],
    interests: ['Agentic Workflows', 'Specialty Pour-overs', 'Hackathons'],
    tableNumber: 'Table 3',
    openToChat: true,
    vibe: 'Open for coffee chat',
    checkedInAt: '15:10',
  },
  {
    id: 'att-2',
    name: 'Rohan Mehta',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    role: 'Full Stack Founder',
    companyOrProject: 'Stealth SaaS',
    currentProject: 'Micro-SaaS boilerplate on Cloud Run & TanStack',
    techStack: ['TypeScript', 'TanStack Router', 'Next.js', 'PostgreSQL'],
    interests: ['Indie Hacking', 'UI/UX', 'Matcha Drinks'],
    tableNumber: 'Table 7',
    openToChat: true,
    vibe: 'Looking for co-founder',
    checkedInAt: '15:25',
  },
  {
    id: 'att-3',
    name: 'Priya Nambiar',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    role: 'Cloud Architect',
    companyOrProject: 'Google Cloud Partner',
    currentProject: 'Zero-downtime microservices migration on GKE & Cloud SQL',
    techStack: ['Kubernetes', 'GCP', 'Terraform', 'Go'],
    interests: ['Distributed Systems', 'Sourdough & Pastries', 'Open Source'],
    tableNumber: 'Table 2',
    openToChat: false,
    vibe: 'Coding intensely',
    checkedInAt: '14:50',
  },
  {
    id: 'att-4',
    name: 'Devansh K.',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    role: 'Frontend Dev & Designer',
    companyOrProject: 'Design Guild',
    currentProject: 'Vibe coding interactive generative UI widgets',
    techStack: ['React', 'Tailwind CSS', 'Figma', 'Three.js'],
    interests: ['Motion Design', 'Affogato', 'Vibe Coding'],
    tableNumber: 'Bar Counter',
    openToChat: true,
    vibe: 'Brainstorming ideas',
    checkedInAt: '15:40',
  }
];
