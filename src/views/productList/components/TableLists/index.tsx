import { useEffect, useMemo, useState } from 'react'
import { cloneDeep } from 'lodash'
import { Checkbox, Pagination } from 'antd'
import './index.less'
import { tableHeaders } from '../../modules/constant'
import { ProductListItemProps, ProductListProps } from '@/framework/types/product'
import TableRow from '../TableRow'
import TableHeader from '../TableHeader'
import TableFooter from '../TableFooter'
interface ListTableProps {
  listData: ProductListProps
}
const ListTable = ({ listData }: ListTableProps) => {
  const [list, setList] = useState<ProductListItemProps[]>(cloneDeep(listData.products))
  const [checkedAll, setCheckedAll] = useState(false)
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
  const handleCheckedAll = () => {
    list.forEach(el => {
      el.checked = !checkedAll
    })
    setCheckedAll(!checkedAll)
    setList(cloneDeep(list))
  }
  const handlePagination = (page: number, pageSize: number) => {
    console.info(page, pageSize)
  }
  const indeterminate = useMemo(() => !checkedAll && list.some(el => el.checked), [checkedAll, list])

  return (
    <div>
      <div >
        <div className="flex py-3 bg-gray1 border ">
          <div className="px-2 flex justify-center items-center">
            <Checkbox
              indeterminate={indeterminate}
              checked={checkedAll}
              onChange={handleCheckedAll}
            />
          </div>
          <TableHeader tableHeader={tableHeader} setTableHeader={setTableHeader} />
        </div>
        {list.map((spu, spuIdx) => (
          <TableRow
            spu={spu}
            onChange={onChange}
            spuIdx={spuIdx}
            tableHeader={tableHeader}
            listData={listData.products}
            list={list}
            setList={setList}
          />
        ))}
      </div>
      <div className='bg-white'>
        <Pagination className='text-right my-8' onChange={handlePagination} defaultCurrent={1} total={50} />
      </div>
      <TableFooter list={list}>
        <Checkbox indeterminate={indeterminate} checked={checkedAll} onChange={handleCheckedAll} />
      </TableFooter>
    </div>
  )
}
export default ListTable
