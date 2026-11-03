// Dataset for Amazon Great Indian Festival Electronics & Mega Deals Hub
// Every card from top to bottom contains a minimum of 10 products!

export const AMAZON_SUB_NAV_LINKS = [
  { id: 'all', label: 'All', icon: 'Menu', link: '/category/electronics' },
  { id: 'sell', label: 'Sell', link: '/vendor' },
  { id: 'bestsellers', label: 'Bestsellers', link: '/category/electronics?filter=bestsellers' },
  { id: 'todays-deals', label: "Today's Deals", link: '/category/electronics?filter=deals' },
  { id: 'mobiles', label: 'Mobiles', link: '/category/electronics?filter=mobiles' },
  { id: 'new-releases', label: 'New Releases', link: '/category/electronics?filter=new' },
  { id: 'customer-service', label: 'Customer Service', link: '/category/electronics?filter=help' },
  { id: 'electronics', label: 'Electronics', active: true, link: '/category/electronics' },
  { id: 'prime', label: 'Prime ▾', link: '/category/electronics?filter=prime' },
  { id: 'home-kitchen', label: 'Home & Kitchen', link: '/category/electronics?filter=home' }
];

// Helper to generate 10 products per pod
const createPodProducts = (podId, baseName, category, basePrice, baseMrp, images, adjectives) => {
  return Array.from({ length: 10 }, (_, i) => {
    const id = `${podId}-item-${i + 1}`;
    const adj = adjectives[i % adjectives.length];
    const img = images[i % images.length];
    const price = Math.round(basePrice * (0.7 + (i * 0.12)));
    const mrp = Math.round(price * 1.5);
    const discount = Math.round(((mrp - price) / mrp) * 100);
    const rating = +(4.2 + ((i * 0.08) % 0.7)).toFixed(1);
    const reviews = 120 + (i * 180);
    const badges = ['Great Indian Festival', 'Mega Festival Deal', '#1 Best Seller', 'Limited Time Deal'];
    const badge = badges[i % badges.length];

    return {
      id,
      name: `${adj} ${baseName} (Model ${2026 + i})`,
      category,
      price,
      mrp,
      discount: `${discount}% off`,
      discountPct: discount,
      rating,
      reviewsCount: reviews,
      badge,
      image: img,
      gallery: [img, images[(i + 1) % images.length]],
      description: `Premium ${adj.toLowerCase()} ${baseName.toLowerCase()} engineered for high durability, certified performance and festival savings on Burlamart.`,
      highlights: [
        '100% Genuine Certified Brand Product',
        'Official Manufacturer Brand Warranty',
        'Eligible for Fast Free Delivery',
        '7 Days Replacement Policy & Zero Hassle Returns'
      ],
      stock: 15 + i
    };
  });
};

// Image pools by category
const TECH_IMAGES = [
  'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'
];

const APPLIANCE_IMAGES = [
  'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80'
];

const HOME_IMAGES = [
  'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1580481077195-c22ae2499d2f?auto=format&fit=crop&w=600&q=80'
];

const TOY_IMAGES = [
  'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=600&q=80'
];

const BOOK_IMAGES = [
  'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80'
];

// Top Festive Carousel Slides with 10 Products Each
export const FESTIVE_HERO_SLIDES = [
  {
    id: 'hero-1',
    type: 'festival-main',
    title: 'Great Indian Festival',
    edition: 'Diwali Edition',
    subtitle: 'Last Chance Deals',
    offerText: 'Get 35% cashback up to ₹150*',
    deliveryText: 'Free Delivery on first 3 orders* | Easy Returns',
    bankText: '10% Instant Discount* on Credit Card & EASYEMI on Cards',
    sponsor: 'Powered by SAMSUNG Galaxy | intel core Ultra',
    products: createPodProducts('hero-1', 'Mega Diwali Deal Gadget', 'electronics', 4999, 9999, TECH_IMAGES, ['Flagship', 'Ultra-Fast', 'Smart 4K', 'Noise-Cancelling', 'High-Speed'])
  },
  {
    id: 'hero-2',
    type: 'gadget-orange',
    tag: 'Sponsored',
    title: 'The ultimate way to watch your health.',
    subtitle: 'Exciting offers^',
    productName: 'Apple Watch Series 11',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80',
    products: createPodProducts('hero-2', 'Smartwatch & Fitness Band', 'electronics', 2499, 4999, TECH_IMAGES, ['ECG Sensor', 'OLED Retina', 'Cellular GPS', 'Titanium Case', 'Sport Band'])
  },
  {
    id: 'hero-3',
    type: 'facewash-purple',
    title: 'Under ₹499 | Facewashes & Grooming',
    subtitle: 'Free Delivery on first 3 orders* | Latest Trends',
    productName: 'Minimalist, Derma Co & Garnier',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    products: createPodProducts('hero-3', 'Gentle Foaming Cleanser', 'beauty', 299, 599, APPLIANCE_IMAGES, ['Salicylic Acid', 'Vitamin C', 'Niacinamide 10%', 'Hydrating Ceramide', 'Oil-Control Tea Tree'])
  },
  {
    id: 'hero-4',
    type: 'kurta-maroon',
    title: 'Under ₹399 | Kurta & kurta sets',
    subtitle: 'Free Delivery on first 3 orders* | Easy Returns',
    productName: 'Festive Silk Kurta Sets',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    products: createPodProducts('hero-4', 'Silk Blend Embroidered Kurta Set', 'fashion', 399, 1299, HOME_IMAGES, ['Festive Banarasi', 'Golden Zari', 'Handcrafted Chanderi', 'Pure Cotton Lucknowi', 'Royal Jacquard'])
  },
  {
    id: 'hero-5',
    type: 'kitchen-green',
    title: 'Starting ₹199 | Festive kitchen essentials',
    subtitle: 'Free Delivery on first 3 orders* | Easy Returns',
    productName: 'Lunchboxes, Choppers & Bottles',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    products: createPodProducts('hero-5', 'Stainless Steel Kitchen Essential', 'kitchen', 199, 499, APPLIANCE_IMAGES, ['Insulated Airtight', 'Quick-Pull Chopper', 'Borosil Glass Bottle', 'Multi-Compartment', 'Non-Stick Cast Iron'])
  }
];

