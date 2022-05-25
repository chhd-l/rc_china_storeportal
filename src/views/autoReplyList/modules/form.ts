import { SearchFormItemProps, BaseListProps } from "@/framework/types/common";
import { statusList } from "@/views/accountList/modules/constants";
import { matchTypeList } from "./constants";

export const getFormItems: (accountList: BaseListProps[]) => SearchFormItemProps[] = (accountList) => ([
  {
    label: "Official Name",
    name: "name",
    placeholder: "Select",
    type: "select",
    selectList: accountList,
  },
  {
    label: "Match Type",
    name: "type",
    placeholder: "Select",
    type: "select",
    selectList: matchTypeList,
  },
  {
    label: "Keywords",
    name: "keywords",
    placeholder: "Keywords",
  },
  {
    label: "Status",
    name: "status",
    placeholder: "Select",
    type: "select",
    selectList: statusList,
  },
]);
