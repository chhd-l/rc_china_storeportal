import { BaseListProps } from "@/framework/types/common";

export const replyTypeList: BaseListProps[] = [
  { label: "Text message", key: "text" },
  { label: "Picture message", key: "image" },
  { label: "Voice message", key: "voice" },
  { label: "Video message", key: "video" },
  { label: "Graphic message", key: "news" },
];

export const matchTypeList: BaseListProps[] = [
  {
    label: "Exact match",
    key: "EXACT_MATCH",
  },
  {
    label: "Fuzzy match",
    key: "FUZZY_MATCH",
  },
];
