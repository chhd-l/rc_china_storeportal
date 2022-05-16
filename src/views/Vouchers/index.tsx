import { ContentContainer } from "@/components/ui"
import KeyMetrics from "./components/KeyMetrics";
import VouchersListHead from "./components/VouchersListHead";
import VouchersList from "./components/VouchersList";
import { Tooltip } from "antd";
import './Style.less'

const Vouchers = () => {

    const columns = [
        {
            title: "Voucher Name",
            dataIndex: "VoucherName",
        },
        {
            title: "Promotion Period",
            dataIndex: "PromotionPeriod",
            valueType: 'dateRange',
            hideInTable: true,
            fieldProps: () => ({
              placeholder: ['Start time','End Time'],
              separator: <div className="flex items-center justify-center w-full h-full">to</div>
            })
        },
        {
            title: "Voucher Type",
            dataIndex: "VoucherType",
            hideInSearch: true,
        },
        {
            title: "Discount Amount",
            dataIndex: "DiscountAmount",
            hideInSearch: true,
        },
        {
            title: "Usage Limit",
            dataIndex: "UsageLimit",
            hideInSearch: true,
        },
        {
            title: "Usage",
            dataIndex: "Usage",
            hideInSearch: true,
        },
        {
            title: "Status Claiming Period",
            dataIndex: "StatusClaimingPeriod",
            hideInSearch: true,
        },
        {
            title: "Actions",
            dataIndex: "Actions",
            hideInSearch: true,
            render: (text: any, record: any) => (
                <>
                    <Tooltip title="Edit">
                        <span className="cursor-pointer iconfont icon-a-Group437 text-red-500 text-xl" />
                    </Tooltip>

                    <Tooltip title="Delete">
                        <span className="cursor-pointer ml-2 iconfont icon-delete text-red-500 text-xl"
                        />
                    </Tooltip>

                    <Tooltip title="View QR Code">
                        <span className="cursor-pointer ml-2 iconfont icon-Frame-1 text-red-500 text-xl"
                        />
                    </Tooltip>
                </>
            ),
        },
    ]

return (
    <ContentContainer className="Vouchers">
        <KeyMetrics />
        <VouchersListHead />
        <VouchersList columns={columns} />
    </ContentContainer>
)
}

export default Vouchers