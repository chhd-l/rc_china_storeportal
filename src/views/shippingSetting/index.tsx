import React, { useEffect, useState } from 'react'
import { Divider, message, Modal, Switch } from 'antd'
import SettingModal from './components/Modal'
import { ContentContainer, InfoContainer } from '@/components/ui'
import './index.less'
import { getLogisticsIntegration, modifyLogisticsIntegration } from '@/framework/api/get-order'
import { useAtom } from 'jotai'
import { userAtom } from '@/store/user.store'

const ShippingSetting = () => {
  const [shipModalVisible, setShipModalVisible] = useState(false)
  const [logisticsIntegration, setLogisticsIntegration] = useState<any>(null)
  const [userInfo] = useAtom(userAtom)
  const [statusModalTip, setStatusModalTip] = useState(false)

  const getLogisticsIntegrationInfo = async () => {
    const res = await getLogisticsIntegration()
    console.log('1111111', res)
    setLogisticsIntegration(res)
  }

  const updateLogisticsIntegration = async (newLogisticsIntegration = logisticsIntegration) => {
    const parameter = {
      KEY: newLogisticsIntegration.key,
      customer: newLogisticsIntegration.customer,
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
      operator: userInfo?.nickname || 'system',
    })
    if (res) {
      message.success({ className: 'rc-message', content: 'Operation success' })
      setLogisticsIntegration(newLogisticsIntegration)
    } else {
      message.error({ className: 'rc-message', content: 'Operation failed' })
    }
    setStatusModalTip(false)
    setShipModalVisible(false)
  }

  useEffect(() => {
    getLogisticsIntegrationInfo()
  }, [])

  return (
    <ContentContainer>
      <div className="shipping-setting">
        <div>
          <div className="title bg-white px-6 py-6">Shipping Setting</div>
          <Divider className="line" />
        </div>
        <InfoContainer>
          <div className="border p-4 flex justify-between items-center content">
            <span>Express 100</span>
            <div className="flex items-center">
              <Switch checked={logisticsIntegration?.isEnabled || false} onClick={() => setStatusModalTip(true)} />
              <span
                className="iconfont icon-a-Group437 primary-color ml-4 edit"
                onClick={() => {
                  setShipModalVisible(true)
                }}
              />
            </div>
          </div>
        </InfoContainer>
        <Modal
          className="rc-modal"
          title="Notice"
          visible={statusModalTip}
          okText={'Confirm'}
          onOk={() =>
            updateLogisticsIntegration({ ...logisticsIntegration, isEnabled: !logisticsIntegration.isEnabled })
          }
          onCancel={() => setStatusModalTip(false)}
        >
          <p>Are you sure {logisticsIntegration?.isEnabled ? 'disabled' : 'enable'} this item?</p>
        </Modal>
        <SettingModal
          shipModalVisible={shipModalVisible}
          onCancel={() => {
            setShipModalVisible(false)
          }}
          logisticsIntegration={logisticsIntegration}
          updateLogisticsIntegration={updateLogisticsIntegration}
        />
      </div>
    </ContentContainer>
  )
}
export default ShippingSetting
