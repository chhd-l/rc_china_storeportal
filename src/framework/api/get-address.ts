import ApiRoot from './fetcher'

export const getAddressList = async ({ customerId }: { customerId: string }) => {
  try {
    const addresses = await ApiRoot.addresses().getAddresses({ customerId })
    return addresses
  } catch (e) {
    console.log(e)
    return []
  }
}
