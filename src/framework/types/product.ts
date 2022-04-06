import { OptionsProps } from "./common";

// categories
export interface CategoryBaseProps {
  displayName: string;
  type: number;
  createdUser: string;
  productNum: number;
  isDisplay: boolean;
  id: string;
}
export interface ProductItem {
  productName: string;
  marketingPrice: number;
  stock: number;
}
export interface CategoryProductProps extends CategoryBaseProps {
  rules: OptionsProps[];
  productList: ProductItem[] | [];
}
export interface ProductBaseProps {
  id: number;
  price: number;
  status: number;
  stock: number;
  skuId: string;
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
