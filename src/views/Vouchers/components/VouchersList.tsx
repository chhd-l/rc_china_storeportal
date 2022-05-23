import { ContentContainer } from "@/components/ui"
import ProTable, { ProColumns } from "@ant-design/pro-table"
import { Button } from "antd";

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
                pagination={{
                    hideOnSinglePage: false,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    defaultPageSize: 10,
                    showTotal: () => <></>
                }}
                search= {{
                  labelWidth: 'auto',
                  searchText: 'Search',
                  optionRender: (searchConfig,formProps,dom) => {
                    return dom.map((item: any) => {
                      return (
                        <Button {...item.props} loading={false} />
                      )
                    }).reverse()
                  }
                }}
                request={(parma) => getList(parma)}
            />
        </ContentContainer>
    )
}

export default VouchersList