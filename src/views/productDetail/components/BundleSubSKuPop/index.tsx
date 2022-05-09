import ProTable from '@/components/common/ProTable'
import { getBundleGoodsvariants, getCategories } from '@/framework/api/get-product'
// import { categoryList } from '@/framework/mock/categorylist'
import { getTree } from '@/framework/normalize/product'
import { CateItemProps } from '@/framework/schema/product.schema'
import { ProFormInstance } from '@ant-design/pro-form'
import { ProColumns } from '@ant-design/pro-table'
import { Input, Modal, Select, Space } from 'antd'
import { useEffect, useRef, useState } from 'react'
interface Props {
  isModalVisible: boolean
  handleOk: Function
  setShowBundleChoose: (flag: boolean) => void
  defaultSelected: string[]
}
let allPageList: any = [] //点击请求到的所有数据

const BundleSku = ({ isModalVisible, setShowBundleChoose, handleOk, defaultSelected }: Props) => {
  const [keyVal, setKeyVal] = useState('productName')
  const [categoryList, setCategoryList] = useState([])
  const [startPrice, setStartPrice] = useState<string>('')
  const [regularList, setRegularList] = useState([])
  const ref = useRef<ProFormInstance>()
  const { Option } = Select
  const changeKeyVal = (val: string) => {
    console.info('...', val)
    setKeyVal(val)
  }
  const [selectedRowKeys, setSelectedRowKeys] = useState([''])
  const onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    setSelectedRowKeys(selectedRowKeys)
  }
  const handleCancel = () => {
    setShowBundleChoose(false)
  }
  const selectBefore = (
    <Select defaultValue='productName' onChange={changeKeyVal} className='select-before'>
      <Option value='productName'>Product Name</Option>
      <Option value='sku'>SKU</Option>
    </Select>
  )
  const getCateList = async () => {
    let list: CateItemProps[] = await getCategories({ storeId: '12345678' })
    let treeList = getTree(list, null, 0)
    setCategoryList(treeList)
  }
  useEffect(() => {
    getCateList()
  }, [])
  useEffect(() => {
    if (defaultSelected) {
      setSelectedRowKeys(defaultSelected)
      debugger
    }
  }, [defaultSelected])
  const columns: ProColumns<any>[] = [
    {
      dataIndex: 'cateId',
      key: 'cateId',
      hideInTable: true,
      title: 'Category',
      valueType: 'cascader',
      fieldProps: {
        options: categoryList,
      },
    },

    {
      dataIndex: 'index',
      title: 'Products',
      hideInSearch: true,
      render: (_, record) => {
        return (
          <div className='flex items-center'>
            <div className='border border-solid p-1' style={{ borderColor: '#f8f8f8' }}>
              <img className='h-8 w-auto' src={record.defaultImage} alt='' />
            </div>
            <div className='text-xs'>
              <div>{record.name}</div>
              <div className='text-gray-400'>SKU:{record.skuNo}</div>
            </div>
          </div>
        )
      },
    },
    {
      dataIndex: 'search',
      title: 'Search',
      hideInTable: true,
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        return <Input addonBefore={selectBefore} />
      },
    },
    {
      dataIndex: 'listPrice',
      title: 'Brand',
    },

    {
      dataIndex: 'marketingPrice',
      title: 'Price',
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        return (
          <div className='flex'>
            <Input
              addonBefore='¥'
              onChange={e => {
                setStartPrice(e.target.value)
              }}
              className='mr-4'
              value={startPrice}
            />{' '}
            <Input addonBefore='¥' />
          </div>
        )
      },
    },
    {
      dataIndex: 'stock',
      title: 'Stock',
      hideInSearch: true,
    },
  ]
  return (
    <Modal
      okText='Comfirm'
      title='Select Products'
      visible={isModalVisible}
      width={800}
      onOk={() => {
        console.info('allPageList', allPageList)
        let regularChoosed = selectedRowKeys.map((el: string) => {
          let choosedItem = allPageList.find((item: any) => item.id === el)
          debugger
          if (choosedItem) {
            choosedItem.subGoodsVariantId = choosedItem.id
            return choosedItem
          }
        })
        console.info('regularChoosed', regularChoosed)
        handleOk(regularChoosed)
        handleCancel()
      }}
      onCancel={handleCancel}
    >
      <ProTable
        columns={columns}
        formRef={ref}
        search={{ span: 12, labelWidth: 60 }}
        rowKey='id'
        pagination={{
          pageSize: 5,
        }}
        rowSelection={{
          preserveSelectedRowKeys: true,
          selectedRowKeys,
          onChange: onSelectChange,
          alwaysShowAlert: false,
        }}
        request={async (params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log('test sort', params, sorter, filter)

          let limit = params.pageSize
          let offset = params.current - 1
          delete params.current
          delete params.pageSize
          let sample: any = {
            storeId: '12345678',
            ...params,
          }
          if (params.search) {
            sample[keyVal] = params.search
          }
          if (startPrice) {
            sample.startPrice = startPrice
          }
          delete sample.search
          console.info('sample', sample)
          let res = await getBundleGoodsvariants({
            limit,
            isNeedTotal: true,
            offset,
            sample,
          })
          let list = res.records || []
          allPageList.unshift(...list)
          console.info('allPageList', allPageList)
          setRegularList(list)
          console.info('res', res)
          return Promise.resolve({
            data: list,
            success: true,
            total: res.total,
          })
        }}
      />
    </Modal>
  )
}
export default BundleSku
