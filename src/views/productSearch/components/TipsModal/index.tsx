import { Modal } from "antd"
import type{ ModalProps } from "antd/lib/modal"
import './index.less'

type TipsModalProps=ModalProps & {
  type:TipsType
}

const tips={
  delete:{desc:'Are you sure you want to delete the item ?',title:'Delete Item'},
  notice:{desc:'Are you sure you want to disable the item ?',title:'Notice'}
} 

 export type TipsType=keyof  typeof tips


const TipsModal=({type,...restProps}:TipsModalProps)=>{
  return  <Modal
  className="deleteModal"
  okText='Confirm'
  title={tips[type].title}
  {...restProps}
>
    <div>
       {tips[type].desc}
    </div>
</Modal>
}


export default TipsModal