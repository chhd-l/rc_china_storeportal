import { TableHeadersItemProps } from '@/framework/types/product'
import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons'
import { cloneDeep } from 'lodash'
import './index.less'
export type TableHeaderProps = {
  tableHeader: TableHeadersItemProps[]
  getList: Function
  setTableHeader: (header: TableHeadersItemProps[]) => void
}
const TableHeader = ({ tableHeader, setTableHeader, getList }: TableHeaderProps) => {
  const handleSort = (key: string, index: number, sortDirection?: string) => {
    tableHeader.forEach(el => {
      if (el.sortDirection !== undefined) {
        el.sortDirection = ''
      }
    })
    tableHeader[index].sortDirection = sortDirection
    setTableHeader(cloneDeep(tableHeader))
    // 接口请求
    if (sortDirection) {
      getList({ sortKey: key, sortDirection })
    } else {
      getList()
    }
    console.info('key', key, sortDirection)
  }
  console.info('tableHeader', tableHeader)
  return (
    <div className='table-header flex justify-stretch items-baseline w-full'>
      {tableHeader.map((item, idx) => (
        <div className={`flex items-center ${item.dataIndex === 'name' ? 'w-64' : 'flex-1'}`}>
          <div> {item.title}</div>
          {item.sortDirection !== undefined ? (
            <div style={{ fontSize: '0.6rem' }} className='pl-1 cursor-pointer'>
              <div className='relative' style={{ lineHeight: 0, top: '2px' }}>
                <CaretUpFilled
                  onClick={() => {
                    console.info('ascendascend')
                    if (item.sortDirection) {
                      handleSort(item.dataIndex, idx, '')
                    } else {
                      handleSort(item.dataIndex, idx, 'ascend')
                    }
                  }}
                  className={item.sortDirection === 'ascend' ? 'active' : ''}
                />
              </div>
              <div style={{ lineHeight: 0 }}>
                <CaretDownFilled
                  onClick={() => {
                    console.info('descend')
                    if (item.sortDirection) {
                      handleSort(item.dataIndex, idx, '')
                    } else {
                      handleSort(item.dataIndex, idx, 'descend')
                    }
                  }}
                  className={item.sortDirection === 'descend' ? 'active' : ''}
                />
              </div>
            </div>
          ) : null}
        </div>
      ))}
      <div className='flex justify-left items-center w-64'>
        <div>Options</div>
      </div>
    </div>
  )
}

export default TableHeader
