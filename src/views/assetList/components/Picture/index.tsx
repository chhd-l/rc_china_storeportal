import { Button, message, Pagination, Table, Tooltip, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { Asset } from '@/framework/types/wechat'
import { assetListSource } from '@/views/assetList/modules/mockdata'
import Mock from 'mockjs'
import { createMedia, getMedias, updateMedia } from '@/framework/api/wechatSetting'
import { TableContainer } from '@/components/ui'
import { PageParamsProps } from '@/framework/types/common'

const Picture = () => {
  const column = [
    {
      title: 'Picture',
      dataIndex: 'picture',
      key: 'picture',
    },
    {
      title: 'Wechat Assets Link',
      dataIndex: 'assetLink',
      key: 'assetLink',
    },
    {
      title: 'Create Time',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text: any, record: any) => `${record.status === 'synchronized' ? record.syncTime : text}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: any) => (
        <div className="flex flex-row items-center">
          <Tooltip title="View QR Code">
            <span className="cursor-pointer ml-2 iconfont icon-bianzu3 primary-color" onClick={() => {}} />
          </Tooltip>
          <Tooltip title="Delete">
            <span className="cursor-pointer ml-2 iconfont icon-delete primary-color text-xl" onClick={() => deleteMedia(record)} />
          </Tooltip>
        </div>
      ),
    },
  ]
  const [pictureList, setPictureList] = useState<Asset[]>([])
  const [pageParams, setPageParams] = useState<PageParamsProps>({
    currentPage: 1,
    pageSize: 10,
  })
  const [total, setTotal] = useState(0)
  const { currentPage, pageSize } = pageParams

  const changePage = (page: any, pageSize: any) => {
    setPageParams({ currentPage: page, pageSize: pageSize })
  }

  const deleteMedia=async(record:any)=>{
    await updateMedia({
      id:record.id,
      isDeleted:true
    })
    await getMediaList()
  }

  useEffect(() => {
    getMediaList()
  }, [])

  const getMediaList = async () => {
    const res=await getMedias({})
    setTotal(res.total)
    setPictureList(res.records)
  }

  const uploadProps = {
    name: 'file',
    action: 'https://dtc-faas-dtc-plaform-dev-woyuxzgfcv.cn-shanghai.fcapp.run/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange:async (info: any) =>{
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        console.log('success', info.file.response)
        message.success(`${info.file.name} file uploaded successfully`)
        await createMedia({type:'image',url:info.file.response.url,fileExtension:'png'})
        await getMediaList()
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }
  return (
    <div className="asset-tab-top">
      <div className="flex flex-row mb-4">
        <Upload {...uploadProps}>
          <Button className="flex items-center">
            <span className="iconfont icon-a-bianzu67beifen3 mr-2 text-xl" />
            Upload Local File
          </Button>
        </Upload>
        <Button className="ml-4 flex items-center" onClick={() => {}}>
          <span className="iconfont icon-bianzu2 mr-2 text-xl" />
          Synchronous WeChat Assets
        </Button>
      </div>
      <Table columns={column} dataSource={pictureList} pagination={false} rowKey="skuId" className="rc-table" />
      <div className="flex flex-row justify-end mt-4">
        <Pagination
          className="rc-pagination"
          current={currentPage}
          total={total}
          pageSize={pageSize}
          onChange={changePage}
          showSizeChanger={true}
        />
      </div>
    </div>
  )
}
export default Picture
