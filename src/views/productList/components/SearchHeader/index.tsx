import { Form, Input, Button, Row, Col, Select, InputNumber, Modal } from 'antd'
import { OptionsProps } from '@/framework/types/common'
import { SearchContainer } from '@/components/ui/Container'
import './index.less'
import { useState } from 'react'
import { CloseCircleOutlined, EditOutlined } from '@ant-design/icons'
import Cascader from '../Cascader'

const { Option } = Select
interface SearchProps {
  getFormData: Function
  getList: Function
}
const nameForKey: OptionsProps[] = [
  { name: 'Product Name', value: 'goodsName' },
  { name: 'SKU', value: 'sku' },
  { name: 'SPU', value: 'spu' },
]
const typeForKey: OptionsProps[] = [
  { name: 'Product Type', value: 'type' },
  { name: 'Subscription Status', value: 'subscriptionStatus' },
]
const chooseProductType: OptionsProps[] = [
  { name: 'Regular', value: 'REGULAR' },
  { name: 'Bundle', value: 'BUNDLE' },
]
const SubscriptionType: OptionsProps[] = [
  { name: 'Yes', value: true },
  { name: 'No', value: false },
]

const SearchHeader = ({ getFormData, getList }: SearchProps) => {
  const [form] = Form.useForm()
  const [typeSelect, setTypeSelect] = useState(typeForKey[0].value)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [cateId, setCateId] = useState<any>([])
  const [showCatePop, setShowCatePop] = useState(false)
  const onFinish = (values: any) => {
    const val = {
      cateId: cateId[cateId.length - 1]?.value,
      startStock: values.startStock,
      [values.selectName]: values.goodsName,
      [values.type]: values.GoodsType,
      endStock: values.endStock,
    }
    getFormData(val)
  }
  const onReset = () => {
    form.resetFields()
    setCateId([])
    setTypeSelect(typeForKey[0].value) //恢复第一个选项的选择
    getList({}, true)
  }
  // const handleCateId = (cateIds: any) => {
  //   setCateId(cateIds)
  // }
  const handleOk = () => {
    console.info('selectedOptions', selectedOptions)
    setCateId(selectedOptions)
    setShowCatePop(false)
  }
  const handleCancel = () => {
    setShowCatePop(false)
  }
  return (
    <SearchContainer className='product-search-top'>
      <Form
        layout={'inline'}
        form={form}
        onFinish={onFinish}
        initialValues={{
          layout: 'inline',
        }}
      >
        <Row justify='start' style={{ width: '100%' }} gutter={[0, 14]}>
          <Col span={11}>
            <Input.Group compact className='flex'>
              <Form.Item className='rounded-xl ' name='selectName' initialValue={nameForKey[0].value}>
                <Select
                  style={{ width: 140 }}
                  placeholder='Select a option and change input text above'
                  className='ant-select-left no-border-radius-right'
                >
                  {nameForKey.map((el: any) => (
                    <Option key={el.value} value={el.value}>
                      {el.name}
                    </Option>
                  ))}
                </Select>
                {/* <SelectKey list={nameForKey} /> */}
              </Form.Item>
              <Form.Item name='goodsName' className='flex-1 no-border-radius-left'>
                <Input placeholder={`Please Input`} />
              </Form.Item>
            </Input.Group>
          </Col>
          <Col span={11} offset={2}>
            <Input.Group compact className='flex'>
              <Form.Item name='type' initialValue={typeForKey[0].value}>
                <Select
                  style={{ width: 150 }}
                  placeholder='Select a option and change input text above'
                  className='ant-select-left no-border-radius-right'
                  onChange={v => {
                    form.setFieldsValue({ GoodsType: '' })
                    setTypeSelect(v)
                  }}
                >
                  {typeForKey.map((el: any) => (
                    <Option key={el.value} value={el.value}>
                      {el.name}
                    </Option>
                  ))}
                </Select>
                {/* <SelectKey list={typeForKey} /> */}
              </Form.Item>
              <Form.Item className='flex-1 no-border-radius-left' name='GoodsType'>
                <Select placeholder='Choose Product Type' allowClear>
                  {typeSelect === typeForKey[0].value
                    ? chooseProductType.map((el: any) => (
                        <Option key={el.value} value={el.value}>
                          {el.name}
                        </Option>
                      ))
                    : SubscriptionType.map((el: any) => (
                        <Option key={el.value} value={el.value}>
                          {el.name}
                        </Option>
                      ))}
                </Select>
              </Form.Item>
            </Input.Group>
          </Col>
          <Col span={5}>
            <Form.Item label='Stock' name='startStock' className='mr-0'>
              <InputNumber min={0} className='w-full' placeholder={`Please Input`} />
              {/* <Input type='number' placeholder={`please Input startStock`} /> */}
            </Form.Item>
          </Col>
          <Col span={1} className=' flex items-center justify-center'>
            {' '}
            -{' '}
          </Col>
          <Col span={5}>
            <Form.Item name='endStock'>
              <InputNumber min={0} className='w-full' placeholder={`Please Input`} />
              {/* <Input type='number' placeholder={`please Input endStock`} /> */}
            </Form.Item>
          </Col>
          <Col span={11} offset={2}>
            <Form.Item label='Category' name='cateId'>
              <div
                className='flex cate-box items-center ant-input'
                onClick={() => {
                  setShowCatePop(true)
                }}
              >
                <div className='flex-1 flex'>
                  {cateId?.length ? (
                    cateId.map((cate: any, idx: number) => (
                      <div>
                        {idx === 0 ? '' : '>'}
                        {cate.label}
                      </div>
                    ))
                  ) : (
                    <div style={{ color: 'rgb(217, 217, 217)' }}>Choose Category</div>
                  )}
                </div>
                {cateId?.length ? (
                  <CloseCircleOutlined
                    onClick={(e: any) => {
                      setCateId([])
                      e.stopPropagation()
                    }}
                  />
                ) : (
                  <EditOutlined className='edit' />
                )}
              </div>
              {/* <Input
                placeholder={`Choose category`}
                suffix={
                  <Tooltip title='Choose Category'>
                    <span className='icon iconfont icon-rc-edit'  style={{ color: 'rgba(0,0,0,.45)' }}></span>
                  </Tooltip>
                }
              /> */}
            </Form.Item>
          </Col>
          <Col span={11} offset={11} className='text-right ml-0'>
            <Form.Item>
              <Button htmlType='submit' type='primary' className='mr-4 btn'>
                Search
              </Button>
              <Button onClick={onReset} className='btn'>
                Reset
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {showCatePop ? (
        <Modal
          title='Select Category'
          width='57rem'
          okText='Comfirm'
          cancelText='Cancel'
          visible={true}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Cascader cateId={cateId} handleCateId={setSelectedOptions} />
        </Modal>
      ) : null}
    </SearchContainer>
  )
}
export default SearchHeader
