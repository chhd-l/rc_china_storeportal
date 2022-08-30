import { ContentContainer } from '@/components/ui'
import SearchHeader from './components/SearchHeader'
import TableList from './components/TableList'
import './index.less'

const InvoiceList = () => {
  return (
    <ContentContainer className="InvoiceList">
      <h1 className="text-[18px] font-bold bg-white p-[24px] m-0">Invoice List</h1>
      <SearchHeader />
      <TableList />
    </ContentContainer>
  )
}

export default InvoiceList
