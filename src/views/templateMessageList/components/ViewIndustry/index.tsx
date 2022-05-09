import { Button, Modal } from 'antd'
import { FC, useState } from 'react'
import EditIndustry from '../EditIndustry'
import './index.less'
export type Props = {
  visible: boolean
  handleVisible: (visible: boolean) => void
}
const ViewIndustry: FC<Props> = ({ visible, handleVisible }) => {
  const [editVisible, setEditVisible] = useState(false)

  const closeModal = () => {
    handleVisible(false)
  }
  const edit = () => {
    handleVisible(false)
    setEditVisible(true)
  }
  const Synchronous = () => {}
  return (
    <div>
      <Modal
        title='View Industry'
        className='view-industry'
        onCancel={closeModal}
        footer={[<Button onClick={closeModal}>close</Button>]}
        visible={visible}
      >
        <Button className='flex items-center' onClick={() => Synchronous()}>
          <span className='iconfont icon-bianzu2 mr-2 text-xl' />
          Synchronous
        </Button>
        <div className='border mt-3'>
          <div className='px-4 py-2 bg-gray1 flex flex justify-between'>
            <div>Industry</div>
            <div>Action</div>
          </div>
          <div className='px-2 py-2 flex flex justify-between'>
            <div>industry</div>
            <div className='pr-4'>
              <span onClick={edit} className='primary-color icon iconfont icon-a-Group437'></span>
            </div>
          </div>
        </div>
      </Modal>
      <EditIndustry visible={editVisible} handleVisible={setEditVisible} />
    </div>
  )
}

export default ViewIndustry
