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
import { dataSource } from "./modules/mockdata";
import Mock from 'mockjs'
const { TabPane } = Tabs

const listDatas = Mock.mock(dataSource)
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
  const handlePagination = (page: number, pageSize: number) => {
    getList(page)
  }
  const handleTab = (activeKey: any) => {
    setActiveKey(activeKey)
    console.info(activeKey)
  }

  const getList = async (page = 1) => {
    let res = await getAllProducts({ limit: 2, sample: {}, isNeedTotal: true, operator: 'sss', offset: page })
    console.info(res, res)
    setListData(res)
    let newToolbarList = handleTabValue(toolbarInit, res)
    setToolbarList(newToolbarList)
  }
  useEffect(() => {
    // getList()
    setListData(listDatas)
  }, [])
  return (
    <ContentContainer className='productlist'>
      <SearchHeader getFormData={getFormData} />
      <DivideArea />
      <TableContainer>
        <Tabs defaultActiveKey={Tab.All} onChange={handleTab}>
          {toolbarList.map(el => (
            <TabPane
              tab={
                <div>
                  {el.name}
                  {/* {console.log('el', el)}
                  <RenderBadge count={el.value + ''} active={activeKey === el.name} /> */}
                </div>
              }
              key={el.name}
            >
              <div className='flex justify-between items-center py-4'>
                <div>{toolbarList.find(el => activeKey === el.name)?.value} Products</div>
                <div className='flex items-center'>
                  <Link to='/product/add' className='mr-4'>
                    <Button type='primary'>+ Add a New Product</Button>
                  </Link>
                  <Button className='mr-4'>Export</Button>
                  <MenuOutlined className=' border border-solid border-gray-300' />
                </div>
              </div>
            </TabPane>
          ))}
        </Tabs>
        <TableList listData={listData} handlePagination={handlePagination} />
      </TableContainer>
    </ContentContainer>
  )
}

export default ProductList
