import './index.less'
import { Button, Select, Spin, Tag } from 'antd'
import ProForm, {
  ModalForm,
  ProFormCascader,
  ProFormInstance,
  ProFormMoney,
  ProFormSelect,
} from '@ant-design/pro-form'
import { useEffect, useRef, useState } from 'react'
import {
  createShopCategoryProductRel,
  getAttrs,
  getCategories,
  getESProducts,
  shopCategoryFilterRules,
} from '@/framework/api/get-product'
import { getTree } from '@/framework/normalize/product'
import { getBrands } from '@/framework/api/wechatSetting'
import { useLocation } from 'react-router'

export interface RuleBasedFilteringProps {
  visible: boolean;
  handleVisible: (visible: boolean) => void;
  handleSucces: (visible: boolean) => void;
  productLists: any;
  editParams: any;
}

const RuleBasedFiltering = ({ visible, handleVisible,handleSucces,productLists,editParams }: RuleBasedFilteringProps) => {
  const { state }: any = useLocation();
  const formRef = useRef<ProFormInstance>()
  const [filterTags, setFilterTags] = useState<string[]>([])
  const [filterTagsTwo, setFilterTagsTwo] = useState<string[]>([])
  const [productList, setProductList] = useState([])
  const [mockOptions, setMockOptions] = useState<Array<any>>([])
  const [brandList, setBrandList] = useState([])
  const [loading, setLoading] = useState(false)
  const [saveParams, setSaveParams] = useState<any>({
    categoryId:'All Categories',
    brand:'All Brands'
  })
  const [speciList, setSpeciList] = useState([])
  const [list, setList] = useState<any>()
  const getBrandList = async () => {
    let list = await getBrands('12345678')
    getAttrList('8')
    setBrandList(list)
  }
  const getCategoriesList = async () => {
    let res = await getCategories({ storeId: '12345678' })
    setList(res)
    setMockOptions(getTree(res, null, 0))
  }
  const onChange = (value: any, selectedOptions: any) => {
    if (value) {
      if (value[value.length - 1] === 'All Categories') {
        getAttrList('')
      } else {
        getAttrList(value[value.length - 1])
      }
    }
  }
  const getAttrList = async (categoryId: any) => {
    let data = await getAttrs({ storeId: '12345678', categoryId })
    if (data.length === 0) {
      setFilterTagsTwo([])
      formRef?.current?.setFieldsValue({ attributeValueIds: [] })
    }
    // @ts-ignore
    setSpeciList(data)
  }
  const getList = async (params: any) => {
    setLoading(true)
    let data: any = {
      hasTotal: true,
      sample: {},
    }
    if (params.categoryIds && params.categoryIds !== 'All Categories') {
      data.sample.categoryId = params.categoryIds
    }
    if (params.brand && params.brand !== 'All Brands') {
      data.sample.brand = params.brand
    }
    if (params.attributeValueIds?.length>0) {
      data.sample.attributeRelations = [{attributeValueIds:params.attributeValueIds}]
    }

    if (params.startPrice) {
      data.sample.startPrice = params.startPrice
    }
    if (params.endPrice) {
      data.sample.endPrice = params.endPrice
    }
    let res = await getESProducts(data)
    setProductList(res?.records||[])
    setLoading(false)
  }

  useEffect(() => {
    if(visible){
      getBrandList()
      getCategoriesList()
      if(productLists?.length>0){
        setProductList(productLists)
      }
      init()
    }
  }, [productLists,visible])

  const init = () => {
    if(editParams.filterTags.length===0){
      editParams.filterTags=['All Categories', 'All Brands']
    }
    if(!editParams.attributeValueIds){
      editParams.attributeValueIds = []
    }
    setSaveParams({...saveParams,...editParams })
    setFilterTags(editParams.filterTags)
    setFilterTagsTwo(editParams.filterTagsTwo)
    formRef?.current?.setFieldsValue(editParams)
  }
  const handleChange = async (value: any, option: any) => {
    if (option.length > 0) {
      let arr = option.map((item: { label: any }) => item.label)
      setFilterTagsTwo(arr)
    }
  }

  const restSearchButtons = {
    render: (props: any) => {
      const { submit, resetFields } = props.form
      return [
        <Button key='submit' type='primary' onClick={() => submit?.()}>
          Search
        </Button>,
        <Button key='rest' onClick={() => {
          setFilterTags(['All Categories', 'All Brands'])
          setFilterTagsTwo([])
          setProductList([])
          resetFields()
        }}>
          Reset
        </Button>,
      ]
    },
  }
  const waitTime = () => {
    return new Promise((resolve) => {
      let obj = [
        {
          shopCategoryId: state.id,
          name: 'categoryId',
          value: saveParams?.categoryId.length>0?saveParams?.categoryId.join():'',
          rank:1
        },
        {
          shopCategoryId: state.id,
          name: 'brand',
          value: saveParams?.brand,
          rank:2
        },
        {
          shopCategoryId: state.id,
          name: 'attributeValueIds',
          value: saveParams?.attributeValueIds?.length>0?saveParams.attributeValueIds.join():'',
          rank:3
        },
        {
          shopCategoryId: state.id,
          name: 'startPrice',
          value: saveParams?.startPrice?saveParams?.startPrice.toString():'',
          rank:4
        },
        {
          shopCategoryId: state.id,
          name: 'endPrice',
          value: saveParams?.endPrice?saveParams?.endPrice.toString():'',
          rank:5
        },
        {
          shopCategoryId: state.id,
          name: 'filterTags',
          value: filterTags.length>0?filterTags.join():'',
          rank:6
        },
        {
          shopCategoryId: state.id,
          name: 'filterTagsTwo',
          value: filterTagsTwo.length>0?filterTagsTwo.join():'',
          rank:7
        },
      ]
      shopCategoryFilterRules(obj)
      if(productList.length>0){
        let data = productList.map((item: any) => {
          return {
            productId: item.id,
            shopCategoryId: state.id,
            storeId: item.storeId,
          }
        })
        createShopCategoryProductRel(data).then(res=>{
          resolve(true)
          handleSucces(true)
        })
      }else {
        resolve(true)
      }
    });
  };
  // @ts-ignore
  return (
    <ModalForm
      className='rule-based-filtering'
      title={
        <>
          <div>Set Filtering Rules</div>
          <div className='text-gray-400 font-normal text-xs'>
            If your products meet the filtering rule criteria, they will
            auyomatically be added into your shop category
          </div>
        </>
      }
      // submitter={{
      //   render: (props) => {
      //     return restWrapButtons(props, productList?.length, handleVisible)
      //   },
      // }}
      submitter={{
        searchConfig: {
          submitText: 'Confirm',
        },
      }}
      layout='horizontal'
      visible={visible}
      onFinish={async () => {
        if(await waitTime()){
          return true
        }
      }}
      onVisibleChange={handleVisible}
    >
      <div className='flex'>
        <div className='flex-1 mr-4 bg-gray-primary'>
          <div className='py-3 pl-4'>Set Filtering Rules</div>
          <ProForm
            formRef={formRef}
            className='py-3 pl-4 text-center'
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 16 }}
            submitter={restSearchButtons}
            onValuesChange={() => {
              let selected = { ...formRef.current?.getFieldsFormatValue?.() }
              if (selected?.categoryId?.length >= 1) {
                selected.categoryId = selected.categoryId[selected.categoryId.length - 1]
              }
              let tagArr: string[] = []
              delete selected.startPrice
              delete selected.endPrice
              delete selected.attributeValueIds
              if (selected) {
                tagArr = Object.values(selected)
                if (tagArr[0] && tagArr[0] !== 'All Categories') {
                  tagArr[0] = list.filter((item: { id: string }) => item.id == tagArr[0])[0]?.categoryName || ''
                }
                if (tagArr[1] && tagArr[1] !== 'All Brands') {
                  let obj = brandList.filter((item: { value: string }) => item.value === tagArr[1])[0]
                  // @ts-ignore
                  tagArr[1] = obj.label
                }
              }
              setFilterTags(tagArr)
            }}
            layout='horizontal'
            onFinish={async (values) => {
              if (values.categoryId?.length >= 1) {
                values.categoryIds = values.categoryId[values.categoryId.length - 1]
              }
              setSaveParams(values)
              getList(values)
            }}
            params={{}}
          >
            <ProFormCascader
              allowClear={false}
              fieldProps={{
                changeOnSelect: false,
                onChange: onChange,
                options: [{
                  value: 'All Categories',
                  label: 'All Categories',
                }, ...mockOptions],
                getPopupContainer: triggerNode => triggerNode.parentNode,
                dropdownClassName: 'productlist-choose-cate common-dropdown-cascader',
                placeholder: 'Category Name',
                style:{
                  textAlign:'left'
                },
              }}
              name='categoryId'
              label='Product Category'
              initialValue={['All Categories']}
            />
            <ProFormSelect
              allowClear={false}
              className='text-left'
              options={[{ label: 'All Brands', name: 'All', value: 'All Brands' }, ...brandList]}
              name='brand'
              label='Brand'
              initialValue={'All Brands'}
            />
            <ProForm.Item label='Specification' name='attributeValueIds'>
              <Select
                showArrow
                className='text-left'
                style={{ width: '100%' }}
                onChange={handleChange}
                options={speciList}
                mode='multiple'
                placeholder='Please select'
              >
              </Select>
            </ProForm.Item>
            <div className='flex'>
              <ProFormMoney
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 12 }}
                label='Markting Price'
                name='startPrice'
                customSymbol='￥'
                min={0}
              />
              <span className='relative'>
                -
              </span>
              <ProFormMoney
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 22 }}
                name='endPrice'
                customSymbol='￥'
                min={0}
              />
            </div>
          </ProForm>
        </div>
        <div className='w-2/5 rule-right'>
          <div>
            <div className='mb-3'>Set Filtering Rules</div>
            {filterTags?.length>0&&filterTags.map((el: any) => (
              <Tag className='ml-2' key={el}>
                {el}
              </Tag>
            ))}
            {filterTagsTwo?.length>0&&filterTagsTwo.map((el: any) => (
              <Tag className='ml-2 mt-2' key={el}>
                {el}
              </Tag>
            ))}
          </div>
          <div>
            <div className='my-3'>Filtering Results</div>
            <Spin spinning={loading}>
            <div className='flex flex-wrap' style={{ maxHeight: '250px', overflow: 'scroll' }}>
              {productList.length>0&&productList.map((el: any) => (
                <div key={el.id} style={{ width: 60 }} className='mb-3 mr-2'>
                  <div
                    style={{ height: 60 }}
                    className='border border-solid border-gray-200 flex'
                  >
                    <img
                      src={el.variants[0]?.defaultImage}
                      className='m-auto '
                      style={{ maxHeight: 60, maxWidth: 60 }}
                    />
                  </div>
                  <div className='overflow-ellipsis overflow-hidden whitespace-nowrap'>
                    {el.name}
                  </div>
                </div>
              ))}
            </div>
            </Spin>
          </div>
        </div>
      </div>
    </ModalForm>
  )
}

export default RuleBasedFiltering
