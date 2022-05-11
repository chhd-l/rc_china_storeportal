import { Address } from "@/framework/types/customer";

const OrderAddress = ({ address }: { address: Address | any }) => {
  const { receiverName, phone, postCode, province, city, region, detail } =
    address;

  return (
    <div className="flex justify-start">
      <span className="iconfont icon-a-xingzhuangjiehe2 primary-color text-xl" />
      <div className="flex flex-col justify-start items-start ml-4 text-black text-base">
        {/*<span className="text-black text-base">Delivery Address</span>*/}
        <span >
          {receiverName} {phone} {postCode}
        </span>
        <span>
          {province} {city} {region} {detail}
        </span>
      </div>
    </div>
  );
};
export default OrderAddress;