// Helper to assemble Pod with 4 preview tiles AND 10+ full products
const createPodWith10 = (id, title, type, baseName, category, basePrice, baseMrp, images, adjectives, custom4 = null) => {
  const fullProducts = createPodProducts(id, baseName, category, basePrice, baseMrp, images, adjectives);

  // First 4 items for the 2x2 grid
  const previewItems = custom4 || fullProducts.slice(0, 4).map(p => ({
    id: p.id,
    name: p.name,
    label: p.name,
    price: p.price,
    mrp: p.mrp,
    discount: p.discount,
    badge: p.badge,
    image: p.image
  }));

  return {
    id,
    title,
    type,
    items: previewItems,
    allItems: fullProducts // 10 FULL PRODUCTS PER POD!
  };
};

// ROW 1 (Image 2)
export const DEALS_ROW_1 = [
  createPodWith10('pod-1', 'Trending deals', 'product-grid', 'Smart Home Device', 'electronics', 1599, 2999, TECH_IMAGES, ['Ultra-Quiet Ceiling Fan', 'Smart Air Purifier', 'Robot Vacuum & Mop', 'Screenless Fitness Band', 'True Wireless Earbuds', 'Fast Charging Power Bank', 'Mechanical Gaming Keyboard', 'Dual Band WiFi 6 Router', '4K Streaming Media Stick', 'Bluetooth Party Speaker']),
  createPodWith10('pod-2', 'Deals on fashion, home & more', 'price-point-festive', 'Festive Deal Pick', 'fashion', 99, 299, HOME_IMAGES, ['Cotton Handkerchiefs', 'Ceramic Coffee Mug', 'Microfiber Dusting Gloves', 'Scented Glass Candle', 'Multipurpose Kitchen Peeler', 'Stainless Steel Straw Set', 'Silicone Baking Spatula', 'Wooden Desk Organizer', 'LED Keychain Flashlight', 'Cotton Canvas Tote Bag'], [
    { id: 'pod-2-item-1', title: 'Under ₹99', subtitle: 'Mega savings', iconColor: 'bg-red-700', image: HOME_IMAGES[0] },
    { id: 'pod-2-item-2', title: 'Under ₹199', subtitle: 'Unmissable deals', iconColor: 'bg-red-700', image: HOME_IMAGES[1] },
    { id: 'pod-2-item-3', title: 'Under ₹499', subtitle: 'Explore more', iconColor: 'bg-red-700', image: HOME_IMAGES[2] },
    { id: 'pod-2-item-4', title: 'OMG Price Drop', subtitle: 'Lowest prices ever', iconColor: 'bg-red-800', image: HOME_IMAGES[3] }
  ]),
  createPodWith10('pod-3', 'Top deals on home, kitchen & outdoors', 'product-grid', 'Home & Kitchen Essential', 'home', 319, 999, APPLIANCE_IMAGES, ['Dual Comfort Mattress', 'Heavy Duty Inverter Battery', 'Wax Tealight Candles', 'Smart Floor Scrubbing Robot', 'Automatic Bread Toaster', 'Cordless Electric Kettle', 'High-Pressure Steam Iron', 'Stainless Steel Cutlery Set', 'Granite Finish Frying Pan', 'Touch-Sensor Bedside Lamp']),
  createPodWith10('pod-4', 'Top deals on home, kitchen & outdoors', 'product-grid', 'Ergonomic Furniture & Robot', 'home', 3499, 8999, HOME_IMAGES, ['Self-Emptying Robot Cleaner', 'Ergonomic Mesh Chair', 'Engineered Wood Wardrobe', 'Pocket Spring Mattress', 'Orthopedic Memory Foam Pillow', 'Motorized Standing Desk', 'Reclining Lounge Armchair', 'Solid Sheesham Dining Chair', 'Adjustable Laptop Riser', 'Modular Shoe Rack Cabinet'])
];

