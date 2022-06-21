import { normaliseAttrProps } from './product'
import { WxReplyContent, AutoReplies } from "@/framework/types/wechat"
import { handleReturnTime } from '@/utils/utils'

export const normaliseMedia = (media: any) => {
  return {
    id: media.id,
    picture: media.url,
    assetId: media.mediaId,
    assetLink: media.wxUrl,
    createTime: handleReturnTime(media.createdAt),
    status: media.status ? 'Synchronized' : 'Not Synchronized',
    video: media.url,
    voice: media.url,
    assetTitle: media.title,
    graphic: media.url,
    syncTime: '',
    description: media.description
  }
}

export const normaliseMediaList = (medias: any[]) => {
  return medias.map((item) => {
    return normaliseMedia(item)
  })
}

export const normaliseBrands = (data: any) => {
  return data.map((item: any) => {
    return { name: item.id, value: item.id, label: item.displayName }
  })
}

export const normaliseReplyContent: (data: any) => WxReplyContent[] = (data) => {
  return data.map((item: any) => ({
    id: item.id,
    type: item.responseType,
    description: item.responseDescribe,
    status: item.isActive,
    content: item.messageContent,
    accountId: item.accountId,
    mediaId: item.mediaId,
    mediaTitle: item.title,
    mediaDescription: item.description,
  }))
}

export const normaliseAutoReplies: (data: any) => AutoReplies = (data) => {
  return {
    id: data?.id,
    accountId: data?.accountId,
    principal: data?.accountPrincipal,
    accountName: data?.accountName,
    matchType: data?.matchType,
    keywords: data?.keyWords,
    responseId: data?.replyContentId,
    responseType: data?.responseType,
    responseDes: data?.responseDescribe,
    status: data?.isActive
  }
}