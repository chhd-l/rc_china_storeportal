import { ProductForCateProps } from '@/framework/types/product'
import { ProColumns } from '@ant-design/pro-table'
import { Button,Input,Space } from 'antd'
import { Link } from 'react-router-dom'
const {Search} = Input
export const columns: ProColumns<ProductForCateProps>[] = [
  {
    title: 'product Name',
    dataIndex: 'productName',
    hideInSearch: true,
  },
  {
    title: 'Price',
    dataIndex: 'marketingPrice',
    hideInSearch: true,
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    hideInSearch: true,
  },
  {
    title: 'Actions',
    key: 'option',
    width: 180,
    valueType: 'option',
    render: (_, record) => {
      return(
        <Link to='' className='mr-4 text-xl' onClick={() => {

        }}>
          <span className='iconfont icon-delete' />
        </Link>
      )
    }
  },
  {
    dataIndex: 'productName',
    renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
      return (
        <Space direction="vertical" className='search-input'>
          <Search placeholder="Search Products" onSearch={()=>{
            form.submit()
          }} size="large" style={{ width: 400 }} />
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
      <Button key='submit' type='primary' onClick={() => submit?.()}>
        Search
      </Button>,
      <Button key='rest' onClick={() => resetFields()}>
        Reset
      </Button>,
    ]
  },
}
const setNum = (arr:any) => {
  let result = 0
  for (let i = 0; i < arr.length; i++) {
    result += Number(arr[i].stock)// 点开看 有两个值
  }
  return result
}

export const restWrapButtons = (
  renderProps: any,
  productNum: number,
  closeModal: (visible: boolean) => void,
) => {
  const setting = (props: any) => {
    const { submit } = props.form
    return [
      <div className='pr-4 text-gryy-400'> {productNum} product(s) found</div>,
      <Button key='cancel' onClick={() => closeModal(false)}>
        Cancel
      </Button>,
      <Button key='submit' type='primary' onClick={() => submit?.()}>
        Comfirm
      </Button>,
    ]
  }
  return setting(renderProps)
}