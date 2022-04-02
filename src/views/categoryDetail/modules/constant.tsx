import { ProductItem } from "@/framework/types/product";
import { ProColumns } from "@ant-design/pro-table";

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
