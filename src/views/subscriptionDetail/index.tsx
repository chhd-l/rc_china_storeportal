import React, { useState, useEffect } from 'react'
import { ContentContainer, InfoContainer, DivideArea } from '@/components/ui'
import {
  getSubscriptionDetail,
  pauseSubscription,
  resumeSubscription,
  updateSubscriptionAddress,
  updateNextDeliveryDate,
  upsertSubscriptionComment,
} from '@/framework/api/subscription'
import { Spin, message } from 'antd'
import { useLocation } from 'react-router-dom'
import { useScrollToTop } from '@/hooks'
import BaseInfo from './components/BaseInfo'
import AddressInfo from './components/AddressInfo'
import ProductList from './components/ProductList'
import PetOwner from './components/PetOwner'
import Pets from './components/Pets'
import SubscriptionOrders from './components/SubscriptionOrders'
import SubscriptionGifts from './components/SubscriptionGifts'
import CommentWidget from '@/components/common/Comment'
import OperateLogWidget from '@/components/common/OperateLog'
import intl from 'react-intl-universal'
import './index.less'

export default function SubscriptionDetail() {
  const [loading, setLoading] = useState<boolean>(false)
  const [detail, setDetail] = useState<any>({})
  const location = useLocation()
  const state: any = location.state

  useScrollToTop()

  useEffect(() => {
    getSubscription()
  }, [])

  const getSubscription = async (showLoadingFlag: boolean = true) => {
    showLoadingFlag && setLoading(true)
    const data = await getSubscriptionDetail(state?.id ?? '')
    setDetail(data)
    setLoading(false)
  }

  const handlePauseAndRestartConfirm = async () => {
    let succes = false
    if (detail?.status === 'PAUSED') {
      succes = await resumeSubscription(detail?.id)
    } else {
      succes = await pauseSubscription(detail?.id)
    }
    if (succes) {
      await getSubscription(false)
      return Promise.resolve(true)
    } else {
      return Promise.resolve(false)
    }
  }

  const handleChooseAddress = async (address: any) => {
    const { storeId, consumerId, isDefault, ...rest } = address
    const success = await updateSubscriptionAddress(detail?.id, rest)
    if (success) {
      await getSubscription(false)
      message.success({ className: 'rc-message', content: intl.get('public.Operation Successful') })
      return Promise.resolve(true)
    } else {
      return Promise.resolve(false)
    }
  }

  const handleChangeNextDeliveryDate = async (date: string) => {
    const success = await updateNextDeliveryDate(detail?.id, date)
    if (success) {
      await getSubscription(false)
      message.success({ className: 'rc-message', content: intl.get('public.Operation Successful') })
      return Promise.resolve(true)
    } else {
      return Promise.resolve(false)
    }
  }

  const handleUpsertComment = async (param: any) => {
    const success = await upsertSubscriptionComment(param)
    if (success) {
      await getSubscription(false)
      message.success({ className: 'rc-message', content: intl.get('public.Operation Successful') })
      return Promise.resolve(true)
    } else {
      return Promise.resolve(false)
    }
  }

  return (
    <ContentContainer>
      <Spin spinning={loading}>
        <div className="flex flex-row">
          <div className="mr-4 w-3/4">
            <InfoContainer>
              <BaseInfo data={detail} onChange={handlePauseAndRestartConfirm} />
            </InfoContainer>
            <DivideArea />
            <InfoContainer>
              <AddressInfo data={detail} onEdit={handleChooseAddress} />
            </InfoContainer>
            <DivideArea />
            <InfoContainer>
              <ProductList productList={detail?.productList ?? []} freshType={detail?.freshType} />
            </InfoContainer>
            <DivideArea />
            <InfoContainer>
              <PetOwner data={detail?.consumer} />
            </InfoContainer>
            <DivideArea />
            <InfoContainer>
              <Pets pet={detail?.pet} />
            </InfoContainer>
            <DivideArea />
            <InfoContainer>
              <SubscriptionOrders
                planningList={detail?.planingDeliveries ?? []}
                completedList={detail?.completedDeliveries ?? []}
                nextDeliveryDate={detail?.createNextDeliveryTime}
                status={detail?.status}
                onChangeDate={handleChangeNextDeliveryDate}
              />
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
            <OperateLogWidget logs={detail?.logs ?? []} />
          </div>
        </div>
      </Spin>
    </ContentContainer>
  )
}
