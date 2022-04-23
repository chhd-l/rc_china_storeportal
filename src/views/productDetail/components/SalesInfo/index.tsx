import FormItem from '@/components/common/FormItem'
import { FormProps } from '@/framework/types/common'
import { noSkuForm } from '../../modules/constant'
import { createContext, useState } from 'react'
import AddVariation from '../AddVariation'
import EditVariationList from '../EditVariationList'
import { VarationsFormProps } from '@/framework/types/product'
interface ContextProps {
  variationForm: VarationsFormProps
  setVariationForm: () => void
}
export const VariationosContext = createContext(null as any)

const SalesInfo = (props: FormProps) => {
  const [variationForm, setVariationForm] = useState<any>({
    variationList: [],
  })
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  }
  return (
    // <div>test</div>
    <VariationosContext.Provider value={{ variationForm, setVariationForm }}>
      <AddVariation />
      <EditVariationList field={props.field} />
      {variationForm.variationList?.length ? null : <FormItem list={noSkuForm} {...props} layout={layout} />}
    </VariationosContext.Provider>
  )
}

export default SalesInfo
