import apis from '@/framework/config/api-config'
import ApiRoot from './fetcher'
import { normaliseConsumer, normalisePetOwnerList } from '@/framework/normalize/consumer'

interface ConsumerSample {
  nickName?: string
  phone?: string
}

interface ConsumerWhere {
  lastLoginTimeFrom?: string
  lastLoginTimeTo?: string
}

interface QueryParamsProps {
  withTotal: boolean
  limit: number
  offset: number
  sample?: ConsumerSample
  where?: ConsumerWhere
}

export const getPetOwnerList = async (queryParams: any) => {
  try {
    let res = await ApiRoot({ url: apis?.consumer }).consumers().getConsumers(queryParams)
    console.log('petOwnerList', res)
    return Object.assign(res, { records: normalisePetOwnerList(res.records) })
  } catch (e) {
    console.log(e)
    return []
  }
}

export const getCustomAccount = async ({ consumerId }: { consumerId: string }) => {
  try {
    let res = await ApiRoot({ url: apis?.consumer }).consumers().getConsumerAccounts(consumerId)
    console.log('consumerAccount', res)
    return res
  } catch (e) {
    console.log(e)
    return []
  }
}

export const getConsumer = async ({ consumerId }: { consumerId: string }) => {
  try {
    let res = await ApiRoot({ url: apis?.consumer }).consumers().getConsumer({ id: consumerId })
    console.log('consumer info', res)
    return normaliseConsumer(res)
  } catch (e) {
    console.log(e)
    return {}
  }
}

export const getConsumerAddressList = async (consumerId: string) => {
  const res = await ApiRoot({ url: apis?.address_list }).addresses().getAddresses({ consumerId })
  console.log('get consumer addresses view data:', res)
  return res || []
}
