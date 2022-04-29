import { useEffect, useMemo, useState } from 'react'
import { cloneDeep } from 'lodash'
import { Checkbox, Empty, Pagination } from 'antd'
import './index.less'
import { tableHeaders } from '../../modules/constant'
import { ProductListItemProps, ProductListProps } from '@/framework/types/product'
import TableRow from '../TableRow'
import TableHeader from '../TableHeader'
import TableFooter from '../TableFooter'
interface ListTableProps {
  listData: ProductListProps
  handlePagination: any
  setListData: Function
}
const ListTable = ({ listData, handlePagination, setListData }: ListTableProps) => {
  const [list, setList] = useState<ProductListItemProps[]>(cloneDeep(listData.products))
  const [checkedAll, setCheckedAll] = useState(false)
  const [checkedItem, setCheckedItem] = useState(false)
  const [tableHeader, setTableHeader] = useState(tableHeaders)
  useEffect(() => {
    let newList = cloneDeep(listData.products).map(item => {
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
    setCheckedAll(list.every(el => el.checked))
    setList(cloneDeep(list))
  }
  useEffect(() => {
    if (list.some(el => el.checked)) {
      setCheckedItem(true)
    } else {
      setCheckedItem(false)
    }
  }, [list])
  const handleCheckedAll = () => {
    list.forEach(el => {
      el.checked = !checkedAll
    })
    setCheckedAll(!checkedAll)
    setList(cloneDeep(list))
  }
  const indeterminate = useMemo(() => !checkedAll && list.some(el => el.checked), [checkedAll, list])

  return (
    <div>
      <div>
        <div className='flex py-3 bg-gray1 border '>
          <div className='px-2 flex justify-center items-center'>
            <Checkbox indeterminate={indeterminate} checked={checkedAll} onChange={handleCheckedAll} />
          </div>
          <TableHeader setListData={setListData} tableHeader={tableHeader} setTableHeader={setTableHeader} />
        </div>
        {list.length ? (
          list.map((spu, spuIdx) => (
            <TableRow
              key={spu.id}
              setListData={setListData}
              spu={spu}
              onChange={onChange}
              spuIdx={spuIdx}
              tableHeader={tableHeader}
              listData={listData.products}
              list={list}
              setList={setList}
            />
          ))
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
      {list.length ? (
        <>
          <div className='bg-white'>
            <Pagination
              className='text-right my-8'
              showSizeChanger
              onChange={handlePagination}
              defaultCurrent={1}
              total={6}
              pageSize={2}
            />
          </div>
        </>
      ) : null}
      {checkedItem ? (
        <TableFooter list={list} setListData={setListData}>
          <Checkbox indeterminate={indeterminate} checked={checkedAll} onChange={handleCheckedAll} />
        </TableFooter>
      ) : null}
    </div>
  )
}
export default ListTable
