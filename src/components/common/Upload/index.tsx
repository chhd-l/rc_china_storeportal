import { Upload, message, Button, Modal } from 'antd'
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { UploadProps } from 'antd'
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'
export enum UploadType {
  button = 'BUTTON',
  img = 'IMG',
}
interface UploadWrapProps {
  className?: string
  showUploadList?: boolean
  handleImgUrl: Function
  type?: UploadType
  hideName?: boolean
  fileList?: any[]
}
function getBase64 (img: any, callback: Function) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload (file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}
const UploadWrap = (props: UploadWrapProps) => {
  const [loading, setLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewVisible, setPreviewVisible] = useState(false)
  const [fileList, setFileList] = useState<any>([])
  const [imageUrl, setImageUrl] = useState('')
  const uploadProps = {
    name: 'file',
    action: 'https://dtc-faas-dtc-plaform-dev-woyuxzgfcv.cn-shanghai.fcapp.run/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange (info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }
  const { type = UploadType.img } = props
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  const handleCancel = () => {
    setPreviewVisible(false)
  }
  const handleChange = async (info: UploadChangeParam<UploadFile<any>>) => {
    let list = fileList.length ? fileList : []
    debugger
    if (info.file.status === 'uploading') {
      setLoading(true)
    } else if (info.file.status === 'done') {
      console.log('success', info.file.response)
      list = []
      props.handleImgUrl(info.file.response?.url)
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setImageUrl(imageUrl)
        setLoading(false)
      })
    }
    setFileList(list)
  }
  const handlePreview = (file: any) => {
    // if (!file.url && !file.preview) {
    //   file.preview = await getBase64(file.originFileObj);
    // }
    setPreviewImage(file.url)
    setPreviewVisible(true)
  }
  useEffect(() => {
    let list = props.fileList?.[0]
      ? props.fileList.map(img => {
          return {
            uid: img.id || img.url,
            name: props.hideName ? '' : 'xx.png',
            url: img.url,
            thumbUrl: img.url,
          }
        })
      : []
    if (list) {
      setFileList(list)
    }
  }, [props.fileList])
  return (
    <div className={props.className}>
      {type === UploadType.button ? (
        <Upload
          action='https://dtc-faas-dtc-plaform-dev-woyuxzgfcv.cn-shanghai.fcapp.run/upload'
          listType='picture'
          fileList={fileList}
          onChange={handleChange}
          onPreview={handlePreview}
          className='upload-list-inline'
        >
          {/* <Button icon={<UploadOutlined />}>Click to Upload</Button> */}
          {fileList.length ? null : <Button icon={<UploadOutlined />}>Upload</Button>}
        </Upload>
      ) : // <Upload {...uploadProps}>
      //   <Button icon={<UploadOutlined />}>Click to Upload</Button>{' '}
      // </Upload>
      null}
      <Modal
        visible={previewVisible}
        // title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
      {type === UploadType.img ? (
        <div>
          <Upload
            action='https://dtc-faas-dtc-plaform-dev-woyuxzgfcv.cn-shanghai.fcapp.run/upload'
            listType='picture-card'
            defaultFileList={fileList}
            // fileList={fileList}
            headers={{
              authorization: 'authorization-text',
            }}
            // onPreview={handlePreview}
            onChange={async info => {
              handleChange(info)
            }}
          >
            {/* {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton} */}
            {fileList.length > 0 ? null : uploadButton}
          </Upload>
          <div className='mb-4 -mt-1 text-center'>{fileList[0]?.name}</div>
        </div>
      ) : null}
    </div>
  )
}
export default UploadWrap
