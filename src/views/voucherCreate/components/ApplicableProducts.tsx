import { PlusOutlined } from '@ant-design/icons'
import { Typography, Button, Tooltip, Modal, message } from 'antd'
import { useRef, useState } from 'react'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import ManualSelection from './ManualSelection/index'
import intl from 'react-intl-universal'
const { Title } = Typography

type ApplicableProductsType = {
  VoucherType: string
  setkeys: Function
  selectProducts: any[]
  setSelectProducts: Function
  keys: string[]
  Edit: boolean | undefined
}

const ApplicableProducts = ({
  VoucherType,
  setkeys,
  selectProducts,
  setSelectProducts,
  keys,
  Edit,
}: ApplicableProductsType) => {
  const [selectProductsModal, setSelectProductsModal] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [Products, setProducts] = useState('')
  const ref = useRef<any>()
  const [loading, setLoading] = useState(false)

  const selectProductChange = (productList: any, selectedRowKeys: string[]) => {
    setkeys([...keys, ...selectedRowKeys])
    setSelectProducts([...selectProducts, ...productList])
    setSelectProductsModal(false)
    ref.current!.reload()
  }

  const columns: ProColumns<any, string>[] = [
    {
      title: intl.get('voucher.Products'),
      dataIndex: 'productName',
      hideInSearch: true,
      render: (_, record) => {
        return (
          <div className="flex al-cneter">
            <img src={record?.defaultImage} alt="" style={{ width: '50px', marginRight: '10px' }} />
            <div>
              <div>{record.productName}</div>
              <div className="text-gray-400">spu:{record.spuNo}</div>
            </div>
          </div>
        )
      },
    },
    {
      title: intl.get('voucher.Price(s)'),
      dataIndex: 'marketingPrice',
    },
    {
      title: intl.get('voucher.Stock'),
      dataIndex: 'stock',
    },
    {
      title: intl.get('voucher.Actions'),
      dataIndex: 'id',
      width: 80,
      hideInTable: Edit,
      render: (text: any, record: any) => (
        <Tooltip title="Delete">
          <span
            className="iconfont text-xl icon-delete text-red-500"
            onClick={() => {
              setProducts(text)
              setIsModalVisible(true)
            }}
          />
        </Tooltip>
      ),
    },
  ]

  const confirmDelete = async () => {
    try {
      setLoading(true)
      const deKeys = [...keys]
      deKeys.splice(deKeys.indexOf(Products), 1)
      const arr = [...selectProducts]
      selectProducts.forEach((item, idx) => {
        if (item.id === Products) {
          arr.splice(idx, 1)
        }
      })
      setkeys(deKeys)
      setSelectProducts(arr)
      setIsModalVisible(false)
      setLoading(false)
      message.success({ className: 'rc-message', content: intl.get('public.operate_success') })
    } catch (err) {
      message.error({ className: 'rc-message', content: intl.get('public.operate_fail') })
      setLoading(false)
    }
  }

  return (
    <div className="bg-white px-6 pb-6 ApplicableProducts">
      <Title className="m-0 mb-6" level={4}>
        {intl.get('voucher.Applicable Products')}
      </Title>
      {VoucherType === 'SHOP_VOUCHER' ? (
        <div className="flex items-center pl-12">
          <span className="mr-8">{intl.get('voucher.Applicable Products')}</span>
          <span>{intl.get('voucher.orders.All Products')}</span>
        </div>
      ) : !selectProducts.length ? (
        <div className="flex items-center pl-12">
          <span className="mr-8">{intl.get('voucher.Applicable Products')}</span>
          <Button
            className="flex items-center m-0 text-white"
            type="primary"
            danger
            disabled={Edit}
            ghost
            icon={<PlusOutlined />}
            onClick={() => setSelectProductsModal(true)}
          >
            {intl.get('voucher.Add Products')}
          </Button>
        </div>
      ) : (
        <div className="flex">
          <span className="mr-8">{intl.get('voucher.Applicable Products')}</span>
          <ProTable
            actionRef={ref}
            className="w-9/12"
            columns={columns}
            options={false}
            search={false}
            revalidateOnFocus={false}
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
                <span className="text-black">{selectProducts.length}</span> {intl.get('voucher.Product(s) Selected')}
              </div>,
              <Button
                className="flex items-center m-0 text-white"
                type="primary"
                danger
                disabled={Edit}
                ghost
                icon={<PlusOutlined />}
                onClick={() => setSelectProductsModal(true)}
              >
                {intl.get('voucher.Add Products')}
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
      <Modal
        key="assetDelete"
        className="rc-modal"
        title="Delete Item"
        okText="Confirm"
        visible={isModalVisible}
        onOk={confirmDelete}
        confirmLoading={loading}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>{intl.get('voucher.Are you sure you want to Delete the item?')}</p>
      </Modal>
    </div>
  )
}

export default ApplicableProducts
