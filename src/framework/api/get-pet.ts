import ApiRoot from './fetcher'
import { normalisePets, normalisePet } from '@/framework/normallize/customer'
import Mock from 'mockjs'
import { petListSource, petDetailSource } from '@/views/petOwnerDetail/modules/mockdata'

export const getPetList = async ({ customerId }: { customerId: string }) => {
  try {
    const pets = await ApiRoot.pets().getPets({ customerId })
    return normalisePets(pets)
  } catch (e) {
    console.log(e)
    return Mock.mock(petListSource).array
  }
}

export const getPetDetail = async ({ id }: { id: string }) => {
  try {
    const pet = await ApiRoot.pets().getPet({ id })
    console.log('pet',pet)
    return normalisePet(pet)
  } catch (e) {
    console.log(e)
    return Mock.mock(petDetailSource)
  }
}
