import { ContentContainer } from '@/components/ui'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Tooltip, Typography } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
const { Title } = Typography

interface KeyMetricsListProps {
  label: string
  tip: string
  value: any
}

const initMetricsContent: KeyMetricsListProps[] = [
  {
    label: 'GSV',
    tip: 'Total amount of all confirmed orders using vouchers.',
    value: '￥23.00',
  },
  {
    label: 'Orders',
    tip: 'Total number of confirmed orders using vouchers.',
    value: 24,
  },
  {
    label: 'Usage Rate',
    tip: 'Total number of voucher usages in confirmed orders divide by total number of voucher claims.',
    value: '12%',
  },
  {
    label: 'Pet Owners',
    tip: 'Total number of unique pet owners who used voucher in confirmed orders.',
    value: 8,
  },
]

const KeyMetrics = () => {
  const [keyMetricsList, setKeyMetricsList] = useState<KeyMetricsListProps[]>(initMetricsContent)

  useEffect(() => {
    //todo 拿到数据处理值
    setKeyMetricsList(initMetricsContent)
  }, [])

  return (
    <ContentContainer className="bg-white px-5 mb-8">
      <Title level={5}>
        <span className="font-black">Key Metrics</span>
        <span className="text-xs text-gray-400 ml-2 font-normal">
          (Data from {moment().format('DD-MM-YYYY')} to {moment().add(7, 'day').format('DD-MM-YYYY')} UTC+8)
        </span>
      </Title>
      <div className="flex w-full">
        {/* GSV */}
        {keyMetricsList.map((item, index) => (
          <div className={`${index !== 0 ? 'border-l border-gray-300 border-solid' : ''} p-4 flex-1 flex flex-col`}>
            <div className="align-center text-xs flex-1 flex items-center">
              <div>{item.label}</div>
              <Tooltip overlayStyle={{fontSize:'12px'}} title={item.tip}>
                <QuestionCircleOutlined className="ml-1 text-10 text-gray-400" />
              </Tooltip>
            </div>
            <Title className="flex-1 mt-2 mb-0" level={4}>
              {item.value}
            </Title>
          </div>
        ))}
        {/*</div>*/}
      </div>
    </ContentContainer>
  )
}

export default KeyMetrics
