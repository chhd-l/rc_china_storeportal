import { ProductForCateProps } from "@/framework/types/product";
import { ProColumns } from "@ant-design/pro-table";
import { Button,Space,Input } from "antd";
import { getESProducts } from '@/framework/api/get-product'
import { formatMoney } from '@/utils/utils'
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
    title: 'Product Name',
    dataIndex: 'goodsName',
    hideInSearch: true,
    render: (_, record) => {
      return (
        <div className='flex al-cneter'>
          <img src={record.goodsVariants[0]?.defaultImage} alt='' style={{ width: '50px', marginRight: '10px' }} />
          <div>
            <div>{record.goodsName}</div>
          </div>
        </div>
      )
    },
  },
  {
    title: 'Price',
    dataIndex: 'Marketing Price',
    hideInSearch: true,
    render: (_, record) => {
      if (record.goodsVariants?.length <= 1) {
        return (
          <span>{formatMoney(record.goodsVariants[0]?.marketingPrice)}</span>
        )
      } else if (record.goodsVariants?.length > 1) {
        let arr = record.goodsVariants.sort((a: any, b: any) => {
          return a.marketingPrice - b.marketingPrice
        })
        return (
          <span>{formatMoney(arr[0]?.marketingPrice) + '-' + formatMoney(arr[arr.length - 1]?.marketingPrice)}</span>
        )
      }
    },
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    hideInSearch: true,
    render: (_, record) => {
      if (record.goodsVariants?.length > 0) {
        return (
          <span>{setNum(record.goodsVariants)}</span>
        )
      }
    },
  },
  {
    dataIndex: 'goodsName',
    hideInTable: true,
    renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
      return (
        <Space direction='vertical' className='search-input'>
          <Search placeholder='Search Products' onSearch={() => {
            form.submit()
          }} size='large' style={{ width: 400 }} />
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
      <div className="pr-4 text-gryy-400"> {productNum} product(s) found</div>,
      <Button key="cancel" onClick={() => closeModal(false)}>
        Cancel
      </Button>,
      <Button key="submit" type="primary" onClick={() => submit?.()}>
        Comfirm
      </Button>,
    ];
  };
  return setting(renderProps);
};

export const manualColumns: ProColumns<any>[] = [
  {
    title: "products",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Price(s)",
    dataIndex: "marketingPrice",
    sorter: (a, b) => a.lowestPrice - b.lowestPrice,
    render: (_, record) => (
      <>
        {record.lowestPrice}-{record.highestPrice}
      </>
    ),
  },
  {
    title: "Stock",
    dataIndex: "stock",
  },
];
