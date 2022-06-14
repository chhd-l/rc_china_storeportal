import ApiRoot from './fetcher'
import Mock from 'mockjs'
import { liveStreamMockData } from '@/views/liveStreamingList/modules/mockdata'

const isMock = false

//获取直播列表
export const getLiveStreamingList = async (parma: any) => {
  try {
    if (isMock) {
      return {
        total: 100,
        records: Mock.mock(liveStreamMockData).array,
      }
    } else {
      let res = await ApiRoot.liveStreams().getLiveStreamingList(parma)
      return {
        total: res?.liveStreamingFindPage?.total || 0,
        records: res?.liveStreamingFindPage?.records || [],
      }
    }
  } catch (e) {
    console.log(e)
    return {
      total: 0,
      records: [],
    }
  }
}

//同步直播列表
export const syncLiveStreaming = async (accountId: string) => {
  try {
    if (isMock) {
      return true
    } else {
      let res = await ApiRoot.liveStreams().syncLiveStreaming(accountId)
      return res?.syncLiveStreaming || false
    }
  } catch (e) {
    console.log(e)
    return false
  }
}

//同步部分直播
export const syncPartLiveStreaming = async (accountId: string, roomId: any) => {
  try {
    if (isMock) {
      return true
    } else {
      let res = await ApiRoot.liveStreams().syncPartLiveStreaming(accountId, roomId)
      return res?.liveStreamingSyncByRoomId || false
    }
  } catch (e) {
    console.log(e)
    return false
  }
}
