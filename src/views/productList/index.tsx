import { Link } from "react-router-dom"
import { Button, Tabs } from "antd"
import { useState } from "react"
import { dataSource } from "./modules/mockdata"
import Mock from "mockjs"
import SearchHeader from "./components/SearchHeader"
import RenderBadge from "./components/RenderBadge"
import TableList from "./components/TableList"
import { OptionsProps } from "@/framework/types/common"
import { Tab, toolbarInit, handleTabValue } from "./modules/constant"
import TabPane from "@ant-design/pro-card/lib/components/TabPane"
import { MenuOutlined } from "@ant-design/icons"
const listData = Mock.mock(dataSource)
console.info("listData", listData)
const ProductList = () => {
  const [activeKey, setActiveKey] = useState<React.Key>(Tab.All)
  const toolbarList: OptionsProps[] = handleTabValue(toolbarInit, listData)
  const getFormData = (data: any) => {
    console.info(data, "data")
  }
  const handleTab = (activeKey: any) => {
    setActiveKey(activeKey)
    console.info(activeKey)
  }
  return (
    <div className="product-list bg-gray-50 py-14 px-6 text-left">
      <SearchHeader getFormData={getFormData} />
      <div className="bg-white px-6">
        <Tabs defaultActiveKey={Tab.All} onChange={handleTab}>
          {toolbarList.map((el) => (
            <TabPane
              tab={
                <div>
                  {el.name.toLowerCase()}
                  <RenderBadge
                    count={el.value}
                    active={activeKey === el.name}
                  />
                </div>
              }
              key={el.name}
            ></TabPane>
          ))}
        </Tabs>
        <div className="flex justify-between items-center py-4">
          <div>
            {toolbarList.find((el) => activeKey === el.name)?.value} Products
          </div>
          <div className="flex items-center">
            <Link to="/product/add" className="mr-4">
              <Button type="primary">Add a New Product</Button>
            </Link>
            <Button className="mr-4">Export</Button>
            <MenuOutlined className=" border border-solid border-gray-300" />
          </div>
        </div>
        <TableList listData={listData} />
      </div>
    </div>
  )
}

export default ProductList
