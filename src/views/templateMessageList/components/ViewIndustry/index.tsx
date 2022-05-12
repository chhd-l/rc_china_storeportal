import { Button, Modal } from 'antd'
import { FC, useEffect, useState } from 'react'
import EditIndustry from '../EditIndustry'
import './index.less'
import { getIndustry, syncIndustry } from '@/framework/api/wechatSetting'

export type Props = {
  visible: boolean
  handleVisible: (visible: boolean) => void
}
const ViewIndustry: FC<Props> = ({ visible, handleVisible }) => {
  const [editVisible, setEditVisible] = useState(false)
  const [industry,setIndustry]=useState<any>(null)

  const getIndustries = async () => {
    const res=await getIndustry()
    setIndustry(res)
  }

  useEffect(() => {
    getIndustries()
  }, [])

  const closeModal = () => {
    handleVisible(false)
  }
  const edit = () => {
    handleVisible(false)
    setEditVisible(true)
  }

  const Synchronous = async() => {
    const res=await syncIndustry();
    if(res){
      await getIndustries()
    }
  }

  return (
    <div>
      <Modal
        title="View Industry"
        className="view-industry"
        onCancel={closeModal}
        footer={[<Button onClick={closeModal}>Close</Button>]}
        visible={visible}
      >
        <Button className="flex items-center" onClick={() => Synchronous()}>
          <span className="iconfont icon-bianzu2 mr-2 text-xl" />
          Synchronous
        </Button>
        <div className="border mt-3">
          <div className="px-4 py-2 bg-gray1 flex flex justify-between">
            <div>Industry</div>
            <div>Action</div>
          </div>
          <div className="px-2 py-2 flex flex justify-between">
            <div>{industry?.primaryIndustry} - {industry?.secondaryIndustry}</div>
            {/*<div className="pr-4">*/}
            {/*  <span onClick={edit} className="primary-color icon iconfont icon-a-Group437"></span>*/}
            {/*</div>*/}
          </div>
        </div>
      </Modal>
      <EditIndustry visible={editVisible} handleVisible={setEditVisible} />
    </div>
  )
}

export default ViewIndustry
