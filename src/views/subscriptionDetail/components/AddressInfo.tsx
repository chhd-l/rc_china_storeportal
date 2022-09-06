import React from 'react'
import { Button, Spin } from 'antd'
import AddressModal from '@/components/consumer/AddressModal'
import intl from 'react-intl-universal'

const AddressInfo = ({ data, onEdit }: { data: any; onEdit: (address: any) => Promise<boolean> }) => {
  const [visible, setVisible] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const handleEdit = async (address: any) => {
    setVisible(false)
    setLoading(true)
    await onEdit(address)
    setLoading(false)
  }

  return (
    <Spin spinning={loading}>
      <div className="flex justify-start space-x-4">
        <span className="iconfont icon-a-xingzhuangjiehe2 primary-color text-xl"></span>
        <div className="flex-grow mx-4">
          <div className="mb-2">
            {data?.address?.receiverName} {data?.address?.phone} {data?.address?.postCode}
          </div>
          <div>
            {[data?.address?.province, data?.address?.city, data?.address?.region, data?.address?.detail]
              .filter((item) => !!item)
              .join(' ')}
          </div>
        </div>
        <div>
          <Button type="primary" style={{ minWidth: 80 }} onClick={() => setVisible(true)}>
            {intl.get('public.Edit')}
          </Button>
        </div>
      </div>
      {visible ? (
        <AddressModal
          consumerId={data?.consumer?.id}
          visible={visible}
          onCancel={() => setVisible(false)}
          onConfirm={handleEdit}
        />
      ) : null}
    </Spin>
  )
}

export default AddressInfo
