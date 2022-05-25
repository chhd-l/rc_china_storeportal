import ApiRoot from './fetcher'

export const getTags = async (params: any) => {
  try {
    let res = await ApiRoot.tags().getTags({ body: params })
    console.log('get tag list view data', res)
    return res?.findTagPage
  } catch (e) {
    console.log(e)
    return []
  }
}

export const createTag = async (params: any) => {
  try {
    let res = await ApiRoot.tags().createTag({ body: params })
    console.log('get tag list view data', res)
    return res

  } catch (e) {
    console.log(e)
    return []
  }
}
export const deleteTag = async (params: any) => {
  try {
    let res = await ApiRoot.tags().deleteTag(params)
    console.log('get tag list view data', res)
    return res
  } catch (e) {
    console.log(e)
    return []
  }
}
export const detailTag = async (params: any) => {
  try {
    let res = await ApiRoot.tags().detailTag({ body: params })
    console.log('get tag list view data', res)
    return res
  } catch (e) {
    console.log(e)
    return []
  }
}
export const addCustomerTag = async (params: any) => {
  try {
    let res = await ApiRoot.tags().addCustomerTag(params)
    console.log('get tag list view data', res)
    return res
  } catch (e) {
    console.log(e)
    return []
  }
}
export const removeCustomerTag = async (params: any) => {
  try {
    let res = await ApiRoot.tags().removeCustomerTag(params)
    console.log('get tag list view data', res)
    return res
  } catch (e) {
    console.log(e)
    return []
  }
}
export const updateTag = async (params: any) => {
  try {
    let res = await ApiRoot.tags().updateTag(params)
    console.log('get tag list view data', res)
    return res
  } catch (e) {
    console.log(e)
    return []
  }
}
