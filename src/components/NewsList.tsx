import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { NEWS_CARDS } from '../data/news';

const dateValue = (date: string) => {
  const match = date.match(/(\d+)年(\d+)月(\d+)日/);
  return match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])).getTime() : 0;
};

const sortedNewsCards = [...NEWS_CARDS].sort((a, b) => dateValue(b.date) - dateValue(a.date));

export const NewsList: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-white text-[#1E1E1E]">
    <Header />
    <main className="flex-1 w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-16 pt-14 sm:pt-20 pb-16">
      <div className="flex items-center gap-5 sm:gap-7 mb-14 sm:mb-16">
        <img src="/assets/news/news-7.png" alt="安心血壓站" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
        <h1 className="text-[42px] sm:text-[56px] leading-none font-black tracking-tight">最新資訊</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
        {sortedNewsCards.map((item) => (
          <a key={item.id} href={item.id === '8' ? '/news/8' : `/news#${item.id}`} className="group block min-w-0">
            <div className="aspect-square overflow-hidden rounded-[6px] border border-[#E6E6E6] bg-[#F7F7F7] mb-4">
              <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center rounded-[7px] bg-[#1E1E1E] text-white px-3 py-1.5 text-lg sm:text-xl font-bold leading-none">
                {item.type}
              </span>
              <time className="text-lg sm:text-xl font-medium text-[#1E1E1E]">{item.date}</time>
            </div>
            <h2 className="text-xl sm:text-2xl font-black leading-[1.55] group-hover:text-[#21978F] transition-colors">
              {item.title}
            </h2>
          </a>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);
