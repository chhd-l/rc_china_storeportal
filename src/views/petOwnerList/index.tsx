import Table from "./components/Table";
import Mock from "mockjs";
import React, { useEffect, useState } from "react";
import { Customer } from "@/framework/types/customer";
import Search from "./components/Search";
import { petOwnerListSource } from "@/views/petOwnerDetail/modules/mockdata";
import {
  ContentContainer,
  SearchContainer,
  TableContainer,
} from "@/components/ui";
import { Divider } from "antd";

const PetOwnerList = () => {
  const [petOwnerList, setPetOwnerList] = useState<Customer[]>([]);

  useEffect(() => {
    setPetOwnerList(Mock.mock(petOwnerListSource).array);
  }, []);

  const getPetOwnerList = () => {};

  return (
    <ContentContainer>
      <SearchContainer>
        <div className="text-xl font-medium">My Pet Owner</div>
        <Divider />
        <Search query={getPetOwnerList} />
      </SearchContainer>
      <TableContainer>
        <Table petOwnerList={petOwnerList} />
      </TableContainer>
    </ContentContainer>
  );
};
export default PetOwnerList;
