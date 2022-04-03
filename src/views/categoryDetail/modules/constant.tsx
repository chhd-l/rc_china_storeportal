import { ProductItem } from "@/framework/types/product";
import { SubmitterProps } from "@ant-design/pro-form";
import { ProColumns } from "@ant-design/pro-table";
import { Button } from "antd";

export const columns: ProColumns<ProductItem>[] = [
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

export const restSearchButtons = {
  render: (props: any) => {
    console.log(props);
    return [
      <Button
        key="submit"
        type="primary"
        onClick={() => props.form?.submit?.()}
      >
        Search
      </Button>,
      <Button key="rest" onClick={() => props.form?.resetFields()}>
        Reset
      </Button>,
    ];
  },
};

export const restWrapButtons = (
  renderProps: any,
  productNum: number,
  closeModal: (visible: boolean) => void
) => {
  const setting = (props: any) => {
    return [
      <div className="pr-4 text-gryy-400"> {productNum} product(s) found</div>,
      <Button key="cancel" onClick={() => closeModal(false)}>
        Cancel
      </Button>,
      <Button
        key="submit"
        type="primary"
        onClick={() => props.form?.submit?.()}
      >
        Comfirm
      </Button>,
    ];
  };
  return setting(renderProps);
};

export const manualColumns: ProColumns<any>[] = [
  {
    title: "products",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Price(s)",
    dataIndex: "marketingPrice",
    sorter: (a, b) => a.lowestPrice - b.lowestPrice,
    render: (_, record) => (
      <>
        {record.lowestPrice}-{record.highestPrice}
      </>
    ),
  },
  {
    title: "Stock",
    dataIndex: "stock",
  },
];
