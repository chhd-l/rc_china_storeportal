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
    return {
      records: fansList.records || [],
      total: fansList.total || 0,
    }
  } catch (e) {
    console.log(e)
    return {
      records: [],
      total: 0,
    }
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
    return {}
  }
}

// switch account
export const syncAccount = async (queryParams: any) => {
  try {
    //todo 参数处理
    const params = {
      // id,
      // isActive,
      // accountType
    }
    let res = await ApiRoot.wechatSettings().addAccount(params)
    const syncAccount = res?.syncAccount
    console.log('sync account view data', syncAccount)
    return syncAccount||false
  } catch (e) {
    console.log(e)
    return false
  }
}

// 编辑 accon 更新（不传isDeleted） 删除（isDeleted: true）
export const modifyAccount = async (queryParams: any) => {
  try {
    //todo 编辑参数处理（改了什么传什么，加上isDeleted就是删除接口）
    const params = queryParams
    let res = await ApiRoot.wechatSettings().modifyAccount({ body: params })
    const modifySuccess = res?.modifyAccount
    return modifySuccess || false
  } catch (e) {
    console.log(e)
    return false
  }
}
// 同步全部粉丝
export const syncFans = async () => {
  try {
    let res = await ApiRoot.wechatSettings().syncFans({ accountId: '000001' })
    const syncSuccess = res?.syncFans
    console.log('sync fans view data', syncSuccess)
    return syncSuccess || false
  } catch (e) {
    console.log(e)
    return false
  }
}

// 同步部分粉丝
export const syncPartFans = async (syncParams: any) => {
  try {
    const params = {
      accountId: '000001',
      openIds: [],
    }
    let res = await ApiRoot.wechatSettings().syncPartFans(params)
    const syncSuccess = res?.sycPartFans
    console.log('sync fans view data', syncSuccess)
    return syncSuccess || false
  } catch (e) {
    console.log(e)
    return false
  }
}

export const getMedias = async (queryParams: any) => {
  try {
    let res = await ApiRoot.wechatSettings().getMedias({ body: { ...queryParams, accountId: '000001' } })
    const mediaList = res?.mediaList
    mediaList.records = normaliseMediaList(mediaList.records)
    console.log('get wechat setting media list view data', mediaList)
    return {
      records: mediaList.records || [],
      total: mediaList.total || 0,
    }
  } catch (e) {
    console.log(e)
    return {
      records: [],
      total: 0,
    }
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
    const params = queryParams
    let res = await ApiRoot.wechatSettings().getAppQrCodes({ body: params })
    const findWxAppQRCodePage = res?.findWxAppQRCodePage
    //todo fans manage normalize
    console.log('get appQrCode list view data', findWxAppQRCodePage)
    return {
      records: findWxAppQRCodePage.records || [],
      total: findWxAppQRCodePage.total || 0,
    }
  } catch (e) {
    console.log(e)
    return {
      records: [],
      total: 0,
    }
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
    let res = await ApiRoot.wechatSettings().updateAppQrCode({ body: queryParams })
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
    const params = queryParams
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

// 新增二维码
export const createQrCode = async (queryParams: any) => {
  try {
    //todo 参数处理 编辑参数加id,删除参数加id and isDeleted
    let res = await ApiRoot.wechatSettings().addQrCode({ input: queryParams })
    const addQrCode = res?.addQrCode
    console.log('upsert app qrCode view data', addQrCode)
    return addQrCode
  } catch (e) {
    console.log(e)
    return {}
  }
}

// 查询
export const getTemplateItems = async (queryParams: any) => {
  try {
    const params = {
      offset: 0,
      limit: 10,
      accountId: '000001',
    }
    let res = await ApiRoot.wechatSettings().getTemplateItems({ body: params })
    const templateItemList = res?.templateItemList
    console.log('get templateItem list view data', templateItemList)
    return {
      records: templateItemList.records || [],
      total: templateItemList.total || 0,
    }
  } catch (e) {
    console.log(e)
    return {
      records: [],
      total: 0,
    }
  }
}

export const syncTemplateItem = async () => {
  try {
    let res = await ApiRoot.wechatSettings().syncTemplateItem({ accountId: '000001', operator: 'zz' })
    const syncTemplateItem = res?.syncTemplateItem
    console.log('sync template item view data', syncTemplateItem)
    return syncTemplateItem || false
  } catch (e) {
    console.log(e)
    return false
  }
}

// 查询
export const getTemplateMessages = async (queryParams: any) => {
  try {
    const params = Object.assign(queryParams, {
      accountId: '000001',
    })
    let res = await ApiRoot.wechatSettings().getTemplateMessages({ body: params })
    const templateMessageList = res?.templateMessageList
    console.log('get templateItem list view data', templateMessageList)
    return {
      records: templateMessageList.records || [],
      total: templateMessageList.total || 0,
    }
  } catch (e) {
    console.log(e)
    return {
      records: [],
      total: 0,
    }
  }
}

export const getTemplateDetail = async (id: string) => {
  try {
    let res = await ApiRoot.wechatSettings().getTemplateMessageDetail(id)
    const templateMessageDetails = res?.templateMessageDetails
    console.log('get template message detail view data', templateMessageDetails)
    return templateMessageDetails
  } catch (e) {
    console.log(e)
    return {}
  }
}

// 新增TemplateMessage
export const createTemplateMessage = async (queryParams: any) => {
  try {
    let res = await ApiRoot.wechatSettings().createTemplateMessage({ body: queryParams })
    const createTemplateMessage = res?.createTemplateMessage
    console.log('get templateItem list view data', createTemplateMessage)
    return createTemplateMessage || false
  } catch (e) {
    console.log(e)
    return false
  }
}

// 编辑、删除TemplateMessage
export const updateTemplateMessage = async (queryParams: any) => {
  try {
    let res = await ApiRoot.wechatSettings().modifyTemplateMessage({ body: queryParams, operator: 'zz' })
    const modifyTemplateMessage = res?.modifyTemplateMessage
    console.log('get templateItem list view data', modifyTemplateMessage)
    return modifyTemplateMessage || false
  } catch (e) {
    console.log(e)
    return false
  }
}

export const getIndustry = async () => {
  try {
    let res = await ApiRoot.wechatSettings().getAllIndustry('000001')
    const industry = res?.getIndustry
    console.log('get industry view data', industry)
    return industry
  } catch (e) {
    console.log(e)
    return {}
  }
}

export const syncIndustry = async () => {
  try {
    let res = await ApiRoot.wechatSettings().syncIndustry({ accountId: '000001' })
    const syncIndustry = res?.syncIndustry
    console.log('sync industry view data', syncIndustry)
    return syncIndustry
  } catch (e) {
    console.log(e)
    return {}
  }
}

/**
 * 查询微信公众号菜单列表
 * @param queryParams
 * @returns
 */
export const getWxMenusList = async (queryParams: any) => {
  try {
    const params = queryParams
    let res = await ApiRoot.wechatSettings().getWxMenus({ body: params })
    const list = res?.findWxMenuPage
    console.log('get wxmenus view data', list)
    return {
      records: list.records || [],
      total: list.total || 0,
    }
  } catch (e) {
    console.log(e)
    return {
      records: [],
      total: 0,
    }
  }
}

/**
 * 修改菜单状态
 * @param queryParams
 * @returns
 */
export const updateWxMenu = async (queryParams: any) => {
  try {
    let res = await ApiRoot.wechatSettings().upsertWxMenu(queryParams)
    const updated = res?.upsertWxMenu
    console.log('create media view data', updated)
    return updated || false
  } catch (e) {
    console.log(e)
    return false
  }
}
