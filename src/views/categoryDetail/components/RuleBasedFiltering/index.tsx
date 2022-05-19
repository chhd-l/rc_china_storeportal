import './index.less'
import { message, Tag, Button, Select } from 'antd'
import ProForm, {
  ModalForm,
  ProFormSelect,
  ProFormMoney,
  ProFormInstance,
  ProFormCascader,
} from '@ant-design/pro-form'
import { useParams } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { restWrapButtons } from '../../modules/constant'
import {
  createShopCategoryGoodsRel,
  getAttrs,
  getCategories,
  getESProducts,
  shopCategoryFilterRules,
} from '@/framework/api/get-product'
import { getTree } from '@/framework/normalize/product'
import { getBrands } from '@/framework/api/wechatSetting'
import { GoodsAttributeAndValue } from '@/framework/schema/product.schema'


export interface RuleBasedFilteringProps {
  visible: boolean;
  handleVisible: (visible: boolean) => void;
  handleSucces: (visible: boolean) => void;
  productLists: any;
  editParams: any;
}

const RuleBasedFiltering = ({ visible, handleVisible,handleSucces,productLists,editParams }: RuleBasedFilteringProps) => {
  const params = useParams()
  const formRef = useRef<ProFormInstance>()
  const [filterTags, setFilterTags] = useState<string[]>([])
  const [filterTagsTwo, setFilterTagsTwo] = useState<string[]>([])
  const [productList, setProductList] = useState([])
  const [mockOptions, setMockOptions] = useState<Array<any>>([])
  const [brandList, setBrandList] = useState([])
  const [saveParams, setSaveParams] = useState<any>({
    goodsCategoryId:'All Categories',
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
    // formRef?.current?.setFieldsValue({
    //   attributeValueIds: ['19591683-b307-883d-c28b-18ac92f3']
    // })
  }
  const getList = async (params: any) => {
    let data: any = {
      hasTotal: true,
      sample: {},
    }
    if (params.goodsCategoryIds && params.goodsCategoryIds !== 'All Categories') {
      data.sample.goodsCategoryId = params.goodsCategoryIds
    }
    if (params.brand && params.brand !== 'All Brands') {
      data.sample.brand = params.brand
    }
    if (params.attributeValueIds) {
      data.sample.attributeValueIds = params.attributeValueIds
    }
    if (params.startPrice) {
      data.sample.startPrice = params.startPrice
    }
    if (params.endPrice) {
      data.sample.endPrice = params.endPrice
    }
    let res = await getESProducts(data)
    setProductList(res.records)

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
  // @ts-ignore
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
      // 有变量，提出来报错
      // submitter={() => restWrapButtons(1, handleVisible)}

      submitter={{
        render: (props) => {
          return restWrapButtons(props, productList?.length, handleVisible)
        },
      }}
      layout='horizontal'
      visible={visible}
      onFinish={async (values) => {
        // 用productList直接传值操作
        const { id } = params
        let obj = [
          {
            shopCategoryId: id,
            name: 'goodsCategoryId',
            value: saveParams?.goodsCategoryId.length>0?saveParams?.goodsCategoryId.join():'',
            rank:1
          },
          {
            shopCategoryId: id,
            name: 'brand',
            value: saveParams?.brand,
            rank:2
          },
          {
            shopCategoryId: id,
            name: 'attributeValueIds',
            value: saveParams?.attributeValueIds?.length>0?saveParams.attributeValueIds.join():'',
            rank:3
          },
          {
            shopCategoryId: id,
            name: 'startPrice',
            value: saveParams?.startPrice?saveParams?.startPrice.toString():'',
            rank:4
          },
          {
            shopCategoryId: id,
            name: 'endPrice',
            value: saveParams?.endPrice?saveParams?.endPrice.toString():'',
            rank:5
          },
          {
            shopCategoryId: id,
            name: 'filterTags',
            value: filterTags.length>0?filterTags.join():'',
            rank:6
          },
          {
            shopCategoryId: id,
            name: 'filterTagsTwo',
            value: filterTagsTwo.length>0?filterTagsTwo.join():'',
            rank:7
          },
        ]
        shopCategoryFilterRules(obj)
        if(productList.length>0){
          let data = productList.map((item: any) => {
            return {
              goodsId: item.id,
              shopCategoryId: id,
              storeId: item.storeId,
            }
          })
          createShopCategoryGoodsRel(data)
        }
        handleSucces(true)
        message.success('提交成功')
        return true
      }}
      onVisibleChange={handleVisible}
    >
      <div className='flex'>
        <div className='flex-1 mr-4 bg-gray-primary'>
          <ProForm
            formRef={formRef}
            className='py-3 pl-4 text-center'
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            submitter={restSearchButtons}
            onValuesChange={() => {
              let selected = { ...formRef.current?.getFieldsFormatValue?.() }
              if (selected?.goodsCategoryId?.length >= 1) {
                selected.goodsCategoryId = selected.goodsCategoryId[selected.goodsCategoryId.length - 1]
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
              if (values.goodsCategoryId?.length >= 1) {
                values.goodsCategoryIds = values.goodsCategoryId[values.goodsCategoryId.length - 1]
              }
              setSaveParams(values)
              getList(values)
            }}
            params={{}}
          >
            <ProFormCascader
              allowClear={false}
              fieldProps={{
                changeOnSelect: true,
                onChange: onChange,
                options: [{
                  value: 'All Categories',
                  label: 'All Categories',
                }, ...mockOptions],
                getPopupContainer: triggerNode => triggerNode.parentNode,
                dropdownClassName: 'productlist-choose-cate common-dropdown-cascader',
                placeholder: 'Categores Name',
              }}
              name='goodsCategoryId'
              label='Category'
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
            <ProForm.Item label='specification' name='attributeValueIds'>
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
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 12 }}
                label='Markting Price'
                name='startPrice'
                customSymbol='￥'
                min={0}
              />
              <span className='relative' style={{ left: '-10px' }}>
                -
              </span>
              <ProFormMoney
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                name='endPrice'
                customSymbol='￥'
                min={0}
              />
            </div>
          </ProForm>
        </div>
        <div className='w-2/5'>
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
            <div className='flex flex-wrap' style={{ maxHeight: '250px', overflow: 'scroll' }}>
              {productList?.map((el: any) => (
                <div key={el.id} style={{ width: 60 }} className='mb-3 mr-3'>
                  <div
                    style={{ height: 60 }}
                    className='border border-solid border-gray-200 flex'
                  >
                    <img
                      src={el.goodsVariants[0].defaultImage}
                      className='m-auto '
                      style={{ maxHeight: 60, maxWidth: 60 }}
                    />
                  </div>
                  <div className='overflow-ellipsis overflow-hidden whitespace-nowrap'>
                    {el.goodsName}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ModalForm>
  )
}

export default RuleBasedFiltering
