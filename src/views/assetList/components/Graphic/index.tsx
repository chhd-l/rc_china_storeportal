import { Button, Input, Modal, Pagination, Select, Table, Tooltip,message } from 'antd'
import React, { useEffect, useState } from 'react'
import { getArticlesList, wxArticlePublish } from '@/framework/api/wechatSetting'
import { ContentContainer } from '@/components/ui'
import { PageParamsProps } from '@/framework/types/common'
import { handlePageParams } from '@/utils/utils'
import { useNavigate } from 'react-router'
import { initPageParams } from '@/lib/constants'
import ArticleDetail from './detail'
import PublishIcon from '@/components/icons/publish-icon'
import moment from 'moment'

const Graphic = ({
  isReload = false,
  openDelete,
  openSyncTipModal,
}: {
  isReload: boolean
  openDelete: Function
  openSyncTipModal: Function
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [chosedArticleList, setChosedArticleList] = useState<any[]>([]);
  const [createdDate, setCreatedDate] = useState<string>("");
  const [mediaId, setMediaId] = useState<string>("");
  const [chosedArticleSynced, setChosedArticleSynced] = useState<string>("")
  const list = {
    // 未同步
    NOT_SYNCED:'Not synced',
    // 已同步
    SYCHRONIZED:'Synchronized',
    // 审核中
    AUDITING:'Auditing',
    // 审核成功
    PULISHED:'Pulished',
    // 审核失败
    AUDIT_FAILED:'Audit Failed',
  }
  const handleViewDetail = (record: any) => {
    setChosedArticleList(record?.articleList || [])
    setCreatedDate(record?.createdAt || "")
    setMediaId(record?.mediaId);
    setModalVisible(true);
    setChosedArticleSynced(record?.status);
  }
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
      render: (_text: boolean,record:any) => {
        // @ts-ignore
        return list[`${record.status}`]
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: any) => (
        <>
          {
            record.status==='SYCHRONIZED'|| record.status==='PULISHED'?
              <Tooltip title="View Details">
            <span
              className="cursor-pointer ml-2 iconfont icon-kjafg primary-color text-lg"
              onClick={() => handleViewDetail(record)}
            />
              </Tooltip>:null
          }
          {
            record.status==='SYCHRONIZED'? <Tooltip title="Publish">
              <PublishIcon
                className="cursor-pointer ml-2"
                onClick={() => {
                  setIsModalVisible(true)
                  setMediaId(record?.mediaId);
                }}
              />
            </Tooltip>:null
          }
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
  const [isModalVisible, setIsModalVisible] = useState(false)
  const navigator = useNavigate()
  const [articlesList, setArticlesList] = useState<any[]>([])
  const [pageParams, setPageParams] = useState<PageParamsProps>(initPageParams)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const { currentPage, pageSize } = pageParams
  const initSearchParams: { title: string | undefined, status: string | undefined } = {
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
      //getMediaList({})
      changePage(1, pageParams.pageSize)
    }
  }, [isReload])

  useEffect(() => {
    getMediaList({})
  }, [])

  const getMediaList = async ({ curPageParams = initPageParams, curSearchParams = searchParams }) => {
    const { title, status } = curSearchParams
    const queryParams = Object.assign(
      {
        isNeedTotal: true,
        sample: title || status ? {
          title,
          status
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
  const confirmOk = async () => {
    setLoading(true)
    let res = await wxArticlePublish(mediaId)
    if(res){
      setIsModalVisible(false)
      message.success({ className: 'rc-message', content: 'Operation success' })
      getMediaList({})
      setLoading(false)
    } else {
      setLoading(false)
    }
  }
  return (
    <ContentContainer className="pt-2 pb-6">
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
              allowClear
              onChange={(val) => {
                console.log(val,999)
                setSearchParams({ ...searchParams, status: val })
              }}
            >
              <Select.Option value="NOT_SYNCED">Not Synced</Select.Option>
              <Select.Option value="SYCHRONIZED">Synchronized</Select.Option>
              <Select.Option value="AUDITING">Auditing</Select.Option>
              <Select.Option value="PULISHED">Pulished</Select.Option>
              <Select.Option value="AUDIT_FAILED">Audit Failed</Select.Option>
            </Select>
          </div>
        </div>
        <div className="my-4 flex">
          <Button className="w-20 mr-8" type="primary" onClick={() => {
            setPageParams(initPageParams);
            getMediaList({});
          }}>
            Search
          </Button>
          <Button
            className="w-20"
            onClick={(e) => {
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
            navigator('/assets/add-graphic')
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
      {modalVisible ? <ArticleDetail
        visible={modalVisible}
        articleList={chosedArticleList}
        createdAt={createdDate}
        onClose={() => setModalVisible(false)}
        synced={chosedArticleSynced}
        mediaId={mediaId}
      /> : null}
      <Modal
        className='rc-modal'
        title='Publish Item'
        okText='Confirm'
        visible={isModalVisible}
        onOk={confirmOk}
        confirmLoading={loading}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Are you sure you want to publish the item?</p>
      </Modal>
    </ContentContainer>
  )
}
export default Graphic
