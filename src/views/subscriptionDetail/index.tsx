import React, { useState, useEffect } from 'react'
import { ContentContainer, InfoContainer, DivideArea } from '@/components/ui'
import { getSubscriptionDetail, pauseSubscription, resumeSubscription, updateSubscriptionAddress, updateNextDeliveryDate, upsertSubscriptionComment } from '@/framework/api/subscription'
import { Spin, Modal } from "antd"
import { useLocation } from 'react-router-dom'
import BaseInfo from './components/BaseInfo'
import AddressInfo from './components/AddressInfo'
import ProductList from './components/ProductList'
import PetOwner from './components/PetOwner'
import Pets from './components/Pets'
import SubscriptionOrders from './components/SubscriptionOrders'
import SubscriptionGifts from './components/SubscriptionGifts'
import CommentWidget from '@/components/common/Comment'
import OperateLogWidget from '@/components/common/OperateLog'
import AddressModal from '@/components/customer/AddressModal'


export default function SubscriptionDetail() {
  const [loading, setLoading] = useState<boolean>(false)
  const [detail, setDetail] = useState<any>({})
  const [visible, setVisible] = useState<boolean>(false)
  const [addressVisible, setAddressVisible] = useState<boolean>(false)
  const location = useLocation();
  const state: any = location.state;

  useEffect(() => {
    getSubscription()
  }, [])

  const getSubscription = async () => {
    setLoading(true)
    const data = await getSubscriptionDetail(state?.id ?? "")
    setDetail(data);
    setLoading(false)
  }

  const handlePauseAndRestartConfirm = async () => {
    setVisible(false)
    setLoading(true)
    let succes = false
    if (detail?.status === "PAUSED") {
      succes = await resumeSubscription(detail?.id);
    } else {
      succes = await pauseSubscription(detail?.id);
    }
    if (succes) {
      getSubscription()
    } else {
      setLoading(false)
    }
  }

  const handleChooseAddress = async (address: any) => {
    const { storeId, customerId, isDefault, ...rest } = address;
    setAddressVisible(false)
    setLoading(true)
    const success = await updateSubscriptionAddress(detail?.id, rest);
    if (success) {
      getSubscription()
    } else {
      setLoading(false)
    }
  }

  const handleChangeNextDeliveryDate = async (date: string) => {
    setLoading(false)
    const success = await updateNextDeliveryDate(detail?.id, date);
    if (success) {
      getSubscription()
    } else {
      setLoading(false)
    }
  }

  const handleUpsertComment = async (param: any) => {
    setLoading(false)
    const success = await upsertSubscriptionComment(param);
    if (success) {
      getSubscription()
    } else {
      setLoading(false)
    }
  }

  return (
    <ContentContainer>
      <Spin spinning={loading}>
        <div className="flex flex-row">
          <div className="mr-4 w-3/4">
            <InfoContainer>
              <BaseInfo data={detail} onChange={() => setVisible(true)} />
            </InfoContainer>
            <DivideArea />
            <InfoContainer>
              <AddressInfo data={detail} onEdit={() => setAddressVisible(true)} />
            </InfoContainer>
            <DivideArea />
            <InfoContainer>
              <ProductList productList={detail?.goodsList ?? []} freshType={detail?.freshType} />
            </InfoContainer>
            <DivideArea />
            <InfoContainer>
              <PetOwner data={detail?.customer} />
            </InfoContainer>
            <DivideArea />
            <InfoContainer>
              <Pets pet={detail?.pet} />
            </InfoContainer>
            <DivideArea />
            <InfoContainer>
              <SubscriptionOrders planningList={detail?.planingDeliveries ?? []} completedList={detail?.completedDeliveries ?? []} nextDeliveryDate={detail?.createNextDeliveryTime} onChangeDate={handleChangeNextDeliveryDate} />
            </InfoContainer>
            <DivideArea />
            <InfoContainer>
              <SubscriptionGifts benefits={detail?.benefits ?? []} />
            </InfoContainer>
          </div>
          <div className="w-1/4">
            <CommentWidget
              comments={detail?.comments ?? []}
              defaultParam={{ subscriptionId: detail?.id }}
              handleUpsertComment={handleUpsertComment}
            />
            <OperateLogWidget
              logs={detail?.logs ?? []}
            />
          </div>
        </div>
      </Spin>
      <Modal
        visible={visible}
        className="rc-modal"
        title={detail?.status === "PAUSED" ? "Restart Subscription" : "Pause Subscription"}
        cancelText="Cancel"
        okText="Confirm"
        onCancel={() => setVisible(false)}
        onOk={handlePauseAndRestartConfirm}
      >
        <div>{detail?.status === "PAUSED" ?  "Are you sure you want to restart this subscription?" : "Are you sure you want to pause this subscription?"}</div>
      </Modal>
      {addressVisible ? <AddressModal
        customerId={detail?.customer?.id}
        visible={addressVisible}
        onCancel={() => setAddressVisible(false)}
        onConfirm={handleChooseAddress}
      /> : null}
    </ContentContainer>
  )
}
