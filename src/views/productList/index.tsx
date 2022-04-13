import { Link } from "react-router-dom";
import { Button, Tabs } from "antd";
import { useState } from "react";
import { dataSource } from "./modules/mockdata";
import Mock from "mockjs";
import SearchHeader from "./components/SearchHeader";
import RenderBadge from "./components/RenderBadge";
import TableList from "./components/tableList";
import { OptionsProps } from "@/framework/types/common";
import { Tab, toolbarInit, handleTabValue } from "./modules/constant";
import { ContentContainer, TableContainer, DivideArea } from "@/components/ui";

const { TabPane } = Tabs;

const listData = Mock.mock(dataSource);
console.info("listData", listData);
const ProductList = () => {
  const [activeKey, setActiveKey] = useState<React.Key>(Tab.All);
  const toolbarList: OptionsProps[] = handleTabValue(toolbarInit, listData);
  const getFormData = (data: any) => {
    console.info(data, "data");
  };
  const handleTab = (activeKey: any) => {
    setActiveKey(activeKey);
    console.info(activeKey);
  };
  return (
    <ContentContainer className="product-list">
      <SearchHeader getFormData={getFormData} />
      <DivideArea />
      <TableContainer>
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
            >
              <div className="flex justify-between items-center pb-4">
                <div>4 Products</div>
                <div>
                  <Link to="/product/add" className="mr-4">
                    <Button type="primary">Add a New Product</Button>
                  </Link>
                  <Button>Export</Button>
                </div>
              </div>
              <TableList listData={listData} />
            </TabPane>
          ))}
        </Tabs>
      </TableContainer>
    </ContentContainer>
  );
};

export default ProductList;
