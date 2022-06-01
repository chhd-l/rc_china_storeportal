import React, { useState, useEffect } from 'react'
import { Modal, Table } from 'antd'
import { getCustomerAddressList } from "@/framework/api/customer"
import { ColumnProps } from 'antd/es/table'

interface IProps {
  customerId: string
  visible: boolean
  onConfirm: (address: any) => void
  onCancel: () => void
}

const columns: ColumnProps<any>[] = [
  {
    title: "Receiver Name",
    dataIndex: "receiverName",
    key: "receiver",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Province",
    dataIndex: "province",
    key: "province",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "District",
    dataIndex: "region",
    key: "region",
  },
  {
    title: "Address",
    dataIndex: "detail",
    key: "detail",
  },
  {
    title: "Postal Code",
    dataIndex: "postcode",
    key: "postcode",
  }
]

const AddressModal: React.FC<IProps> = (props) => {
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const getAddress = async () => {
    setLoading(true)
    const data = await getCustomerAddressList(props.customerId)
    setList(data);
    setLoading(false)
  }

  useEffect(() => {
    getAddress()
  }, [])

  return (
    <Modal
      title="Addresses"
      visible={props.visible}
      width={920}
      okText="Confirm"
      cancelText="Cancel"
      onOk={() => {
        if (props.onConfirm) {
          props.onConfirm(selectedRows[0])
        } else {
          props.onCancel()
        }
      }}
      okButtonProps={{disabled: selectedRowKeys.length === 0}}
      onCancel={props.onCancel}
    >
      <Table
        rowKey="id"
        columns={columns}
        dataSource={list}
        loading={loading}
        pagination={false}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys)
            setSelectedRows(selectedRows)
          }
        }}
      />
    </Modal>
  )
}

export default AddressModal
