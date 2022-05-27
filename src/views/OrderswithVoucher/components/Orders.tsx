import { ContentContainer } from '@/components/ui'
import OrdersList from "./OrdersList"
import { Typography, Form, DatePicker, Button } from 'antd'
import { useEffect, useState } from 'react'
const { Title } = Typography
const { RangePicker } = DatePicker

const dataSource = [
  {
    id: '1',
    VoucherName: '胡彦斌',
    Price: '$300',
    Stock: 32,
    Usages: 0,
    Brand: '西湖区湖底公园1号',
  },
  {
    id: '2',
    Products: 'xxxx',
    Price: '$300',
    Stock: 312,
    Usages: 0,
    Brand: '西湖区湖底公园1号',
  },
]

const Orders = ({ state }: {state:any}) => {
  const [orderList, setOrderList] = useState<any[]>([])
  //   const [total, setTotal] = useState(0)
  //   const [pageSize, setPageSize] = useState({
  //     limit: 10,
  //     offset: 0,
  //   })
  const [loading, setLoading] = useState(false)

  const getOrderLists = async () => {
    setLoading(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 1000)
    }).then(() => {
      setOrderList(dataSource)
      setLoading(false)
    })
  }

  useEffect(() => {
    if (!loading) {
      getOrderLists()
    }
  }, [])


  return (
    <ContentContainer className="bg-white p-4 mt-10">
      <Title className="mb-8" level={4}>
        Orders
      </Title>
      <div className="flex items-center justify-end pb-4 pr-10">
        <Form.Item label="Order Time Date" className="m-0 mr-3">
          <RangePicker />
        </Form.Item>
        <Button type="primary" onClick={() => {}}>
          Search
        </Button>
      </div>
      <OrdersList orderList={orderList} loading={loading} />
    </ContentContainer>
  )
}

export default Orders
