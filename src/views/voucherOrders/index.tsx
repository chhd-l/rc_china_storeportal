import { ContentContainer, DivideArea, InfoContainer } from '@/components/ui'
import { useLocation } from 'react-router'
import BasicInformation from './components/BasicInformation'
import Orders from './components/Orders'
import './Style.less'

const VoucherOrders = () => {
  const { state }: any = useLocation()

  return (
    <ContentContainer>
      <InfoContainer>
        <BasicInformation state={state} />
      </InfoContainer>
      <DivideArea />
      <InfoContainer>
        <Orders state={state} />
      </InfoContainer>
    </ContentContainer>
  )
}

export default VoucherOrders
