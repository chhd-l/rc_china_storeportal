import { ContentContainer } from '@/components/ui'
import { getInvoiceList } from '@/framework/api/order'
import SearchHeader from './components/SearchHeader'
import TableList from './components/TableList'
import { useEffect, useState } from 'react'
import './index.less'
import { TablePaginationConfig } from 'antd'

const InvoiceList = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [invoiceList, setInvoiceList] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const [body, setBody] = useState({})
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  })

  const getList = async (sample = body) => {
    try {
      setLoading(true)
      const params: any = {
        offset: (pagination.current || 0) * 10,
        limit: pagination.pageSize,
      }
      if (JSON.stringify(sample) !== '{}') {
        params.sample = sample
      }
      let res = await getInvoiceList(params)
      console.log('res', res)
      if (res?.records?.length) {
        setPagination({
          ...pagination,
          total: res.total,
        })
        setInvoiceList(res.records)
      }
      setLoading(false)
    } catch (error) {
      console.log('error', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageSize, pagination.current])

  return (
    <ContentContainer className="InvoiceList">
      <h1 className="text-[18px] font-bold bg-white p-[24px] m-0">Invoice List</h1>
      <SearchHeader setBody={setBody} getList={getList} />
      <TableList
        data={invoiceList}
        loading={loading}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        setSelectedRows={setSelectedRows}
        pagination={pagination}
        setPagination={setPagination}
      />
    </ContentContainer>
  )
}

export default InvoiceList
