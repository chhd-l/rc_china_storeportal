import React from 'react'
import { Row, Col, Avatar, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { SubscriptionStatus, SubscriptionType, SubscriptionCycle } from "../modules/constants"

interface IProps {
  data: any
  handlePauseOrRestart: Function
}

const TableRow: React.FC<IProps> = ({ data, handlePauseOrRestart }) => {
  return (
    <div className="border mt-4 rounded">
      <Row className="bg-gray1 border-b px-4 content-center justify-between" align="middle">
        <Col span={12} className="flex items-center py-2">
          <Avatar src={data?.consumer?.avatarUrl} />
          <span className="ml-2">{data?.consumer?.nickName ?? ""}</span>
        </Col>
        <Col span={12} className="text-right">
          <div className="py-2">Subscription ID: {data?.no ?? ""}</div>
        </Col>
      </Row>
      <Row className="p-4 flex items-start">
        <Col span={10} className="flex flex-col justify-start">
          {(data?.productList ?? []).map((product: any, idx: number) => (
          <Row key={idx}>
            <Col span={6}>
              <img className="w-16 h-16 order-img" src={product?.productVariant?.defaultImage || ""} alt="" />
            </Col>
            <Col span={16}>
              <Row className={`${(data?.productList ?? []).length > 1 && idx < (data?.productList ?? []).length - 1 ? "border-b h-20 pb-2" : ""}`}>
                <Col span={20}>
                  <span>{product?.productVariant?.name ?? ""}</span>
                  <br />
                  <span className="text-gray-400 text-sm">Variation: {(product?.productSpecifications ?? []).map((vari:any) => (vari?.productSpecificationDetail ?? []).map((variitem:any) => variitem.specificationDetailNameEn).join(",")).join(",")}</span>
                </Col>
                <Col span={4} className="items-start text-left">
                  x {product?.productVariant?.num}
                </Col>
              </Row>
            </Col>
          </Row>
          ))}
        </Col>
        <Col span={4} className="text-left">
          {SubscriptionStatus[data?.status]}
        </Col>
        <Col span={4} className="text-left">
          {SubscriptionType[data?.type]}
        </Col>
        <Col span={4} className="text-left">
          {SubscriptionCycle[data?.cycle]}
        </Col>
        <Col span={2} className="text-left">
          <div className="space-x-2">
            <Tooltip title="View Details">
              <Link to="/subscription/subscription-detail" state={{id: data?.id}} className="cursor-pointer iconfont icon-kjafg primary-color" />
            </Tooltip>
            {data?.status === "PAUSED" || data?.status === "ONGOING" ? <Tooltip title={data?.status === "PAUSED" ? "Restart" : "Pause"}>
              <span
                className={`cursor-pointer iconfont primary-color ${data?.status === "PAUSED" ? "icon-Vector2" : "icon-Vector-1"}`}
                onClick={() => handlePauseOrRestart(data?.status === "PAUSED", data?.id)}
              />
            </Tooltip> : null}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default TableRow
