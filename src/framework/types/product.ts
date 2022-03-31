import type {FormListFieldData} from 'antd/lib/form/FormList';

export interface FormProps {
  field:FormListFieldData
  parentName?:Array<any>
  name?:string
  layout?:any
}