import './index.less'
import { ProFormCascader } from '@ant-design/pro-form'
import { useContext, useEffect, useRef, useState } from 'react'
import { mock } from 'mockjs'
import { cateListData } from '../../modules/mockdata'
import { DetailContext } from '../../index'
import { TreeDataProps } from '@/framework/types/product'
import { getCategories } from '@/framework/api/get-product'
import { CateItemProps } from '@/framework/schema/product.schema'
import { useLocation, useParams } from 'react-router-dom'
import { getTree } from '@/framework/normalize/product'
import { Input } from 'antd'
interface CascaderProps {}
const cateList = mock(cateListData).list
console.info('cateList', cateList)

const Cascader = (props: CascaderProps) => {
  const [categories, setCategories] = useState<any>([])
  const [categoryList, setCategoryList] = useState<TreeDataProps[]>([])
  const { detail } = useContext(DetailContext)
  // const location = useLocation()

  const params = useParams()
  const InputRef = useRef<any>(null)

  const onChange = (value: any, selectedOptions: any) => {
    console.info('selectedOptions', selectedOptions)
    InputRef.current.focus()
    detail.selectedCateOptions = selectedOptions
    setCategories(selectedOptions)
  }
  const getCate = async () => {
    let list: CateItemProps[] = await getCategories({ storeId: '12345678' })
    if (detail.cateId && list && detail.selectedCateOptions) {
      console.info('detail.cateId', detail.cateId)
      let choosed: any[] = detail.selectedCateOptions
      setCategories(choosed)
      console.info(choosed, 'choosedchoosed')
    }
    let treeList = getTree(list, null, 0)
    setCategoryList(treeList)
  }
  useEffect(() => {
    if (window.location.href?.indexOf('product-add') > -1) {
      getCate()
    }
  }, [])
  useEffect(() => {
    if (detail.categoryList) {
      let data = detail.categoryList
      setCategoryList(data)
      console.info('treeData', data)
    }
  }, [detail.categoryList])
  // useEffect(() => {
  //   console.info(detail.cateId, categoryList, 'detail.cateId && detail.categoryList')
  //   if (detail.cateId && categoryList) {
  //     let choosed: any[] = []

  //     detail.cateId.map((item: any) => {
  //       let choosedItem = categoryList.find((cate: any) => cate.id === item)
  //       choosedItem && choosed.push(choosedItem)
  //     })
  //     setCategories(choosed)
  //     console.info(choosed, 'choosedchoosed')
  //   }
  // }, [categoryList])
  return (
    <div className='cate-cascader'>
      <div className='p-6 bg-gray-50'>
        <Input ref={InputRef} style={{ position: 'absolute', left: -10000 }} />

        {categoryList?.length ? (
          <ProFormCascader
            name='cateId'
            rules={[{ required: true, message: 'Category Name required' }]}
            // request={(params, props) => {
            //   return Promise.resolve(categoryList)
            // }}
            fieldProps={{
              // defaultValue: ['1', '3', '20'],
              changeOnSelect: true,
              onChange: onChange,
              options: categoryList,
              showSearch: true,
              dropdownClassName: 'product-choose-cate common-dropdown-cascader',
              open: true,
              placement: 'bottomLeft',
              placeholder: 'Categores Name',
              displayRender: () => 'Categores Name',
            }}
          />
        ) : null}
        <div className='ant-select'></div>
      </div>

      <div className='py-4'>
        The currently selected :{' '}
        <span className={`${categories.length ? 'font-semibold primary-color' : ''}`}>
          {categories.length
            ? categories.map((el: TreeDataProps, idx: number) => ` ${idx === 0 ? '' : '>'} ${el.label}`)
            : 'No category has been chosen'}
        </span>
      </div>
    </div>
  )
}

export default Cascader
