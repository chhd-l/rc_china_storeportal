import { hotSearchCreate } from '@/framework/api/get-product'
import { PlusOutlined } from '@ant-design/icons'
import { ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-form'
import { Button, message } from 'antd'
import intl from 'react-intl-universal'

type AddNewSearchProps = {
  refreshTable: () => void
}
const AddNewSearch = ({ refreshTable }: AddNewSearchProps) => {
  return (
    <ModalForm<{
      topName: string
      priority: number
    }>
      width={322}
      title={intl.get('product.Add New Top Search')}
      trigger={
        <Button key="button" type="primary" className="flex items-center">
          <PlusOutlined />
          {intl.get('public.add')}
        </Button>
      }
      autoFocusFirstInput
      modalProps={{
        okText: intl.get('public.confirm'),
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        const result = await hotSearchCreate({ ...values, storeId: 'storeIdMock' })
        if (!result.hotSearchCreate) {
          return false
        }
        message.success({ className: 'rc-message', content: intl.get('public.operate_success') })
        refreshTable()
        return true
      }}
    >
      <ProFormText
        width="md"
        name="topName"
        label={intl.get('product.To Search Name')}
        placeholder={intl.get('public.input')}
      />
      <ProFormDigit
        width="md"
        label={intl.get('product.Priority')}
        name="priority"
        min={0}
        fieldProps={{ precision: 0 }}
        initialValue={0}
      />
    </ModalForm>
  )
}

export default AddNewSearch
