import React, { useState } from 'react';
import { Asset } from '@/framework/types/wechat'
import AssetsModal from '@/components/common/AssetsModal'
import { Image } from 'antd'
import { WxMenuContext, setWxMenu, getActiveWxMenu } from '../context'
import _ from 'lodash'

const ResponseType = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const { wxMenus, setWxMenus } = React.useContext(WxMenuContext)

  const activeMenu = getActiveWxMenu(wxMenus || [])
  
  const handleConfirm = (asset: Asset) => {
    const newWxMenus = setWxMenu(wxMenus || [], activeMenu?.key || '', {
      media_id: asset.assetId,
      rc_preview_url: activeMenu?.rc_preview_type === "image" ? asset.picture : activeMenu?.rc_preview_type === "voice" ? asset.voice : asset.video
    })
    setWxMenus && setWxMenus(_.cloneDeep(newWxMenus))
    setVisible(false)
  }

  const handleChangeResponseType = (type: 'image' | 'voice' | 'video') => {
    const newWxMenus = setWxMenu(wxMenus || [], activeMenu?.key || '', {
      rc_preview_type: type,
      rc_preview_url: ''
    })
    setWxMenus && setWxMenus(_.cloneDeep(newWxMenus))
  }

  return (
    <div className="response-type-container bg-white border border-gray-200">
      <div className="p-2 bg-gray-300 text-gray-400 flex space-x-8">
        <div className={`response-type-item cursor-pointer ${activeMenu?.rc_preview_type === 'image' ? 'active' : ''}`} onClick={() => handleChangeResponseType('image')}>
          <i className="iconfont icon-Frame-5 mr-1"></i>
          <span>Picture</span>
        </div>
        <div className={`response-type-item cursor-pointer ${activeMenu?.rc_preview_type === 'voice' ? 'active' : ''}`} onClick={() => handleChangeResponseType('voice')}>
          <i className="iconfont icon-Frame-2 mr-1"></i>
          <span>Voice</span>
        </div>
        <div className={`response-type-item cursor-pointer ${activeMenu?.rc_preview_type === 'video' ? 'active' : ''}`} onClick={() => handleChangeResponseType('video')}>
          <i className="iconfont icon-Frame-11 mr-1"></i>
          <span>Video</span>
        </div>
      </div>
      <div className="p-8 text-center">
        <div className="text-gray-400" style={{display:'inline-block'}} onClick={() => setVisible(true)}>
          <span className="iconfont icon-Frame3 mb-0.5" style={{fontSize: 30}}></span>
          <div>Select from assets</div>
          <div className="uploaded-asset">{activeMenu?.media_id}</div>
        </div>
        <div className="mt-4">
          {activeMenu ? <div className="inline-block">
            {activeMenu.rc_preview_type === "image"
             ? <Image width={80} src={activeMenu.rc_preview_url} />
             : activeMenu.rc_preview_type ? <div className="uploaded-asset"><a href={activeMenu.rc_preview_url} target="_blank">{activeMenu.rc_preview_url}</a></div> : null}
          </div> : null}
        </div>
      </div>
      {visible ? <AssetsModal assetType={activeMenu?.rc_preview_type ?? "image"} visible={visible} onlySync={true} onConfirm={handleConfirm} onCancel={() => setVisible(false)} /> : null}
    </div>
  )
}

export default ResponseType