// ROW 2 (Image 3)
export const DEALS_ROW_2 = [
  createPodWith10('pod-5', 'Under ₹399 | Deals on top brands', 'category-tiles', 'Branded Apparel', 'fashion', 299, 799, HOME_IMAGES, ['A-Line Flared Dress', 'Embroidered Kurta Set', 'Combed Cotton T-Shirt', 'Slim-Fit Casual Shirt', 'Breathable Gym Vest', 'Relaxed Denim Joggers', 'Printed Rayon Tunic', 'Formal Oxford Shirt', 'Stretchy Cotton Leggings', 'Lightweight Hooded Sweatshirt']),
  createPodWith10('pod-6', 'Under ₹499 | Home & kitchen finds', 'category-tiles', 'Home Organizing Find', 'home', 149, 499, APPLIANCE_IMAGES, ['Bedsheets & 2 Pillow Covers', 'Airtight Kitchen Storage Jars', 'Handcrafted Brass Bell Decor', 'Stainless Steel Kitchen Scissors', 'Multi-Tier Vegetable Basket', 'Non-Slip Bathroom Mat', 'Silicone Oven Gloves', 'Wall Mounted Key Holder', 'Magnetic Spice Rack Set', 'Microfiber Mop Refill']),
  createPodWith10('pod-7', 'Deals on exam books', 'category-tiles', 'Exam Prep Book', 'books', 159, 499, BOOK_IMAGES, ['JEE Main & Advanced 45-Year Solved', 'University Engineering Mathematics', 'Govt Job Quantitative Aptitude', 'UPSC General Studies Paper 1', 'NEET Biology Rapid Revision', 'SSC CGL Tier 1 & 2 Practice Workbook', 'GATE Computer Science Comprehensive Guide', 'Banking & Insurance Reasoning Tests', 'NCERT Physics Class 11-12 Simplified', 'English Grammar & Vocabulary Booster']),
  createPodWith10('pod-8', 'Business deals on Home, kitchen & sports', 'business-tiles', 'B2B Commercial Unit', 'business', 1299, 3999, TECH_IMAGES, ['Commercial Electric Kettle', 'Heavy Duty Floor Scrubber', 'Motorized Running Treadmill', 'Amazon Business GST Invoice Bulk', 'Conference Room Projector', 'Ergonomic B2B Mesh Task Chair', 'Commercial Paper Shredder', 'Automatic Hand Sanitizer Dispenser', 'Digital Attendance Punch Clock', 'Bulk Office Stationery Caddy'], [
    { id: 'pod-8-item-1', label: 'Kitchen appliances', badge: 'Top brands', image: APPLIANCE_IMAGES[0] },
    { id: 'pod-8-item-2', label: 'Home appliances', badge: 'No Cost EMI', image: APPLIANCE_IMAGES[1] },
    { id: 'pod-8-item-3', label: 'Sports & fitness', badge: 'Bestseller', image: TECH_IMAGES[2] },
    { id: 'pod-8-item-4', label: 'Buy for business', badge: 'Up to 18% GST credit', isAmazonBusiness: true }
  ])
];

