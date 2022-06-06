import { Button, DatePicker, Input, Pagination, Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { Asset } from '@/framework/types/wechat'
import { getMedias } from '@/framework/api/wechatSetting'
import { ContentContainer } from '@/components/ui'
import { PageParamsProps } from '@/framework/types/common'
import { handlePageParams } from '@/utils/utils'
import { useNavigate } from 'react-router'
import { initPageParams } from '@/lib/constants'

const Video = ({
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
      title: 'Title',
      dataIndex: 'assetTitle',
      key: 'assetTitle',
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
        <>
          <Tooltip title="View Video">
            <span
              className="cursor-pointer ml-2 iconfont icon-a-Frame2 primary-color text-xl"
              onClick={() => record.video && window.open(record.video)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <span
              className="cursor-pointer ml-2 iconfont icon-delete primary-color text-xl"
              onClick={() => openDelete && openDelete(record.id, record.mediaId)}
            />
          </Tooltip>
        </>
      ),
    },
  ]
  const navigator = useNavigate()
  const [pictureList, setPictureList] = useState<Asset[]>([])
  const [pageParams, setPageParams] = useState<PageParamsProps>(initPageParams)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const { currentPage, pageSize } = pageParams
  const initSearchParams = {
    description: '',
    startTime: '',
    endTime: '',
  }
  const [searchParams, setSearchParams] = useState(initSearchParams)
  const [pickValue, setPickValue] = useState<any>(undefined)

  const changePage = async (page: any, pageSize: any) => {
    await setPageParams({ currentPage: page, pageSize: pageSize })
    await getMediaList({ curPageParams: { currentPage: page, pageSize: pageSize } })
  }

  useEffect(() => {
    if (isReload) {
      getMediaList({})
    }
  }, [isReload])

  useEffect(() => {
    getMediaList({})
  }, [])

  const getMediaList = async ({ curPageParams = initPageParams, curSearchParams = searchParams }) => {
    const { description, startTime, endTime } = curSearchParams
    const queryParams = Object.assign(
      {
        sample: Object.assign(
          { type: 'video' },
          description !== '' ? { description } : {},
          startTime !== ''
            ? { startTime: new Date(startTime).toISOString(), endTime: new Date(endTime).toISOString() }
            : {},
        ),
      },
      handlePageParams(curPageParams),
    )
    setLoading(true)
    const res = await getMedias(queryParams)
    setTotal(res.total)
    setPictureList(res.records)
    setLoading(false)
  }

  return (
    <ContentContainer>
      <div className="mb-8">
        <div className="flex flex-row">
          <div className="flex flex-row items-center">
            <div className="w-auto mr-2 text-left">Description</div>
            <Input
              style={{ width: '200px' }}
              placeholder="Input"
              value={searchParams.description}
              onChange={(e) => {
                setSearchParams({ ...searchParams, description: e.target.value })
              }}
            />
          </div>
          <div className="flex flex-row items-center">
            <div className="mr-2 ml-4">Create Time</div>
            <DatePicker.RangePicker
              style={{ width: '300px' }}
              value={pickValue}
              onChange={(date, dateString) => {
                console.log(date, dateString)
                setPickValue(date)
                setSearchParams({ ...searchParams, startTime: dateString[0], endTime: dateString[1] })
              }}
            />
          </div>
        </div>
        <div className="my-4 flex">
          <Button className="w-20 mr-8" type="primary" danger onClick={() => {
            setPageParams(initPageParams);
            getMediaList({});
          }}>
            Search
          </Button>
          <Button
            className="w-20"
            // danger
            onClick={(e) => {
              setPickValue(['', ''])
              setSearchParams(initSearchParams)
              setPageParams(initPageParams)
              getMediaList({ curSearchParams: initSearchParams })
            }}
          >
            Reset
          </Button>
        </div>
      </div>
      <div className="flex flex-row justify-between mb-4">
        <Button className="flex items-center" onClick={() => openSyncTipModal && openSyncTipModal()}>
          <span className="iconfont icon-bianzu2 mr-2 text-xl" />
          Synchronize WeChat Assets
        </Button>
        <Button
          type="primary"
          className="ml-4 flex items-center"
          onClick={() => {
            navigator('/assets/add-video')
          }}
        >
          + Add
        </Button>
      </div>
      <Table
        columns={column}
        loading={loading}
        dataSource={pictureList}
        pagination={false}
        rowKey="skuId"
        className="rc-table w-full"
      />
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
export default Video
