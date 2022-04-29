import { ProductListItemProps, TableHeadersItemProps } from '@/framework/types/product'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Checkbox } from 'antd'
import ShowMoreButton from '../ShowMoreButton'
import { Link } from 'react-router-dom'
import { DeleteOutlined, EyeOutlined, EditOutlined, DownloadOutlined } from '@ant-design/icons'
import { deleteProducts, getScProducts, switchShelves } from '@/framework/api/get-product'
import { cloneDeep } from 'lodash'

interface TableRowProps {
  spu: ProductListItemProps
  onChange: (idx: number) => void
  spuIdx: number
  tableHeader: TableHeadersItemProps[]
  listData: ProductListItemProps[]
  list: ProductListItemProps[]
  setList: (list: ProductListItemProps[]) => void
  setListData: Function
}

const TableRow = ({ spu, onChange, spuIdx, tableHeader, listData, list, setList, setListData }: TableRowProps) => {
  const istb = (sku: any) => {
    if (!tableHeader.length) return
    return tableHeader.map(item => {
      if (item.dataIndex !== 'name') {
        return (
          <div className='flex-1 flex justify-center h-full'>
            {item.dataIndex === 'price' ? <span className='font-extralight'>￥</span> : ''}
            {sku[item.dataIndex]}
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
          <div className='text-sm mb-1'>{spu.name}</div>
          <div className='text-gray-400'>{spu.no}</div>
        </div>
      </div>
      <div className=' w-3/5'>
        {spu.skus.map((sku: any, index: number) => (
          <div className='flex py-1 justify-stretch items-baseline'>{istb(sku)}</div>
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
        <Link to='' className='mr-4'>
          <span className='icon iconfont icon-preview'></span>
        </Link>
        <Link className='mr-4' to={`/product/${listData[spuIdx]?.id}`}>
          <span className='icon iconfont icon-Edit'></span>
        </Link>
        <Link to='' className='mr-4'>
          <span
            className={`icon iconfont ${listData[spuIdx].shelvesStatus}  ${
              listData[spuIdx].shelvesStatus ? 'icon-Frame4' : 'icon-xiajia'
            } text-base`}
            onClick={async () => {
              console.info('............', listData[spuIdx])
              debugger
              let { shelvesStatus } = listData[spuIdx]
              switchShelves({ goodsId: [listData[spuIdx]?.id], status: !shelvesStatus })
              // listData[spuIdx].shelvesStatus = !shelvesStatus
              // setList(cloneDeep(listData))
              let res = await getScProducts({
                limit: 10,
                sample: {},
                isNeedTotal: true,
                operator: 'sss',
                offset: 0,
              })
              console.info('resgetScproducts', res)
              setListData(res)
            }}
          ></span>
        </Link>
        <Link to=''>
          <span
            className='icon iconfont icon-Frame3 text-base'
            onClick={async () => {
              console.info('............', listData[spuIdx])
              // let { shelvesStatus } = listData[spuIdx]
              deleteProducts({ goodsId: [listData[spuIdx]?.id] })
              // listData[spuIdx].shelvesStatus = !shelvesStatus
              // setList(cloneDeep(listData))
              let res = await getScProducts({
                limit: 10,
                sample: {},
                isNeedTotal: true,
                operator: 'sss',
                offset: 0,
              })
              console.info('resgetScproducts', res)
              setListData(cloneDeep(res))
            }}
          ></span>
        </Link>
      </div>
    </div>
  )
}
export default TableRow
