import { FC, FocusEventHandler, useRef, useState } from 'react'
import { Input } from 'antd'
interface Props {
  defaultValue: string
  className: string
  placeholder: string
  onBlur: FocusEventHandler<HTMLInputElement>
}
const ValidateInput: FC<Props> = ({ defaultValue, className, placeholder, onBlur }) => {
  let inputOnchange: boolean | undefined
  const [value, setValue] = useState(defaultValue)
  const inputRef = useRef(null)
  const onChange = (e: any) => {
    setTimeout(() => {
      console.info(e.type, '...', inputRef.current)
      if (!inputOnchange) {
        let val = e.target.value?.replace(/[^\d/a-zA-Z]/g, '')
        console.info('setValue', val)
        // @ts-ignore
        inputRef.current.input.value = val
        setValue(val)
      }
    }, 0)
  }
  const handleComposition = (evt: any) => {
    console.info(evt.type, '..........................')
    if (evt.type === 'compositionend') {
      inputOnchange = false
      // let val = evt.target.value?.replace(/[\W]/g, '')
      // console.info('setValue', val)
      // setValue(val)
      return
    }
    inputOnchange = true
  }
  return (
    <Input
      ref={inputRef}
      className={className}
      placeholder={placeholder}
      onCompositionStart={handleComposition}
      onCompositionUpdate={handleComposition}
      onCompositionEnd={handleComposition}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}

export default ValidateInput