// ROW 3 (Image 4)
export const DEALS_ROW_3 = [
  createPodWith10('pod-9', 'Get 5% back* | Upgrade your style', 'category-tiles', 'Men Grooming & Styling', 'beauty', 499, 1499, TECH_IMAGES, ['Waterproof Multi-Groomer', 'Cordless Rotary Body Groomer', 'Designer Pure Cotton Kurta', 'Smart Fitness Tracking Wristband', 'Beard Shaper & Trimming Guard', 'Ionic Hair Dryer with Diffuser', 'Charcoal Clay Face Mask Kit', 'Cologne Long-Lasting Spray', 'Ceramic Hair Straightener Brush', 'Exfoliating Walnut Face Scrub']),
  createPodWith10('pod-10', 'Starting ₹199 | Festive finds from emerging brands', 'category-tiles', 'Handmade Festive Craft', 'home', 199, 699, HOME_IMAGES, ['Clay Painted Diyas (Pack of 12)', "Handloom Men's Festive Kurta", "Zari Border Women's Festive Saree", 'Brass Urli Bowl for Floating Flowers', 'Hanging Metal Tea Light Lantern', 'Scented Soy Wax Pillar Candle', 'Handwoven Cotton Table Runner', 'Decorative Crystal String Lights', 'Ceramic Aroma Diffuser Burner', 'Terracotta Hand Painted Vases']),
  createPodWith10('pod-11', 'Business only deals for you | Under ₹999', 'business-tiles', 'Commercial Facility Supply', 'business', 499, 1299, APPLIANCE_IMAGES, ['Heavy Disinfectant Cleaning Gallon', 'Full HD WiFi Security CCTV Camera', 'High Pressure Car Washer Foam Cannon', 'Commercial Bulk Packaging Crate', 'Industrial Rubber Entrance Mat', 'Rechargeable Emergency Exit Light', 'Stainless Steel Lobby Dustbin', 'Automatic Wall Air Freshener Unit', 'Multi-Port USB Desktop Hub', 'First Aid Trauma Emergency Box'], [
    { id: 'pod-11-item-1', label: 'Cleaning supplies', image: APPLIANCE_IMAGES[0] },
    { id: 'pod-11-item-2', label: 'Security cameras', image: TECH_IMAGES[1] },
    { id: 'pod-11-item-3', label: 'Automotives', image: TECH_IMAGES[2] },
    { id: 'pod-11-item-4', label: 'Buy for business', badge: 'Up to 18% GST credit', isAmazonBusiness: true }
  ]),
  createPodWith10('pod-12', 'Under ₹649 | Footwear & handbags', 'category-tiles', 'Footwear & Accessory', 'fashion', 399, 999, HOME_IMAGES, ["Men's Slip-On Casual Loafers", "Men's Lightweight Breathable Running Shoes", "Women's Embroidered Flat Juttis", 'Structured Shoulder Handbag with Sling', 'Orthopedic Cushion Walking Sandals', 'Waterproof PU Leather Clutch Wallet', 'Canvas Low-Top Everyday Sneakers', 'Block Heel Party Pumps', 'Casual Crossbody Chest Bag', 'Memory Foam Arch Support Insoles'])
];

// ROW 4 (Image 5)
export const DEALS_ROW_4 = [
  createPodWith10('pod-13', 'Under ₹499 | Budget friendly home essentials', 'category-tiles', 'Budget Home Accents', 'home', 249, 699, HOME_IMAGES, ['Velvet Cushion Covers (Set of 5)', 'Gold Leaf Meditating Buddha Idol', 'Warm Amber Nordic Table Lamp', 'Collapsible Foldable Wardrobe Organizer', 'Anti-Skid Cotton Floor Mat', 'Blackout Window Eyelet Curtains', 'Floating Wooden Wall Shelf', 'Self-Adhesive Wall Mirror Tiles', 'Aromatherapy Incense Waterfall', 'Ceramic Bathroom Accessory Set']),
  createPodWith10('pod-14', 'Budget friendly sports & fitness finds', 'category-tiles', 'Fitness & Sports Gear', 'sports', 299, 899, TECH_IMAGES, ['Speed Skipping Jump Rope', 'Graphite Badminton Racket with Cover', 'Foldable 3-Wheel Kids Kick Scooter', 'PVC Coated Hex Dumbbells (Pair)', 'Non-Slip TPE Exercise Yoga Mat', 'Resistance Loop Bands (Pack of 5)', 'Adjustable Hand Grip Strengthener', 'Foam Roller for Muscle Soreness', 'Sweat-Wicking Athletic Headband', 'Shaker Bottle with Whisk Ball']),
  createPodWith10('pod-15', 'Business only festive deals for you | Under ₹499', 'business-tiles', 'Festive Corporate Decor', 'business', 149, 499, HOME_IMAGES, ['Peacock Design Brass Diya Stand', 'Velvet Pooja Aasan Chowki Mat', 'Rolling Multipurpose 3-Tier Utility Cart', 'Amazon Business Bulk Gift Hamper Box', 'Pure Brass Pooja Bell with Nandi', 'Gold Plated Laxmi Ganesh Coin Token', 'Cotton Diya Wicks (Pack of 500)', 'Camphor Diffuser Brass Electric Lamp', 'Festive Haldi Kumkum Thali Set', 'Incense Stick Holder Brass Tower'], [
    { id: 'pod-15-item-1', label: 'Starting ₹49 | Decor & lights', image: HOME_IMAGES[0] },
    { id: 'pod-15-item-2', label: 'Starting ₹149 | Pooja essentials', image: HOME_IMAGES[1] },
    { id: 'pod-15-item-3', label: 'Storage & organizers', image: APPLIANCE_IMAGES[2] },
    { id: 'pod-15-item-4', label: 'Buy for business', badge: 'Up to 18% GST credit', isAmazonBusiness: true }
  ]),
  createPodWith10('pod-16', 'Starting ₹99 | Celebrate with characters you adore', 'character-tiles', 'Character Merchandise', 'toys', 145, 499, TOY_IMAGES, ['Peppa Pig Soft Plush Huggable Toy', 'Harry Potter Wizard Wand & Spellbook', 'Spider-Man Action Figure with Web Blaster', 'Shinchan Action Mask Doll Figure', 'Pikachu Interactive Sound Soft Plush', 'Batman Dark Knight Die-Cast Batmobile', 'Doraemon Flying Copter Gadget Toy', 'Frozen Elsa Magical Musical Doll', 'Avengers Captain America Shield Toy', 'Naruto Shippuden Anime Keyring Figurine'])
];

