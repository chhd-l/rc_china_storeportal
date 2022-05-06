import { useState } from "react";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { Carrier } from "@/framework/types/order";

const OrderCarrier = ({ carrier }: { carrier: Carrier[] }) => {
  const [showMore, setShowMore] = useState(true);

  return (
    <div className="flex flex-col justify-start mt-4">
      <div className="flex flex-row justify-between">
        <div>
          <span className="iconfont icon-a-xingzhuangjiehe3 primary-color" />
          <span className="ml-4 text-black text-base">Carrier information</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="mr-2">View carrier detail</span>
          {showMore ? (
            <UpOutlined
              onClick={() => {
                setShowMore(false);
              }}
            />
          ) : (
            <DownOutlined
              onClick={() => {
                setShowMore(true);
              }}
            />
          )}
        </div>
      </div>
      {showMore
        ? carrier.map((item, index) => (
            <div
              className="flex flex-col justify-start items-start pl-8"
              key={item.packId}
            >
              <div className="flex flex-row items-center">
                <span>
                  Pack{index + 1}:{item.packId}
                </span>
                <span className="ml-8">
                  Carrier company:{item.company}
                </span>
              </div>
              <div>
                {/*{item?.tradeItem?.map((el) => (*/}
                {/*  <div className="flex flex-row items-center" key={el.skuId}>*/}
                {/*    <img src={el.pic} alt="" className="w-20 h-20" />*/}
                {/*    <span>{el.skuName}</span>*/}
                {/*  </div>*/}
                {/*))}*/}
                {item?.deliveries?.map((el,index) => (
                  <div className="flex flex-col mt-2" key={index}>
                    <span>{el.context}</span>
                    <span>{el.time}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        : null}
    </div>
  );
};
export default OrderCarrier;
