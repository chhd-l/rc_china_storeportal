import { Button, message, Pagination, Table, Tooltip, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { Asset } from '@/framework/types/wechat'
import { createMedia, getMedias } from '@/framework/api/wechatSetting'
import { ContentContainer } from '@/components/ui'
import { PageParamsProps } from '@/framework/types/common'
import { handlePageParams } from '@/utils/utils'
import { initPageParams } from '@/lib/constants'

const Voice = ({
  isReload = false,
  openDelete,
  openSyncTipModal,
}: {
  isReload: boolean
  openDelete: Function
  openSyncTipModal: Function
}) => {
  const column = [
    {
      title: 'Voice',
      dataIndex: 'voice',
      key: 'voice',
      render: (text: any) => (
        <audio controls style={{ height: '40px' }}>
          <source src={text} type="video/mp4" />
        </audio>
      ),
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
        <Tooltip title="Delete">
          <span
            className="cursor-pointer ml-2 iconfont icon-delete primary-color text-xl"
            onClick={() => openDelete && openDelete(record.id)}
          />
        </Tooltip>
      ),
    },
  ]
  const [pictureList, setPictureList] = useState<Asset[]>([])
  const [pageParams, setPageParams] = useState<PageParamsProps>(initPageParams)
  const [total, setTotal] = useState(0)
  const { currentPage, pageSize } = pageParams

  const changePage = async (page: any, pageSize: any) => {
    await setPageParams({ currentPage: page, pageSize: pageSize })
    await getMediaList({ currentPage: page, pageSize: pageSize })
  }

  useEffect(() => {
    if (isReload) {
      getMediaList()
    }
  }, [isReload])

  useEffect(() => {
    getMediaList()
  }, [])

  const getMediaList = async (curPageParams = pageParams) => {
    const queryParams = Object.assign(
      {
        sample: { type: 'voice' },
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
        const res = await createMedia({ type: 'voice', url: info.file.response.url, fileExtension: 'mp3' })
        if (res) {
          await getMediaList()
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
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
        <Button className="ml-4 flex items-center" onClick={() => openSyncTipModal && openSyncTipModal()}>
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
export default Voice
