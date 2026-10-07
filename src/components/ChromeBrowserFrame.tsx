import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Lock,
  Star,
  Plus,
  X,
  MoreVertical,
  Puzzle,
} from 'lucide-react';

export interface ChromeTab {
  id: 'map' | 'report_form';
  title: string;
  url: string;
  closable?: boolean;
}

interface ChromeBrowserFrameProps {
  tabs: ChromeTab[];
  activeTabId: 'map' | 'report_form';
  onSelectTab: (id: 'map' | 'report_form') => void;
  onCloseTab: (id: 'map' | 'report_form') => void;
  onRefresh?: () => void;
  children: React.ReactNode;
}

export const ChromeBrowserFrame: React.FC<ChromeBrowserFrameProps> = ({
  tabs,
  activeTabId,
  onSelectTab,
  onCloseTab,
  onRefresh,
  children,
}) => {
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  return (
    <div className="min-h-screen bg-[#DFE1E5] flex flex-col font-sans select-none antialiased">
      {/* ========================================================
          1. Chrome 最頂部分頁列 (Tab Strip)
         ======================================================== */}
      <div className="bg-[#DFE1E5] pt-2 px-2 flex items-center justify-between border-b border-[#CBCED1]/60">
        <div className="flex items-end gap-1 overflow-x-auto no-scrollbar max-w-full">
          {/* macOS 風格三色視窗控制圓點 */}
          <div className="flex items-center gap-2 px-3 pb-2.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#ED6A5E] border border-[#CF5347] inline-block shadow-2xs" />
            <span className="w-3 h-3 rounded-full bg-[#F5BF4F] border border-[#D7A13B] inline-block shadow-2xs" />
            <span className="w-3 h-3 rounded-full bg-[#62C554] border border-[#4EA840] inline-block shadow-2xs" />
          </div>

          {/* 分頁標籤列表 */}
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`group relative flex items-center gap-2 px-3.5 py-2 text-xs font-medium cursor-pointer transition-all duration-150 max-w-[240px] min-w-[140px] sm:min-w-[170px] ${
                  isActive
                    ? 'bg-white text-[#202124] rounded-t-lg shadow-xs z-10'
                    : 'text-[#5F6368] hover:bg-[#D5D8DC] rounded-t-lg'
                }`}
                style={{
                  marginBottom: isActive ? '-1px' : '0',
                }}
              >
                {/* 分頁 Favicon */}
                {tab.id === 'map' ? (
                  // 安心血壓站 Logo (綠色愛心)
                  <span className="w-4 h-4 shrink-0 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-4 h-4 text-[#20968F]"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      <path d="M12 5v14" />
                    </svg>
                  </span>
                ) : (
                  // Google Forms 紫色表單圖標
                  <span className="w-4 h-4 shrink-0 flex items-center justify-center bg-[#7248B9] rounded-[3px] p-0.5 shadow-2xs">
                    <svg
                      viewBox="0 0 24 24"
                      fill="white"
                      className="w-3 h-3"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9 9h3v2H9V9zm6 8H9v-2h6v2zm0-4H9v-2h6v2z" />
                    </svg>
                  </span>
                )}

                {/* 分頁標題 */}
                <span className="truncate flex-1 tracking-tight text-[12.5px]">
                  {tab.title}
                </span>

                {/* 關閉分頁 'x' 按鈕 */}
                {tab.closable && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCloseTab(tab.id);
                    }}
                    className="w-4 h-4 rounded-full flex items-center justify-center text-[#5F6368] hover:bg-[#E8EAED] hover:text-[#202124] transition-colors p-0.5 cursor-pointer ml-1 shrink-0"
                    title="關閉分頁"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}

          {/* 新增分頁 '+' 按鈕 */}
          <button
            type="button"
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#5F6368] hover:bg-[#D5D8DC] transition-colors cursor-pointer mb-1 ml-0.5 shrink-0"
            title="新增分頁"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========================================================
          2. Chrome 導覽與網址列 (Toolbar / Omnibox)
         ======================================================== */}
      <div className="bg-white px-3 py-1.5 flex items-center gap-2 border-b border-[#E0E0E0] shadow-2xs">
        {/* 上一頁、下一頁、重新整理按鈕 */}
        <div className="flex items-center gap-1 text-[#5F6368]">
          <button
            type="button"
            onClick={() => onSelectTab('map')}
            disabled={activeTabId === 'map'}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#F1F3F4] active:bg-[#E8EAED] disabled:opacity-35 disabled:hover:bg-transparent transition-colors cursor-pointer disabled:cursor-default"
            title="返回上一頁"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            disabled
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#F1F3F4] disabled:opacity-35 transition-colors cursor-default"
            title="前進下一頁"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onRefresh}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#F1F3F4] active:bg-[#E8EAED] transition-colors cursor-pointer"
            title="重新載入此頁"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 網址列 (Omnibox) */}
        <div className="flex-1 bg-[#F1F3F4] hover:bg-[#E8EAED] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1A73E8] focus-within:shadow-xs rounded-full h-8 px-3.5 flex items-center gap-2 transition-all">
          <Lock className="w-3.5 h-3.5 text-[#5F6368] shrink-0" />
          <span className="text-[13px] text-[#202124] truncate flex-1 font-mono tracking-tight select-text">
            {activeTab.url}
          </span>
          <button
            type="button"
            className="text-[#5F6368] hover:text-[#202124] p-0.5 rounded-full hover:bg-black/5"
            title="將此分頁加入書籤"
          >
            <Star className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 右側 Chrome 功能工具按鈕 */}
        <div className="flex items-center gap-1 text-[#5F6368]">
          <button
            type="button"
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#F1F3F4] transition-colors"
            title="擴充功能"
          >
            <Puzzle className="w-3.5 h-3.5" />
          </button>
          <div
            className="w-7 h-7 rounded-full bg-[#1A73E8] text-white text-[11px] font-bold flex items-center justify-center shadow-2xs"
            title="Google 帳戶"
          >
            G
          </div>
          <button
            type="button"
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#F1F3F4] transition-colors"
            title="自訂及管理 Google Chrome"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========================================================
          3. 網頁渲染內容區 (Web Page Viewport)
         ======================================================== */}
      <div className="flex-1 bg-white flex flex-col overflow-y-auto select-text">
        {children}
      </div>
    </div>
  );
};
