import { Image, Modal, Table, Tooltip } from 'antd'
import React, { useState } from 'react'
import { WxLiveStreaming } from '@/framework/types/liveStreaming'
import moment from 'moment'
import intl from 'react-intl-universal'

const Index = ({ liveStreamingList }: { liveStreamingList: WxLiveStreaming[] }) => {
  const [imgUrl, setImgUrl] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const columns = [
    {
      title: intl.get('wx.mini_program'),
      dataIndex: 'accountName',
    },
    {
      title: intl.get('wx.livestream_id'),
      dataIndex: 'roomId',
    },
    {
      title: intl.get('wx.livestream_name'),
      dataIndex: 'name',
    },
    {
      title: intl.get('wx.period'),
      dataIndex: 'period',
      render: (text: any, record: any) => (
        <span className="text-gray-400">
          {moment(record.startTime).format('YYYY/MM/DD HH:mm')} - <br />
          {moment(record.endTime).format('YYYY/MM/DD HH:mm')}
        </span>
      ),
    },
    {
      title: intl.get('wx.anchor_name'),
      dataIndex: 'anchorName',
    },
    {
      title: intl.get('public.status'),
      dataIndex: 'liveStatus',
      render: (text: any, record: any) => (
        <span
          className={`${
            text === 101
              ? 'bg-ongoingBg text-ongoingText'
              : text === 102
              ? 'bg-upcomingBg text-theme-red'
              : 'bg-expiredBg'
          } w-20 h-6 flex items-center justify-center`}
        >
          {text === 101 ? intl.get('wx.ongoing') : text === 102 ? intl.get('wx.upcoming') : intl.get('wx.expired')}
        </span>
      ),
    },
    {
      title: intl.get('public.action'),
      hideInSearch: true,
      render: (text: any, record: any) =>
        record.liveStatus === 101 || record.liveStatus === 102 ? (
          <Tooltip title={intl.get('wx.share')}>
            <span
              className="cursor-pointer iconfont icon-Vector1 text-theme-red"
              onClick={() => {
                if (record?.qrCodeImg) {
                  setImgUrl(record.qrCodeImg)
                  setIsModalVisible(true)
                }
              }}
            />
          </Tooltip>
        ) : null,
    },
  ]

  const handleCancel = () => {
    setImgUrl('')
    setIsModalVisible(false)
  }

  return (
    <>
      <Table dataSource={liveStreamingList} columns={columns} rowKey="id" className="rc-table" pagination={false} />
      {imgUrl ? (
        <Modal visible={isModalVisible} closable={false} onCancel={handleCancel} footer={null}>
          <Image src={imgUrl} width="100%" height="100%" preview={false} />
        </Modal>
      ) : null}
    </>
  )
}

export default Index
