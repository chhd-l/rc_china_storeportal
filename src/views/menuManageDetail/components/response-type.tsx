import React, { useState } from 'react';
import { Asset } from '@/framework/types/wechat'
import AssetsModal from '@/components/common/AssetsModal'
import { WxMenuContext, setWxMenu, getActiveWxMenu } from '../context'
import _ from 'lodash'

const ResponseType = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [assetType, setAssetType] = useState<'image' | 'voice' | 'video'>('image')
  const { wxMenus, setWxMenus } = React.useContext(WxMenuContext)

  const activeMenu = getActiveWxMenu(wxMenus || [])
  
  const handleConfirm = (asset: Asset) => {
    const newWxMenus = setWxMenu(wxMenus || [], activeMenu?.key || '', {
      media_id: asset.assetId
    })
    setWxMenus && setWxMenus(_.cloneDeep(newWxMenus))
    setVisible(false)
  }

  return (
    <div className="response-type-container bg-white border border-gray-200">
      <div className="p-2 bg-gray-300 text-gray-400 flex space-x-8">
        <div className={`response-type-item cursor-pointer ${assetType === 'image' ? 'active' : ''}`} onClick={() => setAssetType('image')}>
          <i className="iconfont icon-Frame-5 mr-1"></i>
          <span>Picture</span>
        </div>
        <div className={`response-type-item cursor-pointer ${assetType === 'voice' ? 'active' : ''}`} onClick={() => setAssetType('voice')}>
          <i className="iconfont icon-Frame-2 mr-1"></i>
          <span>Voice</span>
        </div>
        <div className={`response-type-item cursor-pointer ${assetType === 'video' ? 'active' : ''}`} onClick={() => setAssetType('video')}>
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
      </div>
      {visible ? <AssetsModal assetType={assetType} visible={visible} onlySync={true} onConfirm={handleConfirm} onCancel={() => setVisible(false)} /> : null}
    </div>
  )
}

export default ResponseType
