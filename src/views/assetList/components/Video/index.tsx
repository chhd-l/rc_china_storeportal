import { Button, DatePicker, Input, Pagination, Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { Asset } from '@/framework/types/wechat'
import { getMedias, syncMedias, updateMedia } from '@/framework/api/wechatSetting'
import { ContentContainer } from '@/components/ui'
import { PageParamsProps } from '@/framework/types/common'
import { handlePageParams } from '@/utils/utils'
import { useNavigate } from 'react-router'
import { initPageParams } from '@/lib/constants'

const Video = () => {
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
          <Tooltip title="Delete">
            <span
              className="cursor-pointer ml-2 iconfont icon-a-Frame2 primary-color text-xl"
              onClick={() => window.open(record.assetLink)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <span
              className="cursor-pointer ml-2 iconfont icon-delete primary-color text-xl"
              onClick={() => deleteMedia(record)}
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

  const deleteMedia = async (record: any) => {
    const res = await updateMedia({
      id: record.id,
      isDeleted: true,
    })
    if (res) {
      await getMediaList({})
    }
  }

  useEffect(() => {
    getMediaList({})
  }, [])

  const getMediaList = async ({ curPageParams = pageParams, curSearchParams = searchParams }) => {
    const { description, startTime, endTime } = curSearchParams
    const queryParams = Object.assign(
      {
        sample: Object.assign(
          { type: 'video' },
          description !== '' ? { description } : {},
          startTime !== '' ? { startTime, endTime } : {},
        ),
      },
      handlePageParams(curPageParams),
    )
    const res = await getMedias(queryParams)
    setTotal(res.total)
    setPictureList(res.records)
  }

  const syncMediaList = async () => {
    await syncMedias('video')
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
            <div className="mr-2 ml-4">Login Time:</div>
            <DatePicker.RangePicker
              style={{ width: '300px' }}
              value={pickValue}
              onChange={(date, dateString) => {
                console.log(date, dateString)
                setSearchParams({ ...searchParams, startTime: dateString[0], endTime: dateString[1] })
              }}
            />
          </div>
        </div>
        <div className="my-4 flex">
          <Button className="w-20 mr-8" type="primary" danger onClick={() => getMediaList({})}>
            Search
          </Button>
          <Button
            className="w-20"
            danger
            onClick={(e) => {
              setPickValue(null)
              setSearchParams(initSearchParams)
              getMediaList({ curSearchParams: initSearchParams })
            }}
          >
            Reset
          </Button>
        </div>
      </div>
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
export default Video
