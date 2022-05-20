import { Link, useNavigate } from 'react-router-dom'
import { Button, Spin, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import SearchHeader from './components/SearchHeader'
import TableList from './components/TableLists'
import { OptionsProps } from '@/framework/types/common'
import { Tab, toolbarInit, handleTabValue } from './modules/constant'
import { ContentContainer, TableContainer, DivideArea } from '@/components/ui'
import { MenuOutlined } from '@ant-design/icons'
import { getAllProducts, getESProducts, getScProducts } from '@/framework/api/get-product'
import { ProductListProps } from '@/framework/types/product'
import { dataSource } from './modules/mockdata'
import Mock from 'mockjs'
import './index.less'
import { handlePageParams } from '@/utils/utils'
const { TabPane } = Tabs

const listDatas = Mock.mock(dataSource)
// console.info('listData', listData)
const ProductList = () => {
  const [activeKey, setActiveKey] = useState<React.Key>(Tab.All)
  const [sample, setSample] = useState({})
  const [filterCondition, setFilterCondition] = useState('')
  const [toolbarList, setToolbarList] = useState<OptionsProps[]>([])
  const navigation = useNavigate()
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState<ProductListProps>({
    products: [],
    all: '0',
    live: '0',
    soldOut: '0',
    disabled: '0',
    total: 0,
  })
  const [pages, setPages] = useState({
    page: 1,
    pageSize: 10,
  })

  const getFormData = (data: any) => {
    setSample(data)
  }
  const handlePagination = (page: number, pageSize: number) => {
    const pages = { page, pageSize }
    setPages(pages)
  }
  const handleTab = (activeKey: any) => {
    setActiveKey(activeKey)
    let filter = ''
    if (activeKey !== 'All') {
      filter = activeKey
        .split(' ')
        .join('_')
        .toUpperCase()
    }
    setFilterCondition(filter)
    console.info()
  }

  const getList = async () => {
    setLoading(true)
    let pageParams = handlePageParams({ currentPage: pages.page, pageSize: pages.pageSize })
    let params: any = {
      sample,
      isNeedTotal: true,
      operator: 'sss',
    }
    params = Object.assign({}, params, pageParams)
    if (filterCondition) {
      params.filterCondition = filterCondition
    }
    let res = await getScProducts(params)
    setLoading(false)
    setListData(res)
    let newToolbarList = handleTabValue(toolbarInit, res)
    setToolbarList(newToolbarList)
  }
  useEffect(() => {
    getList()
    // setListData(listDatas)
  }, [sample, pages, filterCondition])

  // useEffect(() => {
  //   getList()
  //   // setListData(listDatas)
  // }, [filterCondition])
  return (
    <ContentContainer>
      <div className='product-list'>
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
                  <div className='total-products'>
                    <span>{listData.total ? listData.total : 0}</span> Products
                  </div>
                  <div className='flex items-center'>
                    <Button
                      type='primary'
                      onClick={() => {
                        // window.open('/product/add')
                        navigation(`/product/product-add`)
                      }}
                    >
                      + Add a New Product
                    </Button>
                    <Button className='ml-4'>Export</Button>
                    {/* <MenuOutlined className=' border border-solid border-gray-300' /> */}
                    <Button className='ml-3' icon={<MenuOutlined style={{ color: '#979797' }} />} />
                  </div>
                </div>
              </TabPane>
            ))}
          </Tabs>
          <Spin spinning={loading}>
            <TableList
              setLoading={setLoading}
              loading={loading}
              getList={getList}
              listData={listData}
              handlePagination={handlePagination}
              pages={pages}
            />
          </Spin>
        </TableContainer>
      </div>
    </ContentContainer>
  )
}

export default ProductList
