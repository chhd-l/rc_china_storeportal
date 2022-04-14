import { replyTypeList } from "./constants";
import { statusList } from "@/views/accountList/modules/constants";

export const formItems = [
  {
    label: "Reply Type",
    name: "type",
    placeholder: "select",
    type: "select",
    searchList: replyTypeList,
  },
  { label: "Content Description", name: "description", placeholder: "Input" },
  {
    label: "Status",
    name: "type",
    placeholder: "select",
      type: "select",
    searchList: statusList,
  },
];
