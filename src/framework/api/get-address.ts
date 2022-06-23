import ApiRoot from './fetcher'

export const getAddressList = async ({ consumerId }: { consumerId: string }) => {
  try {
    const addresses = await ApiRoot.addresses().getAddresses({ consumerId })
    return addresses
  } catch (e) {
    console.log(e)
    return []
  }
}
