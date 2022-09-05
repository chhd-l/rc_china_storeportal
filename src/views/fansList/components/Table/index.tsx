import { Button, Table, Tooltip, Modal, message, Avatar } from 'antd'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { WxFans } from '@/framework/types/wechat'
import { handleReturnTime, openConfirmModal } from '@/utils/utils'
import { syncFans, syncPartFans } from '@/framework/api/wechatSetting'
import intl from 'react-intl-universal'
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
      title: intl.get('wx.sync_fans_all'),
      content: intl.get('wx.sync_fans_all_con'),
      onOk: () => {
        message.info({
          className: 'rc-message',
          content: intl.get('wx.sync_fans_tip')
        });
        setLoading(true);
        syncFans().then(() => {
          message.success({ className: 'rc-message', content: intl.get('public.operate_success') });
          getFanList();
        })
      }
    });
  }

  const handleSyncPart = () => {
    openConfirmModal({
      title: intl.get('wx.sync_fans_openid'),
      content: intl.get('wx.wx.are_you_sure_to_sync'),
      onOk: () => {
        message.info({
          className: 'rc-message',
          content: intl.get('wx.sync_fans_tip')
        });
        setLoading(true);
        syncPartFans(ListChek).then(() => {
          message.success({ className: 'rc-message', content: intl.get('public.operate_success') });
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
      title: intl.get('wx.wechat_account'),
      dataIndex: 'accountName',
      key: 'accountName',
    },
    {
      title: intl.get('wx.avatar'),
      dataIndex: 'headImgUrl',
      key: 'headImgUrl',
      render: (text: string) => text ? <Avatar size="large" src={text} /> : null,
    },
    {
      title: intl.get('wx.wechat_name'),
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: intl.get('wx.unionid'),
      dataIndex: 'unionId',
      key: 'unionId',
    },
    {
      title: intl.get('wx.is_member'),
      dataIndex: 'isAppMember',
      render: (text: any, record: any) => record.isAppMember? intl.get('public.yes') : intl.get('public.no'),
    },
    {
      title: intl.get('wx.follow_time'),
      dataIndex: 'subscribeTime',
      key: 'subscribeTime',
      render: (text: any) => handleReturnTime(text),
    },
    {
      title: intl.get('public.status'),
      dataIndex: 'status',
      key: 'status',
      render: () => 'Normal',
    },
    {
      title: intl.get('public.action'),
      key: 'Action',
      render: (text: any, record: any) => (
        <Tooltip title={intl.get('wx.view_details')}>
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
          {intl.get('wx.sync_fans_all')}
        </Button>
        <Button
          onClick={() => {
            if (ListChek.length) {
              handleSyncPart()
            } else {
              message.warning({ className: 'rc-message', content: intl.get('wx.sync_partial_tip') })
            }
          }}
        >
          <span className="iconfont icon-bianzu2 mr-2" />
          {intl.get('wx.sync_partial')}
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
