import ProTable, { ProTableProps } from '@ant-design/pro-table';
import './index.css';
// import './index.css';
import { defaultsDeep } from 'lodash';
export * from '@ant-design/pro-table';

export default (props: ProTableProps<any, any>) => {
  const { ...moreProps } = props;

  const defaultProps: ProTableProps<any, any> = {
    rowKey: 'id',
    options: false,
    pagination: {
      showSizeChanger:true,
      pageSize: 10,
      size: 'default',
      showQuickJumper: true,
      showTotal: (total: number) => `共 ${total} 条`,
    },
    headerTitle: '',
    search: {
      labelWidth: 100,
      defaultCollapsed: false,
      collapseRender: () => null,
    },
  };

  const mergeProps = defaultsDeep(moreProps, defaultProps);
  return <ProTable {...mergeProps} className="pro-table-diy" />;
};
