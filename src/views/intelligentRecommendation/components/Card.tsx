import { Button, Switch, Typography } from 'antd'
import { CardType } from '../modules/card'
const { Title } = Typography

const IntelligentRecommendation = ({ title, span, Enable, Edit, Details, open, bgcImg }: CardType) => {
  return (
    <div
      style={{ width: '32%', backgroundColor: '#F5F6F6', borderRadius: '4px' }}
      className="p-5 pb-2 relative mt-4 ml-4"
    >
      <div className="flex h-28">
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
      <div className="p-1 mt-1 flex">
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
          Enable
        </Button>
      )}
    </div>
  )
}

export default IntelligentRecommendation
