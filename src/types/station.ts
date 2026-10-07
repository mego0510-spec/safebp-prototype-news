export interface Station {
  id: string;
  name: string;
  city: string;
  district: string;
  address: string;
  status: '現在開放中' | '休息中';
  level: '合格級' | '優良級' | '申請中';
  deviceType: '上臂式血壓計' | '隧道式血壓計';
  latitude: number;
  longitude: number;
  openHoursText: string;
  dailyHours: {
    mon: string;
    tue: string;
    wed: string;
    thu: string;
    fri: string;
    sat: string;
    sun: string;
  };
  contactEmail: string;
  contactPhone: string;
  managerName: string;
}

export interface FilterState {
  city: string;
  district: string;
  status: string; // '不限' | '現在開放中' | '休息中'
}
