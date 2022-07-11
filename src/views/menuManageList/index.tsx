import React, { useState, useEffect } from 'react'
import { Button, Table, Modal, message, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import './index.less'
import { tableColumns, TWxMenuUpdateParam } from './modules/constant'
import { ContentContainer, SearchContainer, TableContainer, DivideArea } from '@/components/ui'
import { getWxMenusList, updateWxMenu } from '@/framework/api/wechatSetting'
import { WxMenu } from '@/framework/types/wechat'
import { openConfirmModal } from '@/utils/utils'

import { PageProps } from '@/framework/types/common'

const MenuManage = () => {
  const [list, setList] = useState<WxMenu[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [current, setCurrent] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [pendingToDelete, setPendingToDelete] = useState<any>({})
  const [name, setName] = useState<string>('')

  const navigator = useNavigate()

  const getList = async (pageNumber: number, menuName: string = '') => {
    const param: PageProps = {
      offset: pageNumber * 10 - 10,
      limit: 10,
      withTotal: true,
    }
    setLoading(true)
    const res = await getWxMenusList({ ...param, sample: menuName ? { name: menuName } : undefined })
    console.log('page data:', res)
    setLoading(false)
    setList(res.records)
    setTotal(res.total)
  }

  useEffect(() => {
    getList(1)
  }, [])

  const handleReset = () => {
    setName('')
    getList(1)
  }

  const changeStatus = async (updateParam: TWxMenuUpdateParam) => {
    openConfirmModal({
      title: updateParam.isEnabled ? 'Enable Item' : 'Disable Item',
      content: `Are you sure you want to ${updateParam.isEnabled ? 'enable' : 'disable'} this item?`,
      onOk: () => {
        setLoading(true)
        updateWxMenu(updateParam).then((updated: boolean) => {
          if (updated) {
            message.success({ className: 'rc-message', content: 'Operate Successful' })
            setCurrent(1)
            getList(1)
          } else {
            setLoading(false)
          }
        })
      },
    })
  }
  const handleDelete = (updateParam: TWxMenuUpdateParam) => {
    setIsModalVisible(true)
    setPendingToDelete(updateParam)
  }
  const confirmDelete = async () => {
    setLoading(true)
    const deleted = await updateWxMenu(pendingToDelete)
    if (deleted) {
      message.success({ className: 'rc-message', content: 'Operate Successful' })
      setIsModalVisible(false)
      setCurrent(1)
      getList(1)
    } else {
      setLoading(false)
    }
  }
  const columns = tableColumns({ changeStatus, handleDelete })

  return (
    <ContentContainer className='menu-manage'>
      <SearchContainer>
        <Form layout='horizontal'>
          <Form.Item label='Menu Name'>
            <Input
              style={{ width: 300 }}
              placeholder='Input'
              value={name}
              onChange={e => setName(e.target.value)}
              onPressEnter={() => getList(1, name)}
            />
          </Form.Item>
        </Form>
        <div className='mt-4 space-x-md'>
          <Button type='primary' onClick={() => getList(1, name)}>
            Search
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </SearchContainer>
      <DivideArea />
      <TableContainer>
        <div className='btn-area py-4'>
          <Button type='primary' onClick={() => navigator('/menuManagempqr/menu-manage-add')}>
            + Add
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={list}
          loading={loading}
          className='rc-table'
          pagination={{
            current: current,
            pageSize: 10,
            total: total,
            onChange: page => {
              setCurrent(page)
              getList(page)
            },
          }}
        />
      </TableContainer>
      <Modal
        className='rc-modal'
        title='Delete Item'
        okText='Confirm'
        visible={isModalVisible}
        onOk={confirmDelete}
        confirmLoading={loading}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Are you sure you want to delete the item?</p>
      </Modal>
    </ContentContainer>
  )
}

export default MenuManage
