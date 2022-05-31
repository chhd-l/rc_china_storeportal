export interface LiveStreaming {
  id: string
  name: string
  roomId: number
  coverImg?: string
  shareImg?: string
  liveImg?: string
  liveStatus: number //直播间状态。101：直播中，102：未开始，103已结束，104禁播，105：暂停，106：异常，107：已过期
  startTime: string
  endTime: string
  anchorName: string
  liveType?: number
  createdAt?: string
  accountId?:string
  accountPrincipal:string
  accountName:string
}
