import { ContentContainer } from "@/components/ui"
import ProTable from "@ant-design/pro-table"

type VouchersListType = {
    columns: any[];
}

const VouchersList = ({ columns }: VouchersListType) => {
    const getList= (param: any) => {
        console.log('param',param)
        return Promise.resolve({
          data: [],
          success: true,
          total: 10
        })
      }
    return (
        <ContentContainer className="bg-white px-4 VouchersList">
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