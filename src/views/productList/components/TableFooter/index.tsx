import { ProductListItemProps } from "@/framework/types/product"
import { Button } from "antd"
import { ReactElement } from "react"
import "./index.less"
export type TableFooterProps = {
  children: ReactElement
  list: ProductListItemProps[]
}
const TableFooter = ({ children, list }: TableFooterProps) => {
  return (
    <div className="table-footer bg-white flex justify-between py-4">
      <div>{children}</div>
      <div>
        <span className="mr-4">
          {list.filter((el) => el.checked)?.length || 0} products selected
        </span>
        <Button className="mr-4">Delete</Button>
        <Button className="mr-4">Delist</Button>
        <Button className="mr-4" type="primary">
          Publish
        </Button>
      </div>
    </div>
  )
}

export default TableFooter
