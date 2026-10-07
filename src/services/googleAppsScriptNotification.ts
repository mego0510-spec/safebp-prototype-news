/**
 * 國民健康署安心血壓站 - 異常通報通知機制（Google Apps Script 規格與實作代碼）
 *
 * 正式環境運作流程：
 * 1. 民眾於前端血壓站小卡點擊「站點通報」，進入已預填「站點名稱、縣市、區域」的 Google Form。
 * 2. 民眾填寫完「通報人姓名、電話、通報問題、上傳照片」並送出表單。
 * 3. 表單回應寫入綁定的 Google Sheet。
 * 4. Google Sheet 觸發 onFormSubmit(e) Trigger（表單提交觸發程序）。
 * 5. Apps Script 取得提交資料，比對「站點名稱」或「站點代碼」，查出對應負責人 Email。
 * 6. 系統自動發送 Email 通報通知給該站點負責人（同時可抄送主管單位如國健署或吉樂健康）。
 */

/**
 * 站點負責人聯絡資訊對照表範本（亦可放置於 Google Sheet 的「站點通訊錄」分頁）
 */
export const SAMPLE_STATION_CONTACT_MAPPING: Record<
  string,
  {
    stationName: string;
    city: string;
    district: string;
    contactEmail: string;
    contactPerson: string;
    contactPhone: string;
  }
> = {
  station001: {
    stationName: '國民健康署安心血壓站 NO.1',
    city: '台中市',
    district: '西屯區',
    contactEmail: 'station001@safebp.site',
    contactPerson: '林站長',
    contactPhone: '04-2463-9377 #101',
  },
  station002: {
    stationName: '國民健康署安心血壓站 NO.2',
    city: '台中市',
    district: '西屯區',
    contactEmail: 'station002@safebp.site',
    contactPerson: '陳護理師',
    contactPhone: '04-2463-9377 #102',
  },
  station003: {
    stationName: '臺灣土地銀行股份有限公司古亭分公司',
    city: '台北市',
    district: '中正區',
    contactEmail: 'guting-branch@safebp.site',
    contactPerson: '黃副理',
    contactPhone: '02-2365-1234',
  },
  station004: {
    stationName: '明美藥局',
    city: '台北市',
    district: '大安區',
    contactEmail: 'mingmei-pharmacy@safebp.site',
    contactPerson: '張藥師',
    contactPhone: '02-2708-5678',
  },
  station005: {
    stationName: '澄清醫院中港院區安心血壓站',
    city: '台中市',
    district: '西屯區',
    contactEmail: 'chengching-bp@safebp.site',
    contactPerson: '健康管理中心',
    contactPhone: '04-2463-2000',
  },
  station006: {
    stationName: '台中市西屯區衛生所安心血壓站',
    city: '台中市',
    district: '西屯區',
    contactEmail: 'xitun-health@safebp.site',
    contactPerson: '公共衛生組',
    contactPhone: '04-2701-1234',
  },
};

/**
 * 供正式部署於 Google Apps Script 的程式碼模組
 */
export const GOOGLE_APPS_SCRIPT_CODE = `
/**
 * 衛生福利部國民健康署 安心血壓站異常通報 自動通知觸發器
 * 部署指引：
 * 1. 開啟儲存回覆的 Google Sheet -> 擴充功能 (Extensions) -> Apps Script
 * 2. 貼上以下程式碼
 * 3. 點擊「觸發條件 (Triggers)」 -> 新增觸發條件
 *    - 執行功能: onFormSubmit
 *    - 事件來源: 來自試算表
 *    - 事件類型: 提交表單時 (On form submit)
 */

function onFormSubmit(e) {
  try {
    var response = e.namedValues;
    
    // 1. 取得民眾提交的表單欄位內容
    var timestamp = response['時間戳記'] ? response['時間戳記'][0] : new Date().toLocaleString();
    var stationCity = response['站點縣市'] ? response['站點縣市'][0] : '';
    var stationDistrict = response['站點區域'] ? response['站點區域'][0] : '';
    var stationName = response['站點名稱'] ? response['站點名稱'][0] : '';
    var reporterName = response['通報人姓名/暱稱'] ? response['通報人姓名/暱稱'][0] : '匿名民眾';
    var reporterPhone = response['通報人聯絡電話'] ? response['通報人聯絡電話'][0] : '未提供';
    var issueDetail = response['通報問題'] ? response['通報問題'][0] : '未詳述';
    var photoUrl = response['通報問題照片回饋'] ? response['通報問題照片回饋'][0] : '無照片附件';

    // 2. 依站點名稱比對站點通訊錄（亦可讀取專屬 Sheet "站點通訊錄"）
    var targetEmail = lookupStationEmail(stationName);
    var ccEmails = "mego0510@51donate.com"; // 專案窗口（WaCare吉樂健康）

    // 3. 組裝信件主旨與內容
    var subject = "【安心血壓站通報】" + stationName + " 收到民眾通報";
    
    var body = 
      "您好：\\n\\n" +
      "衛生福利部國民健康署「安心血壓站」收到民眾針對貴站點提出的通報反映，詳細資訊如下：\\n\\n" +
      "--------------------------------------------------\\n" +
      "通報時間：" + timestamp + "\\n" +
      "站點名稱：" + stationName + "\\n" +
      "站點縣市：" + stationCity + "\\n" +
      "站點區域：" + stationDistrict + "\\n" +
      "通報人　：" + reporterName + "\\n" +
      "聯絡電話：" + reporterPhone + "\\n" +
      "通報問題：" + issueDetail + "\\n" +
      "照片附件：" + photoUrl + "\\n" +
      "--------------------------------------------------\\n\\n" +
      "請站點管理人員於 48 小時內檢視並巡檢血壓量測設備運作狀況。\\n\\n" +
      "安心血壓站後台回覆試算表：" + SpreadsheetApp.getActiveSpreadsheet().getUrl() + "\\n\\n" +
      "國民健康署 安心血壓站計畫專案小組 敬上";

    // 4. 發送 Email 通知
    if (targetEmail) {
      MailApp.sendEmail({
        to: targetEmail,
        cc: ccEmails,
        subject: subject,
        body: body
      });
      Logger.log("成功發送通報信至: " + targetEmail);
    } else {
      // 若無對應站點信箱，寄至總管信箱由客服分派
      MailApp.sendEmail({
        to: ccEmails,
        subject: "【待分派-安心血壓站通報】" + stationName,
        body: "無法比對到站點負責人信箱，請人工分派處理：\\n\\n" + body
      });
      Logger.log("無對應站點負責人信箱，已轉派總管信箱");
    }
  } catch (err) {
    Logger.log("發送通知發生錯誤: " + err.toString());
  }
}

// 站點負責人 Email 查詢邏輯
function lookupStationEmail(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("站點通訊錄");
  
  if (sheet) {
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (data[i][0] == name || data[i][1] == name) {
        return data[i][2]; // 假設第3欄為負責人Email
      }
    }
  }
  
  // 內建預設站點信箱對應備援
  var defaultMap = {
    "國民健康署安心血壓站 NO.1": "station001@safebp.site",
    "臺灣土地銀行股份有限公司古亭分公司": "guting-branch@safebp.site",
    "明美藥局": "mingmei-pharmacy@safebp.site",
    "澄清醫院中港院區安心血壓站": "chengching-bp@safebp.site"
  };
  return defaultMap[name] || "mego0510@51donate.com";
}
`;
