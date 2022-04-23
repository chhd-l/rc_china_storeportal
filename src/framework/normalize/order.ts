import { normaliseAttrProps } from './product'
import { TradeLogs, TradePayInfo } from '../schema/order.schema'
import { Order } from '../types/order'


export enum TradeTradeStateOrderStateEnum {
  unpaid = 'UNPAID',
  toShip = 'TO_SHIP',
  shipped = 'SHIPPED',
  completed = 'COMPLETED',
  viod = 'VOID'
}

const normalisePayInfo = (payInfo: TradePayInfo, orderState: any) => {
  let info = orderState === TradeTradeStateOrderStateEnum.unpaid || orderState === "CANCELLATION"
    ? {
      payTypeName: '',
      appId: '',
      payTime: '',
      outTradeNo: '',
    }
    : {
      payTypeName: "Wechat Pay",//??
      appId: payInfo.PayInfoID,//??
      payTime: payInfo.PayStartTime,//??
      outTradeNo: payInfo.PayWayOrderID,//??
    }
  return info
}

export const normaliseOrder = (data: any): any => {
  const { customerId, nickName, phone } = data.buyer
  const { receiverName, id, phone: addressPhone, province, city, region, detail, postcode: postCode, isDefault } = data.shippingAddress
  let { tradeState, lineItem, tradePrice, payInfo, logs } = data
  let { orderState } = tradeState
  let orderItem = {
    orderNumber: data.orderNumber,
    id: data._id,
    // subscriptionId 没返回？
    buyer: {
      id: customerId,
      name: nickName,
      phone,
      // image没返回？
    },
    shippingAddress: {
      id,
      receiverName,
      phone: addressPhone,
      province, city, region, detail, postCode, isDefault
    },
    tradeItem: lineItem?.map((item: any) => {
      const { skuId, pic, skuName, num, price, goodsSpecifications } = item
      return {
        skuId,
        pic, skuName,
        goodsSpecifications,
        // size,//??
        // color//??
        num,
        price
      }
    }) || [],
    tradeState: {
      orderState: orderState
    },
    carrier: [],
    // carrier:()=>orderState === "SHIPPED"
    // ? [
    //     {
    //       packId: Mock.Random.id(),
    //       company: "SF",
    //       tradeItem: [
    //         {
    //           skuId: Mock.Random.id(),
    //           pic: "https://d2cstgstorage.z13.web.core.windows.net/fr/fr-229732-master.jpg",
    //           skuName: Mock.Random.title(),
    //           num: 1,
    //           price: 198,
    //         },
    //       ],
    //     },
    //   ]
    // : [],
    carrierType: orderState === TradeTradeStateOrderStateEnum.shipped || orderState === TradeTradeStateOrderStateEnum.completed ? 'SF' : '',
    tradePrice: {
      goodsPrice: tradePrice.goodsPrice,
      discountsPrice: tradePrice.discountsPrice,
      deliveryPrice: tradePrice.deliveryPrice,
      totalPrice: tradePrice.totalPrice,
    },
    payInfo: payInfo ? normalisePayInfo(payInfo, orderState) : {},
    logs: logs.map((log: TradeLogs) => {
      return {
        createdAt: log.createdAt,
        createdBy: log.createdby,
        status: "New Order",//?
        id: "@id",//??id是枚举？
      }
    }),
    comments: []
  }
  return orderItem
}