import { ContentContainer } from "@/components/ui"
import { useLocation } from "react-router"
import BasicInformation from "./components/BasicInformation"
import Orders from "./components/Orders"
import './Style.less'

const OrderswithVoucher = () => {
    const { state }: any = useLocation()

    return (
        <ContentContainer>
            <BasicInformation state={state} />
            <Orders state={state} />
        </ContentContainer>
    )   
}

export default OrderswithVoucher