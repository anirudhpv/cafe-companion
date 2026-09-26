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
  origin: string;
  flavorProfile: {
    intensity: string;
    sweetness: string;
    acidity: string;
    texture: string;
  };
}

export const MENU_ITEMS: MenuItem[] = [
  // --- HOT BREW ---
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    category: 'Hot Brew',
    pronunciation: 'kap-oo-CHEE-noh',
    tagline: 'Equal parts espresso, steamed milk, and dense microfoam.',
    price: 'Complimentary',
    dietary: ['Vegetarian'],
    caffeine: 'High',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Espresso (1/3)', 'Steamed Whole Milk (1/3)', 'Dense Aerated Foam (1/3)'],
    isUnfamiliar: false,
    briefDesc: 'Balanced Italian staple. Hot milk sweetens the dark roast while a thick layer of velvet foam retains aroma.',
    origin: 'Italy (1930s)',
    flavorProfile: {
      intensity: '3/5',
      sweetness: '2/5',
      acidity: '2/5',
      texture: 'Velvety foam cap'
    }
  },
  {
    id: 'filter-coffee',
    name: 'Signature Filter Coffee',
    category: 'Hot Brew',
    pronunciation: 'fil-tər KAH-fee',
    tagline: 'South Indian chicory-roasted blend brewed in a traditional brass drip tumbler.',
    price: 'Complimentary',
    dietary: ['Vegetarian'],
    caffeine: 'High',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Dark Roast Arabica / Robusta (80%)', 'Chicory Root (20%)', 'Boiled Whole Milk', 'Unrefined Sugar'],
    isUnfamiliar: true,
    briefDesc: 'Thick, fragrant decoction slow-dripped through a stainless/brass percolation filter, then aerated by pouring between dabara and tumbler.',
    origin: 'Southern India (Tamil Nadu / Karnataka)',
    flavorProfile: {
      intensity: '5/5',
      sweetness: '3/5',
      acidity: '1/5',
      texture: 'Frothy, full-bodied, heavy'
    }
  },
  {
    id: 'americano-espresso',
    name: 'Americano / Espresso',
    menuDisplayName: 'Amerciano/ Expresso',
    category: 'Hot Brew',
    pronunciation: 'uh-mer-i-KAH-noh / es-PRES-oh',
    tagline: 'Pure 9-bar pressure extraction or diluted with near-boiling water.',
    price: 'Complimentary',
    dietary: ['Vegan', 'Gluten-Free', 'Zero Sugar'],
    caffeine: 'High',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Double Shot Arabica Espresso (36g yield)', 'Hot Filtered Water (optional, 120ml)'],
    isUnfamiliar: true,
    briefDesc: 'Espresso delivers concentrated crema and roasted notes. Americano dilutes the body to drip-coffee viscosity without losing bean origin notes.',
    origin: 'Italy / WWII soldiers in Europe',
    flavorProfile: {
      intensity: '5/5',
      sweetness: '1/5',
      acidity: '3/5',
      texture: 'Clean, light viscosity'
    }
  },
  {
    id: 'masala-chai-latte',
    name: 'Masala Chai Latte',
    category: 'Hot Brew',
    pronunciation: 'muh-SAH-luh CHAI LAH-tay',
    tagline: 'Estate Assam black tea simmered with fresh ginger, crushed pods, and milk foam.',
    price: 'Complimentary',
    dietary: ['Vegetarian'],
    caffeine: 'Medium',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['CTC Assam Black Tea', 'Crushed Green Cardamom', 'Fresh Ginger Root', 'Cloves & Cinnamon', 'Steamed Milk'],
    isUnfamiliar: false,
    briefDesc: 'Spiced aromatic tea decoction integrated with cafe-style milk microfoam.',
    origin: 'Indian subcontinent',
    flavorProfile: {
      intensity: '4/5',
      sweetness: '3/5',
      acidity: '1/5',
      texture: 'Aromatic, warm, silky'
    }
  },

  // --- COLD BREW ---
  {
    id: 'classic-cold-coffee',
    name: 'Classic Cold Coffee',
    category: 'Cold Brew',
    pronunciation: 'classic cold coffee',
    tagline: 'Double espresso pulled over chilled milk, light cane syrup, and crushed ice.',
    price: 'Complimentary',
    dietary: ['Vegetarian'],
    caffeine: 'Medium',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Chilled Double Shot Espresso', 'Fresh Whole Milk', 'Cane Sugar Syrup', 'Ice'],
    isUnfamiliar: false,
    briefDesc: 'The quintessential Indian cafe cold beverage. Frothy, sweet, and cooling.',
    origin: 'Modern cafe staple',
    flavorProfile: {
      intensity: '3/5',
      sweetness: '4/5',
      acidity: '1/5',
      texture: 'Creamy, chilled, rich'
    }
  },
  {
    id: 'classic-cold-brew',
    name: 'Classic Cold Brew',
    category: 'Cold Brew',
    pronunciation: 'classic cold brew',
    tagline: 'Single-origin coarse coffee steeped in cold water for 16 hours.',
    price: 'Complimentary',
    dietary: ['Vegan', 'Gluten-Free', 'Zero Sugar'],
    caffeine: 'High',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['100% Arabica Coarse Grind', 'Cold Filtered Mineral Water (16h steep)', 'Ice'],
    isUnfamiliar: true,
    briefDesc: 'Cold water extraction bypasses heat-soluble bitter oils, yielding high caffeine, natural chocolate/fruit notes, and 65% lower perceived acidity.',
    origin: 'Kyoto, Japan / Modern third-wave roasters',
    flavorProfile: {
      intensity: '4/5',
      sweetness: '2/5',
      acidity: '1/5',
      texture: 'Clean, crisp, zero astringency'
    }
  },
  {
    id: 'classic-lemonade',
    name: 'Classic Lemonade',
    category: 'Cold Brew',
    pronunciation: 'classic lem-uh-NEYD',
    tagline: 'Freshly squeezed lemon juice, sparkling soda water, and mint.',
    price: 'Complimentary',
    dietary: ['Vegan', 'Gluten-Free'],
    caffeine: 'Zero',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Fresh Lime / Lemon Extract', 'Chilled Sparkling Water', 'Fresh Spearmint', 'Pinch of Black Salt & Simple Syrup'],
    isUnfamiliar: false,
    briefDesc: 'Tart, effervescent palate cleanser with light herbal aromatic notes.',
    origin: 'Classic cooler',
    flavorProfile: {
      intensity: '4/5',
      sweetness: '2/5',
      acidity: '5/5',
      texture: 'Effervescent, sparkling, crisp'
    }
  },

  // --- SANDWICH ---
  {
    id: 'paneer-tikka-sandwich',
    name: 'Paneer Tikka Sandwich',
    category: 'Sandwich',
    pronunciation: 'puh-NEER TIK-kuh sandwich',
    tagline: 'Spiced cottage cheese cubes in yogurt marinade, grilled on white/brown bread.',
    price: 'Complimentary',
    dietary: ['Vegetarian'],
    caffeine: 'Zero',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Charred Malai Paneer', 'Green Capsicum & Sliced Red Onion', 'Mint-Coriander Chutney', 'Chaat Masala', 'Toasted Butter Bread'],
    isUnfamiliar: true,
    briefDesc: 'Tandoori-spiced paneer chunks griddled between sliced bread with sharp green herb chutney.',
    origin: 'Northern India',
    flavorProfile: {
      intensity: '4/5',
      sweetness: '1/5',
      acidity: '3/5',
      texture: 'Crusty exterior, soft spiced paneer interior'
    }
  },
  {
    id: 'tandoori-chicken-sandwich',
    name: 'Tandoori Chicken Sandwich',
    category: 'Sandwich',
    pronunciation: 'tahn-DOO-ree chicken sandwich',
    tagline: 'Roasted shredded chicken breast in tandoori marinade with spiced mayo.',
    price: 'Complimentary',
    dietary: ['Non-Vegetarian', 'Halal'],
    caffeine: 'Zero',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Shredded Roast Chicken', 'Kashmiri Chilli & Yogurt Rub', 'Pickled Red Onions', 'Herb Mayo', 'Crisp Toasted Bread'],
    isUnfamiliar: true,
    briefDesc: 'Savory protein sandwich featuring roasted spiced chicken balanced with cool tangy onions and crusty bread.',
    origin: 'Punjab / Indian deli modern',
    flavorProfile: {
      intensity: '4/5',
      sweetness: '1/5',
      acidity: '2/5',
      texture: 'Tender chicken, crunchy crust'
    }
  },

  // --- PANCAKE ---
  {
    id: 'classic-pancake',
    name: 'Classic Pancakes',
    menuDisplayName: 'Calssic pan cake',
    category: 'Pancake',
    pronunciation: 'KLAS-ik pan-keyk',
    tagline: 'Stack of griddled buttermilk batter rounds served with salted butter and syrup.',
    price: 'Complimentary',
    dietary: ['Vegetarian'],
    caffeine: 'Zero',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Flour & Cultured Buttermilk', 'Farm Butter', 'Maple / Cane Syrup', 'Pure Vanilla'],
    isUnfamiliar: false,
    briefDesc: 'Golden griddled discs with tender crumb and aerated structure.',
    origin: 'North America / European tradition',
    flavorProfile: {
      intensity: '2/5',
      sweetness: '4/5',
      acidity: '1/5',
      texture: 'Pillow-soft, airy, tender'
    }
  },

  // --- SHAREABLE BITES ---
  {
    id: 'chilli-cheese-garlic-toast',
    name: 'Chilli Cheese Garlic Toast',
    menuDisplayName: 'Chilly cheese galric toast (Veg)',
    category: 'Shareable Bites',
    pronunciation: 'chil-ee cheez gar-lik tohst',
    tagline: 'Crusty loaf smothered in roasted garlic butter, melted mozzarella, and green bird-eye chillies.',
    price: 'Complimentary',
    dietary: ['Vegetarian'],
    caffeine: 'Zero',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['French Loaf Baguette Slices', 'Minced Garlic Herb Butter', 'Shredded Mozzarella & Processed Cheese', 'Fresh Green Chillies'],
    isUnfamiliar: true,
    briefDesc: 'Sharp pungency of fresh garlic and green chillies baked under a bubbling layer of salted cheese on crusty toast.',
    origin: 'Indian club / cafe classic',
    flavorProfile: {
      intensity: '4/5',
      sweetness: '1/5',
      acidity: '1/5',
      texture: 'Crunchy bread, molten melted cheese'
    }
  },
  {
    id: 'chicken-cheese-toasties',
    name: 'Chicken & Cheese Toasties',
    menuDisplayName: 'Chciken & Cheese toasties',
    category: 'Shareable Bites',
    pronunciation: 'chik-in and cheez tohs-tees',
    tagline: 'Pressed toast pockets stuffed with seasoned chicken chunks and sharp cheddar.',
    price: 'Complimentary',
    dietary: ['Non-Vegetarian', 'Halal'],
    caffeine: 'Zero',
    image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=800&auto=format&fit=crop&q=80',
    baseIngredients: ['Cooked Seasoned Chicken Breast', 'Aged Cheddar / Mozzarella', 'Black Pepper & Thyme', 'Golden Griddled Bread'],
    isUnfamiliar: true,
    briefDesc: 'Comforting pressed sandwich cut diagonally with savory chicken and molten cheese filling.',
    origin: 'British / Commonwealth toastie culture',
    flavorProfile: {
      intensity: '3/5',
      sweetness: '1/5',
      acidity: '1/5',
      texture: 'Crisp pressed crust, rich melted interior'
    }
  }
];
