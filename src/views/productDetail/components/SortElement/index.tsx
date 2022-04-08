import { MinusCircleOutlined } from "@ant-design/icons";
import { Form, Input, Space } from "antd";
import { SortableElement, SortableHandle } from "react-sortable-hoc";
import "./index.less";
export type SortElementProps = {
  specification: any;
  index: number;
  specificationIdx: number;
  removeSpecification: any;
};
const DragHandle = SortableHandle(() => <span>move</span>);
const SortElement = SortableElement(
  ({
    specification,
    specificationIdx,
    removeSpecification,
  }: SortElementProps) => {
    return (
      <Space
        key={specification.key + specificationIdx}
        style={{
          display: "flex",
          marginBottom: 8,
        }}
        direction="vertical"
        className="flex sort-element"
      >
        <Form.Item
          {...specification}
          name={[specification.name, "option"]}
          label="options"
        >
          <div className="flex">
            <Input placeholder="options" />
            <DragHandle />
            <MinusCircleOutlined
              onClick={() => {
                removeSpecification(specification.name);
              }}
            />
          </div>
        </Form.Item>
      </Space>
    );
  }
);

export default SortElement;
