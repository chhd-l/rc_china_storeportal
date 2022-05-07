import { deleteProducts, getScProducts, switchShelves } from '@/framework/api/get-product'
import { ProductListItemProps } from '@/framework/types/product'
import { Button } from 'antd'
import { cloneDeep } from 'lodash'
import { FC, ReactElement, useEffect, useState } from 'react'
import './index.less'
export type Props = {
  children: ReactElement
  list: ProductListItemProps[]
  getList: Function
}
const TableFooter: FC<Props> = ({ children, list, getList }) => {
  const [checkedAll, setCheckedAll] = useState(0)

  useEffect(() => {
    const arr = list.filter((item) => item.checked === true)
    console.log('list',arr)
    console.log('list',arr.every(item => item.shelvesStatus === true))
    if(arr.length) {
      if(arr.every(item => item.shelvesStatus === true)) {
        setCheckedAll(1)
      } else if (arr.every(item => item.shelvesStatus === false)) {
        setCheckedAll(2)
      } else {
        setCheckedAll(0)
      }
    }
    
  }, [list])

  return (
    <div className='table-footer flex justify-between items-center fixed bottom-2'>
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
            getList()
          }}
        >
          Delete
        </Button>
        {
          checkedAll === 1 ? (
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
                getList()
              }}
            >
              Delist
            </Button>
          ) : null
        }
        {
          checkedAll === 2 ? (
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
                getList()
              }}
            >
              Publish
            </Button>
          ) : null
        }
      </div>
    </div>
  )
}

export default TableFooter
