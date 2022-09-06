import { ProductForCateProps } from '@/framework/types/product'
import { ProColumns } from '@ant-design/pro-table'
import { Button, Input, Space } from 'antd'
import { Link } from 'react-router-dom'
import intl from 'react-intl-universal'

const { Search } = Input
export const columns: ProColumns<ProductForCateProps>[] = [
  {
    title: intl.get('tag.product Name'),
    dataIndex: 'productName',
    hideInSearch: true,
  },
  {
    title: intl.get('tag.Price'),
    dataIndex: 'marketingPrice',
    hideInSearch: true,
  },
  {
    title: intl.get('tag.Stock'),
    dataIndex: 'stock',
    hideInSearch: true,
  },
  {
    title: intl.get('tag.Actions'),
    key: 'option',
    width: 180,
    valueType: 'option',
    render: (_, record) => {
      return (
        <Link to="" className="mr-4 text-xl" onClick={() => {}}>
          <span className="iconfont icon-delete" />
        </Link>
      )
    },
  },
  {
    dataIndex: 'productName',
    renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
      return (
        <Space direction="vertical" className="search-input">
          <Search
            placeholder={intl.get('product.search_products')}
            onSearch={() => {
              form.submit()
            }}
            size="large"
            style={{ width: 400 }}
          />
        </Space>
      )
    },
  },
]

export const restSearchButtons = {
  render: (props: any) => {
    const { submit, resetFields } = props.form
    console.log(props)
    return [
      <Button key="submit" type="primary" onClick={() => submit?.()}>
        {intl.get('public.search')}
      </Button>,
      <Button key="rest" onClick={() => resetFields()}>
        {intl.get('public.reset')}
      </Button>,
    ]
  },
}

export const restWrapButtons = (renderProps: any, productNum: number, closeModal: (visible: boolean) => void) => {
  const setting = (props: any) => {
    const { submit } = props.form
    return [
      <div className="pr-4 text-gryy-400"> {productNum} product(s) found</div>,
      <Button key="cancel" onClick={() => closeModal(false)}>
        {intl.get('public.cancel')}
      </Button>,
      <Button key="submit" type="primary" onClick={() => submit?.()}>
        {intl.get('public.confirm')}
      </Button>,
    ]
  }
  return setting(renderProps)
}
