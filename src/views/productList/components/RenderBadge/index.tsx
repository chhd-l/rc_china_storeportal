import { Badge } from "antd";
import "./index.less";
export type RenderBadgeProps = {
  count: number;
  active: boolean;
};
const RenderBadge = ({ count, active }: RenderBadgeProps) => {
  return (
    <Badge
      count={count}
      style={{
        marginTop: -2,
        marginLeft: 4,
        color: active ? "#1890FF" : "#999",
        backgroundColor: active ? "#E6F7FF" : "#eee",
      }}
    />
  );
};

export default RenderBadge;
