import { ProColumns } from "@/components/common/ProTable";
import { LabelOptionProps } from "@/framework/types/common";
import { AddCateType, CategoryBaseProps } from "@/framework/types/product";
import {
  SettingOutlined,
  DeleteOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Switch } from "antd";
import { Link } from "react-router-dom";
export const columns: ProColumns<CategoryBaseProps>[] = [
  {
    title: "Category Display Name",
    dataIndex: "displayName",
  },
  {
    title: "Created By",
    dataIndex: "createdUser",
  },
  {
    title: "Product(s)",
    dataIndex: "productNum",
  },
  {
    title: "Display On/Off",
    dataIndex: "isDisplay",
    render: (_, record) => (
      <Switch
        defaultChecked={record.isDisplay}
        disabled={record.productNum < 1}
        onChange={(checked: boolean) => {
          console.log(`switch to ${checked}`);
        }}
      />
    ),
  },
  {
    title: "Operation",
    key: "option",
    width: 180,
    valueType: "option",
    render: (_, record) => {
      if(record.productNum<=0){
        return[
        <Link to={`/category/${record.id}`} className="mr-4">
        +
      </Link>,
      // <a className=" mr-4">
      //   <SettingOutlined />
      // </a>,
      <a className=" mr-4">
      <DeleteOutlined />
      </a>]
      }else{
        return[
      <Link to={`/category/${record.id}`} className="mr-4">
        <FileTextOutlined />
      </Link>,
      <a className=" mr-4">
      <DeleteOutlined />
      </a>,]
      }
    },
  },
];

export const columnsAdjustSequence: ProColumns<any>[] = [
  {
    title: "product Name",
    dataIndex: "productName",
  },
  {
    title: "MarketingPrice",
    dataIndex: "marketingPrice",
  },
  {
    title: "Stock",
    dataIndex: "stock",
  },
];

export const AddCateOptions: LabelOptionProps[] | string[] = [
  {
    value: AddCateType.ManualSelection,
    label: (
      <>
        <div>Manual Selection</div>
        <div className="text-gray-400">
          Manually select the products you would like to include in your shop
          category
        </div>
      </>
    ),
  },
  {
    value: AddCateType.RuleBasedFiltering,
    label: (
      <>
        <div>Rule-based Filtering</div>
        <div className="text-gray-400">
          Products will be automatically selected based on the filters you have
          set up
        </div>
      </>
    ),
  },
];
