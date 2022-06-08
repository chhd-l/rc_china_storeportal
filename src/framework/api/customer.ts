import ApiRoot from './fetcher'
import { normaliseCustomer, normalisePetOwnerList, normalisePetOwnerTagList } from '@/framework/normalize/customer'
import Mock from 'mockjs'
import { petOwnerListSource } from '@/views/petOwnerDetail/modules/mockdata'

interface CustomerSample {
  nickName?: string
  phone?: string
}

interface CustomerWhere {
  lastLoginTimeFrom?: string
  lastLoginTimeTo?: string
}

interface QueryParamsProps {
  isNeedTotal: boolean
  limit: number
  offset: number
  sample?: CustomerSample
  where?: CustomerWhere
}

export const getPetOwnerList = async (queryParams: any) => {
  try {
    let res = await ApiRoot.customers().getCustomers(queryParams)
    console.log('petOwnerList', res)
    const customers = Object.assign(res, { records: normalisePetOwnerList(res.records) })
    return customers
  } catch (e) {
    console.log(e)
    return []
  }
}

export const getCustomAccount = async ({ customerId }: { customerId: string }) => {
  try {
    let res = await ApiRoot.customers().getCustomerAccounts(customerId)
    console.log('customerAccount', res)
    return res
  } catch (e) {
    console.log(e)
    return []
  }
}

export const getCustomTags = async ({ customerId }: { customerId: string }) => {
  try {
    let res = await ApiRoot.customers().getCustomerTags(customerId)
    console.log('customerTags', res)
    const customerTags = normalisePetOwnerTagList(res || [])
    return customerTags
  } catch (e) {
    console.log(e)
    return []
  }
}

export const getCustomer = async ({ customerId }: { customerId: string }) => {
  try {
    let res = await ApiRoot.customers().getCustomer({ id: customerId })
    console.log('customer info', res)
    const customer = normaliseCustomer(res.customer)
    return customer
  } catch (e) {
    console.log(e)
    return {}
  }
}

export const getCustomerAddressList = async (customerId: string) => {
  const res = await ApiRoot.addresses().getAddresses({ customerId })
  console.log('get customer addresses view data:', res)
  return res || []
}
