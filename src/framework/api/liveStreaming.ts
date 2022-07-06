import ApiRoot from './fetcher'
import Mock from 'mockjs'
import { liveStreamMockData } from '@/views/liveStreamingList/modules/mockdata'
import apis from '@/framework/config/api-config'

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
      let res = await ApiRoot({url:apis?.liveStreaming}).liveStreams().getLiveStreamingList(parma)
      return {
        total: res?.total || 0,
        records: res?.records || [],
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

//获取实时的直播列表
export const getLiveStreamingOnlineList = async (parma: any) => {
  try {
    if (isMock) {
      return {
        total: 100,
        records: Mock.mock(liveStreamMockData).array,
      }
    } else {
      let res = await ApiRoot({url:apis?.liveStreaming}).liveStreams().getLiveStreamingOnlineList(parma)
      return {
        total: res?.total || 0,
        records: res?.records || [],
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
      let res = await ApiRoot({url:apis?.liveStreaming}).liveStreams().syncLiveStreaming(accountId)
      return res
    }
  } catch (e) {
    console.log(e)
    return false
  }
}

//同步部分直播
export const syncPartLiveStreaming = async (liveStreamingInput: any) => {
  try {
    if (isMock) {
      return true
    } else {
      let res = await ApiRoot({url:apis?.liveStreaming}).liveStreams().syncPartLiveStreaming(liveStreamingInput)
      return res
    }
  } catch (e) {
    console.log(e)
    return false
  }
}
