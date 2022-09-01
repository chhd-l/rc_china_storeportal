import { ProColumns } from "@ant-design/pro-table";
import { Button,Space,Input } from "antd";
import { formatMoney } from '@/utils/utils';
import intl from 'react-intl-universal';
const { Search } = Input

const setNum = (arr: any) => {
  let result = 0
  for (let i = 0; i < arr.length; i++) {
    result += Number(arr[i].stock)// 点开看 有两个值
  }
  return result
}
export const columns: ProColumns<any>[] = [
  {
    title: intl.get('product.product_name'),
    dataIndex: 'name',
    hideInSearch: true,
    render: (_, record) => {
      return (
        <div className='flex al-cneter'>
          <img src={record.variants[0]?.defaultImage} alt='' style={{ width: '50px',height:'50px', marginRight: '10px' }} />
          <div>
            <div>{record.name}</div>
          </div>
        </div>
      )
    },
  },
  {
    title: intl.get('product.price'),
    dataIndex: 'Marketing Price',
    hideInSearch: true,
    render: (_, record) => {
      if (record.variants?.length <= 1) {
        return (
          <span>{formatMoney(record.variants[0]?.marketingPrice)}</span>
        )
      } else if (record.variants?.length > 1) {
        let arr = record.variants.sort((a: any, b: any) => {
          return a.marketingPrice - b.marketingPrice
        })
        return (
          <span>{formatMoney(arr[0]?.marketingPrice) + '-' + formatMoney(arr[arr.length - 1]?.marketingPrice)}</span>
        )
      }
    },
  },
  {
    title: intl.get('product.stock'),
    dataIndex: 'stock',
    hideInSearch: true,
    render: (_, record) => {
      if (record.variants?.length > 0) {
        return (
          <span>{setNum(record.variants)}</span>
        )
      }
    },
  },
  {
    dataIndex: 'name',
    hideInTable: true,
    renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
      return (
        <Space direction='vertical' className='search-input'>
          <Search placeholder='Search Products' onSearch={() => {
            form.submit()
          }} size='middle' style={{ width: 400,fontSize:'14px' }} />
        </Space>
      )
    },
  },
]


export const restWrapButtons = (
  renderProps: any,
  productNum: number,
  closeModal: (visible: boolean) => void
) => {
  const setting = (props: any) => {
    const { submit } = props.form;
    return [
      <div className="pr-4 text-gryy-400">{intl.get('product.products_found', { num: productNum })}</div>,
      <Button key="cancel" onClick={() => closeModal(false)}>
        {intl.get('public.cancel')}
      </Button>,
      <Button key="submit" type="primary" onClick={() => submit?.()}>
        {intl.get('public.confirm')}
      </Button>,
    ];
  };
  return setting(renderProps);
};

export const manualColumns: ProColumns<any>[] = [
  {
    title: intl.get('product.product_s'),
    dataIndex: "name",
  },
  {
    title: intl.get('product.brand'),
    dataIndex: "brand",
  },
  {
    title: intl.get('product.price(s)'),
    dataIndex: "marketingPrice",
    sorter: (a, b) => a.lowestPrice - b.lowestPrice,
    render: (_, record) => (
      <>
        {record.lowestPrice}-{record.highestPrice}
      </>
    ),
  },
  {
    title: intl.get('product.stock'),
    dataIndex: "stock",
  },
];