// ROW 5 (Image 6)
export const DEALS_ROW_5 = [
  createPodWith10('pod-17', "Children's books", 'category-tiles', "Child Reader Book", 'books', 129, 399, BOOK_IMAGES, ['Touch & Feel Board Book (0-2 Yrs)', 'Illustrated Bedtime Fables (3-5 Yrs)', 'Early Chapter Comic Readers (6-8 Yrs)', 'Adventure Mystery Novels (9-12 Yrs)', 'Phonics Sound & Wipe-Clean Activity', 'First 100 Animal Words Picture Book', 'Moral Tales from Panchatantra', 'Science Experiments for Young Minds', 'World Atlas & Countries Fun Book', 'Coloring & Origami Activity Box']),
  createPodWith10('pod-18', 'Under ₹499 | Pocket friendly home essentials', 'category-tiles', 'Pocket Friendly Home Item', 'home', 199, 499, HOME_IMAGES, ['Gingham Ruffled Throw Pillow', 'Hand Painted Toucan & Parrot Birds Pair', 'Minimalist Sconce Wall Lamp', 'Stackable Drawer Organizer Bins', 'Linen Blend Cushion Case', 'Ceramic Table Succulent Planter', 'Door Draft Stopper Strip', 'Geometric Pattern Coaster Set', 'Woven Macrame Wall Hanging', 'Soft Cotton Waffle Towel']),
  createPodWith10('pod-19', 'Starting ₹169 | Festive essentials', 'category-tiles', 'Festive Greenery & Lights', 'home', 169, 599, HOME_IMAGES, ['Wrought Iron Plant Stand Rack', 'Marble Finish Carved Tulsi Pot', 'Air Purifying Plant Festive Hamper Box', 'Solar Powered Mandala Shadow Lamp', 'Brass Hanging Peacock Bell', 'Terracotta Hand Carved Diya Tray', 'Faux Marigold Flower Garlands (Set of 5)', 'Electric Copper String Fairy Lights', 'Handmade Scented Soy Candles', 'Toran Door Hanging with Beads']),
  createPodWith10('pod-20', "Starting ₹65 | Top deals on kids' favourites", 'category-tiles', "Kids' Activity & Book", 'toys', 65, 299, TOY_IMAGES, ['101 Animal Drawing & Sticker Book', 'Early Learning Illustrated Board Book', 'Funny Illustrated Chapter Story Book', 'DIY Pottery Clay Wheel Toy Kit', 'Washable Finger Painting Palette', 'Building Bricks 120-Piece Set', 'Educational Flashcards Math & Words', 'Kids Magnetic Drawing Board', 'Play Dough 6 Vibrant Colors Tub', 'Card Matching Memory Game'])
];

