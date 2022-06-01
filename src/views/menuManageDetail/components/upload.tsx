import React from 'react';
import { Asset } from "@/framework/types/wechat";
import MyUpload from "@/components/wechat/UploadAndSync";

interface IProps {
  assetType: "image" | "voice" | "video" | "message"
  onChange: (asset: Partial<Asset>) => void
}

const UploadAndSync: React.FC<IProps> = (props) => {
  return (
    <MyUpload assetType={props.assetType} onChange={props.onChange}>
      <>
        <span className={`iconfont text-gray-400 mb-0.5 ${props.assetType==="image" ? "icon-Frame-5" : props.assetType==="voice" ? "icon-Frame-2" : "icon-Frame-11"}`} style={{fontSize: 30}}></span>
        <div className="text-gray-400">Upload</div>
      </>
    </MyUpload>
  )
}

export default UploadAndSync
