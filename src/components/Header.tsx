import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white border-b border-[#E5E7EB] sticky top-0 z-40">
      <div className="max-w-[1200px] mx-auto h-[70px] px-4 sm:px-8 lg:px-16 flex items-center justify-between">
        {/* Logos (衛生福利部國民健康署 + 安心血壓站) */}
        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href="https://www.safebp.site"
            className="flex items-center gap-3"
            title="衛生福利部國民健康署"
          >
            <img
              src="https://framerusercontent.com/images/XJHNkw5tbFjdIOE1Gq02Ni1Ds.png?width=800&height=800"
              alt="衛生福利部國民健康署"
              className="w-[46px] h-[46px] object-cover"
            />
            <img
              src="https://framerusercontent.com/images/T3clyb5Ff4bNBuk5XAMPcHqDg0.png?width=575&height=162"
              alt="安心血壓站"
              className="w-[120px] sm:w-[135px] h-[34px] sm:h-[38px] object-contain"
            />
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[16px] font-medium text-[#1E1E1E]">
          <a
            href="https://www.safebp.site"
            className="hover:text-[#21978F] transition-colors"
          >
            首頁
          </a>
          <a
            href="/news"
            className="hover:text-[#21978F] transition-colors"
          >
            最新資訊
          </a>
          <a
            href="https://www.safebp.site/faq"
            className="hover:text-[#21978F] transition-colors"
          >
            常見問題
          </a>

          {/* 場域申請 (膠囊按鈕: 淺黃外框 + 暖黃底 + 深色字) */}
          <a
            href="https://www.safebp.site/company"
            className="w-[110px] sm:w-[120px] h-[38px] rounded-full flex items-center justify-center font-bold text-[15px] sm:text-[16px] text-[#1E1E1E] bg-[#FFBA33] border-[3.5px] border-[#FFE69C] hover:brightness-105 transition-all shadow-xs"
          >
            場域申請
          </a>

          {/* 血壓站地圖 (膠囊按鈕: 淺薄荷青外框 + 青綠藍底 + 白色字) */}
          <a
            href="#map"
            className="w-[110px] sm:w-[120px] h-[38px] rounded-full flex items-center justify-center font-bold text-[15px] sm:text-[16px] text-white bg-[#009AA0] border-[3.5px] border-[#6ED8D2] hover:brightness-105 transition-all shadow-xs"
          >
            血壓站地圖
          </a>
        </nav>

        {/* Mobile Navigation Tag */}
        <div className="flex md:hidden items-center gap-2">
          <span className="h-[34px] px-3.5 rounded-full flex items-center justify-center font-bold text-xs text-white bg-[#009AA0] border-[3px] border-[#6ED8D2]">
            血壓站地圖
          </span>
        </div>
      </div>
    </header>
  );
};
