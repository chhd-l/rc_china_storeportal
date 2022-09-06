import { Button, Switch, Typography } from 'antd'
import { CardType } from '../modules/card'
import intl from 'react-intl-universal'
const { Title } = Typography

const IntelligentRecommendation = ({ title, span, Enable, Edit, Details, open, bgcImg }: CardType) => {
  return (
    <div
      style={{ width: '31.2%', backgroundColor: '#f9fafb', borderRadius: '4px' }}
      className="relative mt-4 ml-6"
    >
      <div className="p-4 flex h-28">
        <div className="mr-3">
          <div className={`CardImage ${bgcImg}`} />
        </div>
        <div>
          <Title className={`mb-1 text-sm ${Enable && 'w-44'}`}>
            {title}
            {Enable && (
              <span className="cursor-pointer ml-1 iconfont icon-kjafg text-gray-300 text-xs" onClick={() => {}} />
            )}
          </Title>
          <div style={{ fontSize: '0.75rem', lineHeight: '1.2rem' }}>{span}</div>
        </div>
      </div>
      <div className="px-6 py-2 mt-1 flex" style={{backgroundColor: '#F5F6F6'}}>
        <div className="flex-1 flex items-center">{open && <Switch defaultChecked onChange={(v) => open(v)} />}</div>
        <div className="flex-1 flex justify-end items-center">
          {Edit && (
            <span
              className="cursor-pointer ml-2 iconfont icon-a-Group437 text-red-500 text-xl"
              onClick={() => Edit()}
            />
          )}
          {Details && (
            <span
              className="cursor-pointer ml-2 iconfont icon-kjafg text-red-500 text-base"
              onClick={() => Details()}
            />
          )}
        </div>
      </div>
      {Enable && (
        <Button type="text" danger className="absolute top-2 right-2">
          {intl.get('public.enable')}
        </Button>
      )}
    </div>
  )
}

export default IntelligentRecommendation
