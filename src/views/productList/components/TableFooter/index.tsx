import { deleteProducts, getScProducts, switchShelves } from '@/framework/api/get-product'
import { ProductListItemProps } from '@/framework/types/product'
import { Button, message, Modal } from 'antd'
import { cloneDeep } from 'lodash'
import { FC, ReactElement, useEffect, useState } from 'react'
import './index.less'
export type Props = {
  children: ReactElement
  list: ProductListItemProps[]
  getList: Function
  setLoading: Function
  loading: boolean
}
const TableFooter: FC<Props> = ({ children, list, getList, setLoading, loading }) => {
  const [checkedAll, setCheckedAll] = useState(0)
  const [showDeletePop, setShowDeletePop] = useState(false)

  useEffect(() => {
    const arr = list.filter(item => item.checked === true)
    console.log('list', arr)
    console.log(
      'list',
      arr.every(item => item.shelvesStatus === true),
    )
    if (arr.length) {
      if (arr.every(item => item.shelvesStatus === true)) {
        setCheckedAll(1)
      } else if (arr.every(item => item.shelvesStatus === false)) {
        setCheckedAll(2)
      } else {
        setCheckedAll(0)
      }
    }
  }, [list])
  const comfirmDelete = async () => {
    setShowDeletePop(false)
    let productId = list.filter(el => el.checked)?.map(el => el.id)
    if (!productId?.length) {
      return
    }
    setLoading(true)
    let res = await deleteProducts({ productId })
    // listData[spuIdx].shelvesStatus = !shelvesStatus
    if (res===true) {
      message.success({ className: 'rc-message', content: 'Operation success' })
      await getList()
    } else {
      message.error({ className: 'rc-message', content: 'Operation failed' })
    }
    setLoading(false)
  }
  return (
    <div className='table-footer flex justify-between items-center fixed bottom-2'>
      <div>{children}</div>
      <div>
        <span className='mr-4'>{list.filter(el => el.checked)?.length || 0} products selected</span>
        <Button
          className='mr-4'
          onClick={() => {
            setShowDeletePop(true)
          }}
        >
          Delete
        </Button>
        {checkedAll === 1 ? (
          <Button
            className='mr-4'
            onClick={async () => {
              let productId = list.filter(el => el.checked)?.map(el => el.id)
              if (!productId?.length) {
                return
              }
              setLoading(true)
              let res = await switchShelves({ productId, status: false })
              if (res===true) {
                message.success({ className: 'rc-message', content: 'Operation success' })
                await getList()
              } else {
                message.error({ className: 'rc-message', content: 'Operation failed' })
              }
              // listData[spuIdx].shelvesStatus = !shelvesStatus
              // setList(cloneDeep(listData))
              setLoading(false)
            }}
          >
            Delist
          </Button>
        ) : null}
        {checkedAll === 2 ? (
          <Button
            className='mr-4'
            type='primary'
            onClick={async () => {
              let productId = list.filter(el => el.checked)?.map(el => el.id)
              if (!productId?.length) {
                return
              }
              setLoading(true)
              let res = await switchShelves({ productId, status: true })
              if (res) {
                message.success({ className: 'rc-message', content: 'Operation success' })
              } else {
                message.error({ className: 'rc-message', content: 'Operation failed' })
              }
              // listData[spuIdx].shelvesStatus = !shelvesStatus
              // setList(cloneDeep(listData))
              await getList()
              setLoading(false)
            }}
          >
            Publish
          </Button>
        ) : null}
      </div>
      <Modal
        className='rc-modal'
        title='Delete Product'
        okText={'Delete'}
        visible={showDeletePop}
        onOk={() => comfirmDelete()}
        onCancel={() => setShowDeletePop(false)}
      >
        <p>Are you sure want to delete the product(s) ? Warning: You cannot undo this action!</p>
      </Modal>
    </div>
  )
}

export default TableFooter
