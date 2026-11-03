// Comprehensive Odisha-Focused Data for Hotels & Services (OYO-style experience)

export const ALL_ODISHA_CITIES = [
  { id: 'sambalpur', name: 'Sambalpur', district: 'Sambalpur', zone: 'Western Odisha', staysCount: 1240, badge: 'Main Hub', tag: 'Maa Samaleswari Temple, Hirakud Dam, IIM' },
  { id: 'burla', name: 'Burla', district: 'Sambalpur', zone: 'Western Odisha', staysCount: 380, badge: 'VSSUT & Dam', tag: 'VSSUT, VIMSAR, Sambalpur University, Hirakud Hydro' },
  { id: 'hirakud', name: 'Hirakud', district: 'Sambalpur', zone: 'Western Odisha', staysCount: 290, badge: 'Lake & Dam', tag: "Asia's Longest Earthen Dam, Reservoir, Water Island" },
  { id: 'bhubaneswar', name: 'Bhubaneswar', district: 'Khordha', zone: 'Coastal Odisha', staysCount: 1850, badge: 'Smart Capital', tag: 'State Capital, IT Hub, Lingaraj Temple, Airport' },
  { id: 'cuttack', name: 'Cuttack', district: 'Cuttack', zone: 'Coastal Odisha', staysCount: 780, badge: 'Silver City', tag: 'Millennium City, Barabati Fort, Mahanadi Riverfront' },
  { id: 'puri', name: 'Puri', district: 'Puri', zone: 'Coastal Odisha', staysCount: 1650, badge: 'Jagannath Dham', tag: 'Shree Jagannath Temple, Swargadwar Golden Beach' },
  { id: 'rourkela', name: 'Rourkela', district: 'Sundargarh', zone: 'Northern Odisha', staysCount: 680, badge: 'Steel City', tag: 'Smart City, NIT Rourkela, Birsa Munda Stadium' },
  { id: 'berhampur', name: 'Berhampur', district: 'Ganjam', zone: 'Southern Odisha', staysCount: 510, badge: 'Silk City', tag: 'Silk Weaving Hub, Gateway to Gopalpur Beach' },
  { id: 'jharsuguda', name: 'Jharsuguda', district: 'Jharsuguda', zone: 'Western Odisha', staysCount: 420, badge: 'Airport Hub', tag: 'Veer Surendra Sai Airport, Industrial Corridor' },
  { id: 'bargarh', name: 'Bargarh', district: 'Bargarh', zone: 'Western Odisha', staysCount: 310, badge: 'Handloom', tag: 'Open-Air Theatre Dhanu Jatra, Sambalpuri Saree Hub' },
  { id: 'balasore', name: 'Balasore', district: 'Balasore', zone: 'Northern Odisha', staysCount: 390, badge: 'Missile City', tag: 'Chandipur Sea Beach, DRDO Test Range, Emami Jagannath' },
  { id: 'balangir', name: 'Balangir', district: 'Balangir', zone: 'Western Odisha', staysCount: 270, badge: 'Heritage', tag: 'Rajendra University, Harishankar Waterfalls' },
  { id: 'angul', name: 'Angul', district: 'Angul', zone: 'Central Odisha', staysCount: 280, badge: 'Energy Hub', tag: 'Jindal Steel, NALCO, Satkosia Tiger Gorge' },
  { id: 'koraput', name: 'Koraput', district: 'Koraput', zone: 'Southern Odisha', staysCount: 340, badge: 'Hill Station', tag: 'Deomali Peak, Valley of Odisha, Organic Coffee' },
  { id: 'baripada', name: 'Baripada', district: 'Mayurbhanj', zone: 'Northern Odisha', staysCount: 290, badge: 'Similipal', tag: 'Similipal Tiger Reserve, Barehipani Falls, Palace' },
  { id: 'konark', name: 'Konark', district: 'Puri', zone: 'Coastal Odisha', staysCount: 410, badge: 'Sun Temple', tag: 'UNESCO World Heritage Sun Temple, Chandrabhaga' },
  { id: 'dhenkanal', name: 'Dhenkanal', district: 'Dhenkanal', zone: 'Central Odisha', staysCount: 210, badge: 'Spiritual', tag: 'Kapilash Mountain Temple, Joranda Mahima Gadi' },
  { id: 'keonjhar', name: 'Keonjhar', district: 'Keonjhar', zone: 'Northern Odisha', staysCount: 230, badge: 'Waterfalls', tag: 'Sanaghagara, Badaghagara, Gonasika Guptaganga' },
  { id: 'jajpur', name: 'Jajpur', district: 'Jajpur', zone: 'Central Odisha', staysCount: 320, badge: 'Biraja Kshetra', tag: 'Maa Biraja Shakti Peetha, Kalinganagar Steel Hub' },
  { id: 'bhawanipatna', name: 'Bhawanipatna', district: 'Kalahandi', zone: 'Western Odisha', staysCount: 190, badge: 'Kalahandi', tag: 'Maa Manikeswari Temple, Phurlijharan Waterfalls' },
  { id: 'rayagada', name: 'Rayagada', district: 'Rayagada', zone: 'Southern Odisha', staysCount: 180, badge: 'Scenic', tag: 'Maa Majhighariani Temple, Hanging Bridge' },
  { id: 'paradip', name: 'Paradip', district: 'Jagatsinghpur', zone: 'Coastal Odisha', staysCount: 260, badge: 'Sea Port', tag: 'Major International Seaport, Marine Aquarium' },
  { id: 'kendrapara', name: 'Kendrapara', district: 'Kendrapara', zone: 'Coastal Odisha', staysCount: 190, badge: 'Bhitarkanika', tag: 'Bhitarkanika National Park, Saltwater Crocodiles' },
  { id: 'bhadrak', name: 'Bhadrak', district: 'Bhadrak', zone: 'Northern Odisha', staysCount: 210, badge: 'Heritage', tag: 'Maa Bhadrakali Temple, Dhamra Port' },
  { id: 'sundargarh', name: 'Sundargarh', district: 'Sundargarh', zone: 'Northern Odisha', staysCount: 170, badge: 'Sports', tag: 'Khandadhar Waterfalls, Hockey Heartland' },
  { id: 'nuapada', name: 'Nuapada', district: 'Nuapada', zone: 'Western Odisha', staysCount: 130, badge: 'Western Gates', tag: 'Patora Dam, Sunabeda Wildlife Sanctuary' },
  { id: 'sonepur', name: 'Sonepur', district: 'Subarnapur', zone: 'Western Odisha', staysCount: 140, badge: 'Second Varanasi', tag: 'Subarnapur Temple Town, Sureswari Temple' },
  { id: 'nabarangpur', name: 'Nabarangpur', district: 'Nabarangpur', zone: 'Southern Odisha', staysCount: 120, badge: 'Plateau', tag: 'Maa Bhandargharani, Chandan Dhara Falls' },
  { id: 'malkangiri', name: 'Malkangiri', district: 'Malkangiri', zone: 'Southern Odisha', staysCount: 110, badge: 'Nature', tag: 'Balimela Reservoir, Satiguda Dam' },
  { id: 'paralakhemundi', name: 'Paralakhemundi', district: 'Gajapati', zone: 'Southern Odisha', staysCount: 130, badge: 'Royal', tag: 'Gajapati Palace, Gandahati Waterfall' },
  { id: 'daringbadi', name: 'Daringbadi', district: 'Kandhamal', zone: 'Central Odisha', staysCount: 240, badge: 'Kashmir of Odisha', tag: 'Pine Forests, Coffee Gardens, Winter Frost' },
  { id: 'deogarh', name: 'Deogarh', district: 'Deogarh', zone: 'Western Odisha', staysCount: 110, badge: 'Waterfalls', tag: 'Pradhanpat Waterfalls, Royal Palace' },
  { id: 'boudh', name: 'Boudh', district: 'Boudh', zone: 'Central Odisha', staysCount: 120, badge: 'Buddhist', tag: 'Mahanadi Ghats, Ancient Star-shaped Temples' },
  { id: 'nayagarh', name: 'Nayagarh', district: 'Nayagarh', zone: 'Central Odisha', staysCount: 160, badge: 'Chhena Poda', tag: 'Kantilo Nilamadhaba, Birthplace of Chhena Poda' }
];

