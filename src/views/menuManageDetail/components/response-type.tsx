import React, { useState } from 'react'
import { Asset } from '@/framework/types/wechat'
import AssetsModal from '@/components/wechat/AssetsModal'
import UploadAndSync from './upload'
import { Image } from 'antd'
import { WxMenuContext, setWxMenu, getActiveWxMenu } from '../context'
import _ from 'lodash'

const ResponseType = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const { wxMenus, setWxMenus } = React.useContext(WxMenuContext)

  const activeMenu = getActiveWxMenu(wxMenus || [])

  const handleConfirm = (asset: Partial<Asset>) => {
    const newWxMenus = setWxMenu(wxMenus || [], activeMenu?.key || '', {
      media_id: asset.assetId,
      [`rc_preview_${activeMenu?.rc_preview_type}_media_id`]: asset.assetId,
      [`rc_preview_${activeMenu?.rc_preview_type}_url`]: asset.picture,
    })
    setWxMenus && setWxMenus(_.cloneDeep(newWxMenus))
    setVisible(false)
  }

  const handleChangeResponseType = (type: 'image' | 'voice' | 'video' | 'news') => {
    console.log(type)
    const newWxMenus = setWxMenu(wxMenus || [], activeMenu?.key || '', {
      rc_preview_type: type,
      media_id: type === "news" ? activeMenu?.rc_preview_news_media_id : type === "image" ? activeMenu?.rc_preview_image_media_id : type === "video" ? activeMenu?.rc_preview_video_media_id : activeMenu?.rc_preview_voice_media_id,
    })
    setWxMenus && setWxMenus(_.cloneDeep(newWxMenus))
  }

  return (
    <div className='response-type-container bg-white border border-gray-200'>
      <div className='p-2 bg-gray-300 text-gray-400 flex space-x-8'>
        <div
          className={`response-type-item cursor-pointer ${activeMenu?.rc_preview_type === 'news' ? 'active' : ''}`}
          onClick={() => handleChangeResponseType('news')}>
          <i className='iconfont icon-Frame-3 mr-1'></i>
          <span>Graphic message</span>
        </div>
        <div className={`response-type-item cursor-pointer ${activeMenu?.rc_preview_type === 'image' ? 'active' : ''}`}
             onClick={() => handleChangeResponseType('image')}>
          <i className='iconfont icon-Frame-5 mr-1'></i>
          <span>Picture</span>
        </div>
        <div className={`response-type-item cursor-pointer ${activeMenu?.rc_preview_type === 'voice' ? 'active' : ''}`}
             onClick={() => handleChangeResponseType('voice')}>
          <i className='iconfont icon-Frame-2 mr-1'></i>
          <span>Voice</span>
        </div>
        <div className={`response-type-item cursor-pointer ${activeMenu?.rc_preview_type === 'video' ? 'active' : ''}`}
             onClick={() => handleChangeResponseType('video')}>
          <i className='iconfont icon-Frame-11 mr-1'></i>
          <span>Video</span>
        </div>
      </div>
      <div className='p-8 text-center'>
        <div className='flex justify-center items-start'>
          <div className='mx-md text-gray-400' onClick={() => setVisible(true)}>
            <span className='iconfont icon-Frame3 mb-0.5' style={{ fontSize: 30 }}></span>
            <div>Select from assets</div>
          </div>
          <div className='mx-md text-gray-400'>
            {
              activeMenu?.rc_preview_type !== 'news' &&
              <UploadAndSync assetType={activeMenu?.rc_preview_type ?? 'image'} onChange={handleConfirm} />
            }
          </div>
        </div>
        <div className='mt-4'>
          {activeMenu?.rc_preview_type === "news" && activeMenu?.rc_preview_news_media_id ? <div className='uploaded-asset'>Asset ID: {activeMenu?.rc_preview_news_media_id}</div> : null}
          {activeMenu?.rc_preview_type === "image" && activeMenu?.rc_preview_image_media_id ? <div className='uploaded-asset'>Asset ID: {activeMenu?.rc_preview_image_media_id}</div> : null}
          {activeMenu?.rc_preview_type === "voice" && activeMenu?.rc_preview_voice_media_id ? <div className='uploaded-asset'>Asset ID: {activeMenu?.rc_preview_voice_media_id}</div> : null}
          {activeMenu?.rc_preview_type === "video" && activeMenu?.rc_preview_video_media_id ? <div className='uploaded-asset'>Asset ID: {activeMenu?.rc_preview_video_media_id}</div> : null}
          {activeMenu?.rc_preview_type === "image" ? <div className='inline-block'><Image width={80} src={activeMenu?.rc_preview_image_url} /></div>: null}
          {activeMenu?.rc_preview_type === 'voice' ? <div className='inline-block'>
            <div className='uploaded-asset'>
              <a href={activeMenu?.rc_preview_voice_url} target='_blank'>{activeMenu.rc_preview_voice_url}</a>
            </div>
          </div> : null}
          {activeMenu?.rc_preview_type === 'video' ? <div className='inline-block'>
            <div className='uploaded-asset'>
              <a href={activeMenu?.rc_preview_video_url} target='_blank'>{activeMenu.rc_preview_video_url}</a>
            </div>
          </div> : null}
        </div>
      </div>
      {visible ? <AssetsModal assetType={activeMenu?.rc_preview_type ?? 'image'} visible={visible} onlySync={true}
                              onConfirm={handleConfirm} onCancel={() => setVisible(false)} /> : null}
    </div>
  )
}

export default ResponseType
