import { ReactNode } from "react";
import { productLists } from "./../../views/categoryDetail/modules/mockdata";
import { OptionsProps } from "./common";

export interface TableHeadersItemProps {
  title: string;
  dataIndex: string;
  sortDirection?: string;
  render?: (spu: ProductListItemProps, spuIdx: number) => ReactNode;
}

// categories
export interface CategoryBaseProps {
  displayName: string;
  type: number;
  createdUser: string;
  productNum: number;
  isDisplay: boolean;
  id: string;
}
export interface ProductForCateProps {
  productName: string;
  marketingPrice: number;
  stock: number;
}
export interface CategoryProductProps extends CategoryBaseProps {
  rules: OptionsProps[];
  productList: ProductForCateProps[] | [];
}
export interface ProductBaseProps {
  id: number;
  price: number;
  status: number;
  stock: number;
  skuId: string;
}
export interface ProductListSkuItem {
  id: string;
  no: string;
  specs: string;
  price: number;
  stock: number;
}
export interface ProductListItemProps {
  skus: ProductListSkuItem[];
  img: string;
  id: string;
  no: string;
  showAll?: boolean;
  checked?: boolean;
  specs: string;
  price: number;
  stock: number;
  name: string;
}
export interface ProductListProps {
  products: ProductListItemProps[];
  all: string;
  live: string;
  soldOut: string;
  disabled: string;
}
export enum ProductType {
  Regular = "REGULAR",
  Bundle = "BUNDLE",
}

export enum AddCateType {
  ManualSelection = "0",
  RuleBasedFiltering = "1",
}
export interface SpecificationListProps {
  option: string;
}
export interface VarationProps {
  name: string;
  specificationList: SpecificationListProps[];
}
export interface VarationsFormProps {
  variationList: VarationProps[];
}
