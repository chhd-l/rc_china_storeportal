import ApiRoot from '@/framework/api/fetcher'
import { normaliseMediaList } from '@/framework/normalize/wechatSetting'

// 查询 accon
export const getAccountList = async (queryParams: any) => {
  try {
    //todo 查询参数处理
    const params = {
      storeId: '12345678',
      ...queryParams
    }
    let res = await ApiRoot.wechatSettings().getAccounts({ body: params })
    const accounts = res?.accounts
    //todo account manage normalize
    console.log('get wechat setting account list view data', accounts)
    return accounts
  } catch (e) {
    console.log(e)
    return []
  }
}
// 查询 fans
export const getFansList = async (queryParams: any) => {
  try {
    //todo 查询参数处理
    const params = queryParams
    let res = await ApiRoot.wechatSettings().getFans({ body: params })
    const fansList = res?.fansList
    //todo fans manage normalize
    console.log('get wechat setting fans list view data', fansList)
    return fansList
  } catch (e) {
    console.log(e)
    return []
  }
}
// 新增 accon
export const createAccount = async (queryParams: any) => {
  try {
    //todo 新增参数处理
    const params = queryParams
    let res = await ApiRoot.wechatSettings().addAccount({ body: params })
    const account = res?.addAccount
    //todo account manage normalize
    console.log('create account view data', account)
    return account
  } catch (e) {
    console.log(e)
    return []
  }
}
// 编辑 accon 更新（不传isDeleted） 删除（isDeleted: true）
export const modifyAccount = async (queryParams: any) => {
  try {
    //todo 编辑参数处理（改了什么传什么，加上isDeleted就是删除接口）
    const params = queryParams
    let res = await ApiRoot.wechatSettings().modifyAccount({ body: params })
    const modifySuccess = res?.modifyAccount
    return modifySuccess
  } catch (e) {
    console.log(e)
    return []
  }
}
// 同步粉丝
export const syncFans = async (accountId: string) => {
  try {
    let res = await ApiRoot.wechatSettings().syncFans({ accountId: '000001' })
    const syncSuccess = res?.syncFans
    console.log('sync fans view data', syncSuccess)
    return syncSuccess
  } catch (e) {
    console.log(e)
    return []
  }
}

export const getMedias = async (queryParams: any) => {
  try {
    //todo 查询参数处理
    const params = {
      offset: 0,
      limit: 10,
      accountId: '000001',
      sample: { type: 'image' },
    }
    let res = await ApiRoot.wechatSettings().getMedias({ body: params })
    const mediaList = res?.mediaList
    mediaList.records = normaliseMediaList(mediaList.records)
    console.log('get wechat setting media list view data', mediaList)
    return mediaList
  } catch (e) {
    console.log(e)
    return []
  }
}

export const createMedia = async (queryParams: any) => {
  try {
    let res = await ApiRoot.wechatSettings().createMedia({
      mediaInput: {
        accountId: '000001',
        type: queryParams.type,
        url: queryParams.url,
        status: false,
        fileExtension: queryParams.fileExtension,
      },
      operator: 'zz',
    })
    const media = res?.addMedia
    console.log('create media view data', media)
    return media
  } catch (e) {
    console.log(e)
    return []
  }
}

export const updateMedia = async (queryParams: any) => {
  try {
    let res = await ApiRoot.wechatSettings().modifyMedia(queryParams)
    const media = res?.addMedia
    console.log('create media view data', media)
    return media
  } catch (e) {
    console.log(e)
    return []
  }
}
