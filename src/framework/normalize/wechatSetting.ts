export const normaliseMedia = (media: any) => {
  return {
    id: media.id,
    picture: media.url,
    assetId: media.mediaId,
    assetLink: media.url,
    createTime: media.createdAt,
    status: media.status?'Synchronized':'',
    video: media.url,
    voice: media.url,
    assetTitle: media.title,
    graphic: media.url,
    syncTime: '',
  }
}

export const normaliseMediaList = (medias: any[]) => {
  return medias.map((item) => {
    return normaliseMedia(item)
  })
}
