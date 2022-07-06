import apis from '@/framework/config/api-config'
import ApiRoot from './fetcher'
import { normalisePets, normalisePet } from '@/framework/normalize/consumer'
import Mock from 'mockjs'
import { petListSource, petDetailSource } from '@/views/petOwnerDetail/modules/mockdata'

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

export const getPetDetail = async ({ id }: { id: string }) => {
  try {
    const pet = await ApiRoot({ url: apis?.common_pet }).pets().getPet({ id })
    console.log('pet', pet)
    return normalisePet(pet)
  } catch (e) {
    console.log(e)
    return Mock.mock(petDetailSource)
  }
}
