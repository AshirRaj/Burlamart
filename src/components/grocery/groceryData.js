// Blinkit-style Subcategories and Products Data
export const GROCERY_SUBCATEGORIES = [
  { id: 'paan-corner', name: 'Paan Corner', image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=200&q=80', bg: 'bg-emerald-50' },
  { id: 'dairy-bread-eggs', name: 'Dairy, Bread & Eggs', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=200&q=80', bg: 'bg-blue-50' },
  { id: 'fruits-vegetables', name: 'Fruits & Vegetables', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=200&q=80', bg: 'bg-green-50' },
  { id: 'cold-drinks-juices', name: 'Cold Drinks & Juices', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=200&q=80', bg: 'bg-amber-50' },
  { id: 'snacks-munchies', name: 'Snacks & Munchies', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=200&q=80', bg: 'bg-orange-50' },
  { id: 'breakfast-instant', name: 'Breakfast & Instant Food', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=200&q=80', bg: 'bg-yellow-50' },
  { id: 'sweet-tooth', name: 'Sweet Tooth', image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=200&q=80', bg: 'bg-pink-50' },
  { id: 'bakery-biscuits', name: 'Bakery & Biscuits', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=200&q=80', bg: 'bg-amber-50' },
  { id: 'tea-coffee', name: 'Tea, Coffee & Milk Drinks', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=200&q=80', bg: 'bg-emerald-50' },
  { id: 'atta-rice-dal', name: 'Atta, Rice & Dal', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=200&q=80', bg: 'bg-lime-50' },
  { id: 'masala-oil', name: 'Masala, Oil & More', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=200&q=80', bg: 'bg-red-50' },
  { id: 'sauces-spreads', name: 'Sauces & Spreads', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=200&q=80', bg: 'bg-rose-50' },
  { id: 'chicken-meat-fish', name: 'Chicken, Meat & Fish', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=200&q=80', bg: 'bg-orange-50' },
  { id: 'organic-healthy', name: 'Organic & Healthy Living', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=200&q=80', bg: 'bg-teal-50' },
  { id: 'baby-care', name: 'Baby Care', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=200&q=80', bg: 'bg-purple-50' },
  { id: 'pharma-wellness', name: 'Pharma & Wellness', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=200&q=80', bg: 'bg-cyan-50' },
  { id: 'cleaning-essentials', name: 'Cleaning Essentials', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=200&q=80', bg: 'bg-sky-50' },
  { id: 'home-office', name: 'Home & Office', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=200&q=80', bg: 'bg-gray-50' },
  { id: 'personal-care', name: 'Personal Care', image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=200&q=80', bg: 'bg-indigo-50' },
  { id: 'pet-care', name: 'Pet Care', image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=200&q=80', bg: 'bg-amber-50' },
];

export const GROCERY_CATALOG_SECTIONS = [
  {
    id: 'dairy-bread-eggs',
    title: 'Dairy, Bread & Eggs',
    subTags: ['All', 'Milk', 'Bread & Pav', 'Eggs', 'Curd & Yogurt', 'Paneer & Tofu', 'Butter & Cheese'],
    items: [
      {
        id: 'prod-dbe-1',
        name: 'Omfed Premium Cow Milk',
        weightDisplay: '500 ml',
        weightKg: 0.5,
        price: 26,
        mrp: 28,
        discountPct: 7,
        deliveryTime: '8 MINS',
        category: 'dairy-bread-eggs',
        tags: ['Dairy, Bread & Eggs', 'Milk', 'Breakfast'],
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80',
        description: 'Pure, fresh pasteurized cow milk rich in calcium and vital vitamins. Delivered chilled at 4°C in 8 minutes.'
      },
      {
        id: 'prod-dbe-2',
        name: 'Pragati Gold Toned Milk',
        weightDisplay: '500 ml',
        weightKg: 0.5,
        price: 28,
        mrp: null,
        discountPct: null,
        deliveryTime: '8 MINS',
        category: 'dairy-bread-eggs',
        tags: ['Dairy, Bread & Eggs', 'Milk'],
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80',
        description: 'Nutritious homogenized toned milk packed with protein. Ideal for daily tea, coffee, and cereal.'
      },
      {
        id: 'prod-dbe-3',
        name: 'Milky Moo Pouch Curd',
        weightDisplay: '400 g',
        weightKg: 0.4,
        price: 32,
        mrp: null,
        discountPct: null,
        deliveryTime: '8 MINS',
        category: 'dairy-bread-eggs',
        tags: ['Dairy, Bread & Eggs', 'Curd & Yogurt'],
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80',
        description: 'Thick and creamy traditional dahi prepared from pasteurized milk with active live probiotics.'
      },
      {
        id: 'prod-dbe-4',
        name: 'OVO Farm On Day White Eggs (Pack of 6)',
        weightDisplay: '6 pcs',
        weightKg: 0.35,
        price: 55,
        mrp: 68,
        discountPct: 20,
        deliveryTime: '8 MINS',
        category: 'dairy-bread-eggs',
        tags: ['Dairy, Bread & Eggs', 'Eggs', 'Protein'],
        image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=400&q=80',
        description: 'Fresh farm table eggs packed on the same day. High in bio-available protein and Omega-3.'
      },
      {
        id: 'prod-dbe-5',
        name: 'Milky Moo Probiotic Cup Curd',
        weightDisplay: '200 g',
        weightKg: 0.2,
        price: 25,
        mrp: null,
        discountPct: null,
        deliveryTime: '8 MINS',
        category: 'dairy-bread-eggs',
        tags: ['Dairy, Bread & Eggs', 'Curd & Yogurt'],
        image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=400&q=80',
        description: 'Smooth set curd cup with zero artificial preservatives, beneficial for gut health and digestion.'
      },
      {
        id: 'prod-dbe-6',
        name: 'Fresh Malai Paneer Block',
        weightDisplay: '200 g',
        weightKg: 0.2,
        price: 88,
        mrp: 95,
        discountPct: 7,
        deliveryTime: '8 MINS',
        category: 'dairy-bread-eggs',
        tags: ['Dairy, Bread & Eggs', 'Paneer & Tofu'],
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80',
        description: 'Soft and melt-in-mouth cottage cheese crafted from whole milk. Yields 18g protein per 100g.'
      },
      {
        id: 'prod-dbe-7',
        name: 'Amul Salted Butter Block',
        weightDisplay: '100 g',
        weightKg: 0.1,
        price: 58,
        mrp: null,
        discountPct: null,
        deliveryTime: '8 MINS',
        category: 'dairy-bread-eggs',
        tags: ['Dairy, Bread & Eggs', 'Butter & Cheese'],
        image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80',
        description: 'India’s favorite classic salted butter made from pure milk fat. Melts deliciously on warm toasts and parathas.'
      },
      {
        id: 'prod-dbe-8',
        name: 'English Oven 100% Whole Wheat Bread',
        weightDisplay: '400 g',
        weightKg: 0.4,
        price: 45,
        mrp: 50,
        discountPct: 10,
        deliveryTime: '8 MINS',
        category: 'dairy-bread-eggs',
        tags: ['Dairy, Bread & Eggs', 'Bread & Pav'],
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
        description: 'Freshly baked 100% whole wheat sliced bread. Zero refined flour (maida), high in dietary fiber.'
      }
    ]
  },
  {
    id: 'paan-corner',
    title: 'Paan Corner & Rolling Paper',
    subTags: ['All', 'Rolling Paper', 'Cones & Tips', 'Mouth Fresheners', 'Lighters'],
    items: [
      {
        id: 'prod-rpt-1',
        name: 'Perfect Rolled Cones (Natural) - Bongchie',
        weightDisplay: '3 pcs',
        weightKg: 0.05,
        price: 45,
        mrp: null,
        discountPct: null,
        deliveryTime: '8 MINS',
        category: 'paan-corner',
        tags: ['Paan Corner', 'Cones & Tips'],
        image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=400&q=80',
        description: 'Natural organic pre-rolled paper cones with built-in roach filter. Slow burning and unbleached.'
      },
      {
        id: 'prod-rpt-2',
        name: 'Ultimate Rolling Paper with Filter Tips & Roach',
        weightDisplay: '32 pcs',
        weightKg: 0.05,
        price: 90,
        mrp: null,
        discountPct: null,
        deliveryTime: '8 MINS',
        category: 'paan-corner',
        tags: ['Paan Corner', 'Rolling Paper'],
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
        description: 'Ultra thin king size unrefined rolling sheets with attached perforated tips.'
      },
      {
        id: 'prod-rpt-3',
        name: 'Journeys Rolling Paper - TRP Essentials',
        weightDisplay: '132 sheets',
        weightKg: 0.1,
        price: 199,
        mrp: 200,
        discountPct: null,
        deliveryTime: '8 MINS',
        category: 'paan-corner',
        tags: ['Paan Corner', 'Rolling Paper'],
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80',
        description: 'Premium slow burn translucent sheets made from Arabic gum.'
      },
      {
        id: 'prod-rpt-4',
        name: 'Perfect Rolling Paper (Pink) - Bongchie',
        weightDisplay: '3 packs',
        weightKg: 0.05,
        price: 45,
        mrp: null,
        discountPct: null,
        deliveryTime: '8 MINS',
        category: 'paan-corner',
        tags: ['Paan Corner', 'Rolling Paper'],
        image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=400&q=80',
        description: 'Special pink edition ultra thin bleached papers.'
      },
      {
        id: 'prod-rpt-5',
        name: 'Brown Rolling Paper 64 sheets + 64 tips',
        weightDisplay: '64 pcs',
        weightKg: 0.08,
        price: 199,
        mrp: 200,
        discountPct: null,
        deliveryTime: '8 MINS',
        category: 'paan-corner',
        tags: ['Paan Corner', 'Cones & Tips'],
        image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=400&q=80',
        description: 'Eco-friendly natural brown wood fiber rolling book with magnetic closure.'
      },
      {
        id: 'prod-rpt-6',
        name: 'Brown Rolling Paper Cones - Stash Pro',
        weightDisplay: '6 pcs',
        weightKg: 0.05,
        price: 90,
        mrp: null,
        discountPct: null,
        deliveryTime: '8 MINS',
        category: 'paan-corner',
        tags: ['Paan Corner', 'Cones & Tips'],
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80',
        description: 'Pre-rolled king size cones packed with protective paper straw.'
      }
    ]
  },
  {
    id: 'fruits-vegetables',
    title: 'Fruits & Vegetables',
    subTags: ['All', 'Fresh Veggies', 'Fresh Fruits', 'Leafy Greens', 'Seasonals'],
    items: [
      {
        id: 'prod-fv-1',
        name: 'Fresh Farm Desi Tomatoes',
        weightDisplay: '1 kg',
        weightKg: 1.0,
        price: 38,
        mrp: 50,
        discountPct: 24,
        deliveryTime: '8 MINS',
        category: 'fruits-vegetables',
        tags: ['Fruits & Vegetables', 'Fresh Veggies'],
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
        description: 'Farm-fresh juicy desi tomatoes packed with rich lycopene and vitamin C.'
      },
      {
        id: 'prod-fv-2',
        name: 'Farm Fresh Golden Potatoes',
        weightDisplay: '1 kg',
        weightKg: 1.0,
        price: 30,
        mrp: 38,
        discountPct: 21,
        deliveryTime: '8 MINS',
        category: 'fruits-vegetables',
        tags: ['Fruits & Vegetables', 'Fresh Veggies'],
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80',
        description: 'Unpolished golden potatoes ideal for curries, boiling, and crispy chips.'
      },
      {
        id: 'prod-fv-3',
        name: 'Fresh Red Hybrid Onions',
        weightDisplay: '1 kg',
        weightKg: 1.0,
        price: 35,
        mrp: 45,
        discountPct: 22,
        deliveryTime: '8 MINS',
        category: 'fruits-vegetables',
        tags: ['Fruits & Vegetables', 'Fresh Veggies'],
        image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80',
        description: 'Crisp, pungent red onions sourced directly from local grower networks.'
      },
      {
        id: 'prod-fv-4',
        name: 'Fresh Green Palak / Spinach Bunch',
        weightDisplay: '250 g',
        weightKg: 0.25,
        price: 22,
        mrp: 30,
        discountPct: 26,
        deliveryTime: '8 MINS',
        category: 'fruits-vegetables',
        tags: ['Fruits & Vegetables', 'Leafy Greens'],
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80',
        description: 'Hydroponic crisp spinach leaves packed with dietary iron, folate and vitamins.'
      },
      {
        id: 'prod-fv-5',
        name: 'Fresh Robusta Bananas',
        weightDisplay: '1 kg',
        weightKg: 1.0,
        price: 48,
        mrp: 60,
        discountPct: 20,
        deliveryTime: '8 MINS',
        category: 'fruits-vegetables',
        tags: ['Fruits & Vegetables', 'Fresh Fruits'],
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80',
        description: 'Naturally ripened sweet bananas packed with energy and potassium.'
      }
    ]
  },
  {
    id: 'cold-drinks-juices',
    title: 'Cold Drinks & Juices',
    subTags: ['All', 'Soft Drinks', 'Juices', 'Packaged Water', 'Energy Drinks'],
    items: [
      {
        id: 'prod-cd-1',
        name: 'Coca-Cola Diet Coke Soft Drink (Can)',
        weightDisplay: '330 ml',
        weightKg: 0.35,
        price: 50,
        mrp: null,
        discountPct: null,
        deliveryTime: '8 MINS',
        category: 'cold-drinks-juices',
        tags: ['Cold Drinks & Juices', 'Soft Drinks'],
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80',
        description: 'The crisp, sugar-free classic cola taste served icy cold.'
      },
      {
        id: 'prod-cd-2',
        name: 'Thums Up Soft Drink Bottle',
        weightDisplay: '750 ml',
        weightKg: 0.8,
        price: 38,
        mrp: 40,
        discountPct: 5,
        deliveryTime: '8 MINS',
        category: 'cold-drinks-juices',
        tags: ['Cold Drinks & Juices', 'Soft Drinks'],
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80',
        description: 'Strong, fizzy taste of thunder carbonated drink with rich spicy punch.'
      },
      {
        id: 'prod-cd-3',
        name: 'Sprite Lime Flavored Soft Drink',
        weightDisplay: '750 ml',
        weightKg: 0.8,
        price: 38,
        mrp: 40,
        discountPct: 5,
        deliveryTime: '8 MINS',
        category: 'cold-drinks-juices',
        tags: ['Cold Drinks & Juices', 'Soft Drinks'],
        image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=400&q=80',
        description: 'Clear lime and lemon drink providing instant crisp refreshment.'
      },
      {
        id: 'prod-cd-4',
        name: 'Bisleri Packaged Drinking Water',
        weightDisplay: '1 Ltr',
        weightKg: 1.0,
        price: 20,
        mrp: null,
        discountPct: null,
        deliveryTime: '8 MINS',
        category: 'cold-drinks-juices',
        tags: ['Cold Drinks & Juices', 'Packaged Water'],
        image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=400&q=80',
        description: '10-stage purified mineral-enriched packaged drinking water.'
      },
      {
        id: 'prod-cd-5',
        name: 'Thums Up Cola Soft Drink Party Pack',
        weightDisplay: '2.25 Ltr',
        weightKg: 2.3,
        price: 87,
        mrp: 90,
        discountPct: 3,
        deliveryTime: '8 MINS',
        category: 'cold-drinks-juices',
        tags: ['Cold Drinks & Juices', 'Soft Drinks'],
        image: 'https://images.unsplash.com/photo-1581098365948-6a5a912b7a49?auto=format&fit=crop&w=400&q=80',
        description: 'Party pack bottle of strong carbonated cola.'
      },
      {
        id: 'prod-cd-6',
        name: 'Bisleri Packaged Drinking Water Jar',
        weightDisplay: '5 Ltr',
        weightKg: 5.0,
        price: 80,
        mrp: null,
        discountPct: null,
        deliveryTime: '8 MINS',
        category: 'cold-drinks-juices',
        tags: ['Cold Drinks & Juices', 'Packaged Water'],
        image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=400&q=80',
        description: 'Large family hydration jar with tamper-proof seal.'
      }
    ]
  },
  {
    id: 'snacks-munchies',
    title: 'Snacks & Munchies',
    subTags: ['All', 'Chips & Crisps', 'Nachos & Dips', 'Namkeen', 'Gourmet Snacks'],
    items: [
      {
        id: 'prod-snk-1',
        name: 'Too Yumm Cheese Balls Puffs (No Palm Oil)',
        weightDisplay: '40 g',
        weightKg: 0.05,
        price: 32,
        mrp: 35,
        discountPct: 8,
        deliveryTime: '8 MINS',
        category: 'snacks-munchies',
        tags: ['Snacks & Munchies', 'Chips & Crisps'],
        image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80',
        description: 'Guilt-free crunchy baked cheese balls made with zero palm oil.'
      },
      {
        id: 'prod-snk-2',
        name: 'Moi Soi White Rice Paper (22cm)',
        weightDisplay: '100 g',
        weightKg: 0.1,
        price: 75,
        mrp: 190,
        discountPct: 60,
        deliveryTime: '8 MINS',
        category: 'snacks-munchies',
        tags: ['Snacks & Munchies', 'Gourmet Snacks'],
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80',
        description: 'Translucent Vietnamese style rice paper wrappers for healthy spring rolls.'
      },
      {
        id: 'prod-snk-3',
        name: 'Beanly Choco Hazelnut Spread with Breadsticks',
        weightDisplay: '52 g',
        weightKg: 0.06,
        price: 99,
        mrp: 133,
        discountPct: 25,
        deliveryTime: '8 MINS',
        category: 'snacks-munchies',
        tags: ['Snacks & Munchies', 'Gourmet Snacks'],
        image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=400&q=80',
        description: 'Rich roasted hazelnut chocolate dip with crunchy breadsticks.'
      },
      {
        id: 'prod-snk-4',
        name: 'Beanly Dark Chocolate Spread with Breadsticks',
        weightDisplay: '52 g',
        weightKg: 0.06,
        price: 99,
        mrp: 133,
        discountPct: 25,
        deliveryTime: '8 MINS',
        category: 'snacks-munchies',
        tags: ['Snacks & Munchies', 'Gourmet Snacks'],
        image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80',
        description: 'Intense 55% cocoa dark chocolate spread with dipping sticks.'
      },
      {
        id: 'prod-snk-5',
        name: 'Kettle Studio Himalayan Pink Salt Potato Chips',
        weightDisplay: '60 g',
        weightKg: 0.07,
        price: 47,
        mrp: 49,
        discountPct: 4,
        deliveryTime: '8 MINS',
        category: 'snacks-munchies',
        tags: ['Snacks & Munchies', 'Chips & Crisps'],
        image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=400&q=80',
        description: 'Batch-cooked thick cut potato chips seasoned with authentic Himalayan pink rock salt.'
      },
      {
        id: 'prod-snk-6',
        name: 'DOKi Murg Mughlai Chicken Jerky',
        weightDisplay: '30 g',
        weightKg: 0.04,
        price: 199,
        mrp: null,
        discountPct: null,
        deliveryTime: '8 MINS',
        category: 'snacks-munchies',
        tags: ['Snacks & Munchies', 'Gourmet Snacks'],
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
        description: 'High protein dried artisanal chicken jerky prepared with aromatic Mughlai spices.'
      },
      {
        id: 'prod-snk-7',
        name: 'Jolochip Challenge Hottest Chip',
        weightDisplay: '5 g',
        weightKg: 0.01,
        price: 270,
        mrp: 299,
        discountPct: 9,
        deliveryTime: '8 MINS',
        category: 'snacks-munchies',
        tags: ['Snacks & Munchies', 'Chips & Crisps'],
        image: 'https://images.unsplash.com/photo-1608797178974-15b35a61dede?auto=format&fit=crop&w=400&q=80',
        description: 'Extremely spicy Carolina Reaper single chip challenge pack.'
      }
    ]
  },
  {
    id: 'sweet-tooth',
    title: 'Sweet Tooth & Candies',
    subTags: ['All', 'Chocolates', 'Candies & Lollipops', 'Indian Sweets', 'Ice Creams'],
    items: [
      {
        id: 'prod-cg-1',
        name: 'Chupa Chups Sour Bites Mixed Fruit Candy',
        weightDisplay: '50 g',
        weightKg: 0.05,
        price: 35,
        mrp: null,
        discountPct: null,
        deliveryTime: '8 MINS',
        category: 'sweet-tooth',
        tags: ['Sweet Tooth', 'Candies & Lollipops'],
        image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=400&q=80',
        description: 'Chewy sour rainbow belts infused with sweet and tangy mixed berry flavors.'
      },
      {
        id: 'prod-cg-2',
        name: 'Parle Poppins Classic Fruity Candy',
        weightDisplay: '100 g',
        weightKg: 0.1,
        price: 25,
        mrp: null,
        discountPct: null,
        deliveryTime: '8 MINS',
        category: 'sweet-tooth',
        tags: ['Sweet Tooth', 'Candies & Lollipops'],
        image: 'https://images.unsplash.com/photo-1575224300306-1b8da36134ec?auto=format&fit=crop&w=400&q=80',
        description: 'Nostalgic multi-flavored fruit rolls featuring orange, mango, strawberry and lime.'
      },
      {
        id: 'prod-cg-3',
        name: 'Orbit Spearmint Flavour Sugar Free Chewing Gum',
        weightDisplay: '19.8 g',
        weightKg: 0.03,
        price: 45,
        mrp: null,
        discountPct: null,
        deliveryTime: '8 MINS',
        category: 'sweet-tooth',
        tags: ['Sweet Tooth', 'Candies & Lollipops'],
        image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=400&q=80',
        description: 'Sugar-free long-lasting spearmint chewing gum for fresh breath.'
      },
      {
        id: 'prod-cg-5',
        name: 'Pulse Kachcha Aam / Tangy Mango Candy',
        weightDisplay: '180 g',
        weightKg: 0.18,
        price: 45,
        mrp: 50,
        discountPct: 10,
        deliveryTime: '8 MINS',
        category: 'sweet-tooth',
        tags: ['Sweet Tooth', 'Candies & Lollipops'],
        image: 'https://images.unsplash.com/photo-1575224300306-1b8da36134ec?auto=format&fit=crop&w=400&q=80',
        description: 'Tangy raw green mango candy filled with an explosive core of Indian spices.'
      },
      {
        id: 'prod-cg-6',
        name: 'Alpenliebe Juzt Jelly - Strawberry Flavour',
        weightDisplay: '150 g',
        weightKg: 0.15,
        price: 47,
        mrp: 50,
        discountPct: 6,
        deliveryTime: '8 MINS',
        category: 'sweet-tooth',
        tags: ['Sweet Tooth', 'Candies & Lollipops'],
        image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=400&q=80',
        description: 'Soft gelatin-free fruit jelly bites prepared with 25% fruit pulp.'
      }
    ]
  },
  {
    id: 'atta-rice-dal',
    title: 'Atta, Rice & Dal',
    subTags: ['All', 'Atta & Flours', 'Basmati Rice', 'Dals & Pulses', 'Oils & Ghee'],
    items: [
      {
        id: 'prod-ard-1',
        name: 'Aashirvaad Shudh Chakki Whole Wheat Atta',
        weightDisplay: '5 kg',
        weightKg: 5.0,
        price: 245,
        mrp: 290,
        discountPct: 15,
        deliveryTime: '8 MINS',
        category: 'atta-rice-dal',
        tags: ['Atta, Rice & Dal', 'Atta & Flours'],
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
        description: '100% stone-ground whole wheat chakki atta that yields soft, fluffy rotis.'
      },
      {
        id: 'prod-ard-2',
        name: 'Daawat Rozana Super Basmati Rice',
        weightDisplay: '5 kg',
        weightKg: 5.0,
        price: 360,
        mrp: 440,
        discountPct: 18,
        deliveryTime: '8 MINS',
        category: 'atta-rice-dal',
        tags: ['Atta, Rice & Dal', 'Basmati Rice'],
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
        description: 'Naturally aged long-grain basmati rice with fragrant aroma and slender non-sticky grains.'
      },
      {
        id: 'prod-ard-3',
        name: 'Tata Sampann Unpolished Toor Dal',
        weightDisplay: '1 kg',
        weightKg: 1.0,
        price: 165,
        mrp: 185,
        discountPct: 10,
        deliveryTime: '8 MINS',
        category: 'atta-rice-dal',
        tags: ['Atta, Rice & Dal', 'Dals & Pulses'],
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
        description: 'Unpolished arhar/toor dal without artificial water or oil polish, retaining natural nutrients.'
      },
      {
        id: 'prod-ard-4',
        name: 'Fortune Kachi Ghani Mustard Oil',
        weightDisplay: '1 Ltr',
        weightKg: 0.92,
        price: 145,
        mrp: 175,
        discountPct: 17,
        deliveryTime: '8 MINS',
        category: 'atta-rice-dal',
        tags: ['Atta, Rice & Dal', 'Oils & Ghee'],
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
        description: 'Traditional cold pressed mustard oil with strong pungency and high antioxidant content.'
      },
      {
        id: 'prod-ard-5',
        name: 'Tata Salt Vacuum Evaporated Iodized Salt',
        weightDisplay: '1 kg',
        weightKg: 1.0,
        price: 28,
        mrp: null,
        discountPct: null,
        deliveryTime: '8 MINS',
        category: 'atta-rice-dal',
        tags: ['Atta, Rice & Dal'],
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80',
        description: 'India’s most trusted pure vacuum-evaporated iodized salt.'
      }
    ]
  },
  {
    id: 'breakfast-instant',
    title: 'Breakfast & Instant Food',
    subTags: ['All', 'Instant Noodles', 'Cereals & Oats', 'Ready to Eat', 'Poha & Vermicelli'],
    items: [
      {
        id: 'prod-bkt-1',
        name: 'Kellogg’s Corn Flakes Original',
        weightDisplay: '475 g',
        weightKg: 0.5,
        price: 185,
        mrp: 210,
        discountPct: 12,
        deliveryTime: '8 MINS',
        category: 'breakfast-instant',
        tags: ['Breakfast & Instant Food', 'Cereals & Oats'],
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80',
        description: 'Crispy golden toasted flakes of corn enriched with iron and 8 essential vitamins.'
      },
      {
        id: 'prod-bkt-2',
        name: 'Maggi 2-Minute Masala Instant Noodles',
        weightDisplay: 'Pack of 4',
        weightKg: 0.28,
        price: 56,
        mrp: 60,
        discountPct: 6,
        deliveryTime: '8 MINS',
        category: 'breakfast-instant',
        tags: ['Breakfast & Instant Food', 'Instant Noodles'],
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80',
        description: 'Classic favorite Maggi noodles with signature tastemaker blend of roasted Indian spices.'
      },
      {
        id: 'prod-bkt-3',
        name: 'Quaker Whole Rolled Oats',
        weightDisplay: '1 kg',
        weightKg: 1.0,
        price: 175,
        mrp: 199,
        discountPct: 12,
        deliveryTime: '8 MINS',
        category: 'breakfast-instant',
        tags: ['Breakfast & Instant Food', 'Cereals & Oats'],
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
        description: '100% whole grain oats rich in beta-glucan fiber, supporting heart health and active energy.'
      }
    ]
  },
  {
    id: 'bakery-biscuits',
    title: 'Bakery & Biscuits',
    subTags: ['All', 'Cookies', 'Cream Biscuits', 'Rusks', 'Cakes & Buns'],
    items: [
      {
        id: 'prod-bak-1',
        name: 'Britannia Good Day Butter Cookies',
        weightDisplay: '600 g',
        weightKg: 0.6,
        price: 115,
        mrp: 130,
        discountPct: 11,
        deliveryTime: '8 MINS',
        category: 'bakery-biscuits',
        tags: ['Bakery & Biscuits', 'Cookies'],
        image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80',
        description: 'Rich buttery cookies with a delightful smile on every bite.'
      },
      {
        id: 'prod-bak-2',
        name: 'Oreo Vanilla Cream Sandwich Biscuits',
        weightDisplay: '120 g',
        weightKg: 0.12,
        price: 35,
        mrp: 40,
        discountPct: 12,
        deliveryTime: '8 MINS',
        category: 'bakery-biscuits',
        tags: ['Bakery & Biscuits', 'Cream Biscuits'],
        image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=400&q=80',
        description: 'Crunchy chocolate cookie sandwiches packed with smooth vanilla cream.'
      }
    ]
  },
  {
    id: 'tea-coffee',
    title: 'Tea, Coffee & Milk Drinks',
    subTags: ['All', 'Tea', 'Coffee', 'Health Drinks', 'Green Tea'],
    items: [
      {
        id: 'prod-tc-1',
        name: 'Tata Tea Gold Leaf Tea',
        weightDisplay: '500 g',
        weightKg: 0.5,
        price: 260,
        mrp: 310,
        discountPct: 16,
        deliveryTime: '8 MINS',
        category: 'tea-coffee',
        tags: ['Tea, Coffee & Milk Drinks', 'Tea'],
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&q=80',
        description: 'A blend of Assam CTC granules with gently rolled long leaves for superior aroma and taste.'
      },
      {
        id: 'prod-tc-2',
        name: 'Nescafe Classic 100% Pure Coffee Glass Jar',
        weightDisplay: '100 g',
        weightKg: 0.25,
        price: 295,
        mrp: 330,
        discountPct: 10,
        deliveryTime: '8 MINS',
        category: 'tea-coffee',
        tags: ['Tea, Coffee & Milk Drinks', 'Coffee'],
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80',
        description: 'Carefully roasted Robusta coffee beans delivering deep aromatic flavor.'
      }
    ]
  },
  {
    id: 'pharma-wellness',
    title: 'Pharma & Wellness',
    subTags: ['All', 'First Aid', 'Pain Relief', 'Digestive Health', 'Vitamins'],
    items: [
      {
        id: 'prod-ph-1',
        name: 'Eno Regular Fruit Salt Antacid',
        weightDisplay: '100 g',
        weightKg: 0.1,
        price: 135,
        mrp: 150,
        discountPct: 10,
        deliveryTime: '8 MINS',
        category: 'pharma-wellness',
        tags: ['Pharma & Wellness', 'Digestive Health'],
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
        description: 'Fast acting effervescent antacid relief from acidity in 6 seconds.'
      },
      {
        id: 'prod-ph-2',
        name: 'Moov Pain Relief Spray',
        weightDisplay: '80 g',
        weightKg: 0.1,
        price: 185,
        mrp: 205,
        discountPct: 10,
        deliveryTime: '8 MINS',
        category: 'pharma-wellness',
        tags: ['Pharma & Wellness', 'Pain Relief'],
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
        description: '100% Ayurvedic formula pain relief spray for backache, joint pains and sprains.'
      }
    ]
  },
  {
    id: 'cleaning-essentials',
    title: 'Cleaning Essentials',
    subTags: ['All', 'Detergents', 'Dishwashers', 'Floor Cleaners', 'Pooja Items'],
    items: [
      {
        id: 'prod-cln-1',
        name: 'Surf Excel Matic Front Load Liquid Detergent',
        weightDisplay: '1 Litre',
        weightKg: 1.1,
        price: 215,
        mrp: 240,
        discountPct: 10,
        deliveryTime: '8 MINS',
        category: 'cleaning-essentials',
        tags: ['Cleaning Essentials', 'Detergents'],
        image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=400&q=80',
        description: 'Tough stain removal in washing machines without fading colors.'
      },
      {
        id: 'prod-cln-2',
        name: 'Vim Lemon Dishwash Gel Bottle',
        weightDisplay: '750 ml',
        weightKg: 0.8,
        price: 145,
        mrp: 175,
        discountPct: 17,
        deliveryTime: '8 MINS',
        category: 'cleaning-essentials',
        tags: ['Cleaning Essentials', 'Dishwashers'],
        image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=400&q=80',
        description: 'Degreasing concentrated lemon dishwashing gel.'
      }
    ]
  },
  {
    id: 'personal-care',
    title: 'Personal Care',
    subTags: ['All', 'Bath & Body', 'Hair Care', 'Oral Care', 'Deodorants'],
    items: [
      {
        id: 'prod-pc-1',
        name: 'Dettol Original Bathing Soap Bar (Pack of 4)',
        weightDisplay: '4 x 125 g',
        weightKg: 0.5,
        price: 180,
        mrp: 210,
        discountPct: 14,
        deliveryTime: '8 MINS',
        category: 'personal-care',
        tags: ['Personal Care', 'Bath & Body'],
        image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=80',
        description: '99.9% germ protection antibacterial cleansing soap bar.'
      },
      {
        id: 'prod-pc-2',
        name: 'Colgate MaxFresh Spicy Fresh Toothpaste Gel',
        weightDisplay: '150 g',
        weightKg: 0.18,
        price: 110,
        mrp: 130,
        discountPct: 15,
        deliveryTime: '8 MINS',
        category: 'personal-care',
        tags: ['Personal Care', 'Oral Care'],
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
        description: 'Cooling crystal beads that deliver an intense rush of freshness.'
      }
    ]
  },
  {
    id: 'pet-care',
    title: 'Pet Care',
    subTags: ['All', 'Dog Food', 'Cat Food', 'Pet Treats', 'Grooming'],
    items: [
      {
        id: 'prod-pet-1',
        name: 'Pedigree Adult Dry Dog Food (Meat & Rice)',
        weightDisplay: '1.2 kg',
        weightKg: 1.2,
        price: 320,
        mrp: 350,
        discountPct: 9,
        deliveryTime: '8 MINS',
        category: 'pet-care',
        tags: ['Pet Care', 'Dog Food'],
        image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=400&q=80',
        description: 'Complete and balanced nutrition for adult dogs with calcium, zinc and vitamins.'
      },
      {
        id: 'prod-pet-2',
        name: 'Whiskas Adult Wet Cat Food (Ocean Fish in Gravy)',
        weightDisplay: 'Pack of 4',
        weightKg: 0.34,
        price: 180,
        mrp: 200,
        discountPct: 10,
        deliveryTime: '8 MINS',
        category: 'pet-care',
        tags: ['Pet Care', 'Cat Food'],
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',
        description: 'Appetizing real ocean fish chunks in rich gravy for feline health.'
      }
    ]
  },
  {
    id: 'baby-care',
    title: 'Baby Care',
    subTags: ['All', 'Diapers & Wipes', 'Baby Food', 'Baby Skin Care'],
    items: [
      {
        id: 'prod-bc-1',
        name: 'Pampers All-Round Protection Diaper Pants (L)',
        weightDisplay: '34 pcs',
        weightKg: 0.9,
        price: 499,
        mrp: 599,
        discountPct: 17,
        deliveryTime: '8 MINS',
        category: 'baby-care',
        tags: ['Baby Care', 'Diapers & Wipes'],
        image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=400&q=80',
        description: 'Anti-rash lotion with magic gel locks wetness for up to 12 hours.'
      }
    ]
  },
  {
    id: 'masala-oil',
    title: 'Masala, Oil & More',
    subTags: ['All', 'Spices & Masalas', 'Cooking Oils', 'Ghee', 'Whole Spices'],
    items: [
      {
        id: 'prod-mo-1',
        name: 'MDH Deggi Mirch Powder',
        weightDisplay: '100 g',
        weightKg: 0.1,
        price: 85,
        mrp: 95,
        discountPct: 11,
        deliveryTime: '8 MINS',
        category: 'masala-oil',
        tags: ['Masala, Oil & More', 'Spices & Masalas'],
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
        description: 'Authentic Indian red chili blend imparting vibrant natural red color and mild warmth.'
      },
      {
        id: 'prod-mo-2',
        name: 'Everest Garam Masala Powder',
        weightDisplay: '100 g',
        weightKg: 0.1,
        price: 90,
        mrp: 100,
        discountPct: 10,
        deliveryTime: '8 MINS',
        category: 'masala-oil',
        tags: ['Masala, Oil & More', 'Spices & Masalas'],
        image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=400&q=80',
        description: 'Select whole spices roasted and ground to perfection for royal curry flavor.'
      }
    ]
  },
  {
    id: 'sauces-spreads',
    title: 'Sauces & Spreads',
    subTags: ['All', 'Tomato Ketchups', 'Mayonnaise', 'Jams & Honey', 'Chutneys'],
    items: [
      {
        id: 'prod-ss-1',
        name: 'Kissan Fresh Tomato Ketchup Bottle',
        weightDisplay: '950 g',
        weightKg: 1.0,
        price: 125,
        mrp: 155,
        discountPct: 19,
        deliveryTime: '8 MINS',
        category: 'sauces-spreads',
        tags: ['Sauces & Spreads', 'Tomato Ketchups'],
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80',
        description: 'Tangy and sweet classic ketchup made with 100% real ripe tomatoes.'
      },
      {
        id: 'prod-ss-2',
        name: 'Nutella Hazelnut Cocoa Spread Jar',
        weightDisplay: '350 g',
        weightKg: 0.4,
        price: 360,
        mrp: 410,
        discountPct: 12,
        deliveryTime: '8 MINS',
        category: 'sauces-spreads',
        tags: ['Sauces & Spreads', 'Jams & Honey'],
        image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=400&q=80',
        description: 'Iconic creamy hazelnut and cocoa spread, perfect for morning toasts and crepes.'
      }
    ]
  },
  {
    id: 'chicken-meat-fish',
    title: 'Chicken, Meat & Fish',
    subTags: ['All', 'Fresh Chicken', 'Fish & Seafood', 'Mutton', 'Eggs'],
    items: [
      {
        id: 'prod-cmf-1',
        name: 'Fresh Tender Chicken Breast (Boneless)',
        weightDisplay: '500 g',
        weightKg: 0.5,
        price: 185,
        mrp: 220,
        discountPct: 16,
        deliveryTime: '8 MINS',
        category: 'chicken-meat-fish',
        tags: ['Chicken, Meat & Fish', 'Fresh Chicken'],
        image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=400&q=80',
        description: 'Antibiotic-free, fresh farm tender boneless chicken breast cuts.'
      },
      {
        id: 'prod-cmf-2',
        name: 'Fresh Rohu Fish (Bengali Curry Cut)',
        weightDisplay: '500 g',
        weightKg: 0.5,
        price: 175,
        mrp: 200,
        discountPct: 12,
        deliveryTime: '8 MINS',
        category: 'chicken-meat-fish',
        tags: ['Chicken, Meat & Fish', 'Fish & Seafood'],
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
        description: 'Freshwater Rohu fish cut neatly with head and tail pieces for homestyle curry.'
      }
    ]
  },
  {
    id: 'organic-healthy',
    title: 'Organic & Healthy Living',
    subTags: ['All', 'Organic Honey', 'Superfoods', 'Seeds & Nuts', 'Herbal Teas'],
    items: [
      {
        id: 'prod-org-1',
        name: 'Organic Tattva Raw Wild Forest Honey',
        weightDisplay: '500 g',
        weightKg: 0.55,
        price: 295,
        mrp: 350,
        discountPct: 16,
        deliveryTime: '8 MINS',
        category: 'organic-healthy',
        tags: ['Organic & Healthy Living', 'Organic Honey'],
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
        description: 'Pure, unpasteurized natural honey collected from wild forest bee hives.'
      },
      {
        id: 'prod-org-2',
        name: '24 Mantra Organic Jaggery Powder',
        weightDisplay: '500 g',
        weightKg: 0.5,
        price: 65,
        mrp: 75,
        discountPct: 13,
        deliveryTime: '8 MINS',
        category: 'organic-healthy',
        tags: ['Organic & Healthy Living', 'Superfoods'],
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
        description: 'Chemical-free natural sweetener prepared from organically cultivated sugarcane.'
      }
    ]
  },
  {
    id: 'home-office',
    title: 'Home & Office',
    subTags: ['All', 'Stationery', 'Paper Napkins', 'Batteries', 'Bulbs'],
    items: [
      {
        id: 'prod-ho-1',
        name: 'Classmate Pulse Spiral Notebook (Single Line)',
        weightDisplay: '300 Pages',
        weightKg: 0.35,
        price: 145,
        mrp: 160,
        discountPct: 9,
        deliveryTime: '8 MINS',
        category: 'home-office',
        tags: ['Home & Office', 'Stationery'],
        image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=400&q=80',
        description: 'Smooth white paper notebook with micro-perforated pages and durable poly cover.'
      },
      {
        id: 'prod-ho-2',
        name: 'Duracell Ultra Alkaline AA Batteries (Pack of 4)',
        weightDisplay: '4 pcs',
        weightKg: 0.1,
        price: 170,
        mrp: 190,
        discountPct: 10,
        deliveryTime: '8 MINS',
        category: 'home-office',
        tags: ['Home & Office', 'Batteries'],
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80',
        description: 'Long-lasting power batteries with Powercheck for remotes, toys and gadgets.'
      }
    ]
  }
];

// Helper to get all grocery products as a single flat array
export const ALL_GROCERY_PRODUCTS = GROCERY_CATALOG_SECTIONS.flatMap(sec => sec.items);

// Helper to get category by ID or slug
export const getGroceryCategoryById = (categoryId) => {
  return (
    GROCERY_SUBCATEGORIES.find(c => c.id === categoryId) ||
    GROCERY_CATALOG_SECTIONS.find(s => s.id === categoryId) ||
    null
  );
};

// Helper to get products by category ID
export const getGroceryProductsByCategory = (categoryId) => {
  const section = GROCERY_CATALOG_SECTIONS.find(s => s.id === categoryId);
  if (section) return section.items;
  return ALL_GROCERY_PRODUCTS.filter(p => p.category === categoryId);
};
