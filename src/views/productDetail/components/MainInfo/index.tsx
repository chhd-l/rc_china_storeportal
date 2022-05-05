import './index.less'
import { Anchor } from 'antd'
import BasicInfo from '../BasicInfo'
import Specification from '../Specification'
import SalesInfo from '../SalesInfo'
import Shipping from '../Shipping'
import { Form, Space, Button } from 'antd'
import { FC, useContext, useEffect, useState } from 'react'
import { steps, formInitialValues } from '../../modules/constant'
import { InfoContainer, DivideArea } from '@/components/ui'
import { DetailContext } from '../../index'
import { createProduct } from '@/framework/api/get-product'
import { useNavigate } from 'react-router-dom'
interface MainInfoProps {
  details: any
  showCatePop: boolean
  cateInfo?: {
    cateId: string[]
  }
}

const { Link } = Anchor
let shelvesStatus = true
const MainInfo: FC<MainInfoProps> = ({ cateInfo, showCatePop, children }) => {
  const [form] = Form.useForm()
  const [tipsIdx, setTipsIdx] = useState(0)
  const { detail } = useContext(DetailContext)
  const navigator = useNavigate()

  const hanldeTips = (idx: number) => {
    setTipsIdx(idx)
  }
  // useEffect(()=>{

  // },detail.name)
  const onFinish = async (values: any) => {
    console.info('shelvesStatus', shelvesStatus)
    //组装product数据
    console.log(values, detail)

    let params = Object.assign({}, detail, values, {
      type: 'REGULAR',
      shelvesStatus,
    })
    if (!detail.goodsVariants?.length) {
      detail.goodsVariants = [
        {
          skuNo: 'test0001', //to do
          withoutSku: true,
          subscriptionPrice: detail.subscriptionPrice,
          subscriptionStatus: detail.subscriptionStatus,
          stock: detail.stock,
          listPrice: detail.listPrice,
          marketingPrice: detail.marketingPrice,
          feedingDays: detail.feedingDays,
          isSupport100: detail.isSupport100,
          defaultImage: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1632987707399_z7bUuS.png',
        },
      ]
    }
    console.info('.......')
    console.info('params', params)
    let data = await createProduct(params)
    console.info('data', data)
    navigator('/product/product-list')
  }
  console.info('detaildetaildetaildetail', detail)

  useEffect(()=>{
    console.log('form.122',form.getFieldsValue(true))
  }, [])

  return (
    <div
      id={steps[0].anchor}
      // className="flex bg-gray-50 px-14 py-6 text-left"
    >
      <div className='flex-1 mr-48'>
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout='horizontal'
          initialValues={detail}
        >
          {children}
          {/* <Form.List name="product">
            {(fields) => (
              <> */}
          <div className={showCatePop ? 'hidden' : ''}>
            {steps.map((field, idx) => (
              <Space
                onClick={() => {
                  hanldeTips(idx)
                }}
                key={field.anchor}
                direction='vertical'
                className='flex'
              >
                <InfoContainer>
                  <div id={idx > 0 ? steps[idx].anchor : 'anchor-1'}>
                    <div className='pb-2'>
                      <div className='flex justify-between  pb-2'>
                        <div className='font-bold text-lg'>{steps[idx].title}</div>
                        <div>{steps[idx].rightSlot}</div>
                      </div>
                      <div className='pb-4'>{steps[idx].subTitle}</div>
                    </div>
                    {steps[idx].render(field)}
                  </div>
                </InfoContainer>
                <DivideArea />
              </Space>
            ))}
            {/* </>
            )}
          </Form.List> */}
            <div className='text-rigth flex justify-end'>
              <Button
                className='ml-4'
                onClick={() => {
                  navigator('/product/product-list')
                }}
              >
                Cancel
              </Button>
              <Button
                className='ml-4'
                onClick={() => {
                  shelvesStatus = false
                  form.submit()
                }}
              >
                Save and Delist
              </Button>
              <Button
                className='ml-4'
                type='primary'
                onClick={() => {
                  shelvesStatus = true
                  form.submit()
                }}
              >
                Save and Publish
              </Button>
            </div>
          </div>
        </Form>
      </div>
      <div className={`w-40 fixed right-10 ${showCatePop ? 'hidden' : ''}`} style={{ top: '100px' }}>
        <Anchor affix={false} className='rc-anchor' targetOffset={64} style={{ top: '64px' }}>
          {steps.map((step, idx) => (
            <Link key={step.anchor + idx} href={`#${step.anchor}`} title={step.title} />
          ))}
        </Anchor>
        <div className='mt-4 bg-yellow-100 text-yellow-700 px-2 py-4'>
          <div className='font-bold '>Tips</div>
          <div>{steps[tipsIdx].tips}</div>
        </div>
      </div>
    </div>
  )
}

export default MainInfo