export const ODISHA_CITIES_BY_TAB = {
  sambalpur: [
    {
      id: 'sambalpur',
      name: 'Sambalpur',
      district: 'Sambalpur',
      state: 'Odisha',
      tag: 'Maa Samaleswari & Hirakud Dam',
      staysCount: 1240,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      badge: 'Burlamart Main Hub'
    },
    {
      id: 'burla',
      name: 'Burla',
      district: 'Sambalpur',
      state: 'Odisha',
      tag: 'VSSUT Campus & Dam Powerhouse',
      staysCount: 380,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      badge: 'VSSUT & Dam'
    },
    {
      id: 'hirakud',
      name: 'Hirakud',
      district: 'Sambalpur',
      state: 'Odisha',
      tag: "Asia's Longest Earthen Dam & Reservoir",
      staysCount: 290,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      badge: 'Lake & Dam'
    },
    {
      id: 'jharsuguda',
      name: 'Jharsuguda',
      district: 'Jharsuguda',
      state: 'Odisha',
      tag: 'Veer Surendra Sai Airport & Power Hub',
      staysCount: 420,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      badge: 'Airport City'
    },
    {
      id: 'bargarh',
      name: 'Bargarh',
      district: 'Bargarh',
      state: 'Odisha',
      tag: 'World Famous Dhanu Jatra & Ikat Sarees',
      staysCount: 310,
      image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80',
      badge: 'Handloom Capital'
    },
    {
      id: 'balangir',
      name: 'Balangir',
      district: 'Balangir',
      state: 'Odisha',
      tag: 'Harishankar Falls & Royal Heritage',
      staysCount: 270,
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
      badge: 'Western Heritage'
    }
  ],
  smart_cities: [
    {
      id: 'bhubaneswar',
      name: 'Bhubaneswar',
      district: 'Khordha',
      state: 'Odisha',
      tag: 'Smart Capital, IT Corridors & Temples',
      staysCount: 1850,
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
      badge: 'State Capital'
    },
    {
      id: 'cuttack',
      name: 'Cuttack',
      district: 'Cuttack',
      state: 'Odisha',
      tag: 'Millennium Silver City & Barabati Fort',
      staysCount: 780,
      image: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=80',
      badge: 'Silver City'
    },
    {
      id: 'rourkela',
      name: 'Rourkela',
      district: 'Sundargarh',
      state: 'Odisha',
      tag: 'Smart City, NIT & Birsa Munda Hockey Stadium',
      staysCount: 680,
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
      badge: 'Smart Steel Hub'
    },
    {
      id: 'berhampur',
      name: 'Berhampur',
      district: 'Ganjam',
      state: 'Odisha',
      tag: 'Silk City & Gateway to Gopalpur Sea Beach',
      staysCount: 510,
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
      badge: 'Commercial Hub'
    },
    {
      id: 'balasore',
      name: 'Balasore',
      district: 'Balasore',
      state: 'Odisha',
      tag: 'Chandipur Vanishing Beach & Defense Hub',
      staysCount: 390,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      badge: 'Coast & Defense'
    },
    {
      id: 'sambalpur',
      name: 'Sambalpur',
      district: 'Sambalpur',
      state: 'Odisha',
      tag: 'Western Smart City & Higher Education',
      staysCount: 1240,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      badge: 'Western Capital'
    }
  ],
  heritage: [
    {
      id: 'puri',
      name: 'Puri',
      district: 'Puri',
      state: 'Odisha',
      tag: 'Shree Jagannath Dham & Golden Sea Beach',
      staysCount: 1650,
      image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
      badge: 'Holy Dham'
    },
    {
      id: 'sambalpur',
      name: 'Sambalpur',
      district: 'Sambalpur',
      state: 'Odisha',
      tag: 'Maa Samaleswari Shrine & Huma Leaning Temple',
      staysCount: 1240,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      badge: 'Samaleswari Khetra'
    },
    {
      id: 'konark',
      name: 'Konark',
      district: 'Puri',
      state: 'Odisha',
      tag: 'UNESCO World Heritage Sun Temple & Beach',
      staysCount: 410,
      image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80',
      badge: 'Black Pagoda'
    },
    {
      id: 'jajpur',
      name: 'Jajpur',
      district: 'Jajpur',
      state: 'Odisha',
      tag: 'Maa Biraja Shakti Peetha & Kalinga History',
      staysCount: 320,
      image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=800&q=80',
      badge: 'Shakti Peetha'
    },
    {
      id: 'dhenkanal',
      name: 'Dhenkanal',
      district: 'Dhenkanal',
      state: 'Odisha',
      tag: 'Kapilash Hill Temple & Joranda Gadi',
      staysCount: 210,
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      badge: 'Spiritual Center'
    },
    {
      id: 'bhubaneswar',
      name: 'Bhubaneswar',
      district: 'Khordha',
      state: 'Odisha',
      tag: '500+ Ancient Temples, Udayagiri Caves',
      staysCount: 1850,
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
      badge: 'Temple City'
    }
  ],
  nature: [
    {
      id: 'hirakud-debrigarh',
      name: 'Sambalpur (Hirakud & Debrigarh)',
      district: 'Sambalpur',
      state: 'Odisha',
      tag: 'Hirakud Reservoir & Debrigarh Wildlife Safari',
      staysCount: 580,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      badge: 'Eco Safari'
    },
    {
      id: 'koraput',
      name: 'Koraput (Deomali)',
      district: 'Koraput',
      state: 'Odisha',
      tag: 'Deomali Peak, Coffee Estates & Valleys',
      staysCount: 340,
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
      badge: 'Highest Peak'
    },
    {
      id: 'chilika',
      name: 'Chilika Lake',
      district: 'Puri / Khordha / Ganjam',
      state: 'Odisha',
      tag: 'Asia Largest Lagoon & Irrawaddy Dolphins',
      staysCount: 620,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      badge: 'Ramsar Wetland'
    },
    {
      id: 'daringbadi',
      name: 'Daringbadi (Kandhamal)',
      district: 'Kandhamal',
      state: 'Odisha',
      tag: 'Kashmir of Odisha, Pine Forests & Waterfalls',
      staysCount: 240,
      image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
      badge: 'Kashmir of Odisha'
    },
    {
      id: 'mayurbhanj',
      name: 'Baripada (Similipal)',
      district: 'Mayurbhanj',
      state: 'Odisha',
      tag: 'Similipal Tiger Reserve & Joranda Falls',
      staysCount: 290,
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      badge: 'Tiger Reserve'
    },
    {
      id: 'gopalpur',
      name: 'Gopalpur-on-Sea',
      district: 'Ganjam',
      state: 'Odisha',
      tag: 'Serene Coastal Breeze & Historic Lighthouse',
      staysCount: 380,
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
      badge: 'Beach Resort'
    }
  ]
};

