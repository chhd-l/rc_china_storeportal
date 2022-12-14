import React, { useState } from "react";
import { Dropdown, Menu, Upload, message } from 'antd';
import AssetsModal from "@/components/wechat/AssetsModal";
import { createMediaAndSync } from "@/framework/api/wechatSetting";
import { Asset } from "@/framework/types/wechat";
import { LoadingOutlined } from '@ant-design/icons';
import { UPLOAD_API_URL } from '@/framework/api/fetcher';
import intl from 'react-intl-universal';
import './index.less';

interface IProps {
  assetType: "image" | "voice" | "video"
  value: Partial<Asset>
  onChange: (asset: Partial<Asset>) => void
}

const MyUpload: React.FC<IProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleAssetChosen = (asset: Asset) => {
    setVisible(false);
    props.onChange(asset);
  }

  const uploadProps = {
    name: 'file',
    accept: props.assetType === "image" ? 'image/*' : props.assetType === "video" ? 'video/*' : 'audio/*',
    action: UPLOAD_API_URL,
    headers: {
      authorization: 'authorization-text',
    },
    onChange: async (info: any) => {
      const { file } = info
      const { name } = file
      console.log('upload file',file)
      setUploading(true)
      if (file.status === 'done') {
        const res = await createMediaAndSync({
          type: props.assetType,
          url: file.response.url,
          fileExtension: name.substr(name.lastIndexOf('.') + 1),
        })
        setUploading(false)
        if (res) {
          props.onChange({
            assetId: res.mediaId,
            assetLink: res.wxUrl,
            picture: res.url,
            video: res.url,
            voice: res.url,
            description: res.description,
          })
        }
      } else if (file.status === 'error') {
        setUploading(false)
        message.error({ className: "rc-message", content: `${name} ${intl.get('public.file_upload_failed')}` })
      }
    },
  }

  const menu = (
    <Menu>
      <Menu.Item key="0" className="rc-upload-region">
        <Upload {...uploadProps}>
          <div>Select</div>
        </Upload>
      </Menu.Item>
      <Menu.Item key="1"><div onClick={() => setVisible(true)}>{props.assetType === "image" ? intl.get('wx.picture_assets') : props.assetType === "voice" ? intl.get('wx.voice_assets') : intl.get('wx.video_assets')}</div></Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={["click"]}>
        <div className="upload-container flex justify-center items-center">
          {props.value.picture
            ? <div className="image"><img src={props.value.picture} /></div>
            : uploading
            ? <LoadingOutlined style={{ fontSize: 24, color: "#51acf5" }} spin />
            : <span className="iconfont icon-jiahao"></span>}
        </div>
      </Dropdown>
      {visible ? <AssetsModal
        assetType={props.assetType}
        visible={visible}
        onlySync={true}
        onCancel={() => setVisible(false)}
        onConfirm={handleAssetChosen}
      /> : null}
    </>
  );
}

export default MyUpload
