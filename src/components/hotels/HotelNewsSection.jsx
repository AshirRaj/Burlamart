import React from 'react';
import { Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { HOTEL_NEWS_ARTICLES } from './hotelData';

export const HotelNewsSection = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#e01933]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#e01933]">
              Travel Stories & Insights
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight mt-1">
            Latest Travel News & Guides
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Stay updated with seasonal travel itineraries, corporate workations, and city recommendations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {HOTEL_NEWS_ARTICLES.map((article) => (
          <article
            key={article.id}
            className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                {article.category}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-[11px] text-gray-400 font-semibold mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-[#e01933] transition-colors">
                  {article.title}
                </h3>

                <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                <a
                  href={article.link}
                  target={article.link.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#e01933] group-hover:underline flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

