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

export const normaliseConsumer = (consumer: any) => {
  return {
    id: consumer?.id,
    image: consumer?.avatarUrl,
    name: consumer?.name,
    phone: consumer?.phone,
    loginTime: handleReturnTime(consumer?.lastLoginTime),
    nickname: consumer?.nickName,
    level: consumer?.level,
  }
}

export const normalisePetOwnerList = (consumers: any[]) => {
  return consumers.map((item) => {
    return normaliseConsumer(item)
  })
}

export const normalisePetOwnerTag = (consumerTag: any) => {
  return {
    id: consumerTag.id,
    name: consumerTag.name,
    isEnabled: consumerTag.isEnabled,
  }
}

export const normalisePetOwnerTagList = (consumerTags: any[]) => {
  return consumerTags.map((item) => {
    return normalisePetOwnerTag(item.tag)
  })
}
