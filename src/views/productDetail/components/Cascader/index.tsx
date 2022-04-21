import './index.less'
import { ProFormCascader } from '@ant-design/pro-form'
import { useContext, useEffect, useState } from 'react'
import { mock } from 'mockjs'
import { cateListData } from '../../modules/mockdata'
import { DetailContext } from '../../index'
import { TreeDataProps } from '@/framework/types/product'
import { getCategories } from '@/framework/api/get-product'
import { CateItemProps } from '@/framework/schema/product.schema'
import { useParams } from 'react-router-dom'
interface CascaderProps {}
const cateList = mock(cateListData).list
console.info('cateList', cateList)

const Cascader = (props: CascaderProps) => {
  const [categories, setCategories] = useState<any>([])
  const [categoryList, setCategoryList] = useState<TreeDataProps[]>([])
  const { detail } = useContext(DetailContext)
  const params = useParams()

  const onChange = (value: any, selectedOptions: any) => {
    console.info('selectedOptions', selectedOptions)
    setCategories(selectedOptions)
  }
  const getCate = async () => {
    let list: TreeDataProps[] = await getCategories()
    setCategoryList(list)
  }
  useEffect(() => {
    if (params.id === 'add') {
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

  return (
    <div className='cate-cascader'>
      <div className='p-6 bg-gray-50'>
        {categoryList.length ? (
          <ProFormCascader
            name='cateName'
            rules={[{ required: true, message: '这是必填项' }]}
            // request={(params, props) => {
            //   return Promise.resolve(categoryList)
            // }}
            fieldProps={{
              changeOnSelect: true,
              onChange: onChange,
              options: categoryList,
              showSearch: true,
              dropdownClassName: 'product-choose-cate',
              open: true,
              placement: 'bottomLeft',
              placeholder: 'Categores Name',
            }}
          />
        ) : null}
        <div className='ant-select'></div>
      </div>

      <div className='py-4'>
        the current selected :{' '}
        {categories.length
          ? categories.map((el: TreeDataProps, idx: number) => ` ${idx === 0 ? '' : '>'} ${el.label}`)
          : 'No categories has been chosen'}
      </div>
    </div>
  )
}

export default Cascader
