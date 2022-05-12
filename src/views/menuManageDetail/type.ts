export type WxMenuItem = {
  type: "media_id" | "view" | "miniprogram"
  name: string
  key: string
  url?: string
  appid?: string
  pagepath?: string
  active?: boolean
  media_id?: string
  sub_button?: WxMenuItem[]
}

export type WxMenu = {
  id?: string
  accountId?: string
  accountPrincipal?: string
  accountName?: string
  content?: string
  isEnabled?: boolean
  createdAt?: string
  lastModifiedAt?: string
}
