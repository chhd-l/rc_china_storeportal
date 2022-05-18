import React from 'react'
import { ContentContainer, InfoContainer, DivideArea } from '@/components/ui'
import BaseInfo from './components/BaseInfo'
import AddressInfo from './components/AddressInfo'
import ProductList from './components/ProductList'
import PetOwner from './components/PetOwner'
import Pets from './components/Pets'
import SubscriptionOrders from './components/SubscriptionOrders'
import SubscriptionGifts from './components/SubscriptionGifts'
import CommentWidget from '@/components/common/Comment'
import OperateLogWidget from '@/components/common/OperateLog'


export default function SubscriptionDetail() {

  return (
    <ContentContainer>
      <div className="flex flex-row">
        <div className="mr-4 w-3/4">
          <InfoContainer>
            <BaseInfo />
          </InfoContainer>
          <DivideArea />
          <InfoContainer>
            <AddressInfo />
          </InfoContainer>
          <DivideArea />
          <InfoContainer>
            <ProductList />
          </InfoContainer>
          <DivideArea />
          <InfoContainer>
            <PetOwner />
          </InfoContainer>
          <DivideArea />
          <InfoContainer>
            <Pets />
          </InfoContainer>
          <DivideArea />
          <InfoContainer>
            <SubscriptionOrders />
          </InfoContainer>
          <DivideArea />
          <InfoContainer>
            <SubscriptionGifts />
          </InfoContainer>
        </div>
        <div className="w-1/4">
          <CommentWidget
            comments={[{ createdBy: 'Tina', createId: '123', createdAt: '2022-01-01 14:35:00', content: 'jfd jfkdsj jdsj jksjk jfk' }]}
            defaultParam={{ orderNum: 111 }}
          />
          <OperateLogWidget
            logs={[{ id: '123', event: 'reqwreq', createdAt: '2022-01-01 14:35:00', createdBy: 'Tina', status: 'Success' }]}
          />
        </div>
      </div>
    </ContentContainer>
  )
}
