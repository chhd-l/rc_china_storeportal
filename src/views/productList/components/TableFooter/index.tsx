import { deleteProducts, getScProducts, switchShelves } from '@/framework/api/get-product'
import { ProductListItemProps } from '@/framework/types/product'
import { Button } from 'antd'
import { cloneDeep } from 'lodash'
import { FC, ReactElement } from 'react'
import './index.less'
export type Props = {
  children: ReactElement
  list: ProductListItemProps[]
  setListData: Function
}
const TableFooter: FC<Props> = ({ children, list, setListData }) => {
  return (
    <div className='table-footer bg-white flex justify-between py-4'>
      <div>{children}</div>
      <div>
        <span className='mr-4'>{list.filter(el => el.checked)?.length || 0} products selected</span>
        <Button
          className='mr-4'
          onClick={async () => {
            let goodsId = list.filter(el => el.checked)?.map(el => el.id)
            if (!goodsId?.length) {
              return
            }
            deleteProducts({ goodsId })
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
        >
          Delete
        </Button>
        <Button
          className='mr-4'
          onClick={async () => {
            let goodsId = list.filter(el => el.checked)?.map(el => el.id)
            if (!goodsId?.length) {
              return
            }
            switchShelves({ goodsId, status: false })
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
        >
          Delist
        </Button>
        <Button
          className='mr-4'
          type='primary'
          onClick={async () => {
            let goodsId = list.filter(el => el.checked)?.map(el => el.id)
            if (!goodsId?.length) {
              return
            }
            switchShelves({ goodsId, status: true })
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
        >
          Publish
        </Button>
      </div>
    </div>
  )
}

export default TableFooter
