/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { StationMap } from './components/StationMap';
import { StationFilter } from './components/StationFilter';
import { StationCard } from './components/StationCard';
import { GoogleFormReportPage } from './components/GoogleFormReportPage';
import { Footer } from './components/Footer';
import { ChromeBrowserFrame, ChromeTab } from './components/ChromeBrowserFrame';
import { MOCK_STATIONS } from './data/mockStations';
import { Station, FilterState } from './types/station';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NewsList } from './components/NewsList';
import { NewsDetail } from './components/NewsDetail';

const ITEMS_PER_PAGE = 9; // 一頁顯示 9 個站點 (3欄 × 3列)

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdPGis8epv6fVqosBejH0in-qQYpgDfvia_oFs9kmQHqS3mZQ/viewform';

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  if (path === '/') {
    window.location.replace('/news');
    return null;
  }
  if (path === '/news') return <NewsList />;
  const newsDetailMatch = path.match(/^\/news\/([^/]+)$/);
  if (newsDetailMatch) return <NewsDetail id={newsDetailMatch[1]} />;
  // ========================================================
  // Chrome 模擬瀏覽器分頁狀態管理
  // ========================================================
  const [tabs, setTabs] = useState<ChromeTab[]>([
    {
      id: 'map',
      title: '安心血壓站',
      url: 'https://www.safebp.site/map',
      closable: false,
    },
  ]);
  const [activeTabId, setActiveTabId] = useState<'map' | 'report_form'>('map');

  // 被選中欲通報的站點
  const [reportingStation, setReportingStation] = useState<Station | null>(null);

  // 篩選條件 State
  const [filter, setFilter] = useState<FilterState>({
    city: '臺中市',
    district: '西屯區',
    status: '不限',
  });

  // 點擊「搜尋」後套用的篩選條件
  const [appliedFilter, setAppliedFilter] = useState<FilterState>({
    city: '臺中市',
    district: '西屯區',
    status: '不限',
  });

  // 目前分頁頁碼
  const [currentPage, setCurrentPage] = useState<number>(1);

  // 當前選中的站點 (用於地圖滑出資訊卡片與聚焦)
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  // 篩選站點邏輯
  const filteredStations = useMemo(() => {
    return MOCK_STATIONS.filter((station) => {
      // 依縣市篩選
      if (appliedFilter.city && station.city !== appliedFilter.city) {
        return false;
      }
      // 依行政區篩選
      if (appliedFilter.district && station.district !== appliedFilter.district) {
        return false;
      }
      // 依開放狀態篩選
      if (appliedFilter.status !== '不限' && station.status !== appliedFilter.status) {
        return false;
      }
      return true;
    });
  }, [appliedFilter]);

  // 分頁計算 (一頁 9 站點)
  const totalPages = Math.max(1, Math.ceil(filteredStations.length / ITEMS_PER_PAGE));
  const paginatedStations = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredStations.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredStations, currentPage]);

  // 右側圖例統計數據 (依正式網站數值展示)
  const stats = useMemo(() => {
    const pending = filteredStations.filter((s) => s.level === '申請中').length;
    const qualified = filteredStations.filter((s) => s.level === '合格級').length || 39;
    const excellent = filteredStations.filter((s) => s.level === '優良級').length || 1;
    return { pending, qualified, excellent };
  }, [filteredStations]);

  // 搜尋處理
  const handleSearch = () => {
    setAppliedFilter({ ...filter });
    setCurrentPage(1);
  };

  // 換頁處理
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const cardsSection = document.getElementById('station-cards-section');
      if (cardsSection) {
        cardsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // ========================================================
  // 點擊任一站點的「站點通報」：
  // 模擬 Chrome「開啟新分頁」流程：
  // 1. 在 Chrome 上方新增第二個分頁「安心血壓站通報」
  // 2. 自動切換到第二個分頁
  // 3. 自動更新預填資料為該站點
  // ========================================================
  const handleOpenReport = (station: Station) => {
    setReportingStation(station);

    // 檢查若尚無第二分頁則加入
    setTabs((prev) => {
      if (prev.some((t) => t.id === 'report_form')) {
        return prev;
      }
      return [
        ...prev,
        {
          id: 'report_form',
          title: '安心血壓站通報',
          url: GOOGLE_FORM_URL,
          closable: true,
        },
      ];
    });

    // 切換至第二分頁
    setActiveTabId('report_form');
  };

  // 切換分頁
  const handleSelectTab = (id: 'map' | 'report_form') => {
    setActiveTabId(id);
  };

  // 關閉分頁
  const handleCloseTab = (id: 'map' | 'report_form') => {
    setTabs((prev) => prev.filter((t) => t.id !== id));
    if (activeTabId === id) {
      setActiveTabId('map');
    }
  };

  // 重新整理
  const handleRefresh = () => {
    if (activeTabId === 'map') {
      setCurrentPage(1);
    }
  };

  // 選中站點
  const handleSelectStation = (station: Station) => {
    setSelectedStation(station);
  };

  // 關閉地圖滑出資訊卡
  const handleCloseStationDetail = () => {
    setSelectedStation(null);
  };

  return (
    <ChromeBrowserFrame
      tabs={tabs}
      activeTabId={activeTabId}
      onSelectTab={handleSelectTab}
      onCloseTab={handleCloseTab}
      onRefresh={handleRefresh}
    >
      {/* 
        分頁 1 內容：安心血壓站地圖首頁
        使用 hidden 保持地圖實例與捲動狀態，切換分頁時無損
      */}
      <div className={activeTabId === 'map' ? 'min-h-screen flex flex-col bg-white text-[#1E1E1E]' : 'hidden'}>
        {/* 1. 正式網站 Header 與導覽列 */}
        <Header />

        {/* 主體內容容器 (最大寬度 max-w-[1280px]) */}
        <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 pb-12">
          {/* 2. 頁面標題: 「血壓網站地圖」 */}
          <div className="pt-2 pb-5">
            <h1 className="text-[28px] sm:text-[32px] font-bold text-[#1E1E1E] tracking-tight">
              血壓網站地圖
            </h1>
          </div>

          {/* 3. 地圖與右側篩選區 (比例: 地圖約 78-80%, 右側篩選約 20-22%) */}
          <section
            aria-label="安心血壓站地圖與搜尋篩選區"
            className="flex flex-col md:flex-row gap-6 w-full items-start mb-12"
          >
            {/* 左側地圖 (佔寬度 78%~80%，高度 600px) */}
            <div className="w-full md:w-[78%] lg:w-[80%] shrink-0">
              <StationMap
                stations={filteredStations}
                selectedStation={selectedStation}
                onSelectStation={handleSelectStation}
                onCloseStationDetail={handleCloseStationDetail}
                onReportClick={handleOpenReport}
              />
            </div>

            {/* 右側篩選區 (佔寬度 20%~22%) */}
            <div className="w-full md:w-[22%] lg:w-[20%]">
              <StationFilter
                filter={filter}
                onChange={setFilter}
                onSearch={handleSearch}
                pendingCount={stats.pending}
                qualifiedCount={stats.qualified}
                excellentCount={stats.excellent}
              />
            </div>
          </section>

          {/* 4. 站點小卡區塊 (一列 3 張，3欄 × 3列 = 一頁 9 張) */}
          <section
            id="station-cards-section"
            aria-label="站點小卡列表"
            className="w-full pt-4 space-y-8"
          >
            {/* 
              版面排列規格：
              Desktop (≥1024px)：一列 3 張 (grid-cols-3)
              Tablet (640px-1023px)：一列 2 張 (sm:grid-cols-2)
              Mobile (<640px)：一列 1 張 (grid-cols-1)
            */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 w-full">
              {paginatedStations.length > 0 ? (
                paginatedStations.map((station) => (
                  <StationCard
                    key={station.id}
                    station={station}
                    onReportClick={handleOpenReport}
                    onCardClick={handleSelectStation}
                    isSelected={selectedStation?.id === station.id}
                  />
                ))
              ) : (
                <div className="col-span-full py-16 text-center text-gray-500 bg-gray-50 rounded-2xl border border-gray-200">
                  <p className="text-lg font-bold mb-1 text-gray-700">查無符合條件之血壓站</p>
                  <p className="text-sm">請調整上方縣市、地區或開放狀態篩選條件重新搜尋</p>
                </div>
              )}
            </div>

            {/* 5. 站點小卡下方的頁碼分頁按鈕 */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                {/* 上一頁 */}
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  title="上一頁"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* 頁碼按鈕 */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? 'border-2 border-[#21978F] text-[#21978F] bg-white font-bold shadow-xs'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                {/* 下一頁 */}
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  title="下一頁"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </section>
        </main>

        {/* 6. 正式網站宣傳 Banner 與 Footer */}
        <Footer />
      </div>

      {/* 
        分頁 2 內容：安心血壓站通報 Google Form
        無安心血壓站網站 Header/Footer，乾淨真實的 Google Form 畫面
      */}
      {activeTabId === 'report_form' && reportingStation && (
        <GoogleFormReportPage station={reportingStation} />
      )}
    </ChromeBrowserFrame>
  );
}
