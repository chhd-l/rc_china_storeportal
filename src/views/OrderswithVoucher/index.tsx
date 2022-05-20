import { ContentContainer } from "@/components/ui"
import BasicInformation from "./components/BasicInformation"
import Orders from "./components/Orders"
import './Style.less'

const OrderswithVoucher = () => {
    return (
        <ContentContainer>
            <BasicInformation />
            <Orders />
        </ContentContainer>
    )   
}

export default OrderswithVoucher