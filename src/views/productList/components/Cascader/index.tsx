import './index.less'
import { ProFormCascader } from '@ant-design/pro-form'
import { useContext, useEffect, useRef, useState } from 'react'
import { mock } from 'mockjs'
import { TreeDataProps } from '@/framework/types/product'
import { getCategories } from '@/framework/api/get-product'
import { CateItemProps } from '@/framework/schema/product.schema'
import { useParams } from 'react-router-dom'
import { getTree } from '@/framework/normalize/product'
import { Input, Modal } from 'antd'

interface CascaderProps {
  cateId: any[]
  handleCateId: Function
}

const Cascader = (props: CascaderProps) => {
  const [categories, setCategories] = useState<any>([])
  const [categoryList, setCategoryList] = useState<TreeDataProps[]>([])
  const params = useParams()
  const InputRef = useRef<any>(null)

  const onChange = (value: any, selectedOptions: any) => {
    InputRef.current.focus()
    console.info('selectedOptions', selectedOptions)
    console.info('value', value)
    // detail.selectedCateOptions = selectedOptions
    props.handleCateId(selectedOptions)
    setCategories(selectedOptions)
    console.info('cascaderRef.current', InputRef)
  }
  const getCate = async () => {
    let list: CateItemProps[] = await getCategories({ storeId: '12345678' })
    if (props.cateId) {
      let choosed: any[] = props.cateId
      setCategories(choosed)
    }
    // if (detail.cateId && list && detail.selectedCateOptions) {
    //   console.info('detail.cateId', detail.cateId)
    //   let choosed: any[] = detail.selectedCateOptions

    //   setCategories(choosed)
    //   console.info(choosed, 'choosedchoosed')
    // }
    let treeList = getTree(list, null, 0)
    setCategoryList(treeList)
  }
  useEffect(() => {
    getCate()
  }, [])
  // useEffect(() => {
  //   if (detail.categoryList) {
  //     let data = detail.categoryList
  //     setCategoryList(data)
  //     console.info('treeData', data)
  //   }
  // }, [detail.categoryList])

  return (
    <div className='cate-cascader'>
      <div className='p-6 bg-gray-50 relative'>
        <Input ref={InputRef} style={{ position: 'absolute', left: -10000 }} />
        {categoryList?.length ? (
          <ProFormCascader
            // ref={}
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
              getPopupContainer: triggerNode => triggerNode.parentNode,
              showSearch: true,
              dropdownClassName: 'productlist-choose-cate common-dropdown-cascader',
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
        <span className={`${categories.length ? 'font-semibold primary-color' : ''}`}>
          {categories.length
            ? categories.map((el: TreeDataProps, idx: number) => ` ${idx === 0 ? '' : '>'} ${el.label}`)
            : 'No categories has been chosen'}
        </span>
      </div>
    </div>
  )
}

export default Cascader
