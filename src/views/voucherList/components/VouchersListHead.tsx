import { ContentContainer } from '@/components/ui'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Tabs, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Title } = Typography
const { TabPane } = Tabs

const VouchersListHead = ({ setVoucherStatus }: { setVoucherStatus:Function }) => {
  const navigator = useNavigate()

  return (
    <ContentContainer className="bg-white px-5 pb-0 VouchersListHead relative">
      <Title className="mb-0" level={5}>
        Vouchers List
      </Title>
      <span className="text-xs text-gray-400">
        Create and manage your own vouchers for your shop and products on DTC Center!
      </span>
      <Tabs defaultActiveKey="" onChange={(key) => setVoucherStatus(key)}>
        <TabPane tab="All" key="" />
        <TabPane tab="Ongoing" key="Ongoing" />
        <TabPane tab="Upcoming" key="Upcoming" />
        <TabPane tab="Expired" key="Expired" />
      </Tabs>
      <Button
        className="flex items-center CreateBtn"
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          navigator('/marketingCenter/vouchers/createNewVoucher')
        }}
      >
        Create
      </Button>
    </ContentContainer>
  )
}

export default VouchersListHead
