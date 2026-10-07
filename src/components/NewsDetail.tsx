import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { NEWS_ARTICLES } from '../data/newsDetail';

type NewsDetailProps = { id: string };

export const NewsDetail: React.FC<NewsDetailProps> = ({ id }) => {
  const article = NEWS_ARTICLES[id];

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-white text-[#1E1E1E]">
        <Header />
        <main className="flex-1 w-full max-w-[900px] mx-auto px-5 sm:px-8 py-24">
          <h1 className="text-3xl font-black">找不到這則最新資訊</h1>
          <a href="/news" className="inline-block mt-8 text-[#21978F] font-bold">返回最新資訊</a>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1E1E1E]">
      <Header />
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 pt-12 sm:pt-16 pb-20">
        <article className="w-full max-w-[660px] mx-auto">
          <h1 className="text-center text-3xl sm:text-4xl font-black leading-[1.35] tracking-tight">
            {article.title}
          </h1>
          <div className="flex flex-col items-center gap-5 mt-6 mb-10">
            <span className="inline-flex items-center justify-center rounded-[7px] bg-[#1E1E1E] text-white px-3 py-1.5 text-base sm:text-lg font-bold leading-none">
              {article.type}
            </span>
            <time className="text-base sm:text-lg font-medium">{article.date}</time>
          </div>

          <img
            src={article.logoImage}
            alt="安心血壓站標誌"
            className="block w-full max-w-[390px] h-auto object-contain mx-auto mb-10 sm:mb-12"
          />

          <p className="text-lg sm:text-xl leading-[2] mb-10 sm:mb-12">{article.paragraphs[0]}</p>

          <img
            src={article.articleImage}
            alt="國泰人壽安心血壓站"
            className="block w-full h-auto object-contain mx-auto mb-10 sm:mb-12"
          />

          <div className="space-y-10 sm:space-y-12">
            {article.paragraphs.slice(1).map((paragraph) => (
              <p key={paragraph} className="text-lg sm:text-xl leading-[2]">{paragraph}</p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};
