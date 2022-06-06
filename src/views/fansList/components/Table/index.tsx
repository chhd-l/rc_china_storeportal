import { Button, Table, Tooltip, Modal, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { Fans } from '@/framework/types/wechat'
import { handleReturnTime } from '@/utils/utils'
import { syncFans, syncPartFans } from '@/framework/api/wechatSetting'
import './Style.less'

const Index = ({
  fanList,
  pages,
  setPages,
  getFanList,
  total,
  loading,
  setLoading,
}: {
  fanList: Fans[]
  pages: any
  setPages: Function
  getFanList: Function
  total: number
  loading: boolean
  setLoading: Function
}) => {
  const navigator = useNavigate()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [ListChek, setListChek] = useState<React.Key[]>([])

  const handleCancel = () => {
    setListChek([])
    setIsModalVisible(false)
  }

  const handlOk = async () => {
    message.info({
      className: 'rc-message',
      content: 'The fans information is synchronizing. Once finished, the information will be updated automatically.'
    })
    setLoading(true)
    if (!ListChek.length) {
      syncFans()
        .then(() => {
          message.success({ className: 'rc-message', content: 'Fans Synchronization succeeded' })
          getFanList()
        })
        .catch(() => {
          message.error({ className: 'rc-message', content: 'Fans Synchronization failed' })
        })
    } else {
      syncPartFans(ListChek)
        .then(() => {
          message.success({ className: 'rc-message', content: 'Fans Synchronization succeeded' })
          getFanList()
        })
        .catch(() => {
          message.error({ className: 'rc-message', content: 'Fans Synchronization failed' })
        })
    }
    setIsModalVisible(false)
  }

  const changeSelect = (selectedRowKeys: React.Key[], selectRowKeysAll: any[]) => {
    const arr: React.Key[] = []
    selectRowKeysAll.forEach((item) => {
      arr.push(item.openId)
    })
    setListChek(arr)
  }

  const columns = [
    {
      title: 'Wechat Account',
      dataIndex: 'accountName',
      key: 'accountName',
    },
    {
      title: 'Avatar',
      dataIndex: 'headimgurl',
      key: 'headimgurl',
    },
    {
      title: 'Wechat Name',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: 'Union ID',
      dataIndex: 'unionId',
      key: 'unionId',
    },
    {
      title: 'Is Member',
      dataIndex: 'isAppMember',
      render: (text: any, record: any) => record.isAppMember?'Yes':'No',
    },
    {
      title: 'Follow Time',
      dataIndex: 'subscribeTime',
      key: 'subscribeTime',
      render: (text: any) => handleReturnTime(text),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: () => 'Normal',
    },
    {
      title: 'Action',
      key: 'Action',
      render: (text: any, record: any) => (
        <Tooltip title="View Details">
          <span
            className="cursor-pointer iconfont icon-kjafg primary-color"
            onClick={() => {
              navigator('/fans/fans-detail', { state: record })
            }}
          />
        </Tooltip>
      ),
    },
  ]

  return (
    <div>
      <div className="flex flex-row mb-4 fansTable pt-4">
        {/* <Button className="mr-4" onClick={() => { }}>
          <span className="iconfont icon-bianzu2 mr-2" />
          Synchronize All Openid
        </Button> */}
        <Button className="mr-4" onClick={() => setIsModalVisible(true)}>
          <span className="iconfont icon-bianzu2 mr-2" />
          Synchronize All Fan Information
        </Button>
        <Button
          onClick={() => {
            if (ListChek.length) {
              setIsModalVisible(true)
            } else {
              message.warning({ className: 'rc-message', content: 'Please select at least one follower' })
            }
          }}
        >
          <span className="iconfont icon-bianzu2 mr-2" />
          Partial sync
        </Button>
        <Modal
          visible={isModalVisible}
          className="rc-modal"
          title={!ListChek.length ? 'Synchronize All Fan Information' : 'Synchronize All Openid'}
          closable={false}
          width={400}
          onCancel={handleCancel}
          onOk={handlOk}
          okText="Confirm"
        >
          <div>
            {!ListChek.length
              ? 'Are you sure you want to sync ? The number of fans islarge, please wait'
              : 'Are you sure you want yo sync ?'}
          </div>
        </Modal>
      </div>
      <Table
        rowSelection={{ onChange: changeSelect }}
        loading={loading}
        dataSource={fanList}
        columns={columns}
        rowKey="id"
        className="rc-table"
        pagination={{
          current: pages.page,
          pageSize: pages.limit,
          total: total,
          onChange: (page, pageSize) => {
            setPages({
              page,
              limit: pageSize,
            })
            getFanList(page, pageSize)
          },
        }}
      />
    </div>
  )
}
export default Index
