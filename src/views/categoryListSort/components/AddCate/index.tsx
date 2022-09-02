import './index.less'
import ProForm, { ModalForm, ProFormRadio, ProFormText } from '@ant-design/pro-form'
import { useNavigate } from 'react-router-dom'
import { AddCateOptions } from '../../modules/constant'
import { saveShopCategory } from '@/framework/api/get-product'
import intl from 'react-intl-universal'

interface AddCateProps {
  visible: boolean
  handleVisible: (a: boolean) => void
  handleUpdate: (a: boolean) => void
}
const AddCate = ({ visible, handleVisible, handleUpdate }: AddCateProps) => {
  const navigation = useNavigate()
  const onFinish = async (values: any) => {
    let res = await saveShopCategory({
      //  storeId: '12345678',
      displayName: values.displayName,
      categoryType: values.type === '0' ? 'MANUAL' : 'RULE_BASED',
      isDisplay: false,
    })
    console.log(res)
    if (res.shopCategoryCreate.id) {
      handleUpdate(true)
      return true
    } else {
      return false
    }
    // navigation(`/category/category-detail/add`, { state: { addCateType: values.type } });
  }
  return (
    <ModalForm
      title={intl.get('product.add_category')}
      visible={visible}
      onFinish={onFinish}
      onVisibleChange={value => {
        handleVisible(value)
      }}
      modalProps={{ width: 520, okText: intl.get('public.confirm'), cancelText: intl.get('public.cancel') }}
    >
      <ProForm.Group>
        <ProFormText
          width='md'
          rules={[{ required: true, message: intl.get('product.miss_display_name') }]}
          name='displayName'
          label={intl.get('product.category_display_name')}
          fieldProps={{ maxLength: 40, showCount: true }}
          placeholder={intl.get('product.enter_display_name')}
        />
      </ProForm.Group>
      <ProFormRadio.Group name='type' initialValue={'0'} label={intl.get('product.category_type')} options={AddCateOptions} />
    </ModalForm>
  )
}

export default AddCate
