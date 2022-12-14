import { ProductListItemProps } from "@/framework/types/product"
import { cloneDeep } from "lodash"
import { FC } from "react"
interface Props {
  spuIdx: number
  list: ProductListItemProps[]
  setList: (list: ProductListItemProps[]) => void
  listData: ProductListItemProps[]
}
const ShowMoreButton: FC<Props> = ({
  spuIdx,
  list,
  children,
  setList,
  listData,
}) => {
  const hanldeshowAll = (idx: number) => {
    let originalList = cloneDeep(listData)
    if (list[idx].showAll) {
      list[idx].skus = list[idx].skus.slice(0, 3)
    } else {
      list[idx].skus = originalList[idx].skus
    }
    list[idx].showAll = !list[idx].showAll
    setList(cloneDeep(list))
  }
  return (
    <div className="cursor-pointer" onClick={() => hanldeshowAll(spuIdx)}>
      <div className="border-b border-solid mt-4 boder-gary-400 relative mb-8">
        <div className="absolute bg-white px-4 py-2 left-2/4 -translate-x-2/4 -translate-y-2/4 show-more-btn">
          {children}
        </div>
      </div>
    </div>
  )
}
export default ShowMoreButton
