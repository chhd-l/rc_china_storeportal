import { ContentContainer } from '@/components/ui'
import KeyMetrics from './components/KeyMetrics'
import VouchersListHead from './components/VouchersListHead'
import VouchersList from './components/VouchersList'
import './Style.less'

const Vouchers = () => {

  return (
    <ContentContainer className="Vouchers">
      <KeyMetrics />
      <VouchersListHead />
      <VouchersList />
    </ContentContainer>
  )
}

export default Vouchers
