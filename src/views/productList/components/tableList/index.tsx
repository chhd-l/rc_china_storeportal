import { useEffect, useState } from "react"
import { cloneDeep } from "lodash"
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons"
import { Button, Checkbox, Pagination } from "antd"
import "./index.less"
import { tableHeaders } from "../../modules/constant"
import {
  ProductListItemProps,
  ProductListProps
} from "@/framework/types/product"
import TableRow from "../TableRow"
interface ListTableProps {
  listData: ProductListProps
}
const ListTable = ({ listData }: ListTableProps) => {
  const [list, setList] = useState<ProductListItemProps[]>(
    cloneDeep(listData.products)
  )
  const [indeterminate, setIndeterminate] = useState(false)
  const [checkedAll, setCheckedAll] = useState(false)
  const [tableHeader, setTableHeader] = useState(tableHeaders)
  useEffect(() => {
    let newList = cloneDeep(listData.products).map((item) => {
      let newItem = item
      if (item.skus.length > 3) {
        newItem.skus = item.skus.slice(0, 3)
        newItem.showAll = false
      }
      return newItem
    })
    setList(newList)
  }, [listData])
  const onChange = (idx: number) => {
    list[idx].checked = !list[idx].checked
    let checkedArr = list.filter((el) => el.checked)
    let notCheckedArr = list.filter((el) => !el.checked)
    let isNotCheckedAll = !!checkedArr.length && !!notCheckedArr.length
    setIndeterminate(isNotCheckedAll)
    notCheckedArr.length == list.length && setCheckedAll(false)
    checkedArr.length == list.length && setCheckedAll(true)
    setList(cloneDeep(list))
  }
  const handleCheckedAll = () => {
    let isChecked = false
    if (indeterminate || !checkedAll) {
      isChecked = true
    }
    list.forEach((el) => {
      el.checked = isChecked
    })
    setCheckedAll(!checkedAll)
    setIndeterminate(false)
    setList(cloneDeep(list))
  }
  const handlePagination = (page: number, pageSize: number) => {
    console.info(page, pageSize)
  }
  const handleSort = (key: string, index: number, sortDirection?: string) => {
    tableHeader.forEach((el) => {
      if (el.sortDirection !== undefined) {
        el.sortDirection = ""
      }
    })
    tableHeader[index].sortDirection =
      sortDirection == "ascend" ? "descend" : "ascend"
    setTableHeader(cloneDeep(tableHeader))
    // 接口请求
    console.info("key", key)
  }
  return (
    <div>
      <div className="border-l border-r border-solid border-gray-400">
        <div className="flex bg-gray-200 py-3">
          <div className="px-2">
            <Checkbox
              indeterminate={indeterminate}
              checked={checkedAll}
              onChange={handleCheckedAll}
            />
          </div>
          {tableHeader.map((item, idx) => (
            <div className={`flex items-center ${idx == 0 ? "w-52" : "w-40"} `}>
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
                      className={item.sortDirection == "ascend" ? "active" : ""}
                    />
                  </div>
                  <div className="relative -top-2">
                    {item.sortDirection == "descend"}
                    <CaretDownFilled
                      className={
                        item.sortDirection == "descend" ? "active" : ""
                      }
                    />
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        {list.map((spu, spuIdx) => (
          <TableRow
            spu={spu}
            onChange={onChange}
            spuIdx={spuIdx}
            tableHeader={tableHeader}
            listData={listData}
            list={list}
            setList={setList}
          />
        ))}
      </div>
      <div className="bg-white">
        <Pagination
          className="text-right my-8"
          onChange={handlePagination}
          defaultCurrent={1}
          total={500}
        />
      </div>
      <div className="bg-white flex justify-between py-4">
        <div>
          <Checkbox
            indeterminate={indeterminate}
            checked={checkedAll}
            onChange={handleCheckedAll}
          />
        </div>
        <div>
          <span className="mr-4">
            {list.filter((el) => el.checked)?.length || 0} products selected
          </span>
          <Button className="mr-4">Delete</Button>
          <Button className="mr-4">Delist</Button>
          <Button className="mr-4" type="primary">
            Publish
          </Button>
        </div>
      </div>
    </div>
  )
}
export default ListTable
