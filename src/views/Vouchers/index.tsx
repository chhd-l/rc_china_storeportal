import { ContentContainer } from '@/components/ui'
import KeyMetrics from './components/KeyMetrics'
import VouchersListHead from './components/VouchersListHead'
import VouchersList from './components/VouchersList'
import './Style.less'
import { useState } from 'react'

const Vouchers = () => {
  const [voucherStatus, setVoucherStatus] = useState('')

  return (
    <ContentContainer className="Vouchers">
      <KeyMetrics />
      <VouchersListHead setVoucherStatus={setVoucherStatus} />
      <VouchersList voucherStatus={voucherStatus} />
    </ContentContainer>
  )
}

export default Vouchers
