import { Button, message, Switch, Tooltip } from 'antd'
import { useRef, useState } from 'react'
import ProTable, { ActionType, ProColumns } from '@/components/common/ProTable'
import './index.less'
import { Link } from 'react-router-dom'
import TipsModal, { TipsType } from './components/TipsModal'
import { getHotSearchFindPage, hotSearchUpdate, HotSearchVisibleSwitch } from '@/framework/api/get-product'
import { handlePageParams } from '@/utils/utils'
import { useRequest } from 'ahooks'
import AddNewSearch from './components/AddNewSearch'
import { RecordItem } from './type'
import intl from 'react-intl-universal'

const ProductSearch = () => {
  const actionRef = useRef<ActionType>()
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState<TipsType>('delete')
  const [checked, setChecked] = useState(false)
  const [deleteId, SetDeleteId] = useState('')

  // 更新status/删除数据
  const { run } = useRequest(
    async (id, status) => {
      await hotSearchUpdate({ id, ...status })
      message.success({ className: 'rc-message', content: intl.get('public.operate_success') })
      actionRef?.current?.reload()
    },
    {
      manual: true, // 手动执行
    },
  )

  // Search is visible on shop
  const { run: runSwitch } = useRequest(
    async (status) => {
      await HotSearchVisibleSwitch({ storeId: 'storeIdMock', status })
      message.success({ className: 'rc-message', content: intl.get('public.operate_success') })
    },
    {
      manual: true,
    },
  )

  // 弹窗确认
  const onOk = () => {
    // type  区分visible on shop开关或者删除
    if (type === 'notice') {
      setChecked(!checked)
      runSwitch(!checked)
    } else {
      run(deleteId, { isDeleted: true })
    }
    setVisible(false)
  }

  // 新增数据刷新列表
  const refreshTable = () => actionRef?.current?.reload()

  // Top Search is visible on shop开关
  const onSwitchChange = () => {
    setVisible(true)
    setType('notice')
  }

  const columns: ProColumns<RecordItem>[] = [
    {
      title: intl.get('product.Top Search Name'),
      dataIndex: 'topName',
    },
    {
      title: intl.get('product.Priority'),
      dataIndex: 'priority',
      search: false,
    },
    {
      title: intl.get('public.status'),
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        true: { text: 'Enable' },
        false: {
          text: intl.get('public.Disable'),
        },
      },
      render: (_, record) => <Switch checked={record.status} onChange={(val) => run(record.id, { status: val })} />,
    },
    {
      title: intl.get('public.action'),
      valueType: 'option',
      key: 'option',
      render: (_, record) => (
        <Tooltip title="Delete">
          <Link
            className="ml-3"
            to=""
            onClick={() => {
              setType('delete')
              setVisible(true)
              SetDeleteId(record.id)
            }}
          >
            <span className="iconfont icon-delete" />
          </Link>
        </Tooltip>
      ),
    },
  ]
  return (
    <>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered
        className="searchTable"
        tableClassName="rc-table"
        request={async (params) => {
          let page = handlePageParams({
            currentPage: params.current,
            pageSize: params.pageSize,
          })

          delete params.current
          delete params.pageSize
          if (params.status) {
            params.status = JSON.parse(params.status)
          }
          const tableData = await getHotSearchFindPage({
            offset: page.offset,
            withTotal: true,
            limit: page.limit,
            sample: { storeId: 'storeIdMock', ...params },
          })
          setChecked(tableData?.isVisibleOnShop)
          return Promise.resolve({
            data: tableData?.records || [],
            total: tableData?.total || 0,
            success: true,
          })
        }}
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          span: 12,
          searchText: intl.get('public.search'),
          optionRender: (_, __, dom) => {
            return dom
              .map((item: any) => {
                return <Button {...item.props} loading={false} />
              })
              .reverse()
          },
        }}
        pagination={{
          showQuickJumper: false,
        }}
        dateFormatter="string"
        headerTitle={
          <div className="flex flex-row items-top text-grayTitle text-14">
            {intl.get('product.Top Search is visible on shop')}
            <Switch checked={checked} onChange={onSwitchChange} className="ml-4" />
          </div>
        }
        toolBarRender={() => [<AddNewSearch refreshTable={refreshTable} />]}
      />
      <TipsModal
        type={type}
        visible={visible}
        onOk={onOk}
        onCancel={() => {
          setVisible(false)
        }}
      />
    </>
  )
}

export default ProductSearch
