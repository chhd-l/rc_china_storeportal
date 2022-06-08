import { ProductListItemProps, TableHeadersItemProps } from '@/framework/types/product'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Checkbox, Tooltip, Modal, Image, message } from 'antd'
import ShowMoreButton from '../ShowMoreButton'
import { Link } from 'react-router-dom'
import { deleteProducts, switchShelves } from '@/framework/api/get-product'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import './index.less'

interface TableRowProps {
  spu: ProductListItemProps
  onChange: (idx: number) => void
  spuIdx: number
  tableHeader: TableHeadersItemProps[]
  listData: ProductListItemProps[]
  list: ProductListItemProps[]
  setList: (list: ProductListItemProps[]) => void
  getList: Function
  setLoading: Function
}

const TableRow = ({
  spu,
  onChange,
  spuIdx,
  tableHeader,
  listData,
  list,
  setList,
  getList,
  setLoading,
}: TableRowProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const navigator = useNavigate()
  const [imgUrl, setImgUrl] = useState('')
  const istb = (sku: any) => {
    if (!tableHeader.length) return
    return tableHeader.map(item => {
      if (item.dataIndex !== 'name') {
        return (
          <div className='flex-1 flex h-full'>
            <div className='truncate pr-2'>
              {item.dataIndex === 'price' ? <span className='font-extralight'>￥</span> : ''}
              {sku[item.dataIndex]}
            </div>
          </div>
        )
      }
    })
  }

  const handleOk = async (id: string) => {
    setIsModalVisible(false)
    setLoading(true)
    try {
      await deleteProducts({ goodsId: [id] })
      await getList()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
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
      <div className='w-64 flex py-1 pr-2 overflow-hidden'>
        <div className='w-20 h-20 flex justify-center items-center'>
          <img src={spu.img} alt={spu.name} />
        </div>
        <div className='pl-2 flex-1'>
          <div className='text-sm mb-1 two-lines'>{spu.name}</div>
          <div className='text-gray-400'>{spu.no}</div>
        </div>
      </div>
      <div className=' w-3/5 overflow-hidden'>
        {spu?.skus?.map((sku: any, index: number) => (
          <div className='flex py-1 justify-stretch items-baseline'>{istb(sku)}</div>
        ))}
        {spu.showAll === false && listData[spuIdx]?.skus?.length > 3 ? (
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
          <Link
            to=''
            className='mr-4'
            onClick={e => {
              e.stopPropagation()
              setImgUrl(listData[spuIdx]?.wxCodeUrl || '')
            }}
          >
            <span className='icon iconfont icon-preview'></span>
          </Link>
        </Tooltip>
        <Tooltip title='Edit'>
          <a
            className='mr-4'
            onClick={e => {
              e.stopPropagation()
              navigator('/product/product-detail', { state: listData[spuIdx]?.id })
            }}
          >
            <span className='icon iconfont icon-Edit'></span>
          </a>
        </Tooltip>
        <Tooltip title={`${listData[spuIdx]?.shelvesStatus ? 'Delist' : 'Publish'}`}>
          <Link to='' className='mr-4'>
            <span
              className={`icon iconfont ${listData[spuIdx]?.shelvesStatus}  ${
                !listData[spuIdx]?.shelvesStatus ? 'icon-Frame4' : 'icon-xiajia'
              } text-base`}
              onClick={async () => {
                let { shelvesStatus } = listData[spuIdx]
                try {
                  setLoading(true)
                  let res = await switchShelves({ goodsId: [listData[spuIdx]?.id], status: !shelvesStatus })
                  if (res) {
                    message.success({ className: 'rc-message', content: 'Operation success' })
                  } else {
                    message.error({ className: 'rc-message', content: 'Operation failed' })
                  }
                  await getList()
                } catch (err) {
                  console.info('err', err)
                }
                setLoading(false)
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
          okText='Delete'
          onOk={() => handleOk(listData[spuIdx]?.id)}
          onCancel={handleCancel}
        >
          <div style={{ wordBreak: 'break-word' }}>
            Are you sure want to delete the following product ? Warning: You cannot undo this action!
          </div>
          <p className='flex items-center'>
            <Image width={110} className='img' src={listData[spuIdx]?.img} />
            <div className='font-semibold w-full pl-4'>{listData[spuIdx]?.name}</div>
          </p>
        </Modal>
        {imgUrl ? (
          <Modal
            visible={!!imgUrl}
            closable={false}
            onCancel={() => {
              setImgUrl('')
            }}
            footer={null}
          >
            <Image src={imgUrl} width='100%' height='100%' preview={false} />
          </Modal>
        ) : null}
      </div>
    </div>
  )
}
export default TableRow
