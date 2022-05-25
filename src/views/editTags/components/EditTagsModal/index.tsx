import './index.less'
import { message, Button, Avatar } from 'antd'
import { ModalForm } from '@ant-design/pro-form'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import ProTable from '@/components/common/ProTable'
import { ProColumns } from '@ant-design/pro-table'
import { handlePageParams } from '@/utils/utils'
import { getPetOwnerList } from '@/framework/api/customer'
import { addCustomerTag } from '@/framework/api/tag'

export type EditTagsModalProps = {
  visible: boolean;
  handleVisible: (visible: boolean) => void;
  handleUpdate: (visible: boolean) => void;
};

const EditTagsModal = ({ visible, handleVisible, handleUpdate }: EditTagsModalProps) => {
  const params = useParams()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const ref = useRef<any>()
  const onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    const { id } = params
    console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows)
    setSelectedRowKeys(selectedRowKeys)
  }
  const manualColumns: ProColumns<any>[] = [
    {
      title: 'Profile Photo',
      dataIndex: 'image',
      key: 'image',
      hideInSearch: true,
      render: (text: any, record: any) => <Avatar size='large' icon={<img src={text} alt='' />} />,
    },
    {
      title: 'WeChat Name',
      dataIndex: 'nickname',
      key: 'nickname',

    },
    {
      title: 'Phone Number',
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
      width='50%'
      className='manual-selection'
      layout='horizontal'
      title='Select Products'
      visible={visible}
      onFinish={async () => {
        if (selectedRowKeys.length > 0) {
          const { id } = params
          let res = await addCustomerTag({
            customerIds: selectedRowKeys,
            tagId: id,
            operator: 'zz',
            storeId: '12345678',
          })
          if (res?.addCustomerTag) {
            message.success('Operate success')
            handleUpdate(true)
            return true
          }
        } else {
          return false
        }

      }}
      submitter={{
        searchConfig: {
          submitText: 'Confirm',
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
            isNeedTotal: true,
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
        className='pt-4 bg-white'
        dateFormatter='string'
        pagination={{
          showTotal: (total: number) => ``,
          showQuickJumper: false,
          showSizeChanger: false,
        }}
        search={{
          defaultCollapsed: false,
          span: 12,
          labelWidth: 'auto',
          searchText: 'Search',
          className: 'my-search',
          optionRender: ({ searchText, resetText }, { form }, dom) => [
            <Button type='primary'
                    onClick={() => {
                      form?.submit()
                    }}
            >{searchText}</Button>,
            <Button onClick={() => {
              form?.resetFields()
              form?.submit()
            }}>{resetText}</Button>,
          ],
        }}
      />
    </ModalForm>
  )
}

export default EditTagsModal
