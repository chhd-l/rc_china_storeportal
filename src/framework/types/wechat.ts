export interface Account {
  id: string;
  principal: string;
  type: string;
  name: string;
  officialType: string;
  status: boolean;
}

export interface Fans {
  id: string;
  account: string;
  avatar: string;
  name: string;
  sex: string;
  isMember: boolean;
  followTime: string;
  status: string;
  language: string;
  country: string;
  province: string;
  city: string;
  openId: string;
  unionId: string;
  comment: string;
  qrCode: string;
}

export interface AutoReplies {
  id: string;
  principal: string;
  matchType: string;
  keywords: string;
  responseType: string;
  responseDes: string;
  status: boolean;
}

export interface ReplyContent {
  id: string;
  type: string;
  description: string;
  status: boolean;
}
