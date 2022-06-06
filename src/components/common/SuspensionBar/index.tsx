import { Button } from 'antd'

const SuspensionBar = ({ className = '', backEvent }: { className?: string; backEvent: Function }) => {
  return (
    <div className={`${className} suspension-bar flex justify-end items-center fixed bottom-2`}>
      <Button
        danger
        className="mr-4"
        onClick={() => {
          backEvent && backEvent()
        }}
      >
        Back
      </Button>
    </div>
  )
}

export default SuspensionBar
