import { Form, Input, InputNumber, Select } from 'antd'
import { InputSelectProps, InputTextProps, LabelOptionProps } from '@/framework/types/common'
import { FormListFieldData } from 'antd/lib/form/FormList'
import { AttributeListProps } from '@/framework/types/product'

interface FormProps {
  list: (InputTextProps | InputSelectProps | AttributeListProps | LabelOptionProps)[]
  parentName?: Array<any>
  field?: FormListFieldData
  layout?: any
  disabled?: boolean
}
const FormItem = ({ list, parentName, field, layout, disabled }: FormProps) => {
  return (
    <>
      {list.map((el: any, idx: number) => {
        let name = parentName ? [...parentName, el.name] : el.name //兼容form.list
        return (
          <>
            {el.type === 'select' ? (
              <Form.Item className={el.className} {...layout} {...field} label={el.label} name={name} rules={el.rules}>
                <Select placeholder={'Please select ' + el.label} options={el.options} />
              </Form.Item>
            ) : null}
            {el.type === 'input' ? (
              <Form.Item
                className={el.className}
                {...layout}
                {...field}
                label={el.label}
                name={name}
                disabled={el.disabled || false}
                rules={el.rules}
              >
                <Input
                  disabled={el.disabled || false}
                  placeholder={'please input ' + el.label}
                  addonBefore={el.addonBefore}
                />
              </Form.Item>
            ) : null}
            {el.type === 'inputNumber' ? (
              <Form.Item
                className={el.className}
                {...layout}
                {...field}
                label={el.label}
                name={name}
                disabled={el.disabled || false}
                rules={el.rules}
              >
                <InputNumber
                  min={0}
                  className='w-full'
                  disabled={el.disabled || false}
                  placeholder={'please input ' + el.label}
                  addonBefore={el.addonBefore}
                />
              </Form.Item>
            ) : null}
          </>
        )
      })}
    </>
  )
}
export default FormItem
