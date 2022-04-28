import { Link } from 'react-router-dom'
import { Button, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import SearchHeader from './components/SearchHeader'
import RenderBadge from './components/RenderBadge'
import TableList from './components/TableLists'
import { OptionsProps } from '@/framework/types/common'
import { Tab, toolbarInit, handleTabValue } from './modules/constant'
import { ContentContainer, TableContainer, DivideArea } from '@/components/ui'
import { MenuOutlined } from '@ant-design/icons'
import { getAllProducts } from '@/framework/api/get-product'
import { ProductListItemProps, ProductListProps } from '@/framework/types/product'
// import { dataSource } from "./modules/mockdata";
// import Mock from 'mockjs'
const { TabPane } = Tabs

// const listDatas = Mock.mock(dataSource)
// console.info('listData', listData)
const ProductList = () => {
  const [activeKey, setActiveKey] = useState<React.Key>(Tab.All)
  const [toolbarList, setToolbarList] = useState<OptionsProps[]>([])
  const [listData, setListData] = useState<ProductListProps>({
    products: [],
    all: '0',
    live: '0',
    soldOut: '0',
    disabled: '0',
  })
  const getFormData = (data: any) => {
    console.info(data, 'data')
  }
  const handleTab = (activeKey: any) => {
    setActiveKey(activeKey)
    console.info(activeKey)
  }

  const getList = async () => {
    let res = await getAllProducts({ limit: 100, sample: {}, isNeedTotal: true, operator: 'sss', offset: 1 })
    console.info(res, res)
    setListData(res)
    let newToolbarList = handleTabValue(toolbarInit, res)
    setToolbarList(newToolbarList)
  }
  useEffect(() => {
    getList()
  }, [])
  return (
    <ContentContainer className='productlist'>
      <SearchHeader getFormData={getFormData}/>
      <DivideArea />
      <TableContainer>
        <Tabs defaultActiveKey={Tab.All} onChange={handleTab}>
          {toolbarList.map(el => (
            <TabPane
              tab={
                <div>
                  {el.name.toLowerCase()}
                  {/* <RenderBadge count={el.value + ''} active={activeKey === el.name} /> */}
                </div>
              }
              key={el.name}
            >
              <div className="flex justify-between items-center py-4">
                <div>
                  {toolbarList.find((el) => activeKey === el.name)?.value}{" "}
                  Products
                </div>
                <div className="flex items-center">
                  <Link to="/add-product/add" className="mr-4">
                    <Button type="primary">+ Add a New Product</Button>
                  </Link>
                  <Button className='mr-4'>Export</Button>
                  {/* <MenuOutlined className=' border border-solid border-gray-300' /> */}
                  <Button
          className="ml-3"
          icon={<MenuOutlined style={{ color: "#979797" }} />}
        />
                </div>
              </div>
            </TabPane>
          ))}
        </Tabs>
        <TableList listData={listData} />
      </TableContainer>
    </ContentContainer>
  )
}

export default ProductList
