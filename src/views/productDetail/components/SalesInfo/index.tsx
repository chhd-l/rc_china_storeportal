import FormItem from '@/components/common/FormItem'
import { FormProps } from '@/framework/types/common'
import { noSkuForm } from '../../modules/constant'
import { createContext, useContext, useEffect, useState } from 'react'
import AddVariation from '../AddVariation'
import EditVariationList from '../EditVariationList'
import { DetailContext } from '../../index'
import { VarationsFormProps } from '@/framework/types/product'
interface ContextProps {
  variationForm: VarationsFormProps
  setVariationForm: () => void
}
export const VariationosContext = createContext(null as any)

const SalesInfo = (props: FormProps) => {
  const { detail } = useContext(DetailContext)
  const [variationForm, setVariationForm] = useState<any>({
    variationList: [],
  })
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  }

  useEffect(() => {
    console.log('123123123213123123',123123123213123123)
    if (detail.variationForm) {
      setVariationForm(detail.variationForm)
    }
  }, [detail.variationForm])
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
