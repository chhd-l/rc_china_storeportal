import { ClientBuilder } from "@/api/request";
import { normalisePets } from "@/framework/normallize/customer";
import Mock from "mockjs";
import { petListSource } from "@/views/petOwnerDetail/modules/mockdata";

const apiRoot = new ClientBuilder();

export const getPetList = async ({ customerId }: { customerId: string }) => {
  try {
    const pets = await apiRoot.pets().getPets({ customerId });
    return normalisePets(pets);
  } catch (e) {
    return Mock.mock(petListSource).array;
  }
};
