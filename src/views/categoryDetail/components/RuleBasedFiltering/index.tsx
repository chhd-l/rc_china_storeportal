import './index.less'
import { message, Tag, Button, Select } from 'antd'
import ProForm, {
  ModalForm,
  ProFormSelect,
  ProFormMoney,
  ProFormInstance,
  ProFormCascader,
} from '@ant-design/pro-form'
import { mockOption, productLists } from '../../modules/mockdata'
import Mock from 'mockjs'
import { useRef, useState, useEffect } from 'react'
import { restWrapButtons } from '../../modules/constant'
import { getAttrs, getCategories, getESProducts } from '@/framework/api/get-product'
import { getTree } from '@/framework/normalize/product'
import { getBrands } from '@/framework/api/wechatSetting'
import { GoodsAttributeAndValue } from '@/framework/schema/product.schema'
import { handleValueEnum } from '@/utils/utils'

const { Option, OptGroup } = Select

interface ProductItemProps {
  name: string;
  img: string;
  id: string;
}

export interface RuleBasedFilteringProps {
  visible: boolean;
  handleVisible: (visible: boolean) => void;
}

const RuleBasedFiltering = ({ visible, handleVisible }: RuleBasedFilteringProps) => {
  const formRef = useRef<ProFormInstance>()
  const [filterTags, setFilterTags] = useState<string[]>([])
  const [filterTagsTwo, setFilterTagsTwo] = useState<string[]>([])
  const [productList, setProductList] = useState<ProductItemProps[]>([])
  const [mockOptions, setMockOptions] = useState<Array<any>>([])
  const [brandList, setBrandList] = useState([])
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
    console.log(value, selectedOptions)
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
    console.log(data)
    if (data.length === 0) {
      setFilterTagsTwo([])
      formRef?.current?.setFieldsValue({ attributeValueIds: [] })
    }
    // @ts-ignore
    setSpeciList(data)
    formRef?.current?.setFieldsValue({
      attributeValueIds: ['19591683-b307-883d-c28b-18ac92f3']
    })
  }
  const getList = async (params: any) => {
    console.log(params)
    let data: any = {
      hasTotal: true,
      sample: {},
    }
    if (params.goodsCategoryId && params.goodsCategoryId !== 'All Categories') {
      data.sample.goodsCategoryId = params.goodsCategoryId
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
  }

  useEffect(() => {
    getBrandList()
    getCategoriesList()
  }, [])
  const handleChange = async (value: any, option: any) => {
    console.log(value,option,9999)
    if (option.length > 0) {
      let arr = option.map((item: { label: any }) => item.label)
      setFilterTagsTwo(arr)
    }
    console.log(`selected ${value}`, option)
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
        console.log(productList, '......')
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
              console.log(selected)
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
              console.info('formRef.current?.getFieldsFormatValue')
            }}
            layout='horizontal'
            onFinish={async (values) => {
              if (values.goodsCategoryId?.length >= 1) {
                values.goodsCategoryId = values.goodsCategoryId[values.goodsCategoryId.length - 1]
              }

              getList(values)
              console.log(values, 99999)
              // let list = Mock.mock(productLists).list
              // setProductList(list)
              // console.info(list)
              // console.log(values)
              // message.success('提交成功')
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
            {filterTags.map((el) => (
              <Tag className='ml-2' key={el}>
                {el}
              </Tag>
            ))}
            {filterTagsTwo.map((el) => (
              <Tag className='ml-2 mt-2' key={el}>
                {el}
              </Tag>
            ))}
          </div>
          <div>
            <div className='my-3'>Filtering Results</div>
            <div className='flex flex-wrap'>
              {productList.map((el) => (
                <div key={el.id} style={{ width: 60 }} className='mb-3 mr-3'>
                  <div
                    style={{ height: 60 }}
                    className='border border-solid border-gray-200 flex'
                  >
                    <img
                      src={el.img}
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
          </div>
        </div>
      </div>
    </ModalForm>
  )
}

export default RuleBasedFiltering
