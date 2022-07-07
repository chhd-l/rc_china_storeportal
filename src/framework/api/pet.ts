import apis from '@/framework/config/api-config'
import ApiRoot from './fetcher'
import { normalisePets } from '@/framework/normalize/consumer'
import Mock from 'mockjs'
import { petListSource } from '@/views/petOwnerDetail/modules/mockdata'

const isMock = false

export const getPetList = async ({ consumerId }: { consumerId: string }) => {
  try {
    if (isMock) {
      return Mock.mock(petListSource).array
    } else {
      const pets = await ApiRoot({ url: apis?.common_pet }).pets().getPets({ consumerId })
      return normalisePets(pets)
    }
  } catch (e) {
    console.log(e)
    return []
  }
}
