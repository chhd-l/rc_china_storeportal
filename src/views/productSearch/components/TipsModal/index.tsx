import { Modal } from "antd"
import type{ ModalProps } from "antd/lib/modal"
import './index.less'

type TipsModalProps=ModalProps & {
  type:string
}
const TipsModal=({visible,type,...restProps}:TipsModalProps)=>{
  console.log('type',type)
  return  <Modal
  className="deleteModal"
  okText='Confirm'
  visible={visible}
  title={type==='delete'?"Delete Item":'Notice'}
  {...restProps}
>
    <div>
       {
      type==='delete'?'Are you sure you want to delete the item ?':'Are you sure you want to disable the item ?'
    }
    </div>
</Modal>
}


export default TipsModal