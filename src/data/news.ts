export type NewsCard = {
  id: string;
  type: '消息' | '活動';
  date: string;
  title: string;
  image: string;
};

// 本地 prototype 的最新資訊資料；圖片均存於 public/assets/news。
export const NEWS_CARDS: NewsCard[] = [
  { id: '8', type: '消息', date: '2026年10月27日', title: '從健康職場延伸全民健康　國泰人壽成為全台首家完成通過722安心血壓站認證的保險業者', image: '/assets/news/news-8.jpg' },
  { id: '7', type: '消息', date: '2025年7月28日', title: '高血壓性疾病死亡率首降！「安心血壓站」護健康', image: '/assets/news/news-7.png' },
  { id: '6', type: '消息', date: '2025年7月28日', title: '高血壓仍是致病主因　國健署推「安心血壓站」助全民自主量測', image: '/assets/news/news-6.jpg' },
  { id: '5', type: '消息', date: '2025年7月28日', title: '銀行業首家　台企銀加入「722安心血壓站」友善金融再升級', image: '/assets/news/news-5.jpg' },
  { id: '4', type: '活動', date: '2025年6月25日', title: '【WaCare】722 健康量血壓，贏獎金', image: '/assets/news/news-4.jpg' },
  { id: '2', type: '消息', date: '2024年11月12日', title: '國健署號召「722安心血壓站」全台破2千站！WaCare導入AI管理血壓吸睛', image: '/assets/news/news-2.webp' },
  { id: '1', type: '消息', date: '2024年8月7日', title: '響應「健康台灣」衛福部國健署攜手 WaCare 推動數位永續護健康之企業合作網絡', image: '/assets/news/news-1.jpeg' },
];
