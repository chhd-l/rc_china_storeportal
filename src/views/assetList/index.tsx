import { message, Modal, Tabs } from 'antd'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { tabList } from './modules/constants'
import { Picture, Graphic, Video, Voice } from './components'
import { ContentContainer, SearchContainer } from '@/components/ui'
import './index.less'
import { syncMedias, updateMedia, syncArticles, deleteArticles } from '@/framework/api/wechatSetting'
import { useAtom } from 'jotai'
import { userAtom } from '@/store/user.store'
import intl from 'react-intl-universal'

const PetOwnerList = () => {
  const [activeKey, setActiveKey] = useState('image')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isSyncTipModalVisible, setIsSyncModalVisible] = useState(false)
  const [curAssetId, setCurAssetId] = useState('')
  const [graphicMediaId, setGraphicMediaId] = useState('')
  const [isReload, setIsReload] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userInfo] = useAtom(userAtom)

  const location = useLocation()

  useEffect(() => {
    if (location.state) {
      setActiveKey(location.state as string || 'image')
    }
  }, [])

  const confirmDelete = async () => {
    setLoading(true)
    let res = false;
    if (activeKey === 'news') {
      res = await deleteArticles(curAssetId, graphicMediaId);
    } else {
      res = await updateMedia({
        id: curAssetId,
        isDeleted: true,
      })
    }
    if (res) {
      message.success({ className: 'rc-message', content: intl.get('public.operate_success') })
      setIsModalVisible(false)
      setIsReload(true)
    }
    setLoading(false)
  }

  const openDeleteModal = (id: string, graphicMediaId: string = '') => {
    setIsReload(false)
    setCurAssetId(id)
    setGraphicMediaId(graphicMediaId)
    setIsModalVisible(true)
  }

  const syncMediaList = async () => {
    setLoading(true)
    let res = false;
    if (activeKey === "news") {
      res = await syncArticles("000001");
    } else {
      res = await syncMedias(activeKey)
    }
    if(res){
      message.success({ className: 'rc-message', content: intl.get('public.operate_success') })
      setIsSyncModalVisible(false)
      setIsReload(true)
    }
    setLoading(false)
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
        {activeKey === 'news' ? (
          <Graphic
            isReload={isReload}
            openDelete={openDeleteModal}
            openSyncTipModal={() => setIsSyncModalVisible(true)}
          />
        ) : null}
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
        title={intl.get('public.delete_item')}
        okText={intl.get('public.confirm')}
        cancelText={intl.get('public.cancel')}
        visible={isModalVisible}
        onOk={confirmDelete}
        confirmLoading={loading}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>{intl.get('public.are_you_sure_delete')}</p>
      </Modal>
      <Modal
        key="syncTip"
        className="rc-modal"
        title={intl.get('wx.confirm_sync')}
        okText={intl.get('public.confirm')}
        cancelText={intl.get('public.cancel')}
        confirmLoading={loading}
        visible={isSyncTipModalVisible}
        onOk={syncMediaList}
        onCancel={() => setIsSyncModalVisible(false)}
      >
        <p>{intl.get('wx.are_you_sure_to_sync')}</p>
      </Modal>
    </ContentContainer>
  )
}
export default PetOwnerList
