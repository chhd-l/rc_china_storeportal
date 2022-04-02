import FormItem from "@/components/common/FormItem";

import type { FormProps } from "@/framework/types/common";
import { selectList } from "../../modules/constant";
const Specification = (props: FormProps) => {
  console.info("dsdsdsds", props.field);
  return (
    <div className="flex flex-wrap">
      <FormItem {...props} list={selectList} parentName={[props.field.name]} />
      {/* {selectList.map(el => <Form.Item className='w-1/2'  {...props.field} label={el.label} name={[props.field.name, el.key]} >
      <Select options={el.options} />
    </Form.Item>)} */}
    </div>
  );
};
export default Specification;