// Aliases for compatibility
export const INDIAN_CITIES_BY_TAB = ODISHA_CITIES_BY_TAB;

export const HOTEL_AMENITIES_LIST = [
  {
    id: 'wifi',
    name: 'Free High-Speed Wi-Fi',
    desc: 'Optical fiber connectivity in all rooms and lobbies',
    icon3d: '📶',
    bgGradient: 'from-amber-50 to-orange-50 border-orange-200'
  },
  {
    id: 'ac',
    name: 'Climate Controlled AC',
    desc: 'Quiet inverter air-conditioning in all rooms',
    icon3d: '❄️',
    bgGradient: 'from-cyan-50 to-blue-50 border-blue-200'
  },
  {
    id: 'clean',
    name: 'Deep Cleaned & Sanitized',
    desc: 'Fresh washed linens, spotless bath & daily housekeeping',
    icon3d: '🛏️',
    bgGradient: 'from-emerald-50 to-teal-50 border-emerald-200'
  },
  {
    id: 'toiletries',
    name: 'Essential Toiletries Kit',
    desc: 'Premium herbal kits, dental kit & 24hr hot water geyser',
    icon3d: '🧴',
    bgGradient: 'from-purple-50 to-pink-50 border-purple-200'
  },
  {
    id: 'staff',
    name: '24/7 Front Desk Staff',
    desc: 'Bilingual Odia/Hindi/English concierge & travel assistance',
    icon3d: '👨‍💼',
    bgGradient: 'from-rose-50 to-red-50 border-rose-200'
  }
];

