import React from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { ProTableProps } from '@ant-design/pro-table';
export * from '@ant-design/pro-table';
import './index.less';
import { defaultsDeep } from 'lodash';

export default (props: ProTableProps<any, any>) => {
  const { ...moreProps } = props;

  const defaultProps: ProTableProps<any, any> = {
    rowKey: 'id',
    options: false,
    pagination: {
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
