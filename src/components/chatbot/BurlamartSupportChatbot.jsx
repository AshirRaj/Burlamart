import React, { useState } from 'react';
import { 
  MessageCircle, 
  X, 
  ChevronDown, 
  RotateCcw, 
  Send, 
  PhoneCall, 
  CheckCircle, 
  Sparkles, 
  ShoppingBag, 
  Hotel, 
  Smartphone, 
  Cookie, 
  Truck, 
  CreditCard, 
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  User,
  Phone
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

// Predefined Categories & Q&A Database
const CHATBOT_CATEGORIES = [
  {
    id: 'grocery',
    name: 'Grocery & Staples',
    icon: ShoppingBag,
    color: 'text-emerald-700 bg-emerald-100',
    questions: [
      {
        q: 'How does 10-minute grocery delivery work?',
        a: 'Burlamart operates micro-fulfillment dark stores and partners with top neighborhood marts within 2 km of your location. Once your order is placed, it is packed in 2 minutes and dispatched via dedicated riders to guarantee delivery in 10-12 minutes.'
      },
      {
        q: 'What if an item is missing, damaged or spoiled?',
        a: 'We have a Zero-Questions-Asked refund policy. Simply go to Account > Orders, select your order and click "Report Issue". A replacement will be sent in 10 minutes or an instant refund will be credited to your Burlamart Wallet / original payment source.'
      },
      {
        q: 'How do I apply coupon codes and BxGy discounts?',
        a: 'During checkout, view the "Available Coupons" section or enter your promo code in the voucher box. BxGy (Buy X Get Y) discounts are automatically calculated and deducted in your cart summary.'
      },
      {
        q: 'Can I schedule my grocery delivery for a specific time?',
        a: 'Yes! On the checkout page, choose between "Instant 10-Min Delivery" or "Schedule for Later" and pick your preferred 1-hour slot between 7:00 AM and 11:00 PM.'
      }
    ]
  },
  {
    id: 'hotel',
    name: 'Hotels & Serviced Stays',
    icon: Hotel,
    color: 'text-teal-700 bg-teal-100',
    questions: [
      {
        q: 'What are standard hotel check-in and check-out timings?',
        a: 'Standard check-in starts at 12:00 PM and check-out is at 11:00 AM. Many Burlamart partner hotels offer early check-in (from 10:00 AM) upon selecting your expected arrival slot on the room details page.'
      },
      {
        q: 'Can I cancel or reschedule my stay reservation?',
        a: 'Yes, 100% free cancellation is available up to 24 hours prior to check-in. Go to Account > Bookings to cancel with zero penalty or modify your stay dates.'
      },
      {
        q: 'How does pricing for extra guests & rooms work?',
        a: 'Each room comfortably accommodates up to 2 adults and 1 child. Extra adults are charged a nominal fee of ₹500/night with an additional rollaway bed. Pricing updates dynamically as you adjust adults and rooms.'
      },
      {
        q: 'Is government ID proof mandatory at check-in?',
        a: 'Yes, government-issued photo ID (Aadhaar Card, Passport, Voter ID, or Driving License) is mandatory for all adult guests checking into hotels per regulatory guidelines.'
      }
    ]
  },
  {
    id: 'electronics',
    name: 'Electronics, Mobiles & EMI',
    icon: Smartphone,
    color: 'text-blue-700 bg-blue-100',
    questions: [
      {
        q: 'How does No-Cost EMI work on Burlamart?',
        a: 'On products priced above ₹1,500, you can select No-Cost EMI across major banks (HDFC, ICICI, SBI, Axis). The interest charged by the bank is given as an upfront instant festival discount, so you only pay the exact product price divided across monthly tenures.'
      },
      {
        q: 'What is the return and replacement policy for gadgets?',
        a: 'All electronics items come with a 7-day hassle-free replacement guarantee for technical faults or transit defects, plus the official 1-year brand warranty card included in the box.'
      },
      {
        q: 'Can I compare two or three products side-by-side?',
        a: 'Yes! Click the "Add to Compare" checkbox on any electronics deal card. A floating compare dock will appear at the bottom where you can view full technical specifications, prices, and warranties side-by-side.'
      },
      {
        q: 'How do I track courier dispatch and delivery?',
        a: 'Once your order is confirmed, you will receive real-time SMS & email notifications with live GPS tracking from our dispatch hub straight to your doorstep.'
      }
    ]
  },
  {
    id: 'packaged-food',
    name: 'Packaged Food & Gourmet Combos',
    icon: Cookie,
    color: 'text-amber-700 bg-amber-100',
    questions: [
      {
        q: 'How do BxGy combos and bundle discounts work?',
        a: 'Our smart combos bundle popular snacks and beverages at up to 35% discount. Simply add 2 qualifying combo items from our Packaged Food section and your free bonus item is automatically added to cart.'
      },
      {
        q: 'Are all snacks fresh and FSSAI quality certified?',
        a: 'Every food item listed is 100% authentic, FSSAI certified, and sourced directly from brand manufacturing partners with minimum 6 months shelf life remaining.'
      },
      {
        q: 'Can I place bulk orders for offices or festive parties?',
        a: 'Yes! For orders above ₹2,000, enjoy automatic bulk corporate discounts and GST tax credit invoices under our Amazon Business & B2B tab.'
      }
    ]
  },
  {
    id: 'delivery',
    name: 'Order Delivery & Rider Tracking',
    icon: Truck,
    color: 'text-orange-700 bg-orange-100',
    questions: [
      {
        q: 'My live order rider is not moving on the map',
        a: 'Rider GPS updates every 15-30 seconds. In high-traffic intersections or monsoons, minor delay can happen. You can call your assigned rider directly via the phone icon on the Order Tracking page.'
      },
      {
        q: 'Can I change my delivery address after placing an order?',
        a: 'If your order has not left the store yet (within 2 minutes of placement), click "Change Address" in the Order Tracking view. If already in transit, please contact support below.'
      },
      {
        q: 'What are Burlamart delivery charges?',
        a: 'Orders above ₹199 enjoy 100% Free Lightning Delivery! For orders under ₹199, a nominal delivery fee of ₹15 is applied.'
      }
    ]
  },
  {
    id: 'payments',
    name: 'Payments, Refunds & Wallet',
    icon: CreditCard,
    color: 'text-purple-700 bg-purple-100',
    questions: [
      {
        q: 'My payment was deducted but order status is pending',
        a: 'Bank servers occasionally take 2-3 minutes to confirm UPI/card transactions. If an order fails, the amount is automatically auto-refunded by your bank within 2 to 4 business hours.'
      },
      {
        q: 'How long does a cancelled order refund take?',
        a: 'Refunds to Burlamart Wallet are instant (0 seconds). Refunds to UPI, Debit/Credit Card, or Netbanking take 1 to 2 business days depending on your bank.'
      },
      {
        q: 'What payment modes are accepted?',
        a: 'We accept Google Pay, PhonePe, Paytm, BHIM UPI, Credit/Debit Cards (Visa, Mastercard, RuPay), Netbanking, and Cash on Delivery (COD).'
      }
    ]
  }
];

export const BurlamartSupportChatbot = () => {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const hasCartItems = cartItems && cartItems.length > 0;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [feedbackGiven, setFeedbackGiven] = useState(null); // 'helpful' | 'need_human'
  const [isCallbackFormOpen, setIsCallbackFormOpen] = useState(false);
  const [callbackName, setCallbackName] = useState(user?.name || '');
  const [callbackPhone, setCallbackPhone] = useState(user?.phone || '');
  const [callbackNote, setCallbackNote] = useState('');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleReset = () => {
    setSelectedCategory(null);
    setSelectedQuestion(null);
    setFeedbackGiven(null);
    setIsCallbackFormOpen(false);
    setCallbackSubmitted(false);
  };

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setSelectedQuestion(null);
    setFeedbackGiven(null);
    setIsCallbackFormOpen(false);
  };

  const handleSelectQuestion = (qObj) => {
    setSelectedQuestion(qObj);
    setFeedbackGiven(null);
  };

  const handleFeedback = (type) => {
    setFeedbackGiven(type);
    if (type === 'need_human') {
      setIsCallbackFormOpen(true);
    }
  };

  const handleSubmitCallback = (e) => {
    e.preventDefault();
    if (!callbackPhone || callbackPhone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    const generatedTicket = `BURLA-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedTicket);
    setCallbackSubmitted(true);
  };

  return (
    <div className={`fixed ${hasCartItems ? 'bottom-[148px] sm:bottom-5' : 'bottom-[76px] sm:bottom-5'} right-4 sm:right-5 z-50 flex flex-col items-end transition-all duration-300`}>
      {/* 1. Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[400px] h-[520px] max-h-[75vh] sm:max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col mb-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1B4332] via-[#2D6A4F] to-[#1B4332] text-white p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#1B4332] rounded-full"></span>
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <span>Burlamart Smart Assistant</span>
                </h3>
                <p className="text-[11px] text-emerald-200 font-medium">
                  Online 24/7 • Instant Problem Resolution
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleReset}
                title="Restart Chat"
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs bg-[#f8faf9]">
            {/* Initial Welcome Message */}
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#1B4332] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                B
              </div>
              <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-gray-100 shadow-2xs text-gray-800 space-y-1.5 max-w-[85%]">
                <p className="font-semibold leading-relaxed">
                  Hello{user?.name ? ` ${user.name}` : ''}! 👋 How can we help you today?
                </p>
                <p className="text-gray-500 text-[11px]">
                  Please select the category where you are experiencing an issue:
                </p>
              </div>
            </div>

            {/* STEP 1: Category Selection Grid */}
            {!selectedCategory && (
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block px-1">
                  Select a category:
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {CHATBOT_CATEGORIES.map((cat) => {
                    const IconComp = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleSelectCategory(cat)}
                        className="p-2.5 bg-white hover:bg-emerald-50/70 border border-gray-200 hover:border-emerald-300 rounded-2xl flex items-center justify-between text-left transition group shadow-2xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${cat.color}`}>
                            <IconComp className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-gray-900 group-hover:text-emerald-900">
                            {cat.name}
                          </span>
                        </div>
                        <span className="text-gray-400 group-hover:text-emerald-700 text-xs font-bold">›</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* User Selected Category Bubble */}
            {selectedCategory && (
              <div className="flex justify-end">
                <div className="bg-[#1B4332] text-white p-2.5 px-3.5 rounded-2xl rounded-tr-none font-bold text-xs shadow-2xs">
                  Category: {selectedCategory.name}
                </div>
              </div>
            )}

            {/* STEP 2: Predefined Questions */}
            {selectedCategory && !selectedQuestion && (
              <div className="space-y-2 pt-1 animate-in fade-in duration-200">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#1B4332] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    B
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-2xs text-gray-800">
                    <p className="font-semibold text-xs">
                      What is your specific question regarding <strong className="text-emerald-800">{selectedCategory.name}</strong>?
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pl-9">
                  {selectedCategory.questions.map((qObj, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectQuestion(qObj)}
                      className="w-full text-left p-2.5 bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 rounded-xl font-medium text-gray-800 text-xs transition shadow-2xs leading-snug"
                    >
                      {qObj.q}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedQuestion({ q: 'Other issue not listed above', a: 'Please request a callback below and our support team will reach you directly.' });
                      setIsCallbackFormOpen(true);
                    }}
                    className="w-full text-left p-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl font-bold text-amber-900 text-xs transition flex items-center justify-between"
                  >
                    <span>My issue is not listed here ›</span>
                    <PhoneCall className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* User Selected Question Bubble */}
            {selectedQuestion && (
              <div className="flex justify-end">
                <div className="bg-[#1B4332] text-white p-2.5 px-3.5 rounded-2xl rounded-tr-none font-bold text-xs shadow-2xs max-w-[85%] text-right leading-snug">
                  {selectedQuestion.q}
                </div>
              </div>
            )}

            {/* STEP 3: Automated Verified Answer */}
            {selectedQuestion && (
              <div className="space-y-3 pt-1 animate-in fade-in duration-200">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#1B4332] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    B
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-emerald-200 shadow-xs text-gray-800 space-y-2 max-w-[90%]">
                    <p className="font-semibold text-xs leading-relaxed text-gray-900">
                      {selectedQuestion.a}
                    </p>
                  </div>
                </div>

                {/* Was this helpful question */}
                {!feedbackGiven && !isCallbackFormOpen && !callbackSubmitted && (
                  <div className="pl-9 space-y-2">
                    <div className="p-3 bg-gray-100 rounded-2xl text-center space-y-2">
                      <p className="text-gray-700 font-bold text-[11px]">
                        Did this solution solve your problem?
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleFeedback('helpful')}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition shadow-xs"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>Yes, Resolved!</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleFeedback('need_human')}
                          className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition shadow-xs"
                        >
                          <ThumbsDown className="w-3 h-3" />
                          <span>No, Call Me</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Helpful feedback response */}
                {feedbackGiven === 'helpful' && (
                  <div className="pl-9">
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                      <span className="font-bold text-xs">
                        Glad we could help! Let us know if you need anything else.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: Request a Callback Form if user is not satisfied */}
            {isCallbackFormOpen && !callbackSubmitted && (
              <div className="p-4 bg-white border border-amber-300 rounded-3xl shadow-md space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs">
                  <PhoneCall className="w-4 h-4 text-amber-700" />
                  <span>Request an Immediate Callback</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-tight">
                  Leave your number and a senior representative will contact you within 15 minutes.
                </p>

                <form onSubmit={handleSubmitCallback} className="space-y-2 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-0.5">Your Name</label>
                    <input
                      type="text"
                      required
                      value={callbackName}
                      onChange={(e) => setCallbackName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl font-bold text-gray-900 outline-none focus:border-emerald-600 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-0.5">Phone Number (10 digits)</label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={callbackPhone}
                      onChange={(e) => setCallbackPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl font-bold text-gray-900 outline-none focus:border-emerald-600 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-0.5">Brief description (optional)</label>
                    <textarea
                      rows={2}
                      value={callbackNote}
                      onChange={(e) => setCallbackNote(e.target.value)}
                      placeholder="Tell us what went wrong..."
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-emerald-600 text-xs resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-extrabold rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Submit & Request Callback</span>
                  </button>
                </form>
              </div>
            )}

            {/* STEP 5: Success Callback Confirmation Notice */}
            {callbackSubmitted && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-3xl shadow-md space-y-2.5 text-center animate-in zoom-in-95 duration-200">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-emerald-950">
                    Request Received Successfully!
                  </h4>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-1">
                    Ticket #{ticketId}
                  </span>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                  We have registered your request for <strong className="font-extrabold">{selectedCategory?.name}</strong>. Our priority executive will contact you at <strong className="font-extrabold">+91 {callbackPhone}</strong> soon (within 15 minutes).
                </p>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl text-xs transition"
                  >
                    Start a New Inquiry
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Chat Footer Quick Action */}
          <div className="p-3 bg-white border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Powered by Burlamart AI
            </span>
            {selectedCategory && (
              <button
                type="button"
                onClick={handleReset}
                className="text-emerald-800 hover:underline font-bold"
              >
                Change Category
              </button>
            )}
          </div>
        </div>
      )}

      {/* 2. Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#1B4332] via-[#2D6A4F] to-[#1B4332] text-white rounded-full shadow-2xl hover:shadow-emerald-900/30 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-emerald-400/40 cursor-pointer"
        aria-label="Open Burlamart Support Chatbot"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full"></span>
        </div>
        <span className="font-extrabold text-xs tracking-wide hidden sm:inline">
          {isOpen ? 'Close Support' : 'Need Help? Chat with Us'}
        </span>
      </button>
    </div>
  );
};

