import { ProductListItemProps, TableHeadersItemProps } from '@/framework/types/product'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Checkbox } from 'antd'
import ShowMoreButton from '../ShowMoreButton'

interface TableRowProps {
  spu: ProductListItemProps
  onChange: (idx: number) => void
  spuIdx: number
  tableHeader: TableHeadersItemProps[]
  listData: ProductListItemProps[]
  list: ProductListItemProps[]
  setList: (list: ProductListItemProps[]) => void
}
const TableRow = ({ spu, onChange, spuIdx, tableHeader, listData, list, setList }: TableRowProps) => {
  return (
    <div className='flex bg-white border-b border-solid border-gray-400 text-left'>
      <div className='px-2 py-1'>
        <Checkbox
          checked={spu.checked}
          onChange={() => {
            onChange(spuIdx)
          }}
        />
      </div>
      <div className='w-64 flex py-1'>
        <div>
          <img src={spu.img} className='w-20 h-20' alt={spu.name} />
        </div>
        <div className='pl-1'>
          <div>{spu.name}</div>
          <div className='text-gray-400'>{spu.no}</div>
        </div>
      </div>
      <div>
        {spu.skus?.map((sku: any, index: number) => (
          <div className='flex py-1'>
            {tableHeader.map((item, itemIdx) => (
              <>
                {itemIdx > 0 ? (
                  <div className='w-40'>
                    {item.dataIndex !== 'actions' && sku[item.dataIndex]}
                    {item.dataIndex === 'actions' && index === 0 ? item?.render?.(spu, spuIdx) : null}
                  </div>
                ) : null}
              </>
            ))}
          </div>
        ))}
        {spu.showAll === false && spu.skus?.length > 3 ? (
          <ShowMoreButton listData={listData} spuIdx={spuIdx} list={list} setList={setList}>
            <div className='flex items-center'>
              More({listData[spuIdx].skus.length - 3} Products SKUs) <DownOutlined />
            </div>
          </ShowMoreButton>
        ) : null}
        {spu.showAll === true && spu.skus?.length > 3 ? (
          <ShowMoreButton listData={listData} spuIdx={spuIdx} list={list} setList={setList}>
            <div className='flex items-center'>
              hide <UpOutlined />
            </div>
          </ShowMoreButton>
        ) : null}
      </div>
    </div>
  )
}
export default TableRow
