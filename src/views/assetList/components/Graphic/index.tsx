import { Button, Select, Input, Pagination, Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { Asset } from '@/framework/types/wechat'
import { getArticlesList } from '@/framework/api/wechatSetting'
import { ContentContainer } from '@/components/ui'
import { PageParamsProps } from '@/framework/types/common'
import { handlePageParams } from '@/utils/utils'
import { useNavigate } from 'react-router'
import { initPageParams } from '@/lib/constants'
import moment from "moment";

const Graphic = ({
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
      title: 'Main Cover',
      dataIndex: 'id',
      key: 'keyid',
      render: (_text: any, record: any) => <img src={record?.articleList?.[0]?.thumbPic ?? ""} style={{width:200,height:120,objectFit:"cover"}} />
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (_text: any, record: any) => record?.articleList?.[0]?.title ?? ""
    },
    {
      title: 'Create Time',
      dataIndex: 'createdAt',
      key: 'createTime',
      render: (_text: any) => moment(_text).format("YYYY/MM/DD HH:mm:ss"),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_text: boolean) => _text ? "Sychronized" : "Not synced"
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: any) => (
        <>
          {record.status ? <Tooltip title="View Details">
            <a
              className="cursor-pointer ml-2 iconfont icon-kjafg primary-color text-xl"
              href={record?.articleList?.[0]?.downURL}
              target="_blank"
            />
          </Tooltip> : null}
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
  const [articlesList, setArticlesList] = useState<any[]>([])
  const [pageParams, setPageParams] = useState<PageParamsProps>(initPageParams)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const { currentPage, pageSize } = pageParams
  const initSearchParams = {
    title: undefined,
    status: undefined,
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

  const getMediaList = async ({ curPageParams = pageParams, curSearchParams = searchParams }) => {
    const { title, status } = curSearchParams
    const queryParams = Object.assign(
      {
        isNeedTotal: true,
        sample: title || status ? {
          title,
          status: status === '1' ? false : true
        } : undefined,
      },
      handlePageParams(curPageParams),
    )
    setLoading(true)
    const res = await getArticlesList(queryParams)
    setTotal(res.total)
    setArticlesList(res.records)
    setLoading(false)
  }

  return (
    <ContentContainer>
      <div className="mb-8">
        <div className="flex flex-row">
          <div className="flex flex-row items-center">
            <div className="w-auto mr-2 text-left">Title</div>
            <Input
              style={{ width: '200px' }}
              placeholder="Input"
              value={searchParams.title}
              onChange={(e) => {
                setSearchParams({ ...searchParams, title: e.target.value })
              }}
            />
          </div>
          <div className="flex flex-row items-center">
            <div className="mr-2 ml-4">Status</div>
            <Select
              style={{ width: '300px' }}
              placeholder="Select"
              value={searchParams.status}
              onChange={(val) => {
                setSearchParams({ ...searchParams, status: val })
              }}
            >
              <Select.Option value="1">Not Synced</Select.Option>
              <Select.Option value="2">Synchronized</Select.Option>
            </Select>
          </div>
        </div>
        <div className="my-4 flex">
          <Button className="w-20 mr-8" type="primary" onClick={() => getMediaList({})}>
            Search
          </Button>
          <Button
            className="w-20"
            onClick={(e) => {
              setSearchParams(initSearchParams)
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
          Synchronous WeChat Assets
        </Button>
        <Button
          type="primary"
          className="ml-4 flex items-center"
          onClick={() => {
            navigator('/add-graphic')
          }}
        >
          + Add
        </Button>
      </div>
      <Table
        columns={column}
        loading={loading}
        dataSource={articlesList}
        pagination={false}
        rowKey="id"
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
export default Graphic
