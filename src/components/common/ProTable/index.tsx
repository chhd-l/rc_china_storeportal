import ProTable, { ProTableProps } from '@ant-design/pro-table'
import './index.less'
import defaultsDeep from 'lodash/defaultsDeep'
import cn from 'classnames'
export * from '@ant-design/pro-table'
//只是封装了一层便于管理公共样式和传参，props传值和官网一样
const ProTableWrap = (props: ProTableProps<any, any>) => {
  const { ...moreProps } = props
  const defaultProps: ProTableProps<any, any> = {
    rowKey: 'id',
    options: false,
    pagination: {
      showSizeChanger: true,
      pageSize: 10,
      size: 'default',
      showQuickJumper: true,
      showTotal: (total: number) => ``,
    },
    headerTitle: '',
    search: {
      labelWidth: 100,
      defaultCollapsed: false,
      collapseRender: () => null,
    },
  }

  const mergeProps = defaultsDeep(moreProps, defaultProps)
  return <ProTable {...mergeProps} className={cn('pro-table-diy', props.className)} />
}
export default ProTableWrap
