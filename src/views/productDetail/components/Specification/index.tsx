import FormItem from '@/components/common/FormItem'
import type { InputSelectProps, InputTextProps } from '@/framework/types/common'
import type { FormProps } from '@/framework/types/product'
 const Specification = (props: FormProps) => {
  const selectList: (InputTextProps | InputSelectProps)[] = [
    {
      options: [{ name: 'zone', value: 'zone' }],
      name: 'zone',
      label: 'Zone',
      className: 'w-1/2',
      type: 'select'
    },
    {
      options: [{ name: 'breeds', value: 'breeds' }],
      name: 'breeds',
      label: 'Breeds',
      className: 'w-1/2',
      type: 'select'
    },
    {
      options: [{ name: 'age', value: 'age' }],
      name: 'age',
      label: 'Age',
      className: 'w-1/2',
      type: 'select'
    },
    {
      options: [{ name: 'lifeStage', value: 'lifeStage' }],
      name: 'lifeStage',
      label: 'Life Stage',
      className: 'w-1/2',
      type: 'select'
    },
    {
      options: [{ name: 'functions', value: 'functions' }],
      name: 'functions',
      label: 'Functions',
      className: 'w-1/2',
      type: 'select'
    },
    {
      options: [{ name: 'size', value: 'size' }],
      name: 'size',
      label: 'Size',
      className: 'w-1/2',
      type: 'select'
    },
    {
      options: [{ name: 'technology', value: 'technology' }],
      name: 'technology',
      label: 'Technology',
      className: 'w-1/2',
      type: 'select'
    },
  ]
  console.info('dsdsdsds', props.field)
  return <div className='flex flex-wrap'>
    <FormItem {...props} list={selectList} parentName={[props.field.name]} />
    {/* {selectList.map(el => <Form.Item className='w-1/2'  {...props.field} label={el.label} name={[props.field.name, el.key]} >
      <Select options={el.options} />
    </Form.Item>)} */}
  </div>

}
export default Specification