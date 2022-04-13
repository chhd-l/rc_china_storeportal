import { ProductListItemProps } from "@/framework/types/product"
import { Button } from "antd"
import { FC, ReactElement } from "react"
import "./index.less"
export type Props = {
  children: ReactElement
  list: ProductListItemProps[]
}
const TableFooter: FC<Props> = ({ children, list }) => {
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
