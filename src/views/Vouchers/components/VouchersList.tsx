import { ContentContainer } from "@/components/ui"
import ProTable, { ProColumns } from "@ant-design/pro-table"

type VouchersListType = {
    columns: ProColumns<any, string>[];
    getList: Function;
}

const VouchersList = ({ columns, getList }: VouchersListType) => {
    return (
        <ContentContainer className="bg-white px-4 pt-0 VouchersList">
            <ProTable
                columns={columns}
                options={false}
                search= {{
                  labelWidth: 'auto',
                  searchText: 'Search',
                }}
                request={(parma) => getList(parma)}
            />
        </ContentContainer>
    )
}

export default VouchersList