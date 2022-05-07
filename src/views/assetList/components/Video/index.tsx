import { Button, Pagination, Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { Asset } from '@/framework/types/wechat'
import { getMedias, syncMedias, updateMedia } from '@/framework/api/wechatSetting'
import { ContentContainer } from '@/components/ui'
import { PageParamsProps } from '@/framework/types/common'
import { handlePageParams } from '@/utils/utils'
import { useNavigate } from 'react-router'

const Picture = () => {
  const column = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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
            onClick={() => deleteMedia(record)}
          />
        </Tooltip>
      ),
    },
  ]
  const navigator = useNavigate()
  const [pictureList, setPictureList] = useState<Asset[]>([])
  const [pageParams, setPageParams] = useState<PageParamsProps>({
    currentPage: 1,
    pageSize: 10,
  })
  const [total, setTotal] = useState(0)
  const { currentPage, pageSize } = pageParams

  const changePage = async (page: any, pageSize: any) => {
    await setPageParams({ currentPage: page, pageSize: pageSize })
    await getMediaList()
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

  const getMediaList = async () => {
    const queryParams = Object.assign(
      {
        accountId: '000001',
        sample: { type: 'voice' },
      },
      handlePageParams(pageParams),
    )
    const res = await getMedias(queryParams)
    setTotal(res.total)
    setPictureList(res.records)
  }

  const syncMediaList = async () => {
    await syncMedias('image')
  }

  return (
    <ContentContainer>
      <div className="flex flex-row justify-between mb-4">
        <Button className="flex items-center" onClick={() => syncMediaList()}>
          <span className="iconfont icon-bianzu2 mr-2 text-xl" />
          Synchronous WeChat Assets
        </Button>
        <Button
          danger
          className="ml-4 flex items-center"
          onClick={() => {
            navigator('/add-video')
          }}
        >
          + Add
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
