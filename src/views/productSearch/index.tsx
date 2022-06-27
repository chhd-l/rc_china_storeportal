import { Button,  Switch, Tooltip } from 'antd'
import { useRef, useState } from 'react'
import ProTable, { ActionType, ProColumns } from '@/components/common/ProTable'
import './index.less'
import { Link } from 'react-router-dom'
import TipsModal from './components/TipsModal'
import { getHotSearchFindPage, hotSearchUpdate } from '@/framework/api/get-product'
import { handlePageParams } from '@/utils/utils'
import { useRequest } from 'ahooks'
import AddNewSearch from './components/AddNewSearch'
import { RecordItem } from './type'



const ProductSearch = () => {
  const actionRef = useRef<ActionType>()
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState('')
  const [checked, setChecked] = useState(false)
  const [deleteId, SetDeleteId] = useState('')

  const { run } = useRequest(
    async (storeId, status) => {
      const res = await hotSearchUpdate({ storeId, ...status })
      console.log('res', res)
    },
    {
      manual: true,
    },
  )

  const onOk = () => {
    if (type === 'notice') {
      setChecked(!checked)
    } else {
      run(deleteId, { isDeleted: true })
    }
    setVisible(false)
  }

  const onChange = () => {
    setType('notice')
    setVisible(true)
  }

  const columns: ProColumns<RecordItem>[] = [
    {
      title: 'Top Search Name',
      dataIndex: 'topName',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      search: false,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        Enable: { text: 'Enable', status: 'Enable' },
        Disable: {
          text: 'Disable',
          status: 'Disable',
        },
      },
      render: (_, record) => (
        <Switch checked={record.action} onChange={(checked) => run(record.id, { status: checked })} />
      ),
    },
    {
      title: 'Action',
      valueType: 'option',
      key: 'option',
      render: (_, record) => (
        <Tooltip title="Delete">
          <Link className="ml-3" to="" onClick={() => { 
            setVisible(true)
            SetDeleteId(record.id)}}>
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
          const tableData = await getHotSearchFindPage({
            offset: page.offset,
            isNeedTotal: true,
            limit: page.limit,
            sample: { storeId: '12345678' },
          })
          return Promise.resolve({
            data: tableData?.records || [],
            total: tableData?.total || 0,
            success: true,
          })
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value)
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          span: 10,
          searchText: 'Search',
          optionRender: (searchConfig, formProps, dom) => {
            return dom
              .map((item: any) => {
                return <Button {...item.props} loading={false} />
              })
              .reverse()
          },
        }}
        dateFormatter="string"
        headerTitle={
          <div className="flex flex-row items-top text-grayTitle text-14">
            Top Search is visible on shop
            <Switch checked={checked} onChange={onChange} className="ml-4" />
          </div>
        }
        toolBarRender={() => [<AddNewSearch />]}
      />
      <TipsModal type={type} visible={visible} onOk={onOk} onCancel={() => setVisible(false)} />
    </>
  )
}

export default ProductSearch
