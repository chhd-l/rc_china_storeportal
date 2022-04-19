import { Pet } from '@/api/types/pet'

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
    age: 1,
    birthday: pet.birthday,
  }
}

export const normalisePets = (pets: Pet[]) => {
  return pets.map((item) => {
    return normalisePet(item)
  })
}

export const normaliseCustomer = (customer: any) => {
  let reg = new RegExp('/', "g")
  return {
    id: customer.id,
    image: customer.avatarUrl,
    name: customer.name,
    phone: customer.phone,
    loginTime: new Date(customer.lastLoginTime).toLocaleString().replace(reg, '-'),
    nickname: customer.nickName,
    level: customer.level,
  }
}

export const normalisePetOwnerList = (customers: any[]) => {
  return customers.map((item) => {
    return normaliseCustomer(item)
  })
}
