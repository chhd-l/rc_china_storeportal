import { replyTypeList } from "./constants";
import { statusList } from "@/views/accountList/modules/constants";

export const formItems = [
  {
    label: "Reply Type",
    name: "type",
    placeholder: "Select",
    type: "select",
    selectList: replyTypeList,
  },
  { label: "Content Description", name: "description", placeholder: "Input" },
  {
    label: "Status",
    name: "status",
    placeholder: "Select",
    type: "select",
    selectList: statusList,
  },
];
