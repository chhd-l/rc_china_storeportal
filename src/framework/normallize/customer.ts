import { Pet } from "@/api/types/pet";

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
  };
};

export const normalisePets = (pets: Pet[]) => {
  return pets.map((item) => {
    return normalisePet(item);
  });
};
