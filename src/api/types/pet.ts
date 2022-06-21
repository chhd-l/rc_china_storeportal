export interface Pet {
  id?: String;
  name: String;
  gender: String;
  type: String;
  breedCode: String;
  image: String;
  isSterilized: Boolean;
  birthday: Date;
  consumerId: String;
  operator: String;
}

export interface PetInput {
  name: String;
  gender: String;
  type: String;
  breedCode: String;
  image: String;
  isSterilized: Boolean;
  birthday: Date;
  consumerId: String;
  operator: String;
}
