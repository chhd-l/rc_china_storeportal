import {PageParamsProps} from "@/framework/types/common";

export const PHONEREGCONST =
  /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;

export const IconStyle={
    color: "rgba(239, 68, 68,1)", fontSize: "20px"
}

export const initPageParams: PageParamsProps = {
    currentPage: 1,
    pageSize: 10,
}
