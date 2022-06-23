export type WxMenuItem = {
  type: "article_id" | "media_id" | "view" | "miniprogram"
  name: string
  key: string
  url?: string
  appid?: string
  pagePath?: string
  active?: boolean
  media_id?: string
  article_id?: string
  rc_preview_type?: "news" | "voice" | "video" | "image"
  rc_preview_news_media_id?: string
  rc_preview_news_url?: string
  rc_preview_image_media_id?: string
  rc_preview_image_url?: string
  rc_preview_voice_media_id?: string
  rc_preview_voice_url?: string
  rc_preview_video_media_id?: string
  rc_preview_video_url?: string

  sub_button?: WxMenuItem[]
}

export type WxMenu = {
  id?: string
  accountId?: string
  accountPrincipal?: string
  accountName?: string
  name?: string
  description?: string
  content?: string
  isEnabled?: boolean
  createdAt?: string
  lastModifiedAt?: string
}
