import React, { useEffect, useState } from 'react'
import { Button, Input, message, Spin, Switch } from 'antd'
import { ContentContainer, InfoContainer, DivideArea } from '@/components/ui'
import { getOrderSetting, updateOrderSetting } from '@/framework/api/get-order'
import { OrderSettingItem } from '@/framework/types/order'

const OrderSetting = () => {
  const [autoCancelConfig, setAutoCancelConfig] = useState<OrderSettingItem | any>(null)
  const [autoCompleteConfig, setAutoCompleteConfig] = useState<OrderSettingItem | any>(null)
  const [initOrderSetting, setInitOrderSetting] = useState<OrderSettingItem[]>([])
  const [loading, setLoading] = useState(false)

  const getOrderSettings = async () => {
    setLoading(true)
    const res = await getOrderSetting()
    setInitOrderSetting(res)
    handleOrderSettings(res)
    setLoading(false)
  }

  const handleOrderSettings = (res: OrderSettingItem[]) => {
    res?.map((el: OrderSettingItem) => {
      if (el.code === 'order_超时时间') {
        setAutoCancelConfig(el)
      }
      if (el.code === 'order_自动收货时间') {
        setAutoCompleteConfig(el)
      }
    })
  }

  const modifyOrderSetting = async () => {
    const params = [autoCancelConfig].concat([autoCompleteConfig]).map((el) => {
      return {
        id: el.id,
        context: el.context,
        isEnabled: el.isEnabled,
      }
    })
    const res = await updateOrderSetting(params)
    if (res) {
      message.success({ className: 'rc-message', content: 'Operation success' })
    } else {
      message.error({ className: 'rc-message', content: 'Operation failed' })
    }
  }

  useEffect(() => {
    getOrderSettings()
  }, [])

  return (
    <ContentContainer>
      <DivideArea />
      <InfoContainer>
        <div className="text-left font-medium text-xl">General order setting</div>
      </InfoContainer>
      {loading ? (
        <div className="flex justify-center items-center h-60 bg-white">
          <Spin />
        </div>
      ) : initOrderSetting.length > 0 ? (
        <InfoContainer>
          <div className="border p-2 flex justify-between items-center">
            <span>
              After{' '}
              <Input
                type="number"
                value={Number(autoCancelConfig?.context)}
                onChange={(e) => {
                  setAutoCancelConfig({ ...autoCancelConfig, context: String(e.target.value) })
                }}
                className="w-20"
              />{' '}
              minutes,if the PO has not paid successfully,the order would be automatically cancelled
            </span>
            <Switch
              defaultChecked={autoCancelConfig?.isEnabled}
              onChange={() => {
                setAutoCancelConfig({ ...autoCancelConfig, isEnabled: !autoCancelConfig.isEnabled })
              }}
            />
          </div>
          <div className="border p-2 flex justify-between items-center mt-2">
            <span>
              After{' '}
              <Input
                type="number"
                value={Number(autoCompleteConfig?.context)}
                onChange={(e) => {
                  setAutoCompleteConfig({ ...autoCompleteConfig, context: String(e.target.value) })
                }}
                className="w-20"
              />{' '}
              days of the order status is shipped,the order would be automatically completed
            </span>
            <Switch
              defaultChecked={autoCompleteConfig?.isEnabled}
              onChange={() => {
                setAutoCompleteConfig({ ...autoCompleteConfig, isEnabled: !autoCompleteConfig.isEnabled })
              }}
            />
          </div>
          <div className="flex justify-end mt-md">
            <Button danger className="mr-md" onClick={() => handleOrderSettings(initOrderSetting)}>
              Cancel
            </Button>
            <Button type="primary" onClick={() => modifyOrderSetting()}>
              Save
            </Button>
          </div>
        </InfoContainer>
      ) : null}
    </ContentContainer>
  )
}
export default OrderSetting
