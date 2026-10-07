import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Station } from '../types/station';
import { generateGoogleMapsRouteUrl } from '../services/reportService';

interface StationMapProps {
  stations: Station[];
  selectedStation: Station | null;
  onSelectStation: (station: Station) => void;
  onCloseStationDetail: () => void;
  onReportClick: (station: Station) => void;
}

// 官方站點標記圖示定義
const SVG_ICON_TYPE_A =
  'data:image/svg+xml;base64,' +
  btoa(`
    <svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3-7-7-7z" fill="#E74C3C"/>
      <circle cx="12" cy="9" r="2.5" fill="white"/>
    </svg>
  `);

const PNG_ICON_TYPE_B =
  'https://framerusercontent.com/images/ld0NFMichGukZc3UGdO7WpmJHfE.png?width=1000&height=1000';

const PNG_ICON_TYPE_C =
  'https://framerusercontent.com/images/iFXLIPTPcxdu3cdnu18cgDP7U.png?width=1000&height=1000';

export const StationMap: React.FC<StationMapProps> = ({
  stations,
  selectedStation,
  onSelectStation,
  onCloseStationDetail,
  onReportClick,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // 初始化 Leaflet 地圖 (依官方網站規格，預設聚焦於台中市西屯區核心 [24.162, 120.647]，zoom 13)
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [24.162, 120.647],
      zoom: 13,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    const markersLayer = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;
    markersLayerRef.current = markersLayer;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 更新站點標記
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    stations.forEach((station) => {
      let iconUrl = PNG_ICON_TYPE_B;
      if (station.level === '優良級') {
        iconUrl = PNG_ICON_TYPE_C;
      } else if (station.level === '申請中') {
        iconUrl = SVG_ICON_TYPE_A;
      }

      const customIcon = L.icon({
        iconUrl: iconUrl,
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38],
      });

      const marker = L.marker([station.latitude, station.longitude], {
        icon: customIcon,
      });

      marker.on('click', () => {
        onSelectStation(station);
      });

      marker.addTo(markersLayer);
    });
  }, [stations, onSelectStation]);

  // 當選擇特定站點時，平移至該站點
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedStation) return;

    map.panTo([selectedStation.latitude, selectedStation.longitude], {
      animate: true,
      duration: 0.5,
    });
  }, [selectedStation]);

  const handleOpenGoogleMaps = () => {
    if (!selectedStation) return;
    const url = generateGoogleMapsRouteUrl(selectedStation);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-gray-100 rounded-none sm:rounded-lg border border-gray-200 shadow-xs">
      {/* 官方側邊滑出式站點詳細卡片 (#card) */}
      <div
        id="card"
        className={`absolute top-0 left-0 z-[1000] w-[320px] max-w-[90%] h-full bg-[#FAFAFA] shadow-2xl transition-transform duration-300 flex flex-col ${
          selectedStation ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {selectedStation && (
          <>
            {/* 標題橫幅 (#cardTitleContainer) */}
            <div className="bg-[#21978F] text-white p-3 flex items-center justify-between shadow-xs">
              <button
                type="button"
                onClick={onCloseStationDetail}
                className="p-1 hover:bg-white/20 rounded transition-colors cursor-pointer"
                title="關閉詳細資訊"
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M20 12H4 M11 5L4 12L11 19"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </button>

              <div className="font-bold text-base tracking-wide truncate max-w-[200px] text-center">
                {selectedStation.name}
              </div>

              {/* 官方菱形 Google Maps 按鈕 */}
              <button
                type="button"
                onClick={handleOpenGoogleMaps}
                className="p-1 hover:scale-105 transition-transform cursor-pointer"
                title="Google 地圖導航"
              >
                <svg width="26" height="26" viewBox="0 0 100 100">
                  <rect
                    x="50"
                    y="0"
                    width="70"
                    height="70"
                    fill="white"
                    rx="10"
                    transform="rotate(45 50 0)"
                  />
                  <path
                    d="M35 65 V40 H55 V33 L70 48 L55 63 V56 H42 V65 Z"
                    fill="#21978F"
                  />
                </svg>
              </button>
            </div>

            {/* 卡片內容 (#cardContent) */}
            <div className="p-4 flex-1 overflow-y-auto space-y-3.5 text-sm text-gray-800 bg-[#F5F5F5]">
              <div>
                <h4 className="font-bold text-gray-900 mb-1">地址</h4>
                <p className="text-gray-700">{selectedStation.address}</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-1">站點等級</h4>
                <p className="text-gray-700">{selectedStation.level}</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-1">血壓計類型</h4>
                <p className="text-gray-700">{selectedStation.deviceType}</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-1">開放狀態</h4>
                <span className="inline-block px-2.5 py-1 rounded bg-green-100 text-green-800 font-bold text-xs">
                  {selectedStation.status}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-1">開放時間</h4>
                <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                  {selectedStation.openHoursText}
                </p>
              </div>

              {/* 通報快捷按鈕 */}
              <div className="pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => onReportClick(selectedStation)}
                  className="w-full py-2.5 px-4 bg-[#D9622B] hover:bg-[#C7541E] text-white font-bold rounded-full text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  通報此站點設備或資訊異常
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 地圖底層渲染區塊 */}
      <div ref={mapContainerRef} className="w-full h-full z-[1]" />
    </div>
  );
};
