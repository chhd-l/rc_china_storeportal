import { ContentContainer } from '@/components/ui'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Tooltip, Typography } from 'antd'
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
    tip: 'Total value of all confirmed orders using seller-absorbed vouchers, including shipping fees and excluding other promotions, over the selected time period.',
    value: '￥23.00',
  },
  {
    label: 'Orders',
    tip: 'Total number of seller-absorbed vouchers used in all confirmed orders over the selected time period.',
    value: 24,
  },
  {
    label: 'Usage Rate',
    tip: 'Total voucher usages in confirmed orders divide by total number of voucher claims over the selected time period.',
    value: '12%',
  },
  {
    label: 'Buyers',
    tip: 'Total number of unique buyers who applied at least 1 seller-absorbed voucher in all confirmed orders over the selected time period.',
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
    <ContentContainer className="bg-white px-4 mb-8">
      <Title level={5}>
        <span className="font-black">Key Metrics</span>
        <span className="text-xs text-gray-400 ml-2 font-normal">(Data from 07-12-2021 to 14-12-2021 GMT+7)</span>
      </Title>
      <div className="flex w-full">
        {/* GSV */}
        {keyMetricsList.map((item, index) => (
          <div
            className={`${
              index !== 0 ? 'border-l border-gray-300 border-solid' : ''
            } p-4 flex-1 flex flex-col justify-center`}
          >
            <div className="align-center text-xs flex-1 ml-2">
              {item.label}
              <Tooltip title={item.tip}>
                <QuestionCircleOutlined className="ml-2 text-10" />
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
