import { createTag, deleteTag } from '@/framework/api/tag'
import { Consumer } from '@/framework/types/consumer'
import ProForm, { ModalForm, ProFormInstance, ProFormText } from '@ant-design/pro-form'
import { Button, message, Modal, Table, Tooltip } from 'antd'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import intl from 'react-intl-universal'

interface PetOwnerTableProps {
  petOwnerList: Consumer[]
  handleUpdate: (a: boolean) => void
  loading: boolean
}

const Index = ({ petOwnerList, handleUpdate, loading }: PetOwnerTableProps) => {
  const navigator = useNavigate()
  const formRef = useRef<ProFormInstance>()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState()

  const onFinish = async (values: any) => {
    let res = await createTag({ name: values.name, isEnabled: false })
    console.log(res)
    if (res) {
      handleUpdate(true)
      message.success({ className: 'rc-message', content: intl.get('public.operate_success') })
      return true
    } else {
      return false
    }
  }
  const confirmDelete = async () => {
    deleteTag({
      id: id,
    }).then((res) => {
      if (res) {
        setVisible(false)
        message.success({ className: 'rc-message', content: intl.get('public.operate_success') })
        handleUpdate(true)
      }
    })
  }
  const columns = [
    {
      title: intl.get('tag.Tagging Name:'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: intl.get('tag.Pet Owner(s)'),
      dataIndex: 'consumerCount',
      key: 'consumerCount',
    },
    {
      title: intl.get('tag.Tagging Status'),
      dataIndex: 'isEnabled',
      key: 'isEnabled',
      render: (text: any) => <span>{text ? intl.get('public.enable') : intl.get('public.Disable')}</span>,
    },
    {
      title: intl.get('tag.Options'),
      key: 'Options',
      width: 180,
      render: (text: any, record: any) => (
        <>
          <Tooltip title={intl.get('wx.view_details')}>
            <span
              className="cursor-pointer iconfont icon-kjafg primary-color mr-4"
              onClick={(e) => {
                e.stopPropagation()
                navigator('/tags/edit-tags', {
                  state: { id: record.id, type: record.type !== 'SYSTEM' },
                })
              }}
            />
          </Tooltip>
          {record.type !== 'SYSTEM' && record.consumerCount == 0 && (
            <Tooltip title={intl.get('public.delete')}>
              <span
                className="cursor-pointer ml-2 iconfont icon-delete text-red-500"
                onClick={() => {
                  setId(record.id)
                  setVisible(true)
                }}
              />
            </Tooltip>
          )}
        </>
      ),
    },
  ]
  return (
    <>
      <div className="flex justify-end mb-4 pt-6">
        <Button
          danger
          onClick={() => {
            setIsModalVisible(true)
          }}
          type="primary"
        >
          + {intl.get('tag.Add New Tag')}
        </Button>
      </div>
      <Table
        loading={loading}
        bordered
        dataSource={petOwnerList}
        columns={columns}
        rowKey="id"
        className="rc-table"
        pagination={false}
      />
      <ModalForm
        title={intl.get('tag.Add New Tag')}
        visible={isModalVisible}
        onFinish={onFinish}
        formRef={formRef}
        onVisibleChange={(value) => {
          setIsModalVisible(value)
          formRef?.current?.resetFields()
        }}
        modalProps={{ width: 520, okText: intl.get('public.confirm'), cancelText: intl.get('public.cancel') }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            rules={[{ required: true, message: intl.get('public.Missing Display Name') }]}
            name="name"
            label="Tagging Name"
            fieldProps={{ maxLength: 40, showCount: true }}
            placeholder={intl.get('public.Enter a tagging name')}
          />
        </ProForm.Group>
      </ModalForm>
      <Modal
        className="rc-modal"
        title="Delete Item"
        okText={intl.get('public.confirm')}
        visible={visible}
        onOk={confirmDelete}
        onCancel={() => setVisible(false)}
      >
        <p>{intl.get('public.Are you sure you want to delete the item?')}</p>
      </Modal>
    </>
  )
}

export default Index
