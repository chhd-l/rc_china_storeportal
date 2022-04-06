import { useState } from "react";
import { UpOutlined, DownOutlined } from "@ant-design/icons";

const OrderCarrier = ({}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="flex flex-col justify-start mt-4">
      <div className="flex flex-row justify-between">
        <div>
          <span className="iconfont icon-a-xingzhuangjiehe3 text-red-500" />
          <span className="ml-4">Carrier information</span>
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
          )}{" "}
        </div>
      </div>
      <div className="flex flex-col justify-start items-start pl-8">
        <div className="flex flex-row items-center">
          <span>Pack1:87866756556768798</span>
          <span className="ml-8">Carrier company:SF Express</span>
        </div>
        <div className="flex flex-row items-center">
          <img src={""} />
          <span>Skill shirt</span>
        </div>
      </div>
    </div>
  );
};
export default OrderCarrier;
