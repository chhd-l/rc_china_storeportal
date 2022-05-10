import { ProductListItemProps, TableHeadersItemProps } from '@/framework/types/product'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Checkbox, Tooltip, Modal, Image } from 'antd'
import ShowMoreButton from '../ShowMoreButton'
import { Link } from 'react-router-dom'
import { deleteProducts, switchShelves } from '@/framework/api/get-product'
import { useState } from 'react'

interface TableRowProps {
  spu: ProductListItemProps
  onChange: (idx: number) => void
  spuIdx: number
  tableHeader: TableHeadersItemProps[]
  listData: ProductListItemProps[]
  list: ProductListItemProps[]
  setList: (list: ProductListItemProps[]) => void
  getList: Function
}

const TableRow = ({ spu, onChange, spuIdx, tableHeader, listData, list, setList, getList }: TableRowProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const istb = (sku: any) => {
    if (!tableHeader.length) return
    return tableHeader.map(item => {
      if (item.dataIndex !== 'name') {
        return (
          <div className='flex-1 flex h-full'>
            {item.dataIndex === 'price' ? <span className='font-extralight'>￥</span> : ''}
            {sku[item.dataIndex]}
          </div>
        )
      }
    })
  }

  const handleOk = async (id: string) => {
    setIsModalVisible(false)
    deleteProducts({ goodsId: [id] })
    getList()
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div className='flex bg-white border-b text-left items-center pt-2 pb-2 productlist-bg'>
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
        <div className='pl-2'>
          <div className='text-sm mb-1'>{spu.name}</div>
          <div className='text-gray-400'>{spu.no}</div>
        </div>
      </div>
      <div className=' w-3/5'>
        {spu?.skus?.map((sku: any, index: number) => (
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
      <div className='w-64 flex text-12'>
        <Tooltip title='Preview'>
          <Link to='' className='mr-4'>
            <span className='icon iconfont icon-preview'></span>
          </Link>
        </Tooltip>
        <Tooltip title='Edit'>
          <Link className='mr-4' to={`/product/${listData[spuIdx]?.id}`}>
            <span className='icon iconfont icon-Edit'></span>
          </Link>
        </Tooltip>
        <Tooltip title={`${listData[spuIdx]?.shelvesStatus ? 'Delist' : 'Publish'}`}>
          <Link to='' className='mr-4'>
            <span
              className={`icon iconfont ${listData[spuIdx]?.shelvesStatus}  ${
                !listData[spuIdx]?.shelvesStatus ? 'icon-Frame4' : 'icon-xiajia'
              } text-base`}
              onClick={async () => {
                let { shelvesStatus } = listData[spuIdx]
                switchShelves({ goodsId: [listData[spuIdx]?.id], status: !shelvesStatus })
                getList()
              }}
            ></span>
          </Link>
        </Tooltip>
        <Tooltip title='Delete'>
          <Link to=''>
            <span
              className='icon iconfont icon-delete text-base'
              onClick={() => {
                setIsModalVisible(true)
              }}
            ></span>
          </Link>
        </Tooltip>
        <Modal
          title='Delete Product'
          visible={isModalVisible}
          onOk={() => handleOk(listData[spuIdx]?.id)}
          onCancel={handleCancel}
        >
          <div style={{ wordBreak: 'break-word' }}>
            Are you sure want to delete the following product ? Warning: You cannot undo this action!
          </div>
          <p className='flex items-center'>
            <Image width={110} src={listData[spuIdx]?.img} />
            <div className='font-semibold w-full pl-4'>{listData[spuIdx]?.name}</div>
          </p>
        </Modal>
      </div>
    </div>
  )
}
export default TableRow
