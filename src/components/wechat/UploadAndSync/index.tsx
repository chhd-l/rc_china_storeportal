import React from "react";
import { Asset } from "@/framework/types/wechat";
import { createMediaAndSync } from "@/framework/api/wechatSetting";
import { Upload, Spin, message } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

interface IProps {
  assetType: "image" | "voice" | "video"
  onChange: (asset: Partial<Asset>) => void
  children: React.ReactElement
}

const MyUpload: React.FC<IProps> = (props) => {
  const [uploading, setUploading] = React.useState<boolean>(false);

  const uploadProps = {
    name: 'file',
    accept: 'image/*',
    action: 'https://dtc-faas-dtc-plaform-dev-woyuxzgfcv.cn-shanghai.fcapp.run/upload',
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
          operator: "system",
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
        message.error(`${name} file upload failed.`)
      }
    },
  }

  return (
    <Upload {...uploadProps}>
      {uploading ? <LoadingOutlined style={{ fontSize: 24 }} spin /> : props.children}
    </Upload>
  )
}

export default MyUpload
