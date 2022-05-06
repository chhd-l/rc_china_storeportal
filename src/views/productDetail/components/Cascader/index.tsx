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
import { getTree } from '@/framework/normalize/product'
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
    detail.selectedCateOptions = selectedOptions
    setCategories(selectedOptions)
  }
  const getCate = async () => {
    let list: CateItemProps[] = await getCategories({ storeId: '12345678' })
    if (detail.cateId && list && detail.selectedCateOptions) {
      console.info('detail.cateId', detail.cateId)
      let choosed: any[] = detail.selectedCateOptions
      // detail.cateId.map((item: any) => {
      //   let choosedItem = list.find((cate: any) => cate.id === Number(item))
      //   let normalizedItem = {
      //     value: choosedItem?.id + '',
      //     label: choosedItem?.categoryName,
      //   }
      //   choosedItem && choosed.push(normalizedItem)
      // })
      setCategories(choosed)
      console.info(choosed, 'choosedchoosed')
    }
    let treeList = getTree(list, null, 0)
    setCategoryList(treeList)
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
        {categoryList?.length ? (
          <ProFormCascader
            name='cateId'
            rules={[{ required: true, message: '这是必填项' }]}
            // request={(params, props) => {
            //   return Promise.resolve(categoryList)
            // }}
            fieldProps={{
              // defaultValue: ['1', '3', '20'],
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
        The currently selected :{' '}
        <span className={`${categories.length ? "font-semibold text-red-600" : "" }`}>
        {categories.length
          ? categories.map((el: TreeDataProps, idx: number) => ` ${idx === 0 ? '' : '>'} ${el.label}`)
          : 'No categories has been chosen'}
        </span>
      </div>
    </div>
  )
}

export default Cascader
