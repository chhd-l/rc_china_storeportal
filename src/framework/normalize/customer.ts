import { Pet } from '@/api/types/pet'
import { getAge, handleReturnTime } from '@/utils/utils'

export const normalisePet = (pet: any) => {
  return {
    id: pet.id,
    image: pet.image,
    name: pet.name,
    breed: pet.breedName,
    gender: pet.gender,
    type: pet.type,
    isSterilized: pet.isSterilized,
    age: getAge(pet.birthday),
    birthday: handleReturnTime(pet.birthday).split(' ')?.[0],
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
