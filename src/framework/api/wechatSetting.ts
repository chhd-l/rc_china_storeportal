import ApiRoot from '@/framework/api/fetcher'
import { normaliseBrands, normaliseMediaList } from '@/framework/normalize/wechatSetting'

// 查询 account
export const getAccountList = async (queryParams: any) => {
  try {
    let res = await ApiRoot.wechatSettings().getAccounts({ body: queryParams })
    const accounts = res?.accounts
    //todo account manage normalize
    console.log('get wechat setting account list view data', accounts)
    return {
      total: accounts.total || 0,
      records: accounts.records || [],
    }
  } catch (e) {
    console.log(e)
    return {
      total: 0,
      records: [],
    }
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
export const syncFans = async () => {
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
    let res = await ApiRoot.wechatSettings().getMedias({ body: { ...queryParams, accountId: '000001' } })
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
      mediaInput: Object.assign(
        {
          accountId: '000001',
          type: queryParams.type,
          url: queryParams.url,
          status: false,
          fileExtension: queryParams.fileExtension,
        },
        queryParams.type === 'video'
          ? {
            title: queryParams.title,
            description: queryParams.description,
          }
          : {},
      ),
      operator: 'zz',
    })
    const addMedia = res?.addMedia
    console.log('create media view data', addMedia)
    return addMedia || false
  } catch (e) {
    console.log(e)
    return false
  }
}

export const updateMedia = async (queryParams: any) => {
  try {
    let res = await ApiRoot.wechatSettings().modifyMedia(queryParams)
    const modifyMedia = res?.modifyMedia
    console.log('create media view data', modifyMedia)
    return modifyMedia || false
  } catch (e) {
    console.log(e)
    return false
  }
}

export const syncMedias = async (type: string) => {
  try {
    let res = await ApiRoot.wechatSettings().syncMedia({ accountId: '000001', type })
    const syncSuccess = res?.data?.syncMedia
    console.log('sync media view data', syncSuccess)
    return syncSuccess || false
  } catch (e) {
    console.log(e)
    return false
  }
}
export const getBrands = async (storeId: string) => {
  try {
    let res = await ApiRoot.wechatSettings().getBarndList({ storeId })
    console.log('getBrands', res)
    let list = normaliseBrands(res?.listBrandByStoreId || [])
    return list
  } catch (e) {
    console.log(e)
    return []
  }
}

// 查询 小程序二维码
export const getAppQrCodes = async (queryParams: any) => {
  try {
    //todo 查询参数处理
    const params = {
      offset: 0,
      limit: 10,
      isNeedTotal: true,
      // sample:{}
    }
    let res = await ApiRoot.wechatSettings().getAppQrCodes({ body: params })
    const findWxAppQRCodePage = res?.findWxAppQRCodePage
    //todo fans manage normalize
    console.log('get appQrCode list view data', findWxAppQRCodePage)
    return findWxAppQRCodePage
  } catch (e) {
    console.log(e)
    return []
  }
}

// 新增、编辑、删除 小程序二维码
export const upsertAppQrCodes = async (queryParams: any) => {
  try {
    //todo 参数处理 编辑参数加id,删除参数加id and isDeleted
    const params = {
      accountId: '22c2f601-5a60-8b10-20c1-c56ef0d8bd53',
      scenarioId: 'mockScenarioId',
      type: 'mocktype',
      key: 'MY_QRCODE_HOME',
      appInternalPath: '/pages/index/index',
      width: 300,
      isHyaline: false,
      imgUrl: 'https://dtc-platform.oss-cn-shanghai.aliyuncs.com/05774105-6b54-384d-7ce9-5f75fcd1a98c.png',
      operator: 'zz',
    }
    let res = await ApiRoot.wechatSettings().updateAppQrCode({ body: params })
    const upsertWxAppQRCode = res?.upsertWxAppQRCode
    console.log('upsert app qrCode view data', upsertWxAppQRCode)
    return upsertWxAppQRCode || false
  } catch (e) {
    console.log(e)
    return false
  }
}

// 查询二维码列表
export const getQrCodes = async (queryParams: any) => {
  try {
    //todo 查询参数处理
    const params = {
      offset: 0,
      limit: 10,
      accountId: "000001"
      // sample:{}
    }
    let res = await ApiRoot.wechatSettings().getQrCodes({ body: params })
    const qrCodeList = res?.qrCodeList
    //todo fans manage normalize
    console.log('get qrCode list view data', qrCodeList)
    return {
      records: qrCodeList.records || [],
      total: qrCodeList.total || 0,
    }
  } catch (e) {
    console.log(e)
    return {
      records: [],
      total: 0,
    }
  }
}
