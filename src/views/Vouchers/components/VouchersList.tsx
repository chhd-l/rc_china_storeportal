import { ContentContainer } from "@/components/ui"
import ProTable from "@ant-design/pro-table"

type VouchersListType = {
    columns: any[];
}

const VouchersList = ({ columns }: VouchersListType) => {
    return (
        <ContentContainer className="bg-white px-4 VouchersList">
            <ProTable
                columns={columns}
                options={false}
                search= {{
                  labelWidth: 'auto',
                  searchText: 'Search',
                }}
            />
        </ContentContainer>
    )
}

export default VouchersList