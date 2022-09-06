import { ContentContainer } from '@/components/ui'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Tooltip, Typography } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { getVoucherKeyMetric } from '@/framework/api/voucher'
import { formatMoney } from '@/utils/utils'
import intl from 'react-intl-universal'
const { Title } = Typography

interface KeyMetricsListProps {
  label: string
  tip: string
  value: any
  key: string
}

const initMetricsContent: KeyMetricsListProps[] = [
  {
    label: 'GSV',
    tip: 'Total amount of all confirmed orders using vouchers.',
    value: 0,
    key: 'gsv',
  },
  {
    label: 'Orders',
    tip: 'Total number of confirmed orders using vouchers.',
    value: 0,
    key: 'orders',
  },
  {
    label: 'Usage Rate',
    tip: 'Total number of voucher usages in confirmed orders divide by total number of voucher claims.',
    value: 0,
    key: 'usageRate',
  },
  {
    label: 'Pet Owners',
    tip: 'Total number of unique pet owners who used voucher in confirmed orders.',
    value: 0,
    key: 'buyers',
  },
]

const KeyMetrics = () => {
  const [keyMetricsList, setKeyMetricsList] = useState<KeyMetricsListProps[]>(initMetricsContent)

  const getVoucherKeyMetrics = async () => {
    const res = await getVoucherKeyMetric({ startTime: moment().add(-7, 'day').utc(), endTime: moment().utc() })
    if (res) {
      setKeyMetricsList(
        keyMetricsList.map((el) => {
          switch (el.key) {
            case 'gsv':
              el.value = formatMoney(res.gsv)
              break
            case 'orders':
              el.value = res.orders
              break
            case 'usageRate':
              el.value = (res.usageRate * 100).toFixed(2) + '%'
              break
            case 'buyers':
              el.value = res.buyers
              break
            default:
              break
          }
          return el
        }),
      )
    }
  }

  useEffect(() => {
    getVoucherKeyMetrics()
  }, [])

  return (
    <ContentContainer className="bg-white px-5 mb-8">
      <Title level={5}>
        <span className="font-black">Key Metrics</span>
        <span className="text-xs text-gray-400 ml-2 font-normal">
          ({intl.get('voucher.list.Data from')} {moment().add(-7, 'day').format('DD-MM-YYYY')}{' '}
          {intl.get('voucher.list.to')} {moment().format('DD-MM-YYYY')} {intl.get('voucher.list.UTC+8')})
        </span>
      </Title>
      <div className="flex w-full">
        {/* GSV */}
        {keyMetricsList.map((item, index) => (
          <div className={`${index !== 0 ? 'border-l border-gray-300 border-solid' : ''} p-4 flex-1 flex flex-col`}>
            <div className="align-center text-xs flex-1 flex items-center">
              <div>{item.label}</div>
              <Tooltip overlayStyle={{ fontSize: '12px' }} title={item.tip}>
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
