import { Upload, message, Button, Modal } from 'antd'
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
// import type { UploadProps } from 'antd';
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
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
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
  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setImageUrl(imageUrl)
        setLoading(false)
        props.handleImgUrl(imageUrl)
      })
    }
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
  console.info('fileList', fileList)
  console.info('typetype', type)
  return (
    <div className={props.className}>
      {type === UploadType.button ? (
        <Upload
          action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
          listType='picture'
          fileList={fileList}
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
            action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
            listType='picture-card'
            fileList={fileList}
            // onPreview={handlePreview}
            onChange={handleChange}
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
