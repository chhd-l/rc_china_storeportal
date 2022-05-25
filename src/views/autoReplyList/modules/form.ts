import { SearchFormItemProps, BaseListProps } from "@/framework/types/common";
import { statusList } from "@/views/accountList/modules/constants";
import { matchTypeList } from "./constants";

export const getFormItems: (accountList: BaseListProps[]) => SearchFormItemProps[] = (accountList) => ([
  {
    label: "Official Name",
    name: "name",
    placeholder: "select",
    type: "select",
    selectList: accountList,
  },
  {
    label: "Match Type",
    name: "type",
    placeholder: "select",
    type: "select",
    selectList: matchTypeList,
  },
  {
    label: "Keywords",
    name: "keywords",
    placeholder: "keywords",
  },
  {
    label: "Status",
    name: "status",
    placeholder: "select",
    type: "select",
    selectList: statusList,
  },
]);