export const HOTEL_VIDEO_TOURS = [
  {
    id: 'tour-1',
    productId: 'prod-h-1',
    hotelName: 'Burlamart Townhouse Elite - Deluxe King',
    city: 'Sambalpur',
    district: 'Sambalpur',
    location: 'Near Maa Samaleswari Temple, Sambalpur, Odisha',
    price: 1499,
    mrp: 2800,
    rating: 4.8,
    reviews: 240,
    tag: 'Sambalpur Top Rated',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hotel-room-with-a-view-of-the-city-43183-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80',
    highlights: ['King Bed', 'Samaleswari Temple View', 'Complimentary Breakfast', 'Free Wi-Fi']
  },
  {
    id: 'tour-2',
    productId: 'prod-h-2',
    hotelName: 'The Grand Siba Residency & Suites',
    city: 'Burla',
    district: 'Sambalpur',
    location: 'Near VSSUT Campus & VIMSAR, Burla, Sambalpur, Odisha',
    price: 1299,
    mrp: 2400,
    rating: 4.9,
    reviews: 182,
    tag: 'Burla Best Seller',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-hotel-room-interior-32863-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    highlights: ['Ergonomic Desk', '200 Mbps Fiber', 'Near VSSUT', 'Late Checkout']
  },
  {
    id: 'tour-3',
    productId: 'prod-h-3',
    hotelName: 'Hirakud Lakeside Luxury Eco-Resort',
    city: 'Sambalpur',
    district: 'Sambalpur',
    location: 'Hirakud Dam Road, Sambalpur, Odisha',
    price: 2299,
    mrp: 3800,
    rating: 4.95,
    reviews: 310,
    tag: 'Hirakud Dam View',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-corridor-of-a-classic-luxury-hotel-43224-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    highlights: ['Lakeside Balcony', 'Dam Panoramas', 'Authentic Odia Thali', 'Boat Safari Desk']
  },
  {
    id: 'tour-4',
    productId: 'prod-h-4',
    hotelName: 'Mayfair Waves Sea Beachfront Suite',
    city: 'Puri',
    district: 'Puri',
    location: 'Swargadwar Beach Road, Puri, Odisha',
    price: 3199,
    mrp: 5200,
    rating: 4.9,
    reviews: 420,
    tag: 'Puri Beachfront',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hotel-room-with-a-view-of-the-city-43183-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
    highlights: ['Direct Sea View', 'AC', 'Swimming Pool', 'Temple Darshan Desk']
  }
];

