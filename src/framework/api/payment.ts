import ApiRoot from './fetcher'
import apis from '@/framework/config/api-config'

export const payWayFindPage = async (params: any) => {
  try {
    let res = await ApiRoot({url:apis?.payment}).payments().payWayFindPage(params)
    return res
  } catch (e) {
    return []
  }
}

export const payWayGet = async (params: any) => {
  try {
    let res = await ApiRoot({url:apis?.payment}).payments().payWayGet(params)
    return res
  } catch (e) {
    return []
  }
}

export const payWayUpdate = async (params: any) => {
  try {
    let res = await ApiRoot({url:apis?.payment}).payments().payWayUpdate(params)
    return res
  } catch (e) {
    return false
  }
}

