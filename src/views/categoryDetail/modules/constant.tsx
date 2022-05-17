import { ProductForCateProps } from "@/framework/types/product";
import { ProColumns } from "@ant-design/pro-table";
import { Button } from "antd";
import { getESProducts } from '@/framework/api/get-product'

export const columns: ProColumns<ProductForCateProps>[] = [
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



export const restWrapButtons = (
  renderProps: any,
  productNum: number,
  closeModal: (visible: boolean) => void
) => {
  const setting = (props: any) => {
    const { submit } = props.form;
    return [
      <div className="pr-4 text-gryy-400"> {productNum} product(s) found</div>,
      <Button key="cancel" onClick={() => closeModal(false)}>
        Cancel
      </Button>,
      <Button key="submit" type="primary" onClick={() => submit?.()}>
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
