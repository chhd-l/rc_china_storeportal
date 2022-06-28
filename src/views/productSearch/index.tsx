import { Button,  message,  Switch, Tooltip } from 'antd'
import { useRef, useState } from 'react'
import ProTable, { ActionType, ProColumns } from '@/components/common/ProTable'
import './index.less'
import { Link } from 'react-router-dom'
import TipsModal from './components/TipsModal'
import { getHotSearchFindPage, hotSearchUpdate, HotSearchVisibleSwitch } from '@/framework/api/get-product'
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

  // 更新status/删除数据
  const { run } = useRequest(
    async (id, status) => {
     await hotSearchUpdate({ id, ...status })
      message.success({ className: 'rc-message', content: 'Operation success' })
      actionRef?.current?.reload();
    },
    {
      manual: true,
    },
  )

  // Search is visible on shop
  const {run:runSwitch}=useRequest(async(status)=>{
await   HotSearchVisibleSwitch({storeId:'12345678',status})
message.success({ className: 'rc-message', content: 'Operation success' })
  },{
    manual:true
  })

  const onOk = () => {
    if (type === 'notice') {
      setChecked(!checked)
      runSwitch(!checked)
    } else {
      run(deleteId, { isDeleted: true })
    }
    setVisible(false)
    setType('')
  }

  const refreshTable=()=>actionRef?.current?.reload();
  const onChange = () => {
    setVisible(true)
    setType('notice')
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
        true: { text: 'Enable' },
        false: {
          text: 'Disable',
        },
      },
      render: (_, record) => (
        <Switch checked={record.status} onChange={(val) => run(record.id, { status: val })} />
      ),
    },
    {
      title: 'Action',
      valueType: 'option',
      key: 'option',
      render: (_, record) => (
        <Tooltip title="Delete">
          <Link className="ml-3" to="" onClick={() => { 
            setType('delete')
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
          
         delete params.current
         delete params.pageSize
         if(params.status){
          params.status=  JSON.parse(params.status)
         }
          const tableData = await getHotSearchFindPage({
            offset: page.offset,
            isNeedTotal: true,
            limit: page.limit,
            sample: { storeId: '12345678',...params },
          })
          setChecked(tableData.isVisibleOnShop)
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
        pagination={{
          showQuickJumper:false
        }}
        dateFormatter="string"
        headerTitle={
          <div className="flex flex-row items-top text-grayTitle text-14">
            Top Search is visible on shop
            <Switch checked={checked} onChange={onChange} className="ml-4" />
          </div>
        }
        toolBarRender={() => [<AddNewSearch  refreshTable={refreshTable}/>]}
      />
      <TipsModal type={type} visible={visible} onOk={onOk} onCancel={() => {
        setType('')
        setVisible(false)}} />
    </>
  )
}

export default ProductSearch
