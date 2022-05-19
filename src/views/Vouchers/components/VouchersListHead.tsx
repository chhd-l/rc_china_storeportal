import { ContentContainer } from '@/components/ui'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Tabs, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography
const { TabPane } = Tabs

const callback = (key: string) => {
  console.log(key)
}

const VouchersListHead = () => {
  const navigator = useNavigate()
  return (
    <ContentContainer className="bg-white px-4 VouchersListHead relative">
      <Title className="mb-0" level={5}>
        Vouchers List
      </Title>
      <span className="text-xs text-gray-400">
        Create and manage your own vouchers for your shop and products on Seller Center!
      </span>
      <Tabs className="mt-6" defaultActiveKey="1" onChange={callback}>
        <TabPane tab="All" key="1" />
        <TabPane tab="Ongoing" key="2" />
        <TabPane tab="Upcoming" key="3" />
        <TabPane tab="Expired" key="4" />
      </Tabs>
      <Button
        className="flex items-center CreateBtn"
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          navigator('/marketingCentre/vouchers/createNewVoucher')
        }}
      >
        Create
      </Button>
    </ContentContainer>
  )
}

export default VouchersListHead