// ROW 6 (Image 7)
export const DEALS_ROW_6 = [
  createPodWith10('pod-21', 'Budget friendly vehicle essentials', 'category-tiles', 'Automotive Gear', 'auto', 99, 399, TECH_IMAGES, ['Full Face ISI Certified Bike Helmet', 'Solar Rotating Car Dashboard Freshener', 'Microfiber High GSM Car Washing Kit', 'Waterproof All-Weather Bike & Car Cover', 'Digital Tire Pressure Gauge with LCD', 'USB Fast Rapid Car Charger 38W', 'Blind Spot Convex Mirror (Pair)', 'Leather Seat Belt Comfort Cushion', 'Anti-Fog Rainproof Helmet Visor Film', 'Portable Emergency Tire Puncture Repair Kit']),
  createPodWith10('pod-22', 'Starting ₹99 | Celebrate with characters you adore', 'character-tiles', 'Character Merch Edition 2', 'toys', 99, 399, TOY_IMAGES, ['Peppa Pig Soft Plush Huggable Toy', 'Harry Potter Wizard Wand & Spellbook', 'Spider-Man Action Figure with Web Blaster', 'Shinchan Action Mask Doll Figure', 'Pikachu Interactive Sound Soft Plush', 'Batman Dark Knight Die-Cast Batmobile', 'Doraemon Flying Copter Gadget Toy', 'Frozen Elsa Magical Musical Doll', 'Avengers Captain America Shield Toy', 'Naruto Shippuden Anime Keyring Figurine']),
  createPodWith10('pod-23', 'Wholesale pricing on Furniture + GST credit', 'business-tiles', 'Commercial Workstation', 'furniture', 2999, 7999, HOME_IMAGES, ['High Back Ergonomic Executive Chair', 'Dual Motor Adjustable Height Standing Desk', 'PU Leather Racing Gaming Chair with Footrest', 'Amazon Business Bulk Office Furniture', 'Solid Wood Conference Meeting Table', 'Steel 3-Drawer Mobile Pedestal Cabinet', 'Acoustic Sound Absorbing Desk Partition', 'Heavy Duty Steel Storage Filing Almirah', 'Comfortable Visitor Sled Base Chair', 'Ergonomic Articulating Monitor Arm Mount'], [
    { id: 'pod-23-item-1', label: 'Office chairs', badge: 'No Cost EMI', image: HOME_IMAGES[4] },
    { id: 'pod-23-item-2', label: 'Adjustable desks', badge: 'Easy Installation', image: HOME_IMAGES[1] },
    { id: 'pod-23-item-3', label: 'Gaming chairs', badge: 'Wide selection', image: HOME_IMAGES[3] },
    { id: 'pod-23-item-4', label: 'Buy for business', badge: 'Up to 18% GST credit', isAmazonBusiness: true }
  ]),
  createPodWith10('pod-24', 'Starting ₹299 | Deals on toddler toys, plush & more', 'category-tiles', 'Toddler Toy & Board Game', 'toys', 249, 799, TOY_IMAGES, ['Fashion Doll Playset with Accessories', 'Sensory Ring Stacker & Rattle Toy', 'Fluffy Giant Cuddle Teddy Bear Plush', 'Catan Strategy Board Game Classic', 'Soft Cloth Animal Sensory Book', 'Musical Crawling Crab with Sensor', 'Wooden Alphabet ABC Puzzle Board', 'Baby Bath Floating Splash Toys', 'Push & Go Friction Powered Vehicles', 'Mini Wooden Xylophone Musical Instrument'])
];

// ROW 7 (Image 8)
export const DEALS_ROW_7 = [
  createPodWith10('pod-25', 'Starting ₹129 | Deals on remote control cars & more', 'category-tiles', 'RC & Diecast Vehicle', 'toys', 129, 499, TOY_IMAGES, ['High Speed RC Drift Stunt Car', 'Rechargeable Electric Monster Truck', 'Die-Cast Metal Scale Model Vintage Car', 'Supercar with Headlights & Remote Control', 'Amphibious All-Terrain 4WD Buggy', 'Gesture Sensing Twisting RC Stunt Vehicle', 'Mini Pocket RC Racing Formula 1 Car', 'Remote Control Construction Excavator', 'High Speed RC Off-Road Rock Crawler', 'LED Light Up RC Wall Climbing Car']),
  createPodWith10('pod-26', 'Starting ₹299 | Deals on toddler toys, plush & more', 'category-tiles', 'Plush & Early Learning', 'toys', 299, 899, TOY_IMAGES, ['Fashion Doll Playset with Accessories', 'Sensory Ring Stacker & Rattle Toy', 'Fluffy Giant Cuddle Teddy Bear Plush', 'Catan Strategy Board Game Classic', 'Soft Cloth Animal Sensory Book', 'Musical Crawling Crab with Sensor', 'Wooden Alphabet ABC Puzzle Board', 'Baby Bath Floating Splash Toys', 'Push & Go Friction Powered Vehicles', 'Mini Wooden Xylophone Musical Instrument']),
  createPodWith10('pod-27', 'Starting ₹129 | Deals on remote control cars & more', 'category-tiles', 'RC & Diecast Vehicle Part 2', 'toys', 129, 499, TOY_IMAGES, ['High Speed RC Drift Stunt Car', 'Rechargeable Electric Monster Truck', 'Die-Cast Metal Scale Model Vintage Car', 'Supercar with Headlights & Remote Control', 'Amphibious All-Terrain 4WD Buggy', 'Gesture Sensing Twisting RC Stunt Vehicle', 'Mini Pocket RC Racing Formula 1 Car', 'Remote Control Construction Excavator', 'High Speed RC Off-Road Rock Crawler', 'LED Light Up RC Wall Climbing Car']),
  createPodWith10('pod-28', 'Starting ₹129 | Deals on remote control cars & more', 'category-tiles', 'RC & Diecast Vehicle Part 3', 'toys', 129, 499, TOY_IMAGES, ['High Speed RC Drift Stunt Car', 'Rechargeable Electric Monster Truck', 'Die-Cast Metal Scale Model Vintage Car', 'Supercar with Headlights & Remote Control', 'Amphibious All-Terrain 4WD Buggy', 'Gesture Sensing Twisting RC Stunt Vehicle', 'Mini Pocket RC Racing Formula 1 Car', 'Remote Control Construction Excavator', 'High Speed RC Off-Road Rock Crawler', 'LED Light Up RC Wall Climbing Car'])
];

