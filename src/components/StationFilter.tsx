import React from 'react';
import { FilterState } from '../types/station';
import { CITY_DISTRICTS } from '../data/mockStations';

interface StationFilterProps {
  filter: FilterState;
  onChange: (newFilter: FilterState) => void;
  onSearch: () => void;
  pendingCount?: number;
  qualifiedCount?: number;
  excellentCount?: number;
}

const TAIWAN_CITIES = [
  '基隆市',
  '臺北市',
  '新北市',
  '桃園市',
  '新竹市',
  '新竹縣',
  '宜蘭縣',
  '苗栗縣',
  '臺中市',
  '彰化縣',
  '南投縣',
  '雲林縣',
  '嘉義市',
  '嘉義縣',
  '臺南市',
  '高雄市',
  '屏東縣',
  '臺東縣',
  '花蓮縣',
  '澎湖縣',
  '金門縣',
  '連江縣',
];

export const StationFilter: React.FC<StationFilterProps> = ({
  filter,
  onChange,
  onSearch,
  pendingCount = 0,
  qualifiedCount = 39,
  excellentCount = 1,
}) => {
  const currentDistricts = filter.city && CITY_DISTRICTS[filter.city] ? CITY_DISTRICTS[filter.city] : [];

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...filter,
      city: e.target.value,
      district: '',
    });
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...filter,
      district: e.target.value,
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...filter,
      status: e.target.value,
    });
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 py-2 px-1">
      {/* 1. 官方站點統計圖例區塊 (.map-legend-group) */}
      <div className="w-full flex flex-col gap-4">
        {/* 血壓站（申請中） */}
        <div className="w-full">
          <div className="flex items-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M12 2C8 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3-7-7-7z"
                fill="#E74C3C"
              />
              <circle cx="12" cy="9" r="2.5" fill="white" />
            </svg>
            <span className="text-[16px] font-medium text-[#1E1E1E] ml-2">
              血壓站（申請中）
            </span>
          </div>
          <div className="ml-12 text-[14px] text-[#666666]">
            共 {pendingCount > 0 ? pendingCount : '-'} 站
          </div>
        </div>

        {/* 安心血壓站（合格級） */}
        <div className="w-full">
          <div className="flex items-center">
            <img
              src="https://framerusercontent.com/images/ld0NFMichGukZc3UGdO7WpmJHfE.png?width=1000&height=1000"
              alt="安心血壓站（合格級）"
              className="w-10 h-10 object-contain shrink-0"
            />
            <span className="text-[16px] font-medium text-[#1E1E1E] ml-2">
              安心血壓站（合格級）
            </span>
          </div>
          <div className="ml-12 text-[14px] text-[#666666]">
            共 {qualifiedCount} 站
          </div>
        </div>

        {/* 安心血壓站+（優良級） */}
        <div className="w-full">
          <div className="flex items-center">
            <img
              src="https://framerusercontent.com/images/iFXLIPTPcxdu3cdnu18cgDP7U.png?width=1000&height=1000"
              alt="安心血壓站+（優良級）"
              className="w-10 h-10 object-contain shrink-0"
            />
            <span className="text-[16px] font-medium text-[#1E1E1E] ml-2">
              安心血壓站+（優良級）
            </span>
          </div>
          <div className="ml-12 text-[14px] text-[#666666]">
            共 {excellentCount} 站
          </div>
        </div>
      </div>

      {/* 2. 官方下拉選單群組 (.dropdown-group) */}
      <div className="w-full flex flex-col gap-4">
        {/* 輸入縣市 */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="city-select"
            className="text-[20px] font-bold text-[#1E1E1E] mb-2"
          >
            輸入縣市
          </label>
          <select
            id="city-select"
            value={filter.city}
            onChange={handleCityChange}
            className="w-full px-4 py-3 border border-[#CCCCCC] rounded-lg bg-white text-[16px] text-[#1E1E1E] outline-hidden focus:border-[#21978F] transition-colors appearance-none cursor-pointer bg-[url('data:image/svg+xml;utf8,<svg%20fill=%27%23999%27%20height=%2716%27%20viewBox=%270%200%2024%2024%27%20width=%2716%27%20xmlns=%27http://www.w3.org/2000/svg%27><path%20d=%27M7%2010l5%205%205-5z%27/></svg>')] bg-no-repeat bg-[right_12px_center] bg-[length:24px]"
          >
            <option value="">請選擇...</option>
            {TAIWAN_CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* 輸入地區 */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="district-select"
            className="text-[20px] font-bold text-[#1E1E1E] mb-2"
          >
            輸入地區
          </label>
          <select
            id="district-select"
            value={filter.district}
            onChange={handleDistrictChange}
            disabled={!filter.city}
            className="w-full px-4 py-3 border border-[#CCCCCC] rounded-lg bg-white text-[16px] text-[#1E1E1E] outline-hidden focus:border-[#21978F] transition-colors appearance-none cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed bg-[url('data:image/svg+xml;utf8,<svg%20fill=%27%23999%27%20height=%2716%27%20viewBox=%270%200%2024%2024%27%20width=%2716%27%20xmlns=%27http://www.w3.org/2000/svg%27><path%20d=%27M7%2010l5%205%205-5z%27/></svg>')] bg-no-repeat bg-[right_12px_center] bg-[length:24px]"
          >
            <option value="">請選擇...</option>
            {currentDistricts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* 開放狀態 */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="status-select"
            className="text-[20px] font-bold text-[#1E1E1E] mb-2"
          >
            開放
          </label>
          <select
            id="status-select"
            value={filter.status}
            onChange={handleStatusChange}
            className="w-full px-4 py-3 border border-[#CCCCCC] rounded-lg bg-white text-[16px] text-[#1E1E1E] outline-hidden focus:border-[#21978F] transition-colors appearance-none cursor-pointer bg-[url('data:image/svg+xml;utf8,<svg%20fill=%27%23999%27%20height=%2716%27%20viewBox=%270%200%2024%2024%27%20width=%2716%27%20xmlns=%27http://www.w3.org/2000/svg%27><path%20d=%27M7%2010l5%205%205-5z%27/></svg>')] bg-no-repeat bg-[right_12px_center] bg-[length:24px]"
          >
            <option value="不限">不限</option>
            <option value="現在開放中">開放中</option>
            <option value="非開放中">非開放中</option>
          </select>
        </div>
      </div>

      {/* 3. 官方搜尋按鈕 (.search-btn) */}
      <div className="w-full flex justify-center pt-2">
        <button
          type="button"
          onClick={onSearch}
          className="w-full sm:w-auto px-12 py-3 bg-[#21978F] hover:bg-[#27B1A8] active:scale-98 text-white rounded-full font-bold text-[16px] transition-all cursor-pointer shadow-xs text-center"
        >
          搜尋
        </button>
      </div>
    </div>
  );
};
