import ApiRoot from '@/framework/api/fetcher'
import { normaliseMediaList } from '@/framework/normalize/wechatSetting'

export const getAccountList = async (queryParams: any) => {
  try {
    //todo 查询参数处理
    const params = {
      storeId: '12345678',
      // accountName: '',
      // officialAccountType: '',
      // status: true,
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

export const getFansList = async (queryParams: any) => {
  try {
    //todo 查询参数处理
    const params = {
      offset: 0,
      limit: 10,
      isNeedTotal: true,
      operator: 'zz',
      accountId: '00000001',
    }
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

export const createAccount = async (queryParams: any) => {
  try {
    //todo 新增参数处理
    const params = {
      accountPrincipal: '111',
      accountName: '111',
      appId: '111',
      appSecret: '111',
      managementMode: '111',
      officialAccountType: '111',
      accountType: '111',
      merchantId: '111',
      merchantKey: '111',
      pushServerURL: '111',
      messageEncryption: '111',
      token: '111',
      qrCodePath: '111',
      certificatePath: '111',
      description: '111',
      storeId: '111',
    }
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

export const modifyAccount = async (queryParams: any) => {
  try {
    //todo 编辑参数处理（改了什么传什么，加上isDeleted就是删除接口）
    const params = {
      account: {
        id: '3c00e55e-fbfc-43be-cb82-6fd8364b5ea2',
        accountName: '4444',
      },
      isDeleted: true,
    }
    let res = await ApiRoot.wechatSettings().modifyAccount({ body: params })
    const modifySuccess = res?.modifyAccount
    console.log('modifyAccount account view data', modifySuccess)
    return modifySuccess
  } catch (e) {
    console.log(e)
    return []
  }
}

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
