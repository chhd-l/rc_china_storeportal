import type {Rule} from 'antd/lib/form'
export interface FormItemProps {
  name: string;
  placeholder: string;
  rules?: any[];
}

export interface KeyRules {
  [key: string]: string;
}


export interface OptionsProps {
  name: string;
  value:string;
}

export interface InputBaseProps {
  name: string,
  label?: string,
  className?: string,
  type: 'select'|'input'
  layout?: any
  rules?: Rule[]
}
export interface InputSelectProps extends InputBaseProps {
  options: OptionsProps[],
 
}
export interface InputTextProps  extends InputBaseProps  {
  addonBefore?: string
}