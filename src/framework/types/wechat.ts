export interface WxAccount {
  id: string
  principal: string
  type: string
  name: string
  officialType: string
  status: boolean
}

export interface WxFans {
  id: string
  account: string
  accountPrincipal: string
  accountName: string
  avatar: string
  name: string
  sex: string
  isMember: boolean
  followTime: string
  status: string
  language: string
  country: string
  province: string
  city: string
  openId: string
  unionId: string
  comment: string
  qrCode: string
}

export interface AutoReplies {
  id: string
  accountId: string
  principal: string
  accountName: string
  matchType: string
  keywords: string
  responseId: string
  responseType: string
  responseDes: string
  status: boolean
}

export interface WxReplyContent {
  id: string
  type: string
  description: string
  status: boolean
  content?: string
  accountId?: string
  mediaId?: string
  mediaTitle?: string
  mediaDescription?: string
}

export interface Asset {
  id: string
  picture?: string
  assetId: string
  assetLink: string
  createTime: string
  status: string
  video?: string
  voice?: string
  assetTitle?: string
  graphic?: string
  syncTime: string
  description?: string
}

export interface TemplateMessageItemProps {
  id?: string,
  accountId?: string,
  scenario?: string,//用于场景
  templateId?: string,
  url?: string,// # 用户跳转路径
  appId?: string,//# 小程序id
  pagePath?: string,//# 小程序跳转路径
  status?: boolean,
  title?: string,
  primaryIndustry?: string,// # 一级行业
  deputyIndustry?: string,//  # 二级行业
  content?: string,// # 模板内容
  example?: string//  # 例子
}

export interface WxMenu {
  id: string
  accountId: string
  name: string
  description: string
  content: string
  createdAt: string
  lastModifiedAt: string
  isEnabled: boolean
}

export interface WxArticle {
  id: string
  title: string
  type: "image" | "voice" | "video" | "news",
  thumbMedia: Partial<Asset>
  author: string
  digest: string
  showCoverPic: number
  content: string
  contentSourceURL: string
  imageList?: Partial<Asset>[]
  voice?: Partial<Asset>
  video?: Partial<Asset>
}
