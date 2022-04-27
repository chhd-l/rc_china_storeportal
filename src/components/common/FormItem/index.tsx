import { Form, Input, Select } from 'antd'
import { InputSelectProps, InputTextProps } from '@/framework/types/common'
import { FormListFieldData } from 'antd/lib/form/FormList'
import { AttributeListProps } from '@/framework/types/product'

interface FormProps {
  list: (InputTextProps | InputSelectProps | AttributeListProps)[]
  parentName?: Array<any>
  field?: FormListFieldData
  layout?: any
}
const FormItem = ({ list, parentName, field, layout }: FormProps) => {
  return (
    <>
      {list.map((el: any, idx: number) => {
        let name = parentName ? [...parentName, el.name] : el.name //兼容form.list
        return (
          <>
            {el.type === 'select' ? (
              <Form.Item className={el.className} {...layout} {...field} label={el.label} name={name} rules={el.rules}>
                <Select placeholder={'please select ' + el.label} options={el.options} />
              </Form.Item>
            ) : null}
            {el.type === 'input' ? (
              <Form.Item className={el.className} {...layout} {...field} label={el.label} name={name} rules={el.rules}>
                <Input placeholder={'please input ' + el.label} addonBefore={el.addonBefore} />
              </Form.Item>
            ) : null}
          </>
        )
      })}
    </>
  )
}
export default FormItem
