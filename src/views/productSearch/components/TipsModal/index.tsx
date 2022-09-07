import { Modal } from 'antd'
import type { ModalProps } from 'antd/lib/modal'
import intl from 'react-intl-universal'
import './index.less'

type TipsModalProps = ModalProps & {
  type: TipsType
}

const tips = {
  delete: { desc: intl.get('public.are_you_sure_delete'), title: intl.get('public.delete_item') },
  notice: { desc: intl.get('public.are_you_sure_disable'), title: intl.get('public.notice') },
}

export type TipsType = keyof typeof tips

const TipsModal = ({ type, ...restProps }: TipsModalProps) => {
  return (
    <Modal className="deleteModal" okText={intl.get('public.confirm')} title={tips[type].title} {...restProps}>
      <div>{tips[type].desc}</div>
    </Modal>
  )
}

export default TipsModal