// ROW 8 (Image 9)
export const DEALS_ROW_8 = [
  createPodWith10('pod-29', 'Win big this Great Indian Festival | Rewards worth 20 lakh+', 'gamification-orange', 'Festival Lucky Draw Item', 'rewards', 10, 100, TECH_IMAGES, ['Wheel of Rewards', 'Spin & Win Cash Token', 'Marshall Wireless Speaker Gift', 'FunZone Game Voucher Token', '100% Cashback Voucher', 'Smart TV Bumper Prize Ticket', 'Flight Ticket Discount Coupon', 'Free Prime 1-Year Membership Pass', 'Amazon Pay ₹500 Balance Code', 'Gold Coin Lucky Draw Coupon'], [
    { id: 'pod-29-item-1', label: 'Guaranteed rewards from ₹10', title: 'Wheel of Rewards', image: TECH_IMAGES[0] },
    { id: 'pod-29-item-2', label: 'Spin & win up to ₹225...', title: 'Spin to Win', image: TECH_IMAGES[1] },
    { id: 'pod-29-item-3', label: 'Win Marshall speaker &...', title: 'Marshall Sound', image: TECH_IMAGES[2] },
    { id: 'pod-29-item-4', label: 'Play more games', title: 'FunZone', image: TECH_IMAGES[3] }
  ]),
  createPodWith10('pod-30', 'Deals on home essentials', 'category-tiles', 'Home Sanitation & Power', 'home', 199, 499, APPLIANCE_IMAGES, ['Overhead Brass Rain Shower Head', 'Scotch-Brite Heavy Sponge Wipes (5 Pack)', 'Damask Pattern Peel & Stick Wallpaper', 'Multi-Plug Surge Protector Extension Socket', 'Automatic Foam Soap Dispenser', 'Silicone Toilet Cleaning Brush Set', 'Reusable Microfiber Cleaning Cloth (Pack of 8)', 'Stainless Steel Corner Shower Caddy', 'Smart WiFi Plug with Energy Monitoring', 'Motion Sensor LED Night Light']),
  createPodWith10('pod-31', 'Deals on home essentials', 'category-tiles', 'Home Sanitation & Power Part 2', 'home', 199, 499, APPLIANCE_IMAGES, ['Overhead Brass Rain Shower Head', 'Scotch-Brite Heavy Sponge Wipes (5 Pack)', 'Damask Pattern Peel & Stick Wallpaper', 'Multi-Plug Surge Protector Extension Socket', 'Automatic Foam Soap Dispenser', 'Silicone Toilet Cleaning Brush Set', 'Reusable Microfiber Cleaning Cloth (Pack of 8)', 'Stainless Steel Corner Shower Caddy', 'Smart WiFi Plug with Energy Monitoring', 'Motion Sensor LED Night Light']),
  createPodWith10('pod-32', 'Get 5% back* | Relaxation massagers', 'category-tiles', 'Body Massager & Wellness', 'health', 899, 2499, TECH_IMAGES, ['Handheld Deep Tissue Percussion Massager', 'Cordless Muscle Recovery Massage Gun', 'Shiatsu Heated Foot & Calf Massager Machine', 'Electric Waterproof Scalp & Head Massager', 'Cervical Neck & Shoulder Shiatsu Pillow', 'Eye Massager with Heat & Bluetooth Music', 'Acupressure Foot Reflexology Mat', 'Vibrating Foam Roller for Back Pain', 'Portable Leg Air Compression Wraps', 'Infrared Heating Knee Massager Pad'])
];

