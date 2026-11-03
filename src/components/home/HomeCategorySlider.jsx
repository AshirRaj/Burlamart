import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShoppingBag, 
  Hotel, 
  Smartphone, 
  Cookie, 
  Shirt, 
  Sparkles, 
  Crosshair, 
  BookOpen, 
  Gamepad2, 
  Briefcase,
  ArrowRight
} from 'lucide-react';

export const HomeCategorySlider = () => {
  const scrollRef = useRef(null);

  const categories = [
    {
      id: 'grocery',
      name: 'Groceries & Staples',
      badge: '10 Mins Delivery',
      itemCount: '2,500+ Items',
      desc: 'Farm-fresh veggies, dairy & daily kitchen staples',
      link: '/category/grocery',
      gradient: 'from-emerald-700 via-emerald-800 to-teal-950',
      accentColor: 'text-emerald-300',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
      icon: ShoppingBag
    },
    {
      id: 'hotels-services',
      name: 'Hotels & Odisha Stays',
      badge: 'Sambalpur & Burla',
      itemCount: 'All 30 Districts',
      desc: 'Sambalpur, Burla, Puri, Bhubaneswar verified stays',
      link: '/category/hotels-services',
      gradient: 'from-teal-700 via-teal-800 to-emerald-950',
      accentColor: 'text-teal-300',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
      icon: Hotel
    },
    {
      id: 'electronics',
      name: 'Electronics & Mobiles',
      badge: 'No-Cost EMI',
      itemCount: '380+ Deals',
      desc: 'Smartphones, wearables, festival deals with warranty',
      link: '/category/electronics',
      gradient: 'from-blue-700 via-indigo-800 to-slate-950',
      accentColor: 'text-blue-300',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
      icon: Smartphone
    },
    {
      id: 'packaged-food',
      name: 'Packaged Food & Combos',
      badge: 'BxGy Combos',
      itemCount: '450+ Snacks',
      desc: 'Gourmet snacks, cookies, ready-to-eat instant meals',
      link: '/category/packaged-food',
      gradient: 'from-amber-600 via-orange-700 to-rose-950',
      accentColor: 'text-amber-300',
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=400&q=80',
      icon: Cookie
    },
    {
      id: 'beauty',
      name: 'Skincare, Grooming & Beauty',
      badge: 'Derm-Approved',
      itemCount: '320+ Brands',
      desc: 'Facewashes, serums, body grooming & perfumes',
      link: '/category/electronics?category=beauty',
      gradient: 'from-purple-700 via-violet-800 to-indigo-950',
      accentColor: 'text-purple-300',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
      icon: Sparkles
    },
    {
      id: 'toys',
      name: "Kids' Toys & RC Cars",
      badge: 'Starting ₹99',
      itemCount: '180+ Toys',
      desc: 'Remote control cars, plushies, educational toys & books',
      link: '/category/electronics?category=toys',
      gradient: 'from-amber-700 via-yellow-800 to-stone-950',
      accentColor: 'text-yellow-300',
      image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=400&q=80',
      icon: Gamepad2
    },
    {
      id: 'business',
      name: 'Amazon Business B2B',
      badge: 'Up to 18% GST',
      itemCount: 'Bulk Supplies',
      desc: 'Wholesale office furniture, security & commercial supplies',
      link: '/category/electronics?category=business',
      gradient: 'from-slate-700 via-zinc-800 to-gray-950',
      accentColor: 'text-gray-300',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80',
      icon: Briefcase
    }
  ];

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Slider Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span>Explore All Categories</span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              Slider View
            </span>
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Swipe or use arrows to discover tailored layouts for groceries, hotel stays, electronics and food
          </p>
        </div>

        {/* Scroll Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleScrollLeft}
            className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 border border-gray-200 shadow-xs flex items-center justify-center text-gray-700 transition cursor-pointer"
            aria-label="Previous Categories"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleScrollRight}
            className="w-9 h-9 rounded-full bg-[#1B4332] hover:bg-[#2D6A4F] text-white shadow-xs flex items-center justify-center transition cursor-pointer"
            aria-label="Next Categories"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Categories Slider Container */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1"
      >
        {categories.map((cat) => {
          const IconComp = cat.icon;
          return (
            <Link
              key={cat.id}
              to={cat.link}
              className={`min-w-[260px] sm:min-w-[280px] max-w-[280px] rounded-3xl p-5 bg-gradient-to-br ${cat.gradient} text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between group flex-shrink-0 border border-white/10`}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md p-2 flex items-center justify-center border border-white/20 group-hover:scale-110 transition">
                    <IconComp className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md text-white px-2.5 py-1 rounded-full">
                    {cat.badge}
                  </span>
                </div>

                <div className="w-full h-28 rounded-2xl overflow-hidden mb-3 bg-black/20 relative shadow-inner">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
                    {cat.itemCount}
                  </span>
                </div>

                <h3 className="font-black text-base text-white group-hover:text-amber-300 transition leading-snug">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-gray-200 mt-1 leading-snug line-clamp-2">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-extrabold text-white group-hover:text-amber-300">
                <span>Browse Store</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