export const HOTEL_NEWS_ARTICLES = [
  {
    id: 'news-1',
    title: 'Top 7 Weekend Getaways From Sambalpur & Burla Across Western Odisha',
    summary: 'Discover Hirakud reservoir eco-camps, Debrigarh wildlife safaris, and Pradhanpat waterfalls with instant Burlamart verified stays.',
    category: 'Travel Guide',
    date: '3 Nov 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    link: '#articles'
  },
  {
    id: 'news-2',
    title: 'How Burlamart Wizard Membership Saves Odisha Travelers Up to 25%',
    summary: 'Unlock instant 10% cash discounts, priority customer support, and earn free night stays across Sambalpur, Bhubaneswar, and Puri.',
    category: 'Membership Perks',
    date: '28 Oct 2026',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    link: 'https://www.oyorooms.com/wizard/renew/'
  },
  {
    id: 'news-3',
    title: 'VSSUT & Educational Stays in Burla: Safe, Verified Rooms with High-Speed Fiber',
    summary: 'Visiting students, parents, and researchers can now book verified sanitized rooms near VSSUT and VIMSAR with zero advance payment.',
    category: 'Burla Guides',
    date: '20 Oct 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    link: '#articles'
  }
];

export const HOTEL_FAQS = [
  {
    q: 'Can I book hotels in Sambalpur and Burla with "Pay at Hotel"?',
    a: 'Yes! All Burlamart partner hotels in Sambalpur, Burla, Hirakud, and across Odisha offer "Pay at Hotel on Arrival". You can reserve with zero advance payment and pay upon check-in via UPI, Cards, or Cash.'
  },
  {
    q: 'How close are the Burla hotels to VSSUT Campus and Hirakud Dam?',
    a: 'Our partner hotels in Burla are within 500 meters to 1.5 km of VSSUT, VIMSAR, and Sambalpur University, with direct autos and cabs to Hirakud Dam (3 km).'
  },
  {
    q: 'What are standard check-in and check-out times?',
    a: 'Standard check-in across Burlamart partner stays is 12:00 PM and check-out is 11:00 AM. Early check-in can be requested directly or through your Wizard membership.'
  },
  {
    q: 'What ID documents are accepted for check-in in Odisha?',
    a: 'Any government-approved photo ID such as Aadhaar Card, Driving License, Voter ID, or Passport is accepted. Both local residents and travelers from outside the state are welcomed with valid ID.'
  },
  {
    q: 'How does the Burlamart Wizard Membership work for Odisha stays?',
    a: 'Wizard members get an instant additional 10% discount on participating hotels across all 30 districts of Odisha, along with free room upgrades and 24/7 dedicated local customer care.'
  }
];
