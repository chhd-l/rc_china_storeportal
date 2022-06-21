import ApiRoot from '@/framework/api/fetcher'
import { normaliseBrands, normaliseMediaList } from '@/framework/normalize/wechatSetting'

// 查询 account
export const getAccountList = async (queryParams: any) => {
  try {
    let res = await ApiRoot.wechatSettings().getAccounts({ body: queryParams })
    const accounts = res?.wxAccountFindPage
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
    const fansList = res?.wxFansFindPage
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
    const account = res?.wxAccountCreate
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
    const syncAccount = res?.wxAccountCreate
    console.log('sync account view data', syncAccount)
    return syncAccount || false
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
    const modifySuccess = res?.wxAccountUpdate
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
    const syncSuccess = res?.wxFansSync
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
      openIds: syncParams,
    }
    let res = await ApiRoot.wechatSettings().syncPartFans(params)
    const syncSuccess = res?.wxFansSyncPartly
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
    const mediaList = res?.wxMediaFindPage
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
      operator: queryParams.operator || 'system',
    })
    const addMedia = res?.wxAccountCreate
    console.log('create media view data', addMedia)
    return addMedia || false
  } catch (e) {
    console.log(e)
    return false
  }
}

export const createMediaAndSync = async (queryParams: any) => {
  try {
    let res = await ApiRoot.wechatSettings().createMediaAndSync({
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
      operator: queryParams.operator || 'system',
    })
    const mediaAsset = res?.wxMediaCreateAndSyc
    console.log('create mediaAndSync view data', mediaAsset);
    return mediaAsset || false
  } catch (e) {
    console.log(e)
    return false
  }
}

