import { message, Modal, Tabs } from 'antd'
import React, { useState } from 'react'
import { tabList } from './modules/constants'
import { Picture, Graphic, Video, Voice } from './components'
import { ContentContainer, SearchContainer } from '@/components/ui'
import './index.less'
import { syncMedias, updateMedia } from '@/framework/api/wechatSetting'
import { useAtom } from 'jotai'
import { userAtom } from '@/store/user.store'

const PetOwnerList = () => {
  const [activeKey, setActiveKey] = useState('image')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isSyncTipModalVisible, setIsSyncModalVisible] = useState(false)
  const [curAssetId, setCurAssetId] = useState('')
  const [isReload, setIsReload] = useState(false)
  const [userInfo] = useAtom(userAtom)

  const confirmDelete = async () => {
    const res = await updateMedia({
      id: curAssetId,
      isDeleted: true,
    })
    if (res) {
      message.success({ className: 'rc-message', content: 'Operation success' })
      setIsModalVisible(false)
      setIsReload(true)
    }else{
      message.error({ className: 'rc-message', content: 'Operation failed' })
    }
  }

  const openDeleteModal = (id: string) => {
    setIsReload(false)
    setCurAssetId(id)
    setIsModalVisible(true)
  }

  const syncMediaList = async () => {
    const res=await syncMedias(activeKey)
    if(res){
      message.success({ className: 'rc-message', content: 'Operation success' })
      setIsSyncModalVisible(false)
      setIsReload(true)
    }else{
      message.error({ className: 'rc-message', content: 'Operation failed' })
    }
  }

  return (
    <ContentContainer className="assetslist">
      <SearchContainer className="asset-tab-top">
        <Tabs
          tabBarGutter={19}
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key)
          }}
        >
          {tabList.map((item) => (
            <Tabs.TabPane tab={item.label} key={item.key} />
          ))}
        </Tabs>
        {activeKey === 'image' ? (
          <Picture
            isReload={isReload}
            openDelete={openDeleteModal}
            openSyncTipModal={() => setIsSyncModalVisible(true)}
            userName={userInfo?.username||''}
          />
        ) : null}
        {/*{activeKey === 'graphic' ? <Graphic /> : null}*/}
        {activeKey === 'voice' ? (
          <Voice
            isReload={isReload}
            openDelete={openDeleteModal}
            openSyncTipModal={() => setIsSyncModalVisible(true)}
            userName={userInfo?.username||''}
          />
        ) : null}
        {activeKey === 'video' ? (
          <Video
            isReload={isReload}
            openDelete={openDeleteModal}
            openSyncTipModal={() => setIsSyncModalVisible(true)}
          />
        ) : null}
      </SearchContainer>
      <Modal
        key="assetDelete"
        className="rc-modal"
        title="Delete Item"
        okText="Confirm"
        visible={isModalVisible}
        onOk={confirmDelete}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Are you sure you want to delete the item?</p>
      </Modal>
      <Modal
        key="syncTip"
        className="rc-modal"
        title="Confirm Synchronize?"
        okText="Confirm"
        visible={isSyncTipModalVisible}
        onOk={syncMediaList}
        onCancel={() => setIsSyncModalVisible(false)}
      >
        <p>Are you sure you want to synchronize?</p>
      </Modal>
    </ContentContainer>
  )
}
export default PetOwnerList
