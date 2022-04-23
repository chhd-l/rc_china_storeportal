import { Divider } from "antd";
import { Log } from "@/framework/types/order";

const OperationLog = ({ logs }: { logs: Log[] }) => {
  return (
    <div>
      <Divider>
        <span>Operation log</span>
      </Divider>
      {logs.map((item) => (
        <div className="flex items-center justify-start px-2">
          <span className="icon-dingdan iconfont text-red-500 text-xl" />
          <div className="flex flex-col justify-start items-start ml-2 w-full">
            <div>{item.status}</div>
            <div className="flex justify-between w-full">
              <span>{item.createdAt}</span>
              <span>By {item.createdBy}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default OperationLog;
