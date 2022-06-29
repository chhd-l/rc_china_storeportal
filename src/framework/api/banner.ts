import ApiRoot from './fetcher'
import apis from '../config/api-config'

export const getBannerFindPage = async (params: any) => {
  try {
    let res = await ApiRoot().banner().bannerFindPage(params)
    console.log('get tag list view data', res)
    return res
  } catch (e) {
    console.log(e)
    return []
  }
}
export const bannerCreate = async (params: any, operator: string) => {
  try {
    let res = await ApiRoot().banner().bannerCreate(params, operator)
    console.log('get tag list view data', res)
    return res
  } catch (e) {
    console.log(e)
    return []
  }
}
export const bannerGetDetailById = async (id: string) => {
  try {
    let res = await ApiRoot().banner().bannerGetDetailById(id)
    console.log('get tag list view data', res)
    return res
  } catch (e) {
    console.log(e)
    return []
  }
}
export const bannerUpdate = async (params: any, operator: string) => {
  try {
    let res = await ApiRoot().banner().bannerUpdate(params, operator)
    console.log('get tag list view data', res)
    return res
  } catch (e) {
    console.log(e)
    return []
  }
}
export const bannerDeleteById = async (id: string, operator: string) => {
  try {
    let res = await ApiRoot().banner().bannerDeleteById(id, operator)
    console.log('get tag list view data', res)
    return res
  } catch (e) {
    console.log(e)
    return []
  }
}
export const brandFind = async (companyId: string) => {
  try {
    let res = await ApiRoot().banner().brandFind(companyId)
    console.log('get tag list view data', res)
    return res.brandFind || []
  } catch (e) {
    console.log(e)
    return []
  }
}
export const storeFind = async (companyId: string, brandIds: any) => {
  try {
    let res = await ApiRoot().banner().storeFind(companyId, brandIds)
    console.log('get tag list view data', res)
    return res.storeFind || []
  } catch (e) {
    console.log(e)
    return []
  }
}
export const userFindBrandIds = async (companyId: string, id: any) => {
  try {
    let res = await ApiRoot({ url: apis?.auth }).banner().userFindBrandIds(companyId, id)
    console.log('get tag list view data', res)
    return res.userFindBrandIds || []
  } catch (e) {
    console.log(e)
    return []
  }
}
export const userFindStoreIds = async (companyId: string, id: any, brandId: any) => {
  try {
    let res = await ApiRoot({ url: apis?.auth }).banner().userFindStoreIds(companyId, id, brandId)
    console.log('get tag list view data', res)
    return res.userFindStoreIds || []
  } catch (e) {
    console.log(e)
    return []
  }
}
