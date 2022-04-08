import "./index.less";
import { message, Tag } from "antd";
import ProForm, {
  ModalForm,
  ProFormSelect,
  ProFormMoney,
  ProFormInstance,
} from "@ant-design/pro-form";
import { mockOption, productLists } from "../../modules/mockdata";
import Mock from "mockjs";
import { useRef, useState } from "react";
import { restSearchButtons, restWrapButtons } from "../../modules/constant";
interface ProductItemProps {
  name: string;
  img: string;
  id: string;
}
export interface RuleBasedFilteringProps {
  visible: boolean;
  handleVisible: (visible: boolean) => void;
}
const mockOptions = Mock.mock(mockOption).options;
console.info("mockOptions", mockOptions);
const RuleBasedFiltering = ({
  visible,
  handleVisible,
}: RuleBasedFilteringProps) => {
  const formRef = useRef<ProFormInstance>();
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [productList, setProductList] = useState<ProductItemProps[]>([]);
  return (
    <ModalForm
      className="rule-based-filtering"
      title={
        <>
          <div>Set Filtering Rules</div>
          <div className="text-gray-400 font-normal text-xs">
            If your products meet the filtering rule criteria, they will
            auyomatically be added into your shop category
          </div>
        </>
      }
      // 有变量，提出来报错
      // submitter={() => restWrapButtons(1, handleVisible)}

      submitter={{
        render: (props) => {
          return restWrapButtons(props, productList?.length, handleVisible);
        },
      }}
      layout="horizontal"
      visible={visible}
      onFinish={async (values) => {
        // 用productList直接传值操作
        console.log(productList, "......");
        message.success("提交成功");
        return true;
      }}
      onVisibleChange={handleVisible}
    >
      <div className="flex">
        <div className="flex-1 bg-gray-200 mr-4">
          <ProForm
            formRef={formRef}
            className="py-3 pl-4 text-center"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            submitter={restSearchButtons}
            onValuesChange={() => {
              let selected = { ...formRef.current?.getFieldsFormatValue?.() };
              let tagArr: string[] = [];
              delete selected.lowestPrice;
              delete selected.highestPrice;
              if (selected) {
                tagArr = Object.values(selected);
              }
              setFilterTags(tagArr);
              console.info("formRef.current?.getFieldsFormatValue");
            }}
            layout="horizontal"
            onFinish={async (values) => {
              let list = Mock.mock(productLists).list;
              setProductList(list);
              console.info(list);
              console.log(values);
              message.success("提交成功");
            }}
            params={{}}
          >
            <ProFormSelect
              className="text-left"
              options={mockOptions}
              name="category"
              label="ProductCategory"
            />
            <ProFormSelect
              className="text-left"
              options={mockOptions}
              name="brand"
              label="Brand"
            />
            <ProFormSelect
              className="text-left"
              options={mockOptions}
              name="specification"
              label="Specification"
            />
            <div className="flex">
              <ProFormMoney
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 12 }}
                label="Markting Price"
                name="lowestPrice"
                customSymbol="￥"
              />
              <span className="relative" style={{ left: "-10px" }}>
                -
              </span>
              <ProFormMoney
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                name="highestPrice"
                customSymbol="￥"
              />
            </div>
          </ProForm>
        </div>
        <div className="w-2/5">
          <div>
            <div className="mb-3">Set Filtering Rules</div>
            {filterTags.map((el) => (
              <Tag className="ml-2" key={el}>
                {el}
              </Tag>
            ))}
          </div>
          <div>
            <div className="my-3">Filtering Results</div>
            <div className="flex flex-wrap">
              {productList.map((el) => (
                <div key={el.id} style={{ width: 60 }} className="mb-3 mr-3">
                  <div
                    style={{ height: 60 }}
                    className="border border-solid border-gray-200 flex"
                  >
                    <img
                      src={el.img}
                      className="m-auto "
                      style={{ maxHeight: 60, maxWidth: 60 }}
                    />
                  </div>
                  <div className="overflow-ellipsis overflow-hidden whitespace-nowrap">
                    {el.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ModalForm>
  );
};

export default RuleBasedFiltering;
