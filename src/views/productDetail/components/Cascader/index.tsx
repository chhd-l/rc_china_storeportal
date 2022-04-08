import "./index.less";
import { ProFormCascader } from "@ant-design/pro-form";
import { useState } from "react";
import { mock } from "mockjs";
import { cateListData } from "../../modules/mockdata";
interface CascaderProps {}
const cateList = mock(cateListData).list;
console.info("cateList", cateList);

const Cascader = (props: CascaderProps) => {
  const [categories, setCategories] = useState<any>([]);
  function onChange(value: any, selectedOptions: any) {
    console.info("selectedOptions", selectedOptions);
    setCategories(value);
  }

  return (
    <div className="cate-cascader">
      <div className="p-6 bg-gray-50">
        <ProFormCascader
          name="cateName"
          rules={[{ required: true, message: "这是必填项" }]}
          request={(params, props) => {
            return Promise.resolve(cateList);
          }}
          fieldProps={{
            changeOnSelect: true,
            onChange: onChange,
            showSearch: true,
            dropdownClassName: "product-choose-cate",
            open: true,
            placement: "bottomLeft",
            placeholder: "Categores Name",
            // options,
          }}
        />
        <div className="ant-select"></div>
      </div>

      <div className="py-4">
        the current selected :{" "}
        {categories.length
          ? categories.map(
              (el: string, idx: number) => ` ${idx === 0 ? "" : ">"} ${el}`
            )
          : "No categories has been chosen"}
      </div>
    </div>
  );
};

export default Cascader;
