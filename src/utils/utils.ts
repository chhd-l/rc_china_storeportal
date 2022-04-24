import { LabelOptionProps, PageParamsProps } from "@/framework/types/common"
import { ReactNode } from "react"

export const getCurrencyCode = () => {
  return "￥"
}

export const formatMoney = (price: number) => {
  if (!price) {
    return ''
  }
  return getCurrencyCode() + price.toFixed(2)
}

export const handleValueEnum = (list: LabelOptionProps[]) => {
  let newEnum: { [x: string]: ReactNode } = {}
  list.forEach((item: LabelOptionProps) => {
    newEnum[item.value] = { text: item.label }
  })
  return newEnum
}

/**
 * 处理分页组件数据，达到前端分页的目的
 * @param pageParams
 */
export const handlePageParams = (pageParams: PageParamsProps) => {
  const { currentPage, pageSize } = pageParams
  return {
    offset: currentPage * pageSize - pageSize,
    limit: pageSize,
  }
}
