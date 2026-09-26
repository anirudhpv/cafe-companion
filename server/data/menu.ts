export interface MenuItem {
  id: string;
  name: string;
  category: 'Coffee' | 'Specialty' | 'Tea & Coolers' | 'Bakery & Bites';
  pronunciation?: string;
  tagline: string;
  price: string;
  dietary: string[];
  caffeine: 'High' | 'Medium' | 'Low' | 'Zero';
  image: string;
  baseIngredients: string[];
  isUnfamiliar: boolean; // Flagged to highlight for users who haven't had it before
  briefDesc: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'cortado',
    name: 'Cortado',
    category: 'Coffee',
    pronunciation: 'kor-TAH-doh',
    tagline: 'Equal parts bold espresso and velvety steamed milk',
    price: '₹240',
    dietary: ['Vegetarian', 'Gluten-Free'],
    caffeine: 'High',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Double Ristretto Espresso', 'Steamed Whole Milk (1:1 ratio)'],
    isUnfamiliar: true,
    briefDesc: 'Spanish-origin drink where the warm milk "cuts" (cortar) espresso acidity without diluting its punch like a latte does.',
  },
  {
    id: 'affogato',
    name: 'Affogato al Caffè',
    category: 'Specialty',
    pronunciation: 'ah-foh-GAH-toh',
    tagline: 'Hot espresso poured over artisanal vanilla gelato',
    price: '₹280',
    dietary: ['Vegetarian'],
    caffeine: 'Medium',
    image: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Single Origin Espresso', 'Madagascar Vanilla Bean Gelato'],
    isUnfamiliar: true,
    briefDesc: 'Italian dessert-coffee hybrid: "affogato" means drowned. Contrast of scorching bitter espresso melting cold sweet gelato.',
  },
  {
    id: 'matcha-tonic',
    name: 'Iced Yuzu Matcha Tonic',
    category: 'Tea & Coolers',
    pronunciation: 'MAHT-chuh TAH-nik',
    tagline: 'Ceremonial Uji matcha, Japanese yuzu citrus, sparkling tonic',
    price: '₹310',
    dietary: ['Vegan', 'Gluten-Free'],
    caffeine: 'Medium',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Ceremonial Grade Matcha', 'Yuzu Extract', 'Artisanal Tonic Water', 'Mint'],
    isUnfamiliar: true,
    briefDesc: 'Earthy, grassy Japanese green tea layered over bubbly crisp citrus. High in L-Theanine for calm focus without jitter.',
  },
  {
    id: 'cascara-fizz',
    name: 'Cascara Sparkling Elixir',
    category: 'Tea & Coolers',
    pronunciation: 'kas-KAH-ruh',
    tagline: 'Brewed sun-dried coffee cherry husk with blood orange & soda',
    price: '₹260',
    dietary: ['Vegan', 'Gluten-Free'],
    caffeine: 'Low',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Sun-dried Coffee Husks', 'Sparkling Mineral Water', 'Blood Orange Essence'],
    isUnfamiliar: true,
    briefDesc: 'Made from the fruit pulp surrounding coffee beans. Tastes like hibiscus, rosehip, and tamarind rather than coffee!',
  },
  {
    id: 'gesha-pourover',
    name: 'Panama Gesha Pour-Over',
    category: 'Coffee',
    pronunciation: 'GAY-shuh',
    tagline: 'World-renowned rare floral varietal hand-dripped on V60',
    price: '₹420',
    dietary: ['Vegan', 'Gluten-Free', 'Zero Sugar'],
    caffeine: 'High',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['100% Arabica Gesha Beans', 'Pure 93°C Mineral Water'],
    isUnfamiliar: true,
    briefDesc: 'The "Champagne of coffees". Delicate tea-like body with intense jasmine, bergamot, and peach notes.',
  },
  {
    id: 'kouign-amann',
    name: 'Kouign-Amann',
    category: 'Bakery & Bites',
    pronunciation: 'queen ah-MAHN',
    tagline: 'Breton caramelized butter cake with shattered crisp layers',
    price: '₹220',
    dietary: ['Vegetarian'],
    caffeine: 'Zero',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Laminated Dough', 'French Salted Butter', 'Slow-Caramelized Sugar Crust'],
    isUnfamiliar: true,
    briefDesc: 'A layered pastry originating from Brittany, France. Like a croissant turned inside out with a crunchy, brittle caramel glaze.',
  },
  {
    id: 'cruffin-pistachio',
    name: 'Pistachio Kunafa Cruffin',
    category: 'Bakery & Bites',
    pronunciation: 'KROO-fin',
    tagline: 'Croissant baked in muffin mold, filled with roasted pistachio cream',
    price: '₹260',
    dietary: ['Vegetarian'],
    caffeine: 'Zero',
    image: 'https://images.unsplash.com/photo-1621236378699-8597fab6a1c8?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Flaky Croissant Dough', 'Bronte Pistachio Praline Paste', 'Kataifi Pastry'],
    isUnfamiliar: true,
    briefDesc: 'Muffin-shaped croissant with endless buttery flaky layers filled with rich, nutty pistachio custard.',
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    category: 'Coffee',
    pronunciation: 'flat white',
    tagline: 'Double espresso topped with micro-foamed milk',
    price: '₹230',
    dietary: ['Vegetarian'],
    caffeine: 'High',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Espresso', 'Silky Microfoam Milk'],
    isUnfamiliar: false,
    briefDesc: 'Australasian specialty staple with stronger espresso-to-milk ratio than a latte and ultra-fine glossy microfoam.',
  }
];
