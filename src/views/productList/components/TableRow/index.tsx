import { ProductListItemProps, TableHeadersItemProps } from '@/framework/types/product'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Checkbox } from 'antd'
import ShowMoreButton from '../ShowMoreButton'
import { Link } from "react-router-dom";
import {
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

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

  const istb = (sku: any) => {
    if (!tableHeader.length) return
    console.log('tableHeader', tableHeader)
    return tableHeader.map((item) => {
      if (item.dataIndex !== 'name') {
        console.log('item',item)
        return (
          <div className='flex-1 flex justify-center h-full'>
            {item.dataIndex === "price" ? "￥" + sku[item.dataIndex] : sku[item.dataIndex]}
          </div>
        )
      }
    })
  }

  return (
    <div className='flex bg-white border-b text-left items-center pt-2 pb-2'>
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
          <div className='text-sm font-bold mb-1'>{spu.name}</div>
          <div className='text-gray-400'>{spu.no}</div>
        </div>
      </div>
      <div className=' w-3/5'>
        {spu.skus.map((sku: any, index: number) => (
          <div className='flex py-1 justify-stretch items-baseline font-semibold'>
            {istb(sku)}
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
      <div className='w-64 flex justify-center text-12'>
        <Link to='' className="mr-4">
          <span className='icon iconfont icon-preview'></span>
        </Link>
        <Link className="mr-4" to={`/product/${spuIdx}`}>
          <span className='icon iconfont icon-Edit'></span>
        </Link>
        <Link to='' className='mr-4'>
          <span className='icon iconfont icon-xiajia text-base'></span>
        </Link>
        <Link to=''>
          <span className='icon iconfont icon-Frame3 text-base'></span>
        </Link>
      </div>
    </div>
  )
}
export default TableRow
