import { Button, message, Pagination, Table, Tooltip, Upload, Image } from 'antd'
import React, { useEffect, useState } from 'react'
import { Asset } from '@/framework/types/wechat'
import { createMedia, getMedias } from '@/framework/api/wechatSetting'
import { ContentContainer } from '@/components/ui'
import { PageParamsProps } from '@/framework/types/common'
import { handlePageParams } from '@/utils/utils'
import './index.less'
import { initPageParams } from '@/lib/constants'
import { UPLOAD_API_URL } from '@/framework/api/fetcher'
import intl from 'react-intl-universal'

const Picture = ({
  isReload = false,
  openDelete,
  openSyncTipModal,
  userName,
}: {
  isReload: boolean
  openDelete: Function
  openSyncTipModal: Function
  userName: string
}) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const column = [
    {
      title: intl.get('wx.picture'),
      dataIndex: 'picture',
      key: 'picture',
      render: (text: any) => <img src={text} className="order-img h-24 w-28" alt="" />,
      // width: '20%',
    },
    {
      title: intl.get('wx.wechat_assets_link'),
      dataIndex: 'assetLink',
      key: 'assetLink',
      width: '45%',
    },
    {
      title: intl.get('wx.create_time'),
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text: any, record: any) => `${record.status === 'synchronized' ? record.syncTime : text}`,
      width: '15%',
    },
    {
      title: intl.get('public.status'),
      dataIndex: 'status',
      key: 'status',
      width: '15%',
    },
    {
      title: intl.get('public.action'),
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: any) => (
        <div className="flex flex-row items-center">
          <Tooltip title={intl.get('wx.view_image')}>
            <span
              className="cursor-pointer ml-2 iconfont icon-bianzu3 primary-color"
              onClick={() => {
                setPreviewImg(record.picture)
                setVisible(true)
              }}
            />
          </Tooltip>
          <Tooltip title={intl.get('public.delete')}>
            <span
              className="cursor-pointer ml-2 iconfont icon-delete primary-color text-xl"
              onClick={() => openDelete && openDelete(record.id, record.mediaId)}
            />
          </Tooltip>
        </div>
      ),
      width: '15%',
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
    setLoading(true)
    const res = await getMedias(queryParams)
    setTotal(res.total)
    setPictureList(res.records)
    setLoading(false)
  }

  const uploadProps = {
    name: 'file',
    accept: 'image/*',
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
        message.success({ className: 'rc-message', content: `${name} ${intl.get('public.file_upload_success')}`})
        const res = await createMedia({
          type: 'image',
          url: file.response.url,
          fileExtension: name.substr(name.lastIndexOf('.') + 1),
        })
        setUploading(false)
        if (res) {
          await getMediaList()
        }
      } else if (file.status === 'error') {
        setUploading(false)
        message.error({ className: 'rc-message', content: `${name} ${intl.get('public.file_upload_failed')}`})
      }
    },
  }

  return (
    <ContentContainer className="pt-2 pb-6">
      <div className="flex flex-row mb-4">
        <Upload {...uploadProps}>
          <Button className="flex items-center" loading={uploading}>
            <span className="iconfont icon-a-bianzu67beifen3 mr-2 text-xl" />
            {intl.get('wx.select_file')}
          </Button>
        </Upload>
        <Button className="ml-4 flex items-center" onClick={() => openSyncTipModal && openSyncTipModal()}>
          <span className="iconfont icon-bianzu2 mr-2 text-xl" />
          {intl.get('wx.sync_wechat_assets')}
        </Button>
      </div>
      <Table columns={column} loading={loading} dataSource={pictureList} pagination={false} rowKey="id" className="rc-table w-full" />
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
