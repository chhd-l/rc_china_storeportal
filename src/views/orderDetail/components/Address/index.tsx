import { Address } from '@/framework/types/consumer'

const OrderAddress = ({ address }: { address: Address | any }) => {
  const { receiverName, phone, postCode, province, city, region, detail } = address

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <span className="iconfont icon-a-xingzhuangjiehe2 text-theme-red text-2xl" />
        <span className="text-black text-base ml-md">
          {receiverName} {phone} {postCode}
        </span>
      </div>
      <div className=" ml-9 text-black text-base">
        {province} {city} {region} {detail}
      </div>
    </div>
  )
}
export default OrderAddress
