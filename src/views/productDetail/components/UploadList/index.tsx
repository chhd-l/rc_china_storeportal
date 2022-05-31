import { Upload, message, Button, Modal } from 'antd'
import { EyeOutlined, LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { FC, useEffect, useState } from 'react'
import { UploadProps } from 'antd'
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'
import { UPLOAD_API_URL } from '@/framework/api/fetcher'
import classNames from 'classnames'
import './index.less'
export enum UploadType {
  button = 'BUTTON',
  img = 'IMG',
}
interface HandleProps {}
interface UploadWrapProps {
  size?: string
  className?: string
  showUploadList?: boolean
  handleImgUrl?: Function
  idx?: number
  hideName?: boolean
  fileName?: string
  type?: string
  fileList?: any[]
}
function getBase64 (img: any, callback: Function) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const UploadWrap = (props: UploadWrapProps) => {
  const [loading, setLoading] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [fileList, setFileList] = useState<any>([])
  const [imageInfo, setImageInfo] = useState<any>({})
  const [fileName, setFileName] = useState('')
  const uploadProps = {
    name: 'file',
    action: UPLOAD_API_URL,
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

  const Hanldes: FC<HandleProps> = ({ children }) => {
    return (
      <div className='relative img-wrap h-full  justify-center flex items-center'>
        {children}
        <div className='absolute bottom-0 right-0 left-0  option-icon flex  justify-center items-center'>
          <EyeOutlined
            onClick={e => {
              console.info(imageInfo)
              handlePreview(imageInfo.url)
              e.stopPropagation()
            }}
            className='text-white'
          />
          <span
            className='icon ml-2 iconfont icon-delete text-base text-white'
            onClick={e => {
              let deletInfo = {
                url: '',
                idx: props.idx,
                type: props.type,
                id: imageInfo.id,
              }
              setImageInfo(deletInfo)
              props.handleImgUrl?.(deletInfo)
              setLoading(false)
              e.stopPropagation()
              console.info('...')
            }}
          ></span>
        </div>
      </div>
    )
  }
  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || props.type === 'video'
    if (!isJpgOrPng && props.type === 'image') {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = (file.size / 1024 / 1024 < 2 && props.type === 'image') || props.type === 'video'
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }
  const uploadButton = (
    <div>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <div
          style={{ borderColor: '#51ACF5' }}
          className='rounded-full border border-solid p-1  border-primary w-full h-full justify-center flex items-center'
        >
          <PlusOutlined style={{ color: '#51ACF5' }} color='#51ACF5' />
        </div>
      )}
      {/* <div style={{ marginTop: 8 }}></div> */}
    </div>
  )
  const handleCancel = () => {
    setPreviewVisible(false)
  }
  const handleChange = async (info: UploadChangeParam<UploadFile<any>>) => {
    let list = fileList.length ? fileList : []
    // debugger
    if (info.file.status === 'uploading') {
      setLoading(true)
    } else if (info.file.status === 'done') {
      console.log('success', info.file.response)
      list = []
      let imgInfo = { url: info.file.response?.url, idx: props.idx, type: props.type, id: imageInfo.id }
      console.info(imgInfo)
      console.info(imageInfo)
      props.handleImgUrl?.(imgInfo)
      setImageInfo(imgInfo)
    }
    setFileList(list)
  }
  const handlePreview = (file: any) => {
    // if (!file.url && !file.preview) {
    //   file.preview = await getBase64(file.originFileObj);
    // }
    setPreviewVisible(true)
  }
  useEffect(() => {
    let list = props.fileList?.[0]
      ? props.fileList.map(img => {
          return {
            type: img.type,
            uid: img.id || img.url,
            name: props.fileName,
            url: img.url,
            thumbUrl: img.url,
            id: img.id,
          }
        })
      : []
    if (props.fileName) {
      setFileName(props.fileName)
    }
    if (list) {
      setFileList(list)
    }

    if (list?.[0]) {
      setImageInfo(list[0])
    }
  }, [props.fileList])
  return (
    <div className={classNames(props.className, props.size, 'upload-list-wrap')}>
      <Modal
        visible={previewVisible}
        // title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        {imageInfo.type === 'image' ? (
          <img alt='example' style={{ width: '100%' }} src={imageInfo.url} />
        ) : (
          <video controls>
            <source src={imageInfo.url} type='video/mp4' />
          </video>
        )}
      </Modal>
      <div>
        <Upload
          listType='picture-card'
          showUploadList={false}
          action={UPLOAD_API_URL}
          beforeUpload={beforeUpload}
          headers={{
            authorization: 'authorization-text',
          }}
          accept={props.type === 'video' ? 'video/*' : 'image/*'}
          onPreview={handlePreview}
          onChange={handleChange}
          className='upload-wrap-self'
        >
          {imageInfo?.url ? (
            <>
              {imageInfo.type === 'image' ? (
                <Hanldes>
                  <img src={imageInfo.url} alt='avatar' style={{ width: '100%' }} />
                </Hanldes>
              ) : null}
              {imageInfo.type === 'video' ? (
                <Hanldes>
                  <video>
                    <source src={imageInfo.url} type='video/mp4' />
                  </video>
                </Hanldes>
              ) : null}
            </>
          ) : (
            uploadButton
          )}
        </Upload>
        {fileName ? (
          <div className='mb-4 -mt-1 text-center' style={{ width: 95, color: 'rgb(196, 196, 196)' }}>
            {fileName}
          </div>
        ) : null}
      </div>
    </div>
  )
}
export default UploadWrap
