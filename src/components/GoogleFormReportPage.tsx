import React, { useState, useEffect } from 'react';
import { Station } from '../types/station';
import { Upload, X, CheckCircle2, Image as ImageIcon } from 'lucide-react';

interface GoogleFormReportPageProps {
  station: Station;
}

export const GoogleFormReportPage: React.FC<GoogleFormReportPageProps> = ({
  station,
}) => {
  // Form field state - 站點縣市、站點區域、站點名稱由點選之站點自動帶入
  const [city, setCity] = useState(station.city || '');
  const [district, setDistrict] = useState(station.district || '');
  const [stationName, setStationName] = useState(station.name || '');

  // 民眾填寫欄位
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [reportIssue, setReportIssue] = useState('');
  const [photoFile, setPhotoFile] = useState<{ name: string; url: string; size: string } | null>(null);

  // 提交狀態
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 當 station 改變時，自動更新前三項資料
  useEffect(() => {
    setCity(station.city || '');
    setDistrict(station.district || '');
    setStationName(station.name || '');
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [station]);

  // 模擬照片選擇/上傳
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      setPhotoFile({
        name: file.name,
        url: fakeUrl,
        size: `${(file.size / 1024).toFixed(1)} KB`,
      });
    }
  };

  // 模擬快速附上展示用照片
  const handleAttachDemoPhoto = () => {
    setPhotoFile({
      name: '現場血壓機螢幕故障拍照.jpg',
      url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
      size: '284.5 KB',
    });
  };

  // 提交表單驗證
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!city.trim()) newErrors.city = '這是必填問題';
    if (!district.trim()) newErrors.district = '這是必填問題';
    if (!stationName.trim()) newErrors.stationName = '這是必填問題';
    if (!reporterName.trim()) newErrors.reporterName = '這是必填問題';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearForm = () => {
    setReporterName('');
    setReporterPhone('');
    setReportIssue('');
    setPhotoFile(null);
    setErrors({});
  };

  const handleResetForAnother = () => {
    setIsSubmitted(false);
    handleClearForm();
  };

  // ==========================================
  // 畫面 1: 表單已成功提交畫面 (Google Forms 真實成功畫面)
  // ==========================================
  if (isSubmitted) {
    return (
      <div className="min-h-full bg-[#EDE7F6] py-10 px-4 sm:px-6 flex flex-col items-center flex-1">
        {/* 提交成功確認卡片 */}
        <div className="w-full max-w-[640px] bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
          {/* Google Forms 頂部紫色裝飾條 */}
          <div className="h-2.5 bg-[#673AB7] w-full" />

          <div className="p-7 sm:p-9 space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              安心血壓站通報
            </h1>

            <div className="text-base text-gray-800">
              您的回覆已記錄。
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleResetForAnother}
                className="text-[#673AB7] hover:underline text-sm font-medium cursor-pointer"
              >
                提交另一個回覆
              </button>
            </div>
          </div>
        </div>

        {/* 底部 Google Form 官方版尾 */}
        <div className="w-full max-w-[640px] mt-8 text-center text-xs text-gray-500 space-y-1">
          <p>此內容並非由 Google 建立，亦未獲得 Google 認可。 - 服務條款 - 隱私權政策</p>
          <p className="text-gray-400 font-medium pt-1 text-sm">Google 表單</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // 畫面 2: Google Form 填寫畫面 (忠實呈現 Google Form 乾淨視覺風格)
  // ==========================================
  return (
    <div className="min-h-full bg-[#EDE7F6] py-8 sm:py-10 px-4 sm:px-6 flex flex-col items-center flex-1">
      <form onSubmit={handleSubmit} className="w-full max-w-[640px] space-y-3.5">
        {/* 卡片 0: Google Form 表單主標題區塊 */}
        <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
          {/* 經典 Google Form 紫色頂條 */}
          <div className="h-2.5 bg-[#673AB7] w-full" />
          <div className="p-6 sm:p-8 space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              安心血壓站通報
            </h1>
            <p className="text-sm text-gray-700 leading-relaxed">
              透過通報表單告知站點負責人相關問題
            </p>
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-red-600">
              <span>* 表示必填問題</span>
            </div>
          </div>
        </div>

        {/* 欄位 1: 站點縣市 * (自動帶入) */}
        <div className="bg-white rounded-xl p-6 shadow-xs border border-gray-200 space-y-2">
          <label htmlFor="form-city" className="block text-base font-medium text-gray-900">
            站點縣市 <span className="text-red-500">*</span>
          </label>
          <input
            id="form-city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full sm:w-2/3 border-b border-gray-300 focus:border-[#673AB7] pb-1.5 pt-1 text-base text-gray-900 outline-hidden transition-colors"
          />
          {errors.city && <p className="text-xs text-red-500 font-medium">{errors.city}</p>}
        </div>

        {/* 欄位 2: 站點區域 * (自動帶入) */}
        <div className="bg-white rounded-xl p-6 shadow-xs border border-gray-200 space-y-2">
          <label htmlFor="form-district" className="block text-base font-medium text-gray-900">
            站點區域 <span className="text-red-500">*</span>
          </label>
          <input
            id="form-district"
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            required
            className="w-full sm:w-2/3 border-b border-gray-300 focus:border-[#673AB7] pb-1.5 pt-1 text-base text-gray-900 outline-hidden transition-colors"
          />
          {errors.district && <p className="text-xs text-red-500 font-medium">{errors.district}</p>}
        </div>

        {/* 欄位 3: 站點名稱 * (自動帶入) */}
        <div className="bg-white rounded-xl p-6 shadow-xs border border-gray-200 space-y-2">
          <label htmlFor="form-station-name" className="block text-base font-medium text-gray-900">
            站點名稱 <span className="text-red-500">*</span>
          </label>
          <input
            id="form-station-name"
            type="text"
            value={stationName}
            onChange={(e) => setStationName(e.target.value)}
            required
            className="w-full sm:w-2/3 border-b border-gray-300 focus:border-[#673AB7] pb-1.5 pt-1 text-base text-gray-900 outline-hidden transition-colors"
          />
          {errors.stationName && (
            <p className="text-xs text-red-500 font-medium">{errors.stationName}</p>
          )}
        </div>

        {/* 欄位 4: 通報人姓名／暱稱 * */}
        <div className="bg-white rounded-xl p-6 shadow-xs border border-gray-200 space-y-2">
          <label htmlFor="form-reporter-name" className="block text-base font-medium text-gray-900">
            通報人姓名／暱稱 <span className="text-red-500">*</span>
          </label>
          <input
            id="form-reporter-name"
            type="text"
            placeholder="您的回答"
            value={reporterName}
            onChange={(e) => {
              setReporterName(e.target.value);
              if (errors.reporterName) {
                setErrors({ ...errors, reporterName: '' });
              }
            }}
            required
            className="w-full sm:w-2/3 border-b border-gray-300 focus:border-[#673AB7] pb-1.5 pt-1 text-base text-gray-800 outline-hidden transition-colors"
          />
          {errors.reporterName && (
            <p className="text-xs text-red-500 font-medium">{errors.reporterName}</p>
          )}
        </div>

        {/* 欄位 5: 通報人聯絡電話 */}
        <div className="bg-white rounded-xl p-6 shadow-xs border border-gray-200 space-y-2">
          <label htmlFor="form-reporter-phone" className="block text-base font-medium text-gray-900">
            通報人聯絡電話
          </label>
          <input
            id="form-reporter-phone"
            type="tel"
            placeholder="您的回答"
            value={reporterPhone}
            onChange={(e) => setReporterPhone(e.target.value)}
            className="w-full sm:w-2/3 border-b border-gray-300 focus:border-[#673AB7] pb-1.5 pt-1 text-base text-gray-800 outline-hidden transition-colors"
          />
        </div>

        {/* 欄位 6: 通報問題 */}
        <div className="bg-white rounded-xl p-6 shadow-xs border border-gray-200 space-y-2">
          <label htmlFor="form-report-issue" className="block text-base font-medium text-gray-900">
            通報問題
          </label>
          <p className="text-xs text-gray-500">
            請說明血壓計或站點發生的問題（例如：無法開機、壓脈帶漏氣、螢幕無顯示、站點遷移等）
          </p>
          <textarea
            id="form-report-issue"
            rows={3}
            placeholder="您的回答"
            value={reportIssue}
            onChange={(e) => setReportIssue(e.target.value)}
            className="w-full border-b border-gray-300 focus:border-[#673AB7] pb-1.5 pt-1 text-base text-gray-800 outline-hidden resize-y transition-colors"
          />
        </div>

        {/* 欄位 7: 通報問題照片回饋 */}
        <div className="bg-white rounded-xl p-6 shadow-xs border border-gray-200 space-y-3">
          <label className="block text-base font-medium text-gray-900">
            通報問題照片回饋
          </label>
          <p className="text-xs text-gray-500">
            可拍照附上血壓計機身、錯誤代碼或站點周遭照片，協助管理人員迅速判定狀況
          </p>

          {/* 檔案展示或上傳按鈕 */}
          {photoFile ? (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3 min-w-0">
                {photoFile.url ? (
                  <img
                    src={photoFile.url}
                    alt="預覽"
                    className="w-12 h-12 rounded object-cover border border-gray-300"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {photoFile.name}
                  </p>
                  <p className="text-xs text-gray-500">{photoFile.size}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPhotoFile(null)}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                title="移除照片"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 cursor-pointer shadow-2xs">
                  <Upload className="w-4 h-4 text-[#673AB7]" />
                  <span>新增檔案</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={handleAttachDemoPhoto}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#673AB7] bg-purple-50 hover:bg-purple-100 rounded-md border border-purple-200 transition-colors cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  展示範例：附上設備故障拍照
                </button>
              </div>
              <p className="text-[11px] text-gray-400">支援 JPG、PNG 圖片檔案</p>
            </div>
          )}
        </div>

        {/* 欄位 8: 提交與清除表單 */}
        <div className="pt-3 flex items-center justify-between">
          <button
            type="submit"
            className="px-7 py-2.5 bg-[#673AB7] hover:bg-[#5E35B1] text-white rounded font-medium text-base transition-colors shadow-xs cursor-pointer tracking-wide"
          >
            提交
          </button>

          <button
            type="button"
            onClick={handleClearForm}
            className="text-sm text-[#673AB7] hover:underline cursor-pointer font-medium"
          >
            清除表單
          </button>
        </div>
      </form>

      {/* 底部 Google Form 官方版尾 */}
      <div className="w-full max-w-[640px] mt-8 text-center text-xs text-gray-500 space-y-1 pb-10">
        <p>此內容並非由 Google 建立，亦未獲得 Google 認可。 - 服務條款 - 隱私權政策</p>
        <p className="text-gray-400 font-medium pt-1 text-sm">Google 表單</p>
      </div>
    </div>
  );
};
