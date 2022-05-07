import { Button, message, Pagination, Table, Tooltip, Upload, Image } from 'antd'
import React, { useEffect, useState } from 'react'
import { Asset } from '@/framework/types/wechat'
import { createMedia, getMedias, syncMedias, updateMedia } from '@/framework/api/wechatSetting'
import { ContentContainer } from '@/components/ui'
import { PageParamsProps } from '@/framework/types/common'
import { handlePageParams } from '@/utils/utils'

const Picture = () => {
  const [visible, setVisible] = useState(false)
  const column = [
    {
      title: 'Picture',
      dataIndex: 'picture',
      key: 'picture',
      render: (text: any) => <img src={text} className="w-16 h-16 order-img" alt="" />,
    },
    {
      title: 'Wechat Assets Link',
      dataIndex: 'assetLink',
      key: 'assetLink',
      width: '40%',
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
            <span
              className="cursor-pointer ml-2 iconfont icon-bianzu3 primary-color"
              onClick={() => {
                setVisible(true)
              }}
            />
          </Tooltip>
          <Image
            key={record.id}
            style={{ display: 'none' }}
            src={`${record.assetLink}?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200`}
            preview={{
              visible,
              src: record.assetLink,
              onVisibleChange: (value) => {
                setVisible(value)
              },
            }}
          />
          <Tooltip title="Delete">
            <span
              className="cursor-pointer ml-2 iconfont icon-delete primary-color text-xl"
              onClick={() => deleteMedia(record)}
            />
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

  const changePage = async (page: any, pageSize: any) => {
    setPageParams({ currentPage: page, pageSize: pageSize })
    await getMediaList({ currentPage: page, pageSize: pageSize })
  }

  const deleteMedia = async (record: any) => {
    await updateMedia({
      id: record.id,
      isDeleted: true,
    })
    await getMediaList()
  }

  useEffect(() => {
    getMediaList()
  }, [])

  const getMediaList = async (curPageParams = pageParams) => {
    const queryParams = Object.assign(
      {
        accountId: '000001',
        sample: { type: 'image' },
      },
      handlePageParams(curPageParams),
    )
    const res = await getMedias(queryParams)
    setTotal(res.total)
    setPictureList(res.records)
  }

  const uploadProps = {
    name: 'file',
    action: 'https://dtc-faas-dtc-plaform-dev-woyuxzgfcv.cn-shanghai.fcapp.run/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange: async (info: any) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        console.log('success', info.file.response)
        message.success(`${info.file.name} file uploaded successfully`)
        await createMedia({ type: 'image', url: info.file.response.url, fileExtension: 'png' })
        await getMediaList()
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  const syncMediaList = async () => {
    await syncMedias('image')
  }

  return (
    <ContentContainer>
      <div className="flex flex-row mb-4">
        <Upload {...uploadProps}>
          <Button className="flex items-center">
            <span className="iconfont icon-a-bianzu67beifen3 mr-2 text-xl" />
            Upload Local File
          </Button>
        </Upload>
        <Button className="ml-4 flex items-center" onClick={() => syncMediaList()}>
          <span className="iconfont icon-bianzu2 mr-2 text-xl" />
          Synchronous WeChat Assets
        </Button>
      </div>
      <Table columns={column} dataSource={pictureList} pagination={false} rowKey="skuId" className="rc-table w-full" />
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
    </ContentContainer>
  )
}
export default Picture
