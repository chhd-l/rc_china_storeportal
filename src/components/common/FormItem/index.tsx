import { Form, Input, Select } from 'antd'
// interface InputProps {
//   className?:string
//   parentName?:string
//   field?:string
//   layout?:string
//   options:OptionProps
// }
export default (props: any) => {
  return <>
    {props.list.map((el: any) => {
      let name = props.parentName ? [...props.parentName, el.name] : el.name //兼容form.list
      return <Form.Item className={el.className}  {...props.field} {...props.layout} label={el.label} name={name} rules={el.rules} >
        {el.type == 'select' && <Select options={el.options} />}
        {el.type=='input' &&<Input addonBefore={el.addonBefore}/>}
      </Form.Item>
    })}
  </>
}