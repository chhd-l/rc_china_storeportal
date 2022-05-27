import { Avatar, Col, Empty, Row, Spin } from 'antd'
import Image from 'rc-image'

type OrderListType = {
    loading: boolean
    orderList: any[]
}

const OrderList = ({ loading, orderList }: OrderListType) => {
  return (
    <div className="order-list-page">
      <Spin spinning={loading} tip="Loading...">
        <Row className="bg-gray1 border py-2 px-4">
          <Col span={10}>Product(s)</Col>
          <Col span={5} className="text-left">
            Order Total
          </Col>
          <Col span={5} className="text-left">
            Order status
          </Col>
          <Col span={4} className="text-left">
            Actions
          </Col>
        </Row>
        {orderList.length > 0 ? (
          orderList.map((item: any) => (
            <div className="border mt-4" key={item.id}>
              <Row className="bg-gray1 border-b py-2 px-4 content-center justify-between">
                <Col span={12} className="flex items-center">
                  <Avatar
                    icon={
                      <img
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        alt={''}
                      />
                    }
                  />
                  <span className="ml-2">xxx</span>
                </Col>
                <Col span={12} className="text-right">
                  Order ID: 111
                </Col>
              </Row>
              <Row className="p-2 flex items-start">
                <Col span={10} className="flex flex-col justify-start">
                  {[1, 2, 3, 4].map((product: any, index: number) => (
                    <Row key={index}>
                      <Col span={6}>
                        <Image
                          width={60}
                          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                          preview={false}
                        />
                      </Col>
                      <Col span={16}>
                        <Row>
                          <Col span={20}>
                            <div>xx</div>
                            <span className="text-gray-400 text-sm">Variation:x</span>
                          </Col>
                          <Col span={4} className="items-start text-left">
                            x1
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  ))}
                </Col>
                <Col span={5} className="text-left">
                  <div>
                    <div>￥974.00</div>
                    <div className="text-gray-400 ">Wechat Pay</div>
                  </div>
                </Col>
                <Col span={5} className="text-left">
                  <div>xx2</div>
                </Col>
                <Col span={4} className="text-left">
                  xx4
                </Col>
              </Row>
            </div>
          ))
        ) : (
          <Empty  image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Spin>
    </div>
  )
}

export default OrderList
