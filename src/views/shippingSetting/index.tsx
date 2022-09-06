import React, { useEffect, useState } from 'react'
import { Divider, message, Modal, Switch } from 'antd'
import SettingModal from './components/Modal'
import { ContentContainer, InfoContainer } from '@/components/ui'
import './index.less'
import { getLogisticsIntegration, modifyLogisticsIntegration } from '@/framework/api/order'
import intl from 'react-intl-universal'

const ShippingSetting = () => {
  const [shipModalVisible, setShipModalVisible] = useState(false)
  const [logisticsIntegration, setLogisticsIntegration] = useState<any>(null)
  const [statusModalTip, setStatusModalTip] = useState(false)
  const [confirmLoading, setConFirmLoading] = useState(false)

  const getLogisticsIntegrationInfo = async () => {
    const res = await getLogisticsIntegration()
    console.log('1111111', res)
    setLogisticsIntegration(res)
  }

  const updateLogisticsIntegration = async (newLogisticsIntegration = logisticsIntegration) => {
    setConFirmLoading(true)
    const parameter = {
      KEY: newLogisticsIntegration.key,
      consumer: newLogisticsIntegration.consumer,
      pullURL: newLogisticsIntegration.pullUrl,
      queryURL: newLogisticsIntegration.queryUrl,
      callbackURL: newLogisticsIntegration.callbackUrl,
    }
    const res = await modifyLogisticsIntegration({
      id: newLogisticsIntegration.id,
      type: newLogisticsIntegration.type,
      parameter: JSON.stringify(parameter),
      isEnabled: newLogisticsIntegration.isEnabled,
      remark: newLogisticsIntegration.remark,
      storeId: newLogisticsIntegration.storeId || '12345678',
    })
    if (res) {
      message.success({ className: 'rc-message', content: intl.get('public.operate_success') })
      setLogisticsIntegration(newLogisticsIntegration)
    }
    setStatusModalTip(false)
    setShipModalVisible(false)
    setConFirmLoading(false)
  }

  useEffect(() => {
    getLogisticsIntegrationInfo()
  }, [])

  return (
    <ContentContainer>
      <div className="shipping-setting">
        <div>
          <div className="title bg-white px-6 py-6">{intl.get('Shipping.Shipping Setting')}</div>
          <Divider className="line" />
        </div>
        <InfoContainer>
          <div className="border p-4 flex justify-between items-center content rounded-4">
            <span className="font-semibold">{intl.get('Shipping.Express 100')}</span>
            <div className="flex items-center">
              <Switch checked={logisticsIntegration?.isEnabled || false} onClick={() => setStatusModalTip(true)} />
              <span
                className="iconfont icon-a-Group437 primary-color ml-4 edit hover:cursor-pointer"
                onClick={() => {
                  setShipModalVisible(true)
                }}
              />
            </div>
          </div>
        </InfoContainer>
        <Modal
          className="rc-modal"
          title={intl.get('public.notice')}
          visible={statusModalTip}
          okText={intl.get('public.confirm')}
          confirmLoading={confirmLoading}
          onOk={() =>
            updateLogisticsIntegration({ ...logisticsIntegration, isEnabled: !logisticsIntegration.isEnabled })
          }
          onCancel={() => setStatusModalTip(false)}
        >
          <p>
            Are you sure {logisticsIntegration?.isEnabled ? intl.get('public.Disable') : intl.get('public.enable')}{' '}
            {intl.get('Shipping.this item?')}
          </p>
        </Modal>
        <SettingModal
          shipModalVisible={shipModalVisible}
          onCancel={() => {
            setShipModalVisible(false)
          }}
          logisticsIntegration={logisticsIntegration}
          updateLogisticsIntegration={updateLogisticsIntegration}
          confirmLoading={confirmLoading}
        />
      </div>
    </ContentContainer>
  )
}
export default ShippingSetting
