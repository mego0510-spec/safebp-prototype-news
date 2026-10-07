import React from 'react';

export const Footer: React.FC = () => {
  return (
    <div className="w-full mt-16">
      {/* 1. 下方安心血壓站宣傳 Banner (我想成為血壓站點) */}
      <section
        aria-label="我想成為血壓站點宣傳"
        className="relative w-full overflow-hidden bg-gray-900"
      >
        {/* Banner Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://framerusercontent.com/images/kIufFh5LSferofqo3htMAMrQM.jpg?width=5472&height=3648"
            alt="安心血壓站宣傳背景"
            className="w-full h-full object-cover object-[60%_40%]"
          />
          {/* Subtle dark overlay for optimal text contrast */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Banner Content Container */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 text-white flex flex-col items-start gap-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            我想成為血壓站點
          </h2>

          <div className="text-sm sm:text-base text-gray-100 max-w-2xl leading-relaxed space-y-1">
            <p className="font-bold text-white">
              誠邀加入血壓量測站計畫，共同守護國人健康！
            </p>
            <p>
              透過設立血壓量測站，我們希望讓更多民眾在日常中即可輕鬆量測、及早預防。
            </p>
            <p>
              邀請您申請成為<strong className="text-white">血壓量測合作站點</strong>，一同推動健康促進工作。
            </p>
          </div>

          <div className="pt-2">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSebcRZPlGSO_-ICr-DrRjEyu0knhEr4zkMicy0FfcWDpKGWLQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full font-bold text-base text-[#1E1E1E] bg-[#FFBA33] border-[3.5px] border-[#FFE69C] hover:brightness-105 transition-all shadow-md"
            >
              前往申請
            </a>
          </div>
        </div>
      </section>

      {/* 2. 正式網站 Footer */}
      <footer className="w-full bg-white border-t border-[#E5E7EB]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10">
            {/* Logo */}
            <div className="md:col-span-2">
              <a href="https://www.safebp.site" title="衛生福利部國民健康署">
                <img
                  src="https://framerusercontent.com/images/XJHNkw5tbFjdIOE1Gq02Ni1Ds.png?width=800&height=800"
                  alt="衛生福利部國民健康署"
                  className="w-[46px] h-[46px] object-cover"
                />
              </a>
            </div>

            {/* 聯繫資訊 */}
            <div className="md:col-span-5 space-y-2 text-sm text-[#1E1E1E]">
              <h3 className="font-bold text-[16px] text-[#E9536C] pb-1">
                安心血壓站建置申請聯繫
              </h3>
              <p className="font-medium">
                WaCare吉樂健康資訊科技股份有限公司 吳小姐
              </p>
              <p>聯繫電話：04-2463-9377 #13</p>
              <p>
                聯繫信箱：
                <a
                  href="mailto:mego0510@51donate.com"
                  className="text-blue-600 hover:underline"
                >
                  mego0510@51donate.com
                </a>
              </p>
            </div>

            {/* 網站連結 */}
            <div className="md:col-span-2 sm:col-span-6 space-y-2 text-sm">
              <h3 className="font-bold text-[16px] text-[#1E1E1E] pb-1">
                網站連結
              </h3>
              <ul className="space-y-1.5 text-gray-700">
                <li>
                  <a href="#map" className="hover:text-[#21978F] transition-colors">
                    血壓站地圖
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.safebp.site/company"
                    className="hover:text-[#21978F] transition-colors"
                  >
                    場域申請
                  </a>
                </li>
                <li>
                  <a
                    href="/news"
                    className="hover:text-[#21978F] transition-colors"
                  >
                    最新資訊
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.safebp.site/faq"
                    className="hover:text-[#21978F] transition-colors"
                  >
                    常見問題
                  </a>
                </li>
              </ul>
            </div>

            {/* 場域申請連結 */}
            <div className="md:col-span-3 sm:col-span-6 space-y-2 text-sm">
              <h3 className="font-bold text-[16px] text-[#1E1E1E] pb-1">
                場域申請
              </h3>
              <ul className="space-y-1.5 text-gray-700">
                <li>
                  <a
                    href="https://www.safebp.site/company#stand-cat"
                    className="hover:text-[#21978F] transition-colors"
                  >
                    血壓站點介紹
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.safebp.site/company#way"
                    className="hover:text-[#21978F] transition-colors"
                  >
                    建置申請方式
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.safebp.site/form-entry"
                    className="hover:text-[#21978F] transition-colors"
                  >
                    各縣市申請表
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.safebp.site/faq"
                    className="hover:text-[#21978F] transition-colors"
                  >
                    申請常見問題
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* 底部主管機關與版權聲明 (Border top #D9D9D9) */}
          <div className="pt-6 border-t border-[#D9D9D9] flex flex-col sm:flex-row items-center justify-between gap-3 text-[14px] text-[#1E1E1E] font-medium">
            <p>經費由國民健康署運用菸品健康福利捐支應 廣告</p>
            <p>© 2025 本網頁屬衛生福利部國民健康署 版權所有</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
