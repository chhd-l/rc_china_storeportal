import { Button, Table, Tooltip, Modal, message, Avatar } from 'antd'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { WxFans } from '@/framework/types/wechat'
import { handleReturnTime, openConfirmModal } from '@/utils/utils'
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
  fanList: WxFans[]
  pages: any
  setPages: Function
  getFanList: Function
  total: number
  loading: boolean
  setLoading: Function
}) => {
  const navigator = useNavigate()
  const [ListChek, setListChek] = useState<React.Key[]>([])

  const handlOk = () => {
    openConfirmModal({
      title: "Synchronize All Fan Information",
      content: "Are you sure you want to sync ? The number of fans islarge, please wait",
      onOk: () => {
        message.info({
          className: 'rc-message',
          content: 'The fans information is synchronizing. Once finished, the information will be updated automatically.'
        });
        setLoading(true);
        syncFans().then(() => {
          message.success({ className: 'rc-message', content: 'Fans Synchronization successful' });
          getFanList();
        })
      }
    });
  }

  const handleSyncPart = () => {
    openConfirmModal({
      title: "Synchronize All Openid",
      content: "Are you sure you want yo sync ?",
      onOk: () => {
        message.info({
          className: 'rc-message',
          content: 'The fans information is synchronizing. Once finished, the information will be updated automatically.'
        });
        setLoading(true);
        syncPartFans(ListChek).then(() => {
          message.success({ className: 'rc-message', content: 'Fans Synchronization successful' });
          getFanList();
        })
      }
    });
  }

  const changeSelect = (selectedRowKeys: React.Key[]) => {
    setListChek(selectedRowKeys);
  }

  const columns = [
    {
      title: 'Wechat Account',
      dataIndex: 'accountName',
      key: 'accountName',
    },
    {
      title: 'Avatar',
      dataIndex: 'headImgUrl',
      key: 'headImgUrl',
      render: (text: string) => text ? <Avatar size="large" src={text} /> : null,
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
        <Button className="mr-4" onClick={handlOk}>
          <span className="iconfont icon-bianzu2 mr-2" />
          Synchronize All Fan Information
        </Button>
        <Button
          onClick={() => {
            if (ListChek.length) {
              handleSyncPart()
            } else {
              message.warning({ className: 'rc-message', content: 'Please select at least one follower' })
            }
          }}
        >
          <span className="iconfont icon-bianzu2 mr-2" />
          Partial sync
        </Button>
      </div>
      <Table
        rowSelection={{ selectedRowKeys: ListChek, onChange: changeSelect }}
        loading={loading}
        dataSource={fanList}
        columns={columns}
        rowKey="openId"
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
            getFanList(page, pageSize,'page')
          },
        }}
      />
    </div>
  )
}
export default Index
