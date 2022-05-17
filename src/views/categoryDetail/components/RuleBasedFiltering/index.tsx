import './index.less'
import { message, Tag,Button } from 'antd'
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

interface ProductItemProps {
  name: string;
  img: string;
  id: string;
}

export interface RuleBasedFilteringProps {
  visible: boolean;
  handleVisible: (visible: boolean) => void;
}

const mockOptions = Mock.mock(mockOption).options
console.info('mockOptions', mockOptions)
const RuleBasedFiltering = ({ visible, handleVisible, }: RuleBasedFilteringProps) => {
  const formRef = useRef<ProFormInstance>()
  const [filterTags, setFilterTags] = useState<string[]>([])
  const [productList, setProductList] = useState<ProductItemProps[]>([])
  const [mockOptions, setMockOptions] = useState<Array<any>>([])
  const [brandList, setBrandList] = useState([])
  const [speciList, setSpeciList] = useState([])
  const getBrandList = async () => {
    let list = await getBrands('12345678')
    getAttrList('')
    setBrandList(list)
  }
  const getCategoriesList = async () => {
    let res = await getCategories({ storeId: '12345678' })
    console.log(getTree(res, null, 0))
    setMockOptions(getTree(res, null, 0))
  }
  const onChange = (value: any, selectedOptions: any) => {
    console.log(value, selectedOptions)
  }
  const getAttrList = async (categoryId:any) => {
    let data = await getAttrs({ storeId: '123456781',categoryId})
    console.log(data,9999)
  }
  const getList = async()=>{
    let res = await getESProducts({})
  }

  useEffect(() => {
    getBrandList()
    getCategoriesList()
  }, [])
  const restSearchButtons = {
    render: (props: any) => {
      const { submit, resetFields } = props.form;
      console.log(props);
      return [
        <Button key="submit" type="primary" onClick={() => submit?.()}>
          Search
        </Button>,
        <Button key="rest" onClick={() => resetFields()}>
          Reset
        </Button>,
      ];
    },
  };
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
        <div className='flex-1 bg-gray-200 mr-4'>
          <ProForm
            formRef={formRef}
            className='py-3 pl-4 text-center'
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            submitter={restSearchButtons}
            onValuesChange={() => {
              let selected = { ...formRef.current?.getFieldsFormatValue?.() }
              let tagArr: string[] = []
              delete selected.lowestPrice
              delete selected.highestPrice
              if (selected) {
                tagArr = Object.values(selected)
              }
              setFilterTags(tagArr)
              console.info('formRef.current?.getFieldsFormatValue')
            }}
            layout='horizontal'
            onFinish={async (values) => {
              let list = Mock.mock(productLists).list
              setProductList(list)
              console.info(list)
              console.log(values)
              message.success('提交成功')
            }}
            params={{}}
          >
            <ProFormCascader
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
                placement: 'bottomLeft',
              }}
              name='category'
              label='Category'
              initialValue={['All Categories']}
            />
            <ProFormSelect
              className='text-left'
              options={[{label: "All Brands", name: "All", value: "All Brands"},...brandList]}
              name='brand'
              label='Brand'
              initialValue={'All Brands'}
            />
            <ProFormSelect
              className='text-left'
              options={speciList}
              name='specification'
              label='Specification'
            />
            <div className='flex'>
              <ProFormMoney
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 12 }}
                label='Markting Price'
                name='lowestPrice'
                customSymbol='￥'
                min={0}
              />
              <span className='relative' style={{ left: '-10px' }}>
                -
              </span>
              <ProFormMoney
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                name='highestPrice'
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
