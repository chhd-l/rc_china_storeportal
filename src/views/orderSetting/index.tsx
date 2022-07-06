import React, { useEffect, useState } from 'react'
import { Button, InputNumber, message, Spin, Switch } from 'antd'
import { ContentContainer, InfoContainer, DivideArea } from '@/components/ui'
import { getOrderSetting, updateOrderSetting } from '@/framework/api/order'
import { OrderSettingItem } from '@/framework/types/order'

const OrderSetting = () => {
  const [autoCancelConfig, setAutoCancelConfig] = useState<OrderSettingItem | any>(null)
  const [autoCompleteConfig, setAutoCompleteConfig] = useState<OrderSettingItem | any>(null)
  const [initOrderSetting, setInitOrderSetting] = useState<OrderSettingItem[]>([])
  const [loading, setLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)

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
    setSaveLoading(true)
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
    setSaveLoading(false)
  }

  useEffect(() => {
    getOrderSettings()
  }, [])
  
  return (
    <ContentContainer>
      <DivideArea />
      <InfoContainer className="pb-0">
        <div className="text-left font-medium text-xl">General order setting</div>
      </InfoContainer>
      {loading ? (
        <div className="flex justify-center items-center h-60 bg-white">
          <Spin />
        </div>
      ) : initOrderSetting.length > 0 ? (
        <InfoContainer>
          <div className="border p-2 flex justify-between items-center rounded-4">
            <span>
              After{' '}
              <InputNumber
                min={0}
                precision={0}
                value={Number(autoCancelConfig?.context)}
                onChange={(value) => {
                  setAutoCancelConfig({ ...autoCancelConfig, context: String(value) })
                }}
                className="w-20"
              />{' '}
              minutes,if the PO has not paid successfully,the order would be automatically cancelled
            </span>
            <Switch
              checked={autoCancelConfig?.isEnabled}
              onChange={() => {
                setAutoCancelConfig({ ...autoCancelConfig, isEnabled: !autoCancelConfig.isEnabled })
              }}
            />
          </div>
          <div className="border p-2 flex justify-between items-center mt-2 rounded-4">
            <span>
              After{' '}
              <InputNumber
                min={0}
                value={Number(autoCompleteConfig?.context)}
                onChange={(value) => {
                  setAutoCompleteConfig({ ...autoCompleteConfig, context: String(value) })
                }}
                className="w-20"
              />{' '}
              days of the order status is shipped,the order would be automatically completed
            </span>
            <Switch
              checked={autoCompleteConfig?.isEnabled}
              onChange={() => {
                setAutoCompleteConfig({ ...autoCompleteConfig, isEnabled: !autoCompleteConfig.isEnabled })
              }}
            />
          </div>
          <div className="flex justify-end mt-md">
            <Button className="mr-md rounded-4" onClick={() => handleOrderSettings(initOrderSetting)}>
              Cancel
            </Button>
            <Button className="rounded-4" type="primary" loading={saveLoading} onClick={() => modifyOrderSetting()}>
              Save
            </Button>
          </div>
        </InfoContainer>
      ) : null}
    </ContentContainer>
  )
}
export default OrderSetting
