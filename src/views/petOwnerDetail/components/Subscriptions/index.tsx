import { Avatar, DatePicker, Row, Col, Tooltip, Empty,Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import {  getSubscriptionList } from '@/framework/api/subscription'
import { SubscriptionStatus, SubscriptionType } from "./modules/constants"
import { Link } from 'react-router-dom'
import moment from "moment";

const SubscriptionInformation = ({ consumerId, id }: any) => {
  const [subscriptionList, setSubscriptionList] = useState([])
  const [pages, setPages] = useState<{page:number,limit:number}>({page:1,limit:10});
  const [total, setTotal] = useState(0)
  const changePage = async (page: number, pageSize: number) => {
    getList(page,pageSize)
    setPages({page: page,limit:pageSize})
  }
  const getList = async (current: number, limit: number, param: any = { where: undefined }) => {
   let data = await getSubscriptionList({
     offset: current * limit - limit,
     limit: limit,
     isNeedTotal: true,
     sample: { consumer:{id:consumerId} },
     where: param.where,
   } )
    setPages({page: current,limit:limit})
    setTotal(data?.total ?? 0)
    setSubscriptionList(data?.records ?? [])
  }
  useEffect(() => {
    getList(1, 5);
  }, [])

  return (
    <div id={id} className="mt-4">
      <div className="py-4 px-2 border-b text-xl font-medium">Subscription Information</div>
      <div className="px-2 py-4 flex flex-row items-center justify-end">
        <div className="flex flex-row items-center mr-10">
          <div className="mr-4">Subscription Creation Date:</div>
          <DatePicker.RangePicker
            style={{ width: '300px' }}
            onChange={(date, dateString) => {
              if(dateString[0]&&dateString[1]){
                getList(1, pages.limit,{where:{createdAtGreaterThan:moment(dateString[0]).format(),createdAtLessThan:moment(dateString[1]).format()}})
              } else {
                getList(1, pages.limit)
              }
            }}
          />
        </div>
      </div>
      <Row className="bg-gray1 border p-4">
        <Col span={8}>Product(s)</Col>
        <Col span={6} className="text-center">
          Subscription Status
        </Col>
        <Col span={6} className="text-center">
          Subscription Type
        </Col>
        <Col span={4} className="text-center">
          Subscription Actions
        </Col>
      </Row>
      {subscriptionList.length > 0 ? (
        subscriptionList?.map((item: any) => (
          <div className="border mt-4" key={item.subscriptionId}>
            <Row className="bg-gray1 border-b p-4">
              <Col span={12} className="flex items-center">
                <Avatar icon={<img src={item?.consumer?.avatarUrl} alt={''} />} />
                <span className="ml-2">{item?.consumer?.nickName ?? ""}</span>
              </Col>
              <Col span={12} className="text-right">
                <div>subscription ID:{item?.no ?? ""}</div>
              </Col>
            </Row>
            <Row className="p-2 flex items-start">
              <Col span={8} className="flex flex-col justify-start">
                {item.productList?.map((product: any, index: number) => (
                  <Row
                    gutter={24}
                    className={`${index !== item.productList.length - 1 ? ' mb-1 pb-2' : ''} items-start`}
                    key={index}
                  >
                    <Col span={6}>
                      <img src={product?.variants?.defaultImage || ""} className="w-16 h-16 order-img" alt="" />
                    </Col>
                    <Col span={18}>
                      <Row
                        gutter={24}
                        className={`${
                          item.productList.length > 1 && index !== item.productList.length - 1 ? 'border-b h-20 pb-2' : ''
                        }`}
                      >
                        <Col span={20}>
                          <span>{product?.variants?.name ?? ""}</span>
                          <br />
                          <span className="text-gray-400 text-sm">Variation:{(product?.specifications ?? []).map((vari:any) => (vari?.specificationDetails ?? []).map((variitem:any) => variitem.specificationDetailNameEn).join(",")).join(",")}</span>
                        </Col>
                        <Col span={4} className="items-start text-left">
                          x{product?.variants?.num}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ))}
              </Col>
              <Col span={6} className="text-center">
                {SubscriptionStatus[item?.status]}
              </Col>
              <Col span={6} className="text-center">
                {SubscriptionType[item?.type]}
              </Col>
              <Col span={4} className="text-center">
                <Tooltip title="View Details">
                  <Link to="/subscription/subscription-detail" state={{id: item?.id}} className="cursor-pointer iconfont icon-kjafg primary-color" />
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
            current={pages.page}
            pageSize={pages.limit}
            total={total}
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
