import { Station } from '../types/station';

/**
 * 國民健康署安心血壓站 - 通報 Google Form 基本設定
 * 表單網址為全站共用，透過 URL query parameters / pre-filled entry 機制自動帶入站點資訊
 */
export const GOOGLE_FORM_BASE_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdPGis8epv6fVqosBejH0in-qQYpgDfvia_oFs9kmQHqS3mZQ/viewform';

/**
 * Google Form 欄位對應代碼 (Entry IDs)
 * 可隨正式發布的 Google Form 題目進行調整
 * 欄位清單：
 * 1. 站點縣市 (必填)
 * 2. 站點區域 (例如：板橋區220)
 * 3. 站點名稱 (必填)
 * 4. 通報人姓名/暱稱 (必填)
 * 5. 通報人聯絡電話
 * 6. 通報問題
 * 7. 通報問題照片回饋
 */
export interface FormFieldConfig {
  stationNameFieldId: string;
  stationCityFieldId: string;
  stationDistrictFieldId: string;
}

// 預設 Entry ID（若 Google Form 換新題目或重新產生 prefill，可直接替換或由 UI 設定調整）
export const DEFAULT_FORM_FIELDS: FormFieldConfig = {
  stationNameFieldId: 'entry.1065046570',
  stationCityFieldId: 'entry.1045781291',
  stationDistrictFieldId: 'entry.2005620554',
};

// 儲存於 localStorage 以便工程團隊或展示時客製化 Entry ID
const STORAGE_KEY_FIELD_CONFIG = 'safebp_google_form_fields';

export function getFormFieldConfig(): FormFieldConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_FIELD_CONFIG);
    if (saved) {
      return { ...DEFAULT_FORM_FIELDS, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Failed to load form field config:', e);
  }
  return DEFAULT_FORM_FIELDS;
}

export function saveFormFieldConfig(config: FormFieldConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY_FIELD_CONFIG, JSON.stringify(config));
  } catch (e) {
    console.warn('Failed to save form field config:', e);
  }
}

/**
 * 動態依照選取的安心血壓站產生帶有預填參數的 Google Form 網址
 * 自動帶入：
 * 1. 站點名稱 (station.name)
 * 2. 站點縣市 (station.city)
 * 3. 站點區域 (station.district)
 */
export function generateGoogleFormReportUrl(
  station: Station,
  customConfig?: FormFieldConfig
): string {
  const config = customConfig || getFormFieldConfig();
  const url = new URL(GOOGLE_FORM_BASE_URL);

  url.searchParams.set('usp', 'pp_url');

  // 1. 站點名稱（必填項目）
  if (config.stationNameFieldId && station.name) {
    url.searchParams.set(config.stationNameFieldId, station.name);
  }

  // 2. 站點縣市
  if (config.stationCityFieldId && station.city) {
    url.searchParams.set(config.stationCityFieldId, station.city);
  }

  // 3. 站點區域
  if (config.stationDistrictFieldId && station.district) {
    url.searchParams.set(config.stationDistrictFieldId, station.district);
  }

  return url.toString();
}

/**
 * 產生導航至該站點的 Google Maps 規劃路線網址
 */
export function generateGoogleMapsRouteUrl(station: Station): string {
  const destination = `${station.latitude},${station.longitude}`;
  const query = encodeURIComponent(`${station.city}${station.district}${station.name}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}&destination_place_id=${query}`;
}
