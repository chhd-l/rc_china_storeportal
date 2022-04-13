import Table from "./components/Table";
import Mock from "mockjs";
import React, { useEffect, useState } from "react";
import { Customer } from "@/framework/types/customer";
import Search from "./components/Search";
import { petOwnerListSource } from "@/views/petOwnerDetail/modules/mockdata";

const PetOwnerList = () => {
  const [petOwnerList, setPetOwnerList] = useState<Customer[]>([]);

  useEffect(() => {
    setPetOwnerList(Mock.mock(petOwnerListSource).array);
  }, []);

  const getPetOwnerList = () => {};

  return (
    <>
      <div className="bg-gray1 py-4 pl-4">
        <div className="bg-white">
          <div className="p-2 pb-4 text-xl font-medium text-left border-b">
            <span className="pl-4">My Pet Owner</span>
          </div>
          {/*search*/}
          <Search query={getPetOwnerList} />
          <div className="p-8">
            <Table petOwnerList={petOwnerList} />
          </div>
        </div>
      </div>
    </>
  );
};
export default PetOwnerList;
