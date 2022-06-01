import ApiRoot from './fetcher'

export const getBannerFindPage = async (params: any) => {
  try {
    let res = await ApiRoot.banner().bannerFindPage(params)
    console.log('get tag list view data', res)
    return res
  } catch (e) {
    console.log(e)
    return []
  }
}
export const bannerCreate = async (params: any,operator:string) => {
  try {
    let res = await ApiRoot.banner().bannerCreate(params,operator)
    console.log('get tag list view data', res)
    return res
  } catch (e) {
    console.log(e)
    return []
  }
}
export const bannerGetDetailById = async (id:string) => {
  try {
    let res = await ApiRoot.banner().bannerGetDetailById(id)
    console.log('get tag list view data', res)
    return res
  } catch (e) {
    console.log(e)
    return []
  }
}
export const bannerUpdate = async (params:any,operator:string) => {
  try {
    let res = await ApiRoot.banner().bannerUpdate(params, operator)
    console.log('get tag list view data', res)
    return res
  } catch (e) {
    console.log(e)
    return []
  }
}
  export const bannerDeleteById = async (id: string, operator: string) => {
    try {
      let res = await ApiRoot.banner().bannerDeleteById(id, operator)
      console.log('get tag list view data', res)
      return res
    } catch (e) {
      console.log(e)
      return []
    }
  }
