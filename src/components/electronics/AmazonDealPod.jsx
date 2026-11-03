import React from 'react';
import { ChevronRight } from 'lucide-react';
import { AmazonProductTile } from './AmazonProductTile';
import { AmazonPricePointTile } from './AmazonPricePointTile';
import { AmazonCategoryTile } from './AmazonCategoryTile';
import { AmazonBusinessTile } from './AmazonBusinessTile';

export const AmazonDealPod = ({ pod, onSelectPod }) => {
  return (
    <div className="bg-[#fef9ee] rounded-3xl p-4 border border-amber-300/70 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      {/* Header with Title and Link Arrow - Clicking opens 10+ Products View */}
      <div className="mb-3">
        <button
          type="button"
          onClick={() => onSelectPod && onSelectPod(pod)}
          className="group w-full flex items-center justify-between text-left cursor-pointer"
          title="Click to view all 10 deals for this card"
        >
          <h3 className="text-base sm:text-lg font-black text-gray-900 leading-snug group-hover:text-[#c45500] transition-colors line-clamp-1">
            {pod.title}
          </h3>
          <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-black group-hover:translate-x-1 transition-all flex-shrink-0" />
        </button>
      </div>

      {/* 2x2 Inner Items Grid - Each item is clickable to its PDP! */}
      <div className="grid grid-cols-2 gap-2.5 my-auto">
        {pod.items.map((item, idx) => {
          if (pod.type === 'product-grid') {
            return <AmazonProductTile key={item.id || idx} item={item} />;
          }
          if (pod.type === 'price-point-festive') {
            return <AmazonPricePointTile key={item.id || idx} item={item} />;
          }
          if (pod.type === 'business-tiles') {
            return <AmazonBusinessTile key={item.id || idx} item={item} />;
          }
          return <AmazonCategoryTile key={item.id || idx} item={item} />;
        })}
      </div>

      {/* Footer link - Triggers 10+ Product Collection Modal */}
      <div className="mt-3 pt-2 text-left flex items-center justify-between">
        <button
          type="button"
          onClick={() => onSelectPod && onSelectPod(pod)}
          className="text-xs font-bold text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer"
        >
          {pod.linkText || `See all ${pod.allItems?.length || 10} deals ›`}
        </button>
        <span className="text-[10px] text-gray-400 font-semibold">10+ items</span>
      </div>
    </div>
  );
};