export const updateMedia = async (queryParams: any) => {
  try {
    let res = await ApiRoot.wechatSettings().modifyMedia(queryParams)
    const modifyMedia = res?.wxMediaUpdate
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
    const syncSuccess = res?.wxMediaSync
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
    let list = normaliseBrands(res?.brandFind || [])
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
    const findWxAppQRCodePage = res?.wxAppQRCodeFindPage
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
    let res = await ApiRoot.wechatSettings().updateAppQrCode({ body: queryParams })
    const upsertWxAppQRCode = res?.wxAppQRCodeModify
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
    const qrCodeList = res?.wxQrCodeFindPage
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
    let res = await ApiRoot.wechatSettings().addQrCode({ input: queryParams, operator: 'cc' })
    const addQrCode = res?.wxQrCodeCreate
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
    const templateItemList = res?.wxTemplateItemFindPage
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

export const syncTemplateItem = async (params: { operator: string }) => {
  try {
    let res = await ApiRoot.wechatSettings().syncTemplateItem(Object.assign(params, { accountId: '000001' }))
    const syncTemplateItem = res?.wxTemplateItemSync
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
    const templateMessageList = res?.wxTemplateMessageFindPage
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
    const templateMessageDetails = res?.wxTemplateMessageGet
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
    const createTemplateMessage = res?.wxTemplateMessageCreate
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
    const modifyTemplateMessage = res?.wxTemplateMessageUplete
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
    const industry = res?.wxIndustryGet
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
    const syncIndustry = res?.wxIndustrySync
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
    const list = res?.wxMenuFindPage
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
    const updated = res?.wxMenuUpsert
    console.log('update wxmenu view data', updated)
    return updated || false
  } catch (e) {
    console.log(e)
    return false
  }
}

/**
 * 创建微信公众号菜单
 * @param wxMenusContent
 * @returns
 */
export const createWxMenu = async (name: string, wxMenusContent: string, description: string) => {
  try {
    let res = await ApiRoot.wechatSettings().createWxMenu({
      accountId: '000001',
      name,
      description,
      content: wxMenusContent,
      operator: 'zz'
    })
    console.log('create wxmenu view data', res)
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

export const getWxMenuDetail = async (id: string) => {
  try {
    let data = await ApiRoot.wechatSettings().getWxMenuDetailById(id)
    console.log('get wxmenu detail view data', data)
    return data?.wxMenuGet
  } catch (e) {
    console.log(e)
    return null
  }
}

export const getReplyContentList = async (queryParams: any) => {
  const data = await ApiRoot.wechatSettings().getReplyContentList({ body: queryParams });
  const list = data?.wxReplyContentFindPage
  console.log('get replyContent view data:', list)
  return {
    records: list?.records ?? [],
    total: list?.total ?? 0
  }
}

export const getReplyContentDetail = async (id: string) => {
  const res = await ApiRoot.wechatSettings().getReplyContentDetail(id);
  const data = res?.wxReplyContentGet
  console.log('get replyContent detail by id view data:', data)
  return data ?? {}
}

export const createReplyContent = async (params: any) => {
  const data = await ApiRoot.wechatSettings().createReplyContent({
    body: params,
    operator: 'zz'
  })
  console.log('create replyContent view data:', data)
  return data?.wxReplyContentCreate ?? {}
}

export const deleteReplyContent = async (id: string) => {
  const data = await ApiRoot.wechatSettings().modifyReplyContent({
    body: {
      id,
      isDeleted: true,
      operator: 'zz',
    }
  });
  console.log('delete replyContent view data:', data)
  return data?.wxReplyContentUpsert ?? false
}

export const updateReplyContent = async (id: string, param: any) => {
  const data = await ApiRoot.wechatSettings().modifyReplyContent({
    body: {
      id: id,
      isDeleted: false,
      operator: 'zz',
      replyContent: param,
    }
  });
  console.log('disable or enable replyContent view data:', data);
  return data?.wxReplyContentUpsert ?? false
}

export const getAutomaticResponseList = async (param: any) => {
  const data = await ApiRoot.wechatSettings().getAutomaticResponseList({
    body: param,
    operator: 'zz'
  });
  const list = data?.wxAutomaticResponseFindPage
  console.log('get WxAutomaticResponse list view data:', data);
  return {
    records: list?.records ?? [],
    total: list?.total ?? 0
  }
}

export const getAutomaticResponseDetail = async (id: string) => {
  const data = await ApiRoot.wechatSettings().getAutomaticResponseDetail(id);
  console.log('get WxAutomaticResponse detail by id view data:', data);
  return data?.wxAutomaticResponseGet ?? {}
}

export const createAutomaticResponse = async (param: any) => {
  const data = await ApiRoot.wechatSettings().createAutomaticResponse({
    body: param
  });
  console.log('create WxAutomaticResponse view data:', data);
  return data?.wxAutomaticResponseCreate ?? {}
}

export const deleteAutomaticResponse = async (id: string) => {
  const data = await ApiRoot.wechatSettings().updateAutomaticResponse({
    body: {
      id,
      isDeleted: true,
    }
  });
  console.log('delete WxAutomaticResponse view data:', data);
  return data?.wxAutomaticResponseModify ?? false
}

export const updateAutomaticResponse = async (id: string, param: any) => {
  const data = await ApiRoot.wechatSettings().updateAutomaticResponse({
    body: {
      isDeleted: false,
      id,
      automaticResponse: param,
    }
  });
  console.log('update WxAutomaticResponse view data:', data);
  return data?.wxAutomaticResponseModify ?? false
}

export const getArticlesList = async (param: any) => {
  const data = await ApiRoot.wechatSettings().getArticlesList({
    body: param
  });
  console.log('get article list view data:', data);
  return {
    records: data?.wxArticleFindPage?.records ?? [],
    total: data?.wxArticleFindPage?.total ?? 0
  }
}

export const syncArticles = async (accountId: string) => {
  const data = await ApiRoot.wechatSettings().syncArticles(accountId);
  console.log('sync articles view data:', data);
  return data?.wxArticleSync ?? false
}

export const deleteArticles = async (id: string, mediaId: string) => {
  const data = await ApiRoot.wechatSettings().deleteArticles(id, mediaId);
  console.log('delete articles view data:', data);
  return data?.wxArticleDelete ?? false
}

export const addArticle = async (param: any) => {
  const data = await ApiRoot.wechatSettings().addArticles({
    body: {
      accountId: '000001',
      operator: 'zz',
      articleList: param
    }
  });
  console.log('add article view data:', data);
  return data?.wxArticleCreate ?? {}
}

export const addAndSyncArticle = async (param: any) => {
  const data = await ApiRoot.wechatSettings().addAndSyncArticles({
    body: {
      accountId: '000001',
      operator: 'zz',
      articleList: param
    }
  });
  console.log('add articleandsync view data:', data);
  return data?.wxArticleCreateAndSync ?? {}
}

export const getArticlePreviewUrls = async (mediaId: string) => {
  const data = await ApiRoot.wechatSettings().getArticlesPreviewUrls(mediaId);
  console.log('get previewurls view data:', data);
  return data?.wxArticleGetUrlFromWX ?? []
}
