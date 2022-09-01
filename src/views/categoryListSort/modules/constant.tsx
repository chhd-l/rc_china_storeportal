import { ProColumns } from "@/components/common/ProTable";
import { LabelOptionProps } from "@/framework/types/common";
import { AddCateType, CategoryBaseProps } from "@/framework/types/product";
import { Switch } from "antd";
import { Link } from "react-router-dom";
import intl from 'react-intl-universal';

export const columns: ProColumns<CategoryBaseProps>[] = [
  {
    title: intl.get('product.category_display_name'),
    dataIndex: 'displayName',
  },
  {
    title: intl.get('product.create_by'),
    dataIndex: 'createdUser',
  },
  {
    title: intl.get('product.products'),
    dataIndex: 'productNum',
  },
  {
    title: intl.get('product.display_in_off'),
    dataIndex: 'isDisplay',
    render: (_, record) => (
      <Switch
        defaultChecked={record.isDisplay}
        disabled={record.productNum < 1}
        onChange={(checked: boolean) => {
          console.log(`switch to ${checked}`)
        }}
      />
    ),
  },
  {
    title: intl.get('public.action'),
    key: 'option',
    width: 180,
    valueType: 'option',
    render: (_, record) => {
      if (record.productNum <= 0) {
        return [
          <Link to={`/category/${record.id}`} className="mr-4 text-xl">
            <span className='iconfont icon-jiahao' />
          </Link>,
          // <a className=" mr-4">
          //   <SettingOutlined />
          // </a>,
          <Link to='' className="text-xl mr-4">
            <span className='iconfont icon-delete' />
          </Link>]
      } else {
        return [
          <Link to={`/category/${record.id}`} className="mr-4 text-xl">
            <span className='iconfont icon-group52' />
          </Link>,
          <Link to='' className="mr-4 text-xl">
            <span className='iconfont icon-delete' />
          </Link>,]
      }
    },
  },
]

export const columnsAdjustSequence: ProColumns<any>[] = [
  {
    title: intl.get('product.product_name'),
    dataIndex: 'productName',
  },
  {
    title: intl.get('product.market_price'),
    dataIndex: 'marketingPrice',
  },
  {
    title: intl.get('product.stock'),
    dataIndex: 'stock',
  },
]

export const AddCateOptions: LabelOptionProps[] | string[] = [
  {
    value: AddCateType.ManualSelection,
    label: (
      <>
        <div>{intl.get('product.manual_selection')}</div>
        <div className='text-gray-400'>
          {intl.get('product.manual_selection_tip')}
        </div>
      </>
    ),
  },
  // {
  //   value: AddCateType.RuleBasedFiltering,
  //   label: (
  //     <>
  //       <div>Rule-based Filtering</div>
  //       <div className='text-gray-400'>
  //         Products will be automatically selected based on the filters you have set up
  //       </div>
  //     </>
  //   ),
  // },
]
