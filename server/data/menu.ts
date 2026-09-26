export interface MenuItem {
  id: string;
  name: string;
  menuDisplayName?: string; // Preserve exact text from cafe menu board
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

export const MENU_ITEMS: MenuItem[] = [
  // --- HOT BREW ---
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    category: 'Hot Brew',
    pronunciation: 'kap-oo-CHEE-noh',
    tagline: 'Classic Italian espresso topped with equal parts steamed milk & dense velvety foam',
    price: 'Included',
    dietary: ['Vegetarian'],
    caffeine: 'High',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Espresso (1/3)', 'Steamed Milk (1/3)', 'Milk Foam (1/3)'],
    isUnfamiliar: false,
    briefDesc: 'Rich, comforting classic with a thick aerated milk foam layer dusting the top.'
  },
  {
    id: 'filter-coffee',
    name: 'Signature Filter Coffee',
    category: 'Hot Brew',
    pronunciation: 'fil-ter KAH-fee',
    tagline: 'Traditional South Indian chicory blend decoction frothed with boiled full-fat milk',
    price: 'Included',
    dietary: ['Vegetarian'],
    caffeine: 'High',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Chicory & Coffee Blend Decoction', 'Boiled Full-cream Milk', 'Sugar'],
    isUnfamiliar: true,
    briefDesc: 'Brewed using a traditional brass drip filter. Frother-poured (metre coffee style) to create a thick bubbly head.'
  },
  {
    id: 'americano-espresso',
    name: 'Americano / Espresso',
    menuDisplayName: 'Amerciano/ Expresso',
    category: 'Hot Brew',
    pronunciation: 'uh-mer-i-KAH-noh / es-PRES-oh',
    tagline: 'Pure intense espresso shot or diluted with hot water for a smooth black coffee',
    price: 'Included',
    dietary: ['Vegan', 'Gluten-Free', 'Zero Sugar'],
    caffeine: 'High',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Double Shot Arabica Espresso', 'Optional Hot Filtered Water'],
    isUnfamiliar: true,
    briefDesc: 'Espresso is 9-bar pressure extracted pure coffee essence; Americano adds hot water to achieve drip-coffee strength.'
  },
  {
    id: 'masala-chai-latte',
    name: 'Masala Chai Latte',
    category: 'Hot Brew',
    pronunciation: 'muh-SAH-luh CHAI LAH-tay',
    tagline: 'Robust Assam black tea simmered with crushed ginger, cardamom, clove, and steamed milk',
    price: 'Included',
    dietary: ['Vegetarian'],
    caffeine: 'Medium',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Assam CTC Tea', 'Fresh Ginger', 'Cardamom & Cloves', 'Steamed Milk'],
    isUnfamiliar: false,
    briefDesc: 'Warm, deeply aromatic Indian spiced tea elevated with smooth modern latte microfoam.'
  },

  // --- COLD BREW ---
  {
    id: 'classic-cold-coffee',
    name: 'Classic Cold Coffee',
    category: 'Cold Brew',
    pronunciation: 'classic cold coffee',
    tagline: 'Chilled espresso blended with milk, ice, and smooth vanilla sweetness',
    price: 'Included',
    dietary: ['Vegetarian'],
    caffeine: 'Medium',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Double Espresso', 'Chilled Milk', 'Cane Sugar', 'Crushed Ice'],
    isUnfamiliar: false,
    briefDesc: 'Sweet, creamy, and instantly refreshing coffee milkshake-style refresher.'
  },
  {
    id: 'classic-cold-brew',
    name: 'Classic Cold Brew',
    category: 'Cold Brew',
    pronunciation: 'classic cold brew',
    tagline: 'Coarse coffee grounds steeped in cold mineral water for 16 hours for ultra-smooth low-acid sip',
    price: 'Included',
    dietary: ['Vegan', 'Gluten-Free', 'Zero Sugar'],
    caffeine: 'High',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['16-hour Slow Steeped Coffee', 'Filtered Ice Water'],
    isUnfamiliar: true,
    briefDesc: 'Never touches hot water. Naturally chocolatey, zero bitterness, 65% less acidic than hot coffee with high sustained energy.'
  },
  {
    id: 'classic-lemonade',
    name: 'Classic Lemonade',
    category: 'Cold Brew',
    pronunciation: 'classic lem-uh-NEYD',
    tagline: 'Fresh squeezed sun lemons, sparkling water, mint leaves, and a dash of rock salt',
    price: 'Included',
    dietary: ['Vegan', 'Gluten-Free'],
    caffeine: 'Zero',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Fresh Lemon Juice', 'Sparkling Mineral Water', 'Mint Sprig', 'Rock Salt & Cane Syrup'],
    isUnfamiliar: false,
    briefDesc: 'Crisp, thirst-quenching citrus burst to reset your palate between hackathon sprints.'
  },

  // --- SANDWICH ---
  {
    id: 'paneer-tikka-sandwich',
    name: 'Paneer Tikka Sandwich',
    category: 'Sandwich',
    pronunciation: 'puh-NEER TIK-kuh sandwich',
    tagline: 'Tandoor-charred spiced cottage cheese cubes layered with mint coriander chutney and crunchy peppers',
    price: 'Included',
    dietary: ['Vegetarian'],
    caffeine: 'Zero',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Marinated Paneer', 'Capsicum & Onions', 'Mint-Coriander Chutney', 'Grilled Butter Bread'],
    isUnfamiliar: true,
    briefDesc: 'A beloved Indian street-style gourmet toastie. Paneer marinated in curd, cumin, and garam masala griddled to golden perfection.'
  },
  {
    id: 'tandoori-chicken-sandwich',
    name: 'Tandoori Chicken Sandwich',
    category: 'Sandwich',
    pronunciation: 'tahn-DOO-ree chicken sandwich',
    tagline: 'Smoky spiced chicken breast shreds, pickled onions, and tandoori emulsion in grilled bread',
    price: 'Included',
    dietary: ['Non-Vegetarian', 'Halal'],
    caffeine: 'Zero',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Tandoori Roast Chicken', 'Pickled Red Onions', 'Spiced Garlic Mayo', 'Toasted Bread'],
    isUnfamiliar: true,
    briefDesc: 'Packed with protein and rich tandoori spices. Smokiness balanced by crisp tangy onions.'
  },

  // --- PANCAKE ---
  {
    id: 'classic-pancake',
    name: 'Classic Pancakes',
    menuDisplayName: 'Calssic pan cake',
    category: 'Pancake',
    pronunciation: 'KLAS-ik pan-keyk',
    tagline: 'Stack of fluffy, golden-griddled buttermilk pancakes with salted dairy butter and warm syrup',
    price: 'Included',
    dietary: ['Vegetarian'],
    caffeine: 'Zero',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Buttermilk Batter', 'Farm Butter', 'Maple Syrup', 'Vanilla'],
    isUnfamiliar: false,
    briefDesc: 'Light, airy, pillow-soft pancakes freshly griddled. Sweet companion for black coffee.'
  },

  // --- SHAREABLE BITES ---
  {
    id: 'chilli-cheese-garlic-toast',
    name: 'Chilli Cheese Garlic Toast',
    menuDisplayName: 'Chilly cheese galric toast (Veg)',
    category: 'Shareable Bites',
    pronunciation: 'chil-ee cheez gar-lik tohst',
    tagline: 'Crusty toasted bread slathered in garlic butter, smothered with melted mozzarella & green chillies',
    price: 'Included',
    dietary: ['Vegetarian'],
    caffeine: 'Zero',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Crusty French Loaf', 'Garlic Herb Butter', 'Mozzarella & Cheddar', 'Chopped Green Birds-Eye Chillies'],
    isUnfamiliar: true,
    briefDesc: 'The ultimate savory café sharing bite. Gooey bubbly cheese cut through by sharp garlic and green chilli heat.'
  },
  {
    id: 'chicken-cheese-toasties',
    name: 'Chicken & Cheese Toasties',
    menuDisplayName: 'Chciken & Cheese toasties',
    category: 'Shareable Bites',
    pronunciation: 'chik-in and cheez tohs-tees',
    tagline: 'Golden griddled toast pockets bursting with seasoned chicken chunks and oozing cheddar cheese',
    price: 'Included',
    dietary: ['Non-Vegetarian', 'Halal'],
    caffeine: 'Zero',
    image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Slow-cooked Seasoned Chicken', 'Sharp Cheddar Cheese', 'Herb Butter', 'Crispy Golden Toast'],
    isUnfamiliar: true,
    briefDesc: 'Comfort food perfection. Hot, crunchy bread holding succulent savory chicken and molten cheese.'
  }
];
