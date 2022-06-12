import { Input, InputNumber } from 'antd'
import { useState } from 'react'
import { useEffect } from 'react'
import { FC } from 'react'
interface Props {
  td: any
  tr: any
  val: string
  onBlur: any
  type:'number'|'priceInput'
}
const MyInputNumber: FC<Props> = ({ td, tr, val, onBlur,type }) => {
  const [value, setValue] = useState('')
  let props={}
  let className = 'text-center'
  if(type==='priceInput'){
    props={
      prefix:'￥',
      precision:2
    }
    className='price-input text-center'
  }
  useEffect(() => {
    setValue(val)
  }, [val])
  
  return (
    <InputNumber
      {...props}
      className={className}
      placeholder='Input'
      type='number'
      min={'0'}
      value={value}
      disabled={td.keyVal === 'subscriptionPrice' && tr.subscriptionStatus === '0'}
      onChange={e => {
        if(e<0){
          e=0
        }
        setValue(e)
      }}
      onBlur={onBlur}
      // formatter={value => Number(value)?.toFixed(2)}
      defaultValue={tr[td.keyVal]}
    />
  )
}
export default MyInputNumber
