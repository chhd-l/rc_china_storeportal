import ApiRoot from './fetcher'
import Mock from 'mockjs'
import { liveStreamMockData } from '@/views/liveStreamingList/modules/mockdata'

const isMock = true

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
export const syncLiveStreaming = async () => {
  try {
    if (isMock) {
      return true
    } else {
      let res = await ApiRoot.liveStreams().syncLiveStreaming('000001')
      return res?.syncLiveStreaming || false
    }
  } catch (e) {
    console.log(e)
    return false
  }
}
