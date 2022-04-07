import { Form, Input, Select } from "antd";
import type {
  InputSelectProps,
  InputTextProps,
} from "@/framework/types/common";
import type { FormListFieldData } from "antd/lib/form/FormList";

interface FormProps {
  list: (InputTextProps | InputSelectProps)[];
  parentName?: Array<any>;
  field: FormListFieldData;
  layout?: any;
}
export default ({ list, parentName, field, layout }: FormProps) => {
  return (
    <>
      {list.map((el: any) => {
        let name = parentName ? [...parentName, el.name] : el.name; //兼容form.list
        return (
          <Form.Item
            className={el.className}
            {...field}
            {...layout}
            label={el.label}
            name={name}
            rules={el.rules}
          >
            {el.type == "select" && (
              <Select
                placeholder={"please select " + el.label}
                options={el.options}
              />
            )}
            {el.type == "input" && (
              <Input
                placeholder={"please input " + el.label}
                addonBefore={el.addonBefore}
              />
            )}
          </Form.Item>
        );
      })}
    </>
  );
};
