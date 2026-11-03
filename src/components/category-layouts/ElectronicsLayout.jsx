import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  AmazonSubNav,
  AmazonHeroCarousel,
  AmazonDealPod,
  AmazonGamificationPod,
  AmazonDealsListingPage,
  AmazonBrowsingHistoryCarousel,
  AmazonPersonalizedFooter,
  DEALS_ROW_1,
  DEALS_ROW_2,
  DEALS_ROW_3,
  DEALS_ROW_4,
  DEALS_ROW_5,
  DEALS_ROW_6,
  DEALS_ROW_7,
  DEALS_ROW_8
} from '../electronics';

export const ElectronicsLayout = ({ products = [], shop, categoryName }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // If a collection, section, or filter query parameter is present, show the Amazon Deals Listing Page with left sidebar filters!
  const hasFilterActive = Boolean(
    searchParams.get('view') === 'deals' ||
    searchParams.get('collection') ||
    searchParams.get('section') ||
    searchParams.get('filter') ||
    searchParams.get('category')
  );

  const [isViewingDealsPage, setIsViewingDealsPage] = useState(hasFilterActive);

  const handleOpenDealsPage = (podOrTitle) => {
    const title = typeof podOrTitle === 'string' ? podOrTitle : podOrTitle.title;
    setSearchParams({ view: 'deals', collection: title });
    setIsViewingDealsPage(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHub = () => {
    setSearchParams({});
    setIsViewingDealsPage(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If viewing the dedicated Deals Listing Page with Filters
  if (isViewingDealsPage || hasFilterActive) {
    return (
      <div className="w-full">
        <AmazonSubNav />
        <AmazonDealsListingPage onBackToHub={handleBackToHub} />
      </div>
    );
  }

  // Otherwise, render the Grand 10-Image Festive Hub
  return (
    <div className="w-full bg-[#f3f3f3] min-h-screen text-gray-900 pb-16">
      {/* 1. Amazon Top Dark Sub-Navigation Bar (Image 1 Top) */}
      <AmazonSubNav />

      {/* 2. Festive Deals Multi-Card Carousel (Image 1 Hero - Minimum 10 products per card!) */}
      <AmazonHeroCarousel onSelectPod={handleOpenDealsPage} />

      {/* Main Deals Grid Container with Festive Golden Aura Backdrop */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 space-y-6">
        {/* ROW 1 (Reference Image 2): Trending deals, Deals on fashion, Top deals on home 1 & 2 */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEALS_ROW_1.map((pod) => (
            <AmazonDealPod key={pod.id} pod={pod} onSelectPod={handleOpenDealsPage} />
          ))}
        </section>

        {/* ROW 2 (Reference Image 3): Under ₹399 top brands, Under ₹499 home finds, Exam books, Business deals */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEALS_ROW_2.map((pod) => (
            <AmazonDealPod key={pod.id} pod={pod} onSelectPod={handleOpenDealsPage} />
          ))}
        </section>

        {/* ROW 3 (Reference Image 4): Upgrade style, Emerging brands, Business under ₹999, Footwear & handbags */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEALS_ROW_3.map((pod) => (
            <AmazonDealPod key={pod.id} pod={pod} onSelectPod={handleOpenDealsPage} />
          ))}
        </section>

        {/* ROW 4 (Reference Image 5): Budget home, Sports & fitness, Business festive deals, Character merchandise */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEALS_ROW_4.map((pod) => (
            <AmazonDealPod key={pod.id} pod={pod} onSelectPod={handleOpenDealsPage} />
          ))}
        </section>

        {/* ROW 5 (Reference Image 6): Children's books, Pocket friendly home, Festive essentials, Kids' favourites */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEALS_ROW_5.map((pod) => (
            <AmazonDealPod key={pod.id} pod={pod} onSelectPod={handleOpenDealsPage} />
          ))}
        </section>

        {/* ROW 6 (Reference Image 7): Vehicle essentials, Characters you adore, Wholesale Furniture + GST, Toddler toys */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEALS_ROW_6.map((pod) => (
            <AmazonDealPod key={pod.id} pod={pod} onSelectPod={handleOpenDealsPage} />
          ))}
        </section>

        {/* ROW 7 (Reference Image 8): RC cars, Toddler toys, RC cars 2 & 3 */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEALS_ROW_7.map((pod) => (
            <AmazonDealPod key={pod.id} pod={pod} onSelectPod={handleOpenDealsPage} />
          ))}
        </section>

        {/* ROW 8 (Reference Image 9): Win big 20 lakh+ rewards, Home essentials 1 & 2, Relaxation massagers */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AmazonGamificationPod pod={DEALS_ROW_8[0]} onSelectPod={handleOpenDealsPage} />
          <AmazonDealPod pod={DEALS_ROW_8[1]} onSelectPod={handleOpenDealsPage} />
          <AmazonDealPod pod={DEALS_ROW_8[2]} onSelectPod={handleOpenDealsPage} />
          <AmazonDealPod pod={DEALS_ROW_8[3]} onSelectPod={handleOpenDealsPage} />
        </section>

        {/* ROW 9 (Reference Image 10): Inspired by your browsing history carousel (10 items) */}
        <AmazonBrowsingHistoryCarousel />

        {/* ROW 10 (Reference Image 10 Bottom): See personalized recommendations Sign-In strip */}
        <AmazonPersonalizedFooter />
      </div>
    </div>
  );
};
