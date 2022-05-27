import { Avatar, DatePicker, Row, Col, Tooltip, Empty,Pagination } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { PageParamsProps } from '@/framework/types/common'

const SubscriptionInformation = ({ customerId, id }: any) => {
  const navigator = useNavigate()
  const [subscriptionList, setSubscriptionList] = useState([
  //   {
  //   subscriptionId:'1',
  //   customerName:'dsadsa',
  //   img:'https://thirdwx.qlogo.cn/mmopen/vi_32/4hVkF9Gmv5oIiakLOn081OeSB9iaYYKfKb6yYqQftgbbDpdlSw1vtFI4He0xKZYnt0ayQWBNQkQLn1ztKKcfj2UQ/132',
  //   products:[{
  //     id:1,
  //     img:'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1618476680557_qTbFsC.jpg',
  //     productName:'假数据',
  //     num:1,
  //     goodsSpecifications:'222'
  //   },{
  //     id:2,
  //     img:'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1618476680557_qTbFsC.jpg',
  //     productName:'假数据',
  //     num:1,
  //     goodsSpecifications:'222'
  //   }]
  // }
  ])
  const [pageParams, setPageParams] = useState<PageParamsProps>({
    currentPage: 1,
    pageSize: 3,
  })
  const [total, setTotal] = useState(0)
  const { currentPage, pageSize } = pageParams
  const changePage = async (page: any, pageSize: any) => {
    setPageParams({ currentPage: page, pageSize })
  }

  return (
    <div id={id} className="mt-4">
      <div className="py-4 px-2 border-b text-xl font-medium">Subscription Information</div>
      <div className="px-2 py-4 flex flex-row items-center justify-end">
        <div className="flex flex-row items-center mr-10">
          <div className="mr-4">Subscription Time Date:</div>
          <DatePicker.RangePicker
            style={{ width: '300px' }}
            onChange={(date, dateString) => {
              console.log(date, dateString)
            }}
          />
        </div>
      </div>
      <Row className="bg-gray1 border p-4">
        <Col span={8}>Product(s)</Col>
        <Col span={6} className="text-right">
          Subscription Status
        </Col>
        <Col span={6} className="text-right">
          Subscription Type
        </Col>
        <Col span={4} className="text-right">
          Subscription Actions
        </Col>
      </Row>
      {subscriptionList.length > 0 ? (
        subscriptionList?.map((item: any) => (
          <div className="border mt-4" key={item.subscriptionId}>
            <Row className="bg-gray1 border-b p-4">
              <Col span={12} className="flex items-center">
                <Avatar icon={<img src={item.img} alt={''} />} />
                <span className="ml-2">{item.customerName}</span>
              </Col>
              <Col span={12} className="text-right">
                <div>subscription ID:{item.subscriptionId}</div>
              </Col>
            </Row>
            <Row className="p-2 flex items-start">
              <Col span={8} className="flex flex-col justify-start">
                {item.products?.map((product: any, index: number) => (
                  <Row
                    gutter={24}
                    className={`${index !== item.products.length - 1 ? ' mb-1 pb-2' : ''} items-start`}
                    key={product.skuId}
                  >
                    <Col span={6}>
                      <img src={product.img} className="w-16 h-16 order-img" alt="" />
                    </Col>
                    <Col span={18}>
                      <Row
                        gutter={24}
                        className={`${
                          item.products.length > 1 && index !== item.products.length - 1 ? 'border-b h-20 pb-2' : ''
                        }`}
                      >
                        <Col span={20}>
                          <span>{product.productName}</span>
                          <br />
                          <span className="text-gray-400 text-sm">Variation:{product.goodsSpecifications}</span>
                        </Col>
                        <Col span={4} className="items-start text-left">
                          x{product.num}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ))}
              </Col>
              <Col span={6} className="text-center">
                <div>{item.subscriptionStatus}</div>
              </Col>
              <Col span={6} className="text-center">
                <div>{item.subscriptionType}</div>
              </Col>
              <Col span={4} className="text-left">
                <Tooltip title="View Details">
                  <span
                    className="cursor-pointer iconfont icon-kjafg primary-color"
                    onClick={() => {
                      navigator('/subscription/subscription-detail', {
                        state: { id: item.subscriptionId },
                      })
                    }}
                  />
                </Tooltip>
              </Col>
            </Row>
          </div>
        ))
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      {total > 0 && (
        <div className="flex flex-row justify-end mt-4">
          <Pagination
            current={currentPage}
            total={total}
            pageSize={pageSize}
            onChange={changePage}
            showSizeChanger={false}
            className="rc-pagination"
          />
        </div>
      )}
    </div>
  )
}
export default SubscriptionInformation
