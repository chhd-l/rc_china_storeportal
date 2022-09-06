import { replyTypeList } from "./constants";
import { statusList } from "@/views/accountList/modules/constants";
import intl from 'react-intl-universal'

export const formItems = [
  {
    label: intl.get('reply.Reply Type'),
    name: "type",
    placeholder: intl.get('public.select'),
    type: "select",
    selectList: replyTypeList,
  },
  { label: intl.get('reply.Content Description'), name: "description", placeholder: intl.get('public.input') },
  {
    label: intl.get('public.status'),
    name: "status",
    placeholder: intl.get('public.select'),
    type: "select",
    selectList: statusList,
  },
];
