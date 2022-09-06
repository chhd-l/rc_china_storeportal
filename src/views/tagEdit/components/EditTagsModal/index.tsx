import ProTable from '@/components/common/ProTable'
import { getPetOwnerList } from '@/framework/api/consumer'
import { addConsumerTag } from '@/framework/api/tag'
import { handlePageParams } from '@/utils/utils'
import { ModalForm } from '@ant-design/pro-form'
import { ProColumns } from '@ant-design/pro-table'
import { Avatar, Button, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import intl from 'react-intl-universal'
import './index.less'

export type EditTagsModalProps = {
  visible: boolean
  handleVisible: (visible: boolean) => void
  handleUpdate: (visible: boolean) => void
}

const EditTagsModal = ({ visible, handleVisible, handleUpdate }: EditTagsModalProps) => {
  const { state }: any = useLocation()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const ref = useRef<any>()
  const onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    setSelectedRowKeys(selectedRowKeys)
  }
  const manualColumns: ProColumns<any>[] = [
    {
      title: intl.get('tag.Profile Photo'),
      dataIndex: 'image',
      key: 'image',
      hideInSearch: true,
      render: (text: any, record: any) => <Avatar size="large" icon={<img src={text} alt="" />} />,
    },
    {
      title: intl.get('tag.WeChat Name'),
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: intl.get('tag.Phone Number'),
      dataIndex: 'phone',
      key: 'phone',
      render: (text: any, record: any) => {
        return record.phone ? record.phone : ''
      },
    },
  ]

  useEffect(() => {
    setSelectedRowKeys([])
  }, [visible])
  return (
    <ModalForm
      width="50%"
      className="manual-selection"
      layout="horizontal"
      title={intl.get('tag.Select Pet Owner')}
      visible={visible}
      onFinish={async () => {
        if (selectedRowKeys.length > 0) {
          let res = await addConsumerTag({
            consumerIds: selectedRowKeys,
            tagId: state.id,
          })
          if (res) {
            message.success({ className: 'rc-message', content: intl.get('public.operate_success') })
            handleUpdate(true)
            return true
          }
        } else {
          return false
        }
      }}
      submitter={{
        searchConfig: {
          submitText: intl.get('public.operate_success'),
        },
      }}
      onVisibleChange={handleVisible}
    >
      <ProTable
        actionRef={ref}
        columns={manualColumns}
        toolBarRender={false}
        rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
        request={async (params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log('test sort', params, sorter, filter)
          let page = handlePageParams({
            currentPage: params.current,
            pageSize: params.pageSize,
          })
          let data: any = {
            ...page,
            withTotal: true,
            sample: {},
          }
          if (params.nickname) {
            data.sample.nickName = params.nickname
          }
          if (params.phone) {
            data.sample.phone = params.phone
          }
          let tableData = await getPetOwnerList(data)
          console.log(tableData)
          return Promise.resolve({
            data: tableData?.records || [],
            total: tableData.total,
            success: true,
          })
        }}
        tableAlertRender={() => false}
        rowKey={({ id }) => id}
        className="pt-4 bg-white"
        dateFormatter="string"
        pagination={{
          showTotal: (total: number) => ``,
          showQuickJumper: false,
          showSizeChanger: false,
        }}
        search={{
          defaultCollapsed: false,
          span: 12,
          labelWidth: 'auto',
          searchText: intl.get('public.public.search'),
          className: 'my-search',
          optionRender: ({ searchText, resetText }, { form }, dom) => [
            <Button
              type="primary"
              onClick={() => {
                form?.submit()
              }}
            >
              {searchText}
            </Button>,
            <Button
              onClick={() => {
                form?.resetFields()
                form?.submit()
              }}
            >
              {resetText}
            </Button>,
          ],
        }}
      />
    </ModalForm>
  )
}

export default EditTagsModal
