import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Typography, Button, Tooltip } from 'antd'
import { useRef, useState } from 'react'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import ManualSelection from './ManualSelection/index'
const { Title } = Typography

type ApplicableProductsType = {
  VoucherType: string
  setkeys: Function
  selectProducts: any[]
  setSelectProducts: Function
  keys: string[]
}

const ApplicableProducts = ({
  VoucherType,
  setkeys,
  selectProducts,
  setSelectProducts,
  keys,
}: ApplicableProductsType) => {
  const [selectProductsModal, setSelectProductsModal] = useState(false)
  const ref = useRef<any>()

  const selectProductChange = (productList: any, selectedRowKeys: string[]) => {
    setkeys([...keys,...selectedRowKeys])
    setSelectProducts([...selectProducts,...productList])
    setSelectProductsModal(false)
    ref.current!.reload()
  }

  const columns: ProColumns<any, string>[] = [
    {
      title: 'Products',
      dataIndex: 'goodsName',
      hideInSearch: true,
      render: (_, record) => {
        return (
          <div className="flex al-cneter">
            <img src={record?.defaultImage} alt="" style={{ width: '50px', marginRight: '10px' }} />
            <div>
              <div>{record.goodsName}</div>
              <div className="text-gray-400">spu:{record.spuNo}</div>
            </div>
          </div>
        )
      },
    },
    {
      title: 'Price(s)',
      dataIndex: 'marketingPrice',
    },
    {
      title: () => (
        <div className="flex items-center">
          Stock
          <QuestionCircleOutlined className="ml-1" />
        </div>
      ),
      dataIndex: 'stock',
    },
    {
      title: 'Actions',
      dataIndex: 'Actions',
      width: 80,
      render: () => (
        <Tooltip title="Delete">
          <span className="iconfont text-xl icon-delete text-red-500" />
        </Tooltip>
      ),
    },
  ]

  return (
    <div className="bg-white p-4 ApplicableProducts">
      <Title className="mt-8 mb-6" level={4}>
        Applicable Products
      </Title>
      {VoucherType === 'SHOP_VOUCHER' ? (
        <div className="flex items-center pl-12">
          <span className="mr-8">Applicable Products</span>
          {VoucherType === 'SHOP_VOUCHER' ? (
            <span>all products</span>
          ) : (
            <Button
              className="flex items-center m-0 text-white"
              type="primary"
              danger
              ghost
              icon={<PlusOutlined />}
              onClick={() => setSelectProductsModal(true)}
            >
              Add Products
            </Button>
          )}
        </div>
      ) : (
        <div className="flex">
          <span className="mr-8">Applicable Products</span>
          <ProTable
            actionRef={ref}
            className="w-9/12"
            columns={columns}
            options={false}
            search={false}
            pagination={{
              hideOnSinglePage: false,
              showSizeChanger: true,
              showQuickJumper: true,
              defaultPageSize: 10,
              showTotal: () => <></>,
            }}
            dataSource={selectProducts}
            rowKey="id"
            toolBarRender={() => [
              <div className="text-gray-400">
                <span className="text-black">{selectProducts.length}</span> Product(s) Selected
              </div>,
              <Button
                className="flex items-center m-0 text-white"
                type="primary"
                danger
                ghost
                icon={<PlusOutlined />}
                onClick={() => setSelectProductsModal(true)}
              >
                Add Products
              </Button>,
            ]}
          />
        </div>
      )}
      <ManualSelection
        visible={selectProductsModal}
        selectProductChange={selectProductChange}
        closeSelectModal={() => setSelectProductsModal(false)}
        keys={keys}
      />
    </div>
  )
}

export default ApplicableProducts
