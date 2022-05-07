import { Modal, Tabs } from 'antd'
import React, { useState } from 'react'
import { tabList } from './modules/constants'
import { Picture, Graphic, Video, Voice } from './components'
import { ContentContainer, SearchContainer } from '@/components/ui'
import './index.less'
import { updateMedia } from '@/framework/api/wechatSetting'

const PetOwnerList = () => {
  const [activeKey, setActiveKey] = useState('picture')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [curAssetId, setCurAssetId] = useState('')
  const [isReload, setIsReload] = useState(false)

  const confirmDelete = async () => {
    const res = await updateMedia({
      id: curAssetId,
      isDeleted: true,
    })
    if (res) {
      setIsModalVisible(false)
      setIsReload(true)
    }
  }

  const openDeleteModal = (id: string) => {
    setIsReload(false)
    setCurAssetId(id)
    setIsModalVisible(true)
  }

  return (
    <ContentContainer className="assetslist">
      <SearchContainer className="asset-tab-top">
        <Tabs
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key)
          }}
        >
          {tabList.map((item, index) => (
            <Tabs.TabPane tab={item.label} key={index} />
          ))}
        </Tabs>
        {activeKey === 'picture' ? <Picture isReload={isReload} openDelete={openDeleteModal} /> : null}
        {activeKey === 'graphic' ? <Graphic /> : null}
        {activeKey === 'voice' ? <Voice /> : null}
        {activeKey === 'video' ? <Video /> : null}
      </SearchContainer>
      <Modal
        title="Delete Item"
        visible={isModalVisible}
        onOk={confirmDelete}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Are you sure you want to delete the item?</p>
      </Modal>
    </ContentContainer>
  )
}
export default PetOwnerList
