import { OptionsProps } from "./common";

// categories
export interface CategoryBaseProps {
  displayName: string;
  type: string;
  createdUser: string;
  productNum: number;
  isDispaly: boolean;
  id: string;
}
export interface productItem {
  productName: string;
  marketingPrice: number;
  stock: number;
}
export interface CategoryProductProps extends CategoryBaseProps {
  rules: OptionsProps[];
  productList: productItem[] | [];
}