// Row 9 (Image 10) - 10 Products in Browsing History
export const BROWSING_HISTORY_PRODUCTS = [
  {
    id: 'prod-cuckoo',
    name: 'CUCKOO Respure Air Purifier Replacement Filter True HEPA',
    rating: 4.2,
    reviewsCount: 21,
    discountPct: 40,
    price: 2990,
    mrp: 4990,
    freeDelivery: true,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'prod-coway-set',
    name: 'Coway Original Carbon & HEPA Filter Set for AirMega 150 (8500 Hrs)',
    rating: 4.6,
    reviewsCount: 237,
    discountPct: 48,
    price: 4699,
    mrp: 8900,
    badge: 'Great Indian Festival',
    deliveryDate: 'Thursday, November 12',
    freeDelivery: true,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'prod-smiledrive',
    name: 'SMILEDRIVE Portable Air Quality Pollution Meter with Colour Screen (PM2.5 / PM10)',
    rating: 4.8,
    reviewsCount: 546,
    isBestSeller: true,
    discountPct: 53,
    price: 4748,
    mrp: 9999,
    badge: 'Mega Festival Deal',
    deliveryDate: 'Thursday, November 12',
    freeDelivery: true,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'prod-hasthip',
    name: 'HASTHIP 196" Wedge Foam Window Weather Stripping Adhesive Gap Seal',
    rating: 4.1,
    reviewsCount: 109,
    discountPct: 34,
    price: 414,
    mrp: 632,
    badge: 'Great Indian Festival',
    deliveryDate: 'Thursday, November 12',
    freeDelivery: true,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'prod-finehepa',
    name: 'Finehepa Filter compatible with Coway Air Purifier 150 (HEPA + CARBON SET)',
    rating: 4.3,
    reviewsCount: 289,
    discountPct: 20,
    price: 1929,
    mrp: 2400,
    deliveryDate: 'Thursday, November 12',
    freeDelivery: true,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'prod-nakpro',
    name: 'NAKPRO NUTRITION Impact Whey Protein Isolate & Concentrate 2 kg',
    rating: 4.7,
    reviewsCount: 1679,
    isBestSeller: true,
    discountPct: 41,
    price: 2990,
    mrp: 5100,
    deliveryDate: 'Thursday, November 12',
    freeDelivery: true,
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'prod-havells-heater',
    name: 'Havells 13 Fin Oil Filled Room Heater (OFR) with Advanced Fast Heating',
    rating: 4.5,
    reviewsCount: 1074,
    discountPct: 29,
    price: 14458,
    mrp: 20345,
    deliveryDate: 'Friday, November 13',
    freeDelivery: true,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'prod-philips-fryer',
    name: 'Philips Digital Air Fryer HD9252 with Rapid Air Technology',
    rating: 4.8,
    reviewsCount: 3120,
    discountPct: 38,
    price: 7999,
    mrp: 12995,
    deliveryDate: 'Saturday, November 14',
    freeDelivery: true,
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'prod-boat-earbuds',
    name: 'boAt Airdopes 141 ANC with 42H Playtime & Low Latency Beast Mode',
    rating: 4.4,
    reviewsCount: 8940,
    discountPct: 62,
    price: 1499,
    mrp: 3990,
    deliveryDate: 'Friday, November 13',
    freeDelivery: true,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'prod-atomberg-fan',
    name: 'Atomberg Renesa 1200mm BLDC Smart Ceiling Fan with Remote',
    rating: 4.7,
    reviewsCount: 5210,
    discountPct: 31,
    price: 3699,
    mrp: 5390,
    deliveryDate: 'Friday, November 13',
    freeDelivery: true,
    image: 'https://images.unsplash.com/photo-1618941716939-553df3c6c278?auto=format&fit=crop&w=400&q=80'
  }
];

// Combine all 10+ products across all pods into master product catalog
const allPodProducts = [
  ...DEALS_ROW_1.flatMap(p => p.allItems || []),
  ...DEALS_ROW_2.flatMap(p => p.allItems || []),
  ...DEALS_ROW_3.flatMap(p => p.allItems || []),
  ...DEALS_ROW_4.flatMap(p => p.allItems || []),
  ...DEALS_ROW_5.flatMap(p => p.allItems || []),
  ...DEALS_ROW_6.flatMap(p => p.allItems || []),
  ...DEALS_ROW_7.flatMap(p => p.allItems || []),
  ...DEALS_ROW_8.flatMap(p => p.allItems || []),
  ...FESTIVE_HERO_SLIDES.flatMap(s => s.products || []),
  ...BROWSING_HISTORY_PRODUCTS.map(p => ({
    ...p,
    shopId: 'shop-2',
    category: 'electronics',
    stock: 20,
    description: `${p.name} - Certified authentic product with Great Indian Festival deals.`,
    highlights: ['100% Genuine Brand Guarantee', 'Fast Free Delivery', '7 Days Replacement Policy', 'Standard Brand Warranty']
  }))
];

// De-duplicate master catalog
const uniqueProductMap = new Map();
allPodProducts.forEach(p => {
  if (!uniqueProductMap.has(p.id)) {
    uniqueProductMap.set(p.id, {
      ...p,
      shopId: 'shop-2',
      category: p.category || 'electronics',
      department: p.category || 'electronics'
    });
  }
});

export const ALL_ELECTRONICS_PRODUCTS = Array.from(uniqueProductMap.values());
