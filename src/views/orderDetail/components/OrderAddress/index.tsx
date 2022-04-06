import { Address } from "@/framework/types/customer";

const OrderAddress = ({ orderAddress }: { orderAddress: Address }) => {
  return (
    <div className="flex justify-start">
      <span className="iconfont icon-a-xingzhuangjiehe2 text-red-500" />
      <div className="flex flex-col justify-start items-start ml-4">
        <span>Delivery Address</span>
        <span>
          {orderAddress.receiverName} {orderAddress.phone}{" "}
          {orderAddress.postCode}
        </span>
        <span>
          {orderAddress.province} {orderAddress.city} {orderAddress.region}{" "}
          {orderAddress.detail}
        </span>
      </div>
    </div>
  );
};
export default OrderAddress;
