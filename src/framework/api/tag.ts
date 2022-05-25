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
