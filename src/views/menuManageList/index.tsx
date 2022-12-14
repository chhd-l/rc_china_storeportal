import React, { useState, useEffect } from 'react'
import { Button, Table, Modal, message, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import './index.less'
import { tableColumns, TWxMenuUpdateParam } from './modules/constant'
import { ContentContainer, SearchContainer, TableContainer, DivideArea } from '@/components/ui'
import { getWxMenusList, updateWxMenu } from '@/framework/api/wechatSetting'
import { WxMenu } from '@/framework/types/wechat'
import { openConfirmModal } from '@/utils/utils'
import intl from 'react-intl-universal'

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
      title: updateParam.isEnabled ? intl.get('public.enable_item') : intl.get('public.disable_item'),
      content: intl.get(updateParam.isEnabled ? 'public.are_you_sure_enable' : 'public.are_you_sure_disable'),
      onOk: () => {
        setLoading(true)
        updateWxMenu(updateParam).then((updated: boolean) => {
          if (updated) {
            message.success({ className: 'rc-message', content: intl.get('public.operate_success') })
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
      message.success({ className: 'rc-message', content: intl.get('public.operate_success') })
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
          <Form.Item label={intl.get('wx.menu_name')}>
            <Input
              style={{ width: 300 }}
              placeholder={intl.get('public.input')}
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
          <Button onClick={handleReset}>{intl.get('public.reset')}</Button>
        </div>
      </SearchContainer>
      <DivideArea />
      <TableContainer>
        <div className='btn-area py-4'>
          <Button type='primary' onClick={() => navigator('/menuManagempqr/menu-manage-add')}>
            + {intl.get('public.add')}
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
        title={intl.get('public.delete_item')}
        okText={intl.get('public.confirm')}
        cancelText={intl.get('public.cancel')}
        visible={isModalVisible}
        onOk={confirmDelete}
        confirmLoading={loading}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>{intl.get('public.are_you_sure_delete')}</p>
      </Modal>
    </ContentContainer>
  )
}

export default MenuManage
