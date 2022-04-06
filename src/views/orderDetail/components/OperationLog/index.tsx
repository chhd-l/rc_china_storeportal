import { Divider } from "antd";

const OperationLog = ({}) => {
  return (
    <div>
      <Divider>
        <span>Operation log</span>
      </Divider>
      <div className="flex items-center justify-start">
        <span className="icon-Frame1 iconfont text-red-500" />
        <div className="flex flex-col justify-start items-start ml-2 w-full">
          <div>New Order</div>
          <div className="flex justify-between w-full">
            <span>2021/05/23 13:23</span>
            <span>By Cusumer</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OperationLog;
