import { Pet } from '@/api/types/pet'
import { getAge, handleReturnTime } from '@/utils/utils'

export const normalisePet = (pet: any) => {
  //todo
  //1、获取breedList进行breed匹配  2、根据birthday计算age
  return {
    id: pet.id,
    image: pet.image,
    name: pet.name,
    breed: pet.breedCode,
    gender: pet.gender,
    type: pet.type,
    isSterilized: pet.isSterilized,
    age: getAge(pet.birthday),
    birthday: handleReturnTime(pet.birthday),
  }
}

export const normalisePets = (pets: Pet[]) => {
  return pets.map((item) => {
    return normalisePet(item)
  })
}

export const normaliseCustomer = (customer: any) => {
  return {
    id: customer?.id,
    image: customer?.avatarUrl,
    name: customer?.name,
    phone: customer?.phone,
    loginTime: handleReturnTime(customer?.lastLoginTime),
    nickname: customer?.nickName,
    level: customer?.level,
  }
}

export const normalisePetOwnerList = (customers: any[]) => {
  return customers.map((item) => {
    return normaliseCustomer(item)
  })
}

export const normalisePetOwnerTag = (customerTag: any) => {
  return {
    id: customerTag.id,
    name: customerTag.name,
    isEnabled: customerTag.isEnabled,
  }
}

export const normalisePetOwnerTagList = (customerTags: any[]) => {
  return customerTags.map((item) => {
    return normalisePetOwnerTag(item.tag)
  })
}
