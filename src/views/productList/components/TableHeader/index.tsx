import { TableHeadersItemProps } from "@/framework/types/product"
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons"
import { cloneDeep } from "lodash"
import "./index.less"
export type TableHeaderProps = {
  tableHeader: TableHeadersItemProps[]
  setTableHeader: (header: TableHeadersItemProps[]) => void
}
const TableHeader = ({ tableHeader, setTableHeader }: TableHeaderProps) => {
  const handleSort = (key: string, index: number, sortDirection?: string) => {
    tableHeader.forEach((el) => {
      if (el.sortDirection !== undefined) {
        el.sortDirection = ""
      }
    })
    tableHeader[index].sortDirection =
      sortDirection === "ascend" ? "descend" : "ascend"
    setTableHeader(cloneDeep(tableHeader))
    // 接口请求
    console.info("key", key)
  }
  return (
    <div className="table-header flex">
      {tableHeader.map((item, idx) => (
        <div className={`flex items-center ${idx === 0 ? "w-52" : "w-40"} `}>
          <div> {item.title}</div>
          {item.sortDirection !== undefined ? (
            <div
              onClick={() => {
                handleSort(item.dataIndex, idx, item.sortDirection)
              }}
              style={{ fontSize: "0.6rem" }}
              className="pl-1 cursor-pointer"
            >
              <div className="relative top-1">
                <CaretUpFilled
                  className={item.sortDirection === "ascend" ? "active" : ""}
                />
              </div>
              <div className="relative -top-2">
                {item.sortDirection === "descend"}
                <CaretDownFilled
                  className={item.sortDirection === "descend" ? "active" : ""}
                />
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}

export default TableHeader
