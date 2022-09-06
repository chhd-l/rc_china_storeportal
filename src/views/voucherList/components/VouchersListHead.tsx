import { ContentContainer } from '@/components/ui'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Tabs, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import intl from 'react-intl-universal'
const { Title } = Typography
const { TabPane } = Tabs

const VouchersListHead = ({ setVoucherStatus }: { setVoucherStatus: Function }) => {
  const navigator = useNavigate()

  return (
    <ContentContainer className="bg-white px-5 pb-0 VouchersListHead relative">
      <Title className="mb-0" level={5}>
        {intl.get('voucher.list')}
      </Title>
      <span className="text-xs text-gray-400">
        {intl.get('voucher.list.Create and manage your own vouchers for your shop and products on DTC Center!')}
      </span>
      <Tabs defaultActiveKey="" onChange={(key) => setVoucherStatus(key)}>
        <TabPane tab={intl.get('voucher.orders.All')} key="" />
        <TabPane tab={intl.get('voucher.list.Ongoing')} key="Ongoing" />
        <TabPane tab={intl.get('voucher.list.Upcoming')} key="Upcoming" />
        <TabPane tab={intl.get('voucher.list.Expired')} key="Expired" />
      </Tabs>
      <Button
        className="flex items-center CreateBtn"
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          navigator('/marketingCenter/vouchers/createNewVoucher')
        }}
      >
        {intl.get('voucher.list.Create')}
      </Button>
    </ContentContainer>
  )
}

export default VouchersListHead
