import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
// import type { UploadProps } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
interface UploadWrapProps{
  showUploadList?:boolean
  handleImgUrl:Function
}
function getBase64(img:any, callback:Function) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file:any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
const UploadWrap =  (props:UploadWrapProps) => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleChange = (info:UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl:any) => {
        setImageUrl(imageUrl)
        setLoading(false)
        props.handleImgUrl(imageUrl)
      }
      );
    }
  };
  return <Upload
    name="avatar"
    listType="picture-card"
    className="avatar-uploader"
    showUploadList={props.showUploadList}
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    beforeUpload={beforeUpload}
    onChange={handleChange}
  >
    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
  </Upload>
}
export default UploadWrap