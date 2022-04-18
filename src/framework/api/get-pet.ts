import { ClientBuilder } from "@/api/request";
import { normalisePets } from "@/framework/normallize/customer";
import Mock from "mockjs";
import { petListSource,petDetailSource } from "@/views/petOwnerDetail/modules/mockdata";

const apiRoot = new ClientBuilder();

export const getPetList = async ({ customerId }: { customerId: string }) => {
  try {
    const pets = await apiRoot.pets().getPets({ customerId });
    return normalisePets(pets);
  } catch (e) {
    return Mock.mock(petListSource).array;
  }
};

export const getPetDetail = async ({ id }: { id: string }) => {
  try {
    // const pet = await apiRoot.pets().getPet({ id });
    // return normalisePet(pet);
  } catch (e) {
    return Mock.mock(petDetailSource);
  }
};
