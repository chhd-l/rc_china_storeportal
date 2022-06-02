import { Input, Popconfirm, Popover } from 'antd'
import { FC, useState } from 'react'
import './index.less'
interface Props {
  defaultValue: string
  onBlur: Function
}
const SkuNameInput: FC<Props> = ({ defaultValue, onBlur }) => {
  const { TextArea } = Input
  const [value, setValue] = useState(defaultValue)
  const [valueText, setValueText] = useState(defaultValue)
  const [eTarget, setETarget] = useState<any>(null)
  const changeSkuName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.info('...', e.target.value)
    setValue(e.target.value)
    setETarget(e)
  }
  return (
    <div className='sku-name-input text-center'>
      <Popconfirm
        className='sku-name-input-pop'
        icon={null}
        onConfirm={() => {
          onBlur(eTarget)
          setValueText(value)
        }}
        okText='Confirm'
        title={
          <div style={{ marginLeft: '-22px' }}>
            <div className='pb-2'>SKU Name</div>
            <TextArea
              placeholder='Please Input'
              autoSize={{ minRows: 3 }}
              className='w-64'
              value={value}
              allowClear
              onChange={changeSkuName}
            />
          </div>
        }
        trigger='click'
        placement='bottomLeft'
      >
        <div className='w-24 px-3 truncate cursor-pointer'>
          {valueText ? (
            valueText
          ) : (
            <span className='icon iconfont icon-shop-cate-edit' style={{ color: '#51ACF5' }}></span>
          )}
        </div>
      </Popconfirm>
    </div>
  )
}
export default SkuNameInput
