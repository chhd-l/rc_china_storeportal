import './index.less'
import { Anchor } from 'antd'
import BasicInfo from '../BasicInfo'
import Specification from '../Specification'
import SalesInfo from '../SalesInfo'
import Shipping from '../Shipping'
import { Form, Space, Button } from 'antd'
import { useContext, useState } from 'react'
import { steps, formInitialValues } from '../../modules/constant'
import { InfoContainer, DivideArea } from '@/components/ui'
import { DetailContext } from '../../index'
interface MainInfoProps {
  detail: any
  cateInfo: {
    cateId: string[]
  }
}

const { Link } = Anchor

const MainInfo = ({ cateInfo }: MainInfoProps) => {
  const [form] = Form.useForm()
  const [tipsIdx, setTipsIdx] = useState(0)
  const { detail } = useContext(DetailContext)
  const hanldeTips = (idx: number) => {
    setTipsIdx(idx)
  }
  const onFinish = (values: any) => {
    console.log(values, cateInfo)
  }
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
          initialValues={Object.assign(detail, {
            specification: [
              {
                fieldKey: 1,
                isListField: true,
                key: 1,
                name: 1,
              },
            ],
          })}
        >
          {/* <Form.List name="product">
            {(fields) => (
              <> */}
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
          <Form.Item className='text-right'>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className='w-40 fixed right-10' style={{ top: '100px' }}>
        <Anchor affix={false} className='rc-anchor' targetOffset={64} style={{ top: '64px' }}>
          {steps.map(step => (
            <Link href={`#${step.anchor}`} title={step.title} />
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
