import { Input, InputNumber } from 'antd'
import { useState } from 'react'
import { useEffect } from 'react'
import { FC } from 'react'
interface Props {
  td: any
  tr: any
  val: string
  onBlur: any
}
const MyInputNumber: FC<Props> = ({ td, tr, val, onBlur }) => {
  const [value, setValue] = useState('')
  useEffect(() => {
    setValue(val)
  }, [val])
  return (
    <InputNumber
      className='price-input text-center'
      placeholder='Input'
      type='number'
      min={'0'}
      value={value}
      disabled={td.keyVal === 'subscriptionPrice' && tr.subscriptionStatus === '0'}
      prefix='￥'
      precision={2}
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
