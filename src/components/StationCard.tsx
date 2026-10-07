import React from 'react';
import { Station } from '../types/station';
import { Car, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { generateGoogleMapsRouteUrl } from '../services/reportService';

interface StationCardProps {
  station: Station;
  onReportClick: (station: Station) => void;
  onCardClick?: (station: Station) => void;
  isSelected?: boolean;
}

export const StationCard: React.FC<StationCardProps> = ({
  station,
  onReportClick,
  onCardClick,
  isSelected = false,
}) => {
  const isOpen = station.status === '現在開放中';

  const handleRouteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const routeUrl = generateGoogleMapsRouteUrl(station);
    window.open(routeUrl, '_blank', 'noopener,noreferrer');
  };

  const handleReportClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReportClick(station);
  };

  return (
    <div
      id={`station-card-${station.id}`}
      onClick={() => onCardClick?.(station)}
      className={`relative bg-[#252830] text-white rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 border cursor-pointer hover:shadow-lg hover:border-teal-500/50 ${
        isSelected
          ? 'border-teal-400 ring-2 ring-teal-400/40 shadow-md scale-[1.01]'
          : 'border-gray-700/60 shadow-xs'
      }`}
    >
      {/* Top row: Station Name */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug line-clamp-1"
            title={station.name}
          >
            {station.name}
          </h3>
        </div>

        {/* Middle row: Status & District */}
        <div className="flex items-center justify-between text-xs sm:text-sm pt-0.5 pb-2">
          {/* Status badge */}
          <div className="flex items-center gap-1.5">
            {isOpen ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                現在開放中
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-amber-300 font-semibold text-xs sm:text-sm">
                <Clock className="w-4 h-4 shrink-0 text-amber-300" />
                {station.status}
              </span>
            )}
          </div>

          {/* District label */}
          <span className="text-gray-300 font-medium text-xs sm:text-sm">
            {station.city}
            {station.district}
          </span>
        </div>
      </div>

      {/* Bottom row: Action Buttons [ 規劃路線 ] [ 站點通報 ] side by side */}
      <div className="pt-3 border-t border-gray-700/50 flex items-center gap-2 sm:gap-3">
        {/* 規劃路線 按鈕 */}
        <button
          type="button"
          id={`btn-route-${station.id}`}
          onClick={handleRouteClick}
          className="flex-1 min-w-0 h-10 px-2 sm:px-3 bg-[#335661] hover:bg-[#3d6572] active:scale-98 text-white rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer truncate"
          title={`規劃前往 ${station.name} 的路線`}
        >
          <Car className="w-4 h-4 shrink-0 text-teal-200" />
          <span className="truncate">規劃路線</span>
        </button>

        {/* 站點通報 按鈕 - 本次新增功能 */}
        <button
          type="button"
          id={`btn-report-${station.id}`}
          onClick={handleReportClick}
          className="flex-1 min-w-0 h-10 px-2 sm:px-3 bg-[#B85D25] hover:bg-[#C9692E] active:scale-98 text-white rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer truncate"
          title={`通報 ${station.name} 設備或站點異常`}
        >
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-200" />
          <span className="truncate">站點通報</span>
        </button>
      </div>
    </div>
  );
};
