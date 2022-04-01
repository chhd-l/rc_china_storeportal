import "./index.less";
import { ProFormCascader } from "@ant-design/pro-form";
import { useState } from "react";
interface CascaderProps {}
const Cascader = (props: CascaderProps) => {
  const [categories, setCategories] = useState<any>([]);
  function onChange(value: any, selectedOptions: any) {
    setCategories(value);
  }
  return (
    <div className="cate-cascader">
      <div className="p-6 bg-gray-50">
        <ProFormCascader
          name="cateName"
          rules={[{ required: true, message: "这是必填项" }]}
          fieldProps={{
            changeOnSelect: true,
            onChange: onChange,
            dropdownClassName: "product-choose-cate",
            open: true,
            placement: "bottomLeft",
            placeholder: "Categores Name",
            options: [
              {
                value: "zhejiang",
                label: "Zhejiang",
                children: [
                  {
                    value: "hangzhou",
                    label: "Hangzhou",
                    children: [
                      {
                        value: "xihu",
                        label: "West Lake",
                      },
                    ],
                  },
                ],
              },
            ],
          }}
        />
        <div className="ant-select"></div>
      </div>

      <div className="py-4">
        the current selected :{" "}
        {categories.length
          ? categories.map((el: string) => `${el} > `)
          : "No categories has been chosen"}
      </div>
    </div>
  );
};

export default Cascader;
