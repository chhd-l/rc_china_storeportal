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
    label: "Exact matching",
    key: "EXACT_MATCH",
  },
  {
    label: "Fuzzy matching",
    key: "FUZZY_MATCH",
  },
];
