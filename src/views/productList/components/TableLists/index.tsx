import { ProductListItemProps, ProductListProps } from '@/framework/types/product'
import { Checkbox, Empty, Pagination } from 'antd'
import { cloneDeep } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { tableHeaders } from '../../modules/constant'
import TableFooter from '../TableFooter'
import TableHeader from '../TableHeader'
import TableRow from '../TableRow'
import './index.less'

interface Pages {
  page: number | undefined
  pageSize: number | undefined
}
interface ListTableProps {
  listData: ProductListProps
  handlePagination: any
  pages: Pages
  getList: Function
  setLoading: Function
  loading: boolean
}

const ListTable = ({ listData, handlePagination, getList, pages, setLoading, loading }: ListTableProps) => {
  const [list, setList] = useState<ProductListItemProps[]>(cloneDeep(listData.products))
  const [checkedAll, setCheckedAll] = useState(false)
  const [checkedItem, setCheckedItem] = useState(false)
  const [tableHeader, setTableHeader] = useState(tableHeaders)
  useEffect(() => {
    let newList = cloneDeep(listData.products).map((item) => {
      let newItem = item
      if (item.skus?.length > 3) {
        newItem.skus = item.skus.slice(0, 3)
        newItem.showAll = false
      }
      return newItem
    })
    setList(newList)
  }, [listData])
  const onChange = (idx: number) => {
    list[idx].checked = !list[idx].checked
    setCheckedAll(list.every((el) => el.checked))
    setList(cloneDeep(list))
  }
  useEffect(() => {
    if (list.some((el) => el.checked)) {
      setCheckedItem(true)
    } else {
      setCheckedItem(false)
    }
  }, [list])
  const handleCheckedAll = () => {
    list.forEach((el) => {
      el.checked = !checkedAll
    })
    setCheckedAll(!checkedAll)
    setList(cloneDeep(list))
  }
  const indeterminate = useMemo(() => !checkedAll && list.some((el) => el.checked), [checkedAll, list])

  return (
    <div>
      <div className="border" style={{ borderRadius: '4px' }}>
        <div className="flex py-3 bg-gray1  border-b">
          <div className="px-2 flex items-center">
            <Checkbox indeterminate={indeterminate} checked={checkedAll} onChange={handleCheckedAll} />
          </div>
          <TableHeader getList={getList} tableHeader={tableHeader} setTableHeader={setTableHeader} />
        </div>
        {list.length ? (
          list.map((spu, spuIdx) => (
            <TableRow
              key={spu.id}
              getList={getList}
              spu={spu}
              setLoading={setLoading}
              onChange={onChange}
              spuIdx={spuIdx}
              tableHeader={tableHeader}
              listData={listData.products}
              list={list}
              setList={setList}
            />
          ))
        ) : loading ? null : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
      {list.length ? (
        <>
          <div className="bg-white">
            <Pagination
              className="text-right my-8"
              showSizeChanger
              current={pages.page}
              onChange={handlePagination}
              defaultCurrent={pages.page}
              total={listData.total}
              pageSize={pages.pageSize}
            />
          </div>
        </>
      ) : null}
      {checkedItem ? (
        <TableFooter getList={getList} list={list} setLoading={setLoading} loading={loading}>
          <Checkbox indeterminate={indeterminate} checked={checkedAll} onChange={handleCheckedAll} />
        </TableFooter>
      ) : null}
    </div>
  )
}
export default ListTable
