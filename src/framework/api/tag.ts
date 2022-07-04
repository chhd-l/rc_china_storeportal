import apis from '@/framework/config/api-config'
import ApiRoot from './fetcher'
import { normalisePetOwnerTagList } from '@/framework/normalize/consumer'

export const getTags = async (params: any) => {
  try {
    let res = await ApiRoot({url:apis?.tag}).tags().getTags({ body: params })
    console.log('get tag list view data', res)
    return res
  } catch (e) {
    console.log(e)
    return []
  }
}

export const createTag = async (params: any) => {
  try {
    let res = await ApiRoot({url:apis?.tag}).tags().createTag({ body: params })
    console.log('get tag list view data', res)
    return res
  } catch (e) {
    console.log(e)
    return false
  }
}

export const deleteTag = async (params: any) => {
  try {
    let res = await ApiRoot({url:apis?.tag}).tags().deleteTag(params)
    console.log('get tag list view data', res)
    return res
  } catch (e) {
    console.log(e)
    return false
  }
}

export const detailTag = async (params: any) => {
  try {
    let res = await ApiRoot({url:apis?.tag}).tags().detailTag({ body: params })
    console.log('get tag list view data', res)
    return res
  } catch (e) {
    console.log(e)
    return []
  }
}

export const addConsumerTag = async (params: any) => {
  try {
    let res = await ApiRoot({url:apis?.tag}).tags().addConsumerTag(params)
    console.log('get tag list view data', res)
    return res
  } catch (e) {
    console.log(e)
    return false
  }
}

export const removeConsumerTag = async (params: any) => {
  try {
    let res = await ApiRoot({url:apis?.tag}).tags().removeConsumerTag(params)
    console.log('get tag list view data', res)
    return res
  } catch (e) {
    console.log(e)
    return false
  }
}

export const updateTag = async (params: any) => {
  try {
    let res = await ApiRoot({url:apis?.tag}).tags().updateTag(params)
    console.log('get tag list view data', res)
    return res
  } catch (e) {
    console.log(e)
    return false
  }
}

export const getCustomTags = async ({ consumerId }: { consumerId: string }) => {
  try {
    let res = await ApiRoot({url:apis?.tag}).tags().getConsumerTags(consumerId)
    console.log('consumerTags', res)
    return normalisePetOwnerTagList(res || [])
  } catch (e) {
    console.log(e)
    return []
  }
}