export const getAllPetsQuery = `
  query getAllPets($consumerId: String!){
    pets(consumerId: $consumerId) {
      id,
      name,
      gender,
      type,
      breedCode,
      image,
      isSterilized,
      
    }
  }
`;
//birthday
