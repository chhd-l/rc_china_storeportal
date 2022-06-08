import { SearchFormItemProps } from "@/framework/types/common";
import { officialTypeList, statusList } from "./constants";

export const formItems: SearchFormItemProps[] = [
  {
    label: "Account Name",
    name: "accountName",
    placeholder: "Input",
  },
  {
    label: "Official Account Type",
    name: "officialAccountType",
    placeholder: "Select",
    type: "select",
    selectList: officialTypeList,
  },
  {
    label: "Status",
    name: "status",
    placeholder: "Select",
    type: "select",
    selectList: statusList,
  },
];
