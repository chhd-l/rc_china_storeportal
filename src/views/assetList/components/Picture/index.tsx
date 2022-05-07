import { Button, message, Pagination, Table, Tooltip, Upload, Image } from 'antd'
import React, { useEffect, useState } from 'react'
import { Asset } from '@/framework/types/wechat'
import { createMedia, getMedias, syncMedias, updateMedia } from '@/framework/api/wechatSetting'
import { ContentContainer } from '@/components/ui'
import { PageParamsProps } from '@/framework/types/common'
import { handlePageParams } from '@/utils/utils'
import './index.less'
import { initPageParams } from '@/lib/constants'

const Picture = ({ isReload = false, openDelete }: { isReload: boolean; openDelete: Function }) => {
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
          <Tooltip title="View Image">
            <span
              className="cursor-pointer ml-2 iconfont icon-bianzu3 primary-color"
              onClick={() => {
                setPreviewImg(record.assetLink)
                setVisible(true)
              }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <span
              className="cursor-pointer ml-2 iconfont icon-delete primary-color text-xl"
              onClick={() => openDelete && openDelete(record.id)}
            />
          </Tooltip>
        </div>
      ),
    },
  ]
  const [pictureList, setPictureList] = useState<Asset[]>([])
  const [pageParams, setPageParams] = useState<PageParamsProps>(initPageParams)
  const [total, setTotal] = useState(0)
  const { currentPage, pageSize } = pageParams
  const [previewImg, setPreviewImg] = useState('')

  const changePage = async (page: any, pageSize: any) => {
    setPageParams({ currentPage: page, pageSize: pageSize })
    await getMediaList({ currentPage: page, pageSize: pageSize })
  }

  const deleteMedia = async (record: any) => {
    const res = await updateMedia({
      id: record.id,
      isDeleted: true,
    })
    if (res) {
      await getMediaList()
    }
  }

  useEffect(() => {
    getMediaList()
  }, [])

  useEffect(() => {
    if (isReload) {
      getMediaList()
    }
  }, [isReload])

  const getMediaList = async (curPageParams = pageParams) => {
    const queryParams = Object.assign(
      {
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
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
        const res = await createMedia({ type: 'image', url: info.file.response.url, fileExtension: 'png' })
        if (res) {
          await getMediaList()
        }
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
      <Table columns={column} dataSource={pictureList} pagination={false} rowKey="id" className="rc-table w-full" />
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
      <Image
        className="rc-image-preview-img"
        style={{ display: 'none' }}
        src={previewImg}
        preview={{
          visible,
          src: previewImg,
          onVisibleChange: (value) => {
            setVisible(value)
          },
        }}
      />
    </ContentContainer>
  )
}
export default Picture
