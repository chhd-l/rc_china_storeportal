import { Modal, Button, Table, Tooltip, Form, message } from 'antd'
import { Link } from 'react-router-dom'
import React, { useState, useRef } from 'react'
import { Customer } from '@/framework/types/customer'
import type { ProFormInstance } from '@ant-design/pro-form'
import ProForm, {
  ModalForm,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-form'
import { createTag, deleteTag } from '@/framework/api/tag'

interface PetOwnerTableProps {
  petOwnerList: Customer[],
  handleUpdate: (a: boolean) => void
  loading: boolean
}

const Index = ({ petOwnerList, handleUpdate,loading }: PetOwnerTableProps) => {
  const formRef = useRef<ProFormInstance>()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState()

  const onFinish = async (values: any) => {
    let res = await createTag({name:values.name,isEnabled:false})
    if(res?.createTag){
      handleUpdate(true)
      message.success('Operate success')
      return true
    } else {
      message.warning('Operation failed')
      return false
    }
  }
  const confirmDelete = async () => {
    deleteTag({
      id: id,
      operator: 'zz',
    }).then((res) => {
      console.log(res,99999)
      if(res.deleteTag){
        setVisible(false)
        message.success('Operate success')
        handleUpdate(true)
      }
    })
  }
  const columns = [
    {
      title: 'Tagging Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Pet Owner(s)',
      dataIndex: 'customerCount',
      key: 'customerCount',
    },
    {
      title: 'Tagging Status',
      dataIndex: 'isEnabled',
      key: 'isEnabled',
      render: (text: any) => <span>{text ? 'Enable' : 'Disable'}</span>,
    },
    {
      title: 'Options',
      key: 'Options',
      width: 180,
      render: (text: any, record: any) => (
        <>
          <Tooltip title='View Details'>
            <Link to={`/petOwner/edit-tags/${record.id}`} className='mr-4 text-xl'>
            <span
              className='cursor-pointer iconfont icon-kjafg primary-color mr-4 text-xl'
            />
            </Link>
          </Tooltip>
          <Tooltip title='Delete'>
            <span className='cursor-pointer ml-2 iconfont icon-delete text-red-500 text-xl' onClick={() => {
              setId(record.id)
              setVisible(true)
            }} />
          </Tooltip>
        </>
      ),
    },
  ]
  return (
    <>
      <div className='flex justify-end mb-4'>
        <Button
          danger
          onClick={() => {
            setIsModalVisible(true)
          }}
        >
          + Add New Tag
        </Button>
      </div>
      <Table loading={loading} bordered dataSource={petOwnerList} columns={columns} rowKey='id' className='rc-table' pagination={false} />
      <ModalForm
        title='Add New Tag'
        visible={isModalVisible}
        onFinish={onFinish}
        formRef={formRef}
        onVisibleChange={(value) => {
          setIsModalVisible(value)
          formRef?.current?.resetFields()
        }}
        modalProps={{ width: 520, okText: 'Confirm', cancelText: 'Cancel' }}
      >
        <ProForm.Group>
          <ProFormText
            width='md'
            rules={[{ required: true, message: 'Missing Display Name' }]}
            name='name'
            label='Tagging Name'
            fieldProps={{ maxLength: 40, showCount: true }}
            placeholder='Enter a tagging name'

          />
        </ProForm.Group>
      </ModalForm>
      <Modal
        className='rc-modal'
        title='Delete Item'
        okText='Confirm'
        visible={visible}
        onOk={confirmDelete}
        onCancel={() => setVisible(false)}
      >
        <p>Are you sure you want to delete the item?</p>
      </Modal>
    </>
  )
}

export default Index
