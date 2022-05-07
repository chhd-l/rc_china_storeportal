import { normaliseAttrProps } from './product'
import { handleReturnTime } from '@/utils/utils'

export const normaliseMedia = (media: any) => {
  return {
    id: media.id,
    picture: media.url,
    assetId: media.mediaId,
    assetLink: media.url,
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
