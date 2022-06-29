import React, { useState, useEffect } from 'react';
import { Modal, Table } from 'antd';
import { Asset } from '@/framework/types/wechat'
import { getMedias, getArticlesList } from '@/framework/api/wechatSetting'

interface IProps {
  assetType: 'image' | 'voice' | 'video' | 'news'
  visible: boolean
  onlySync?: boolean
  onConfirm?: (asset: Asset) => void
  onCancel: () => void
}

const imageColumns = [
  {
    title: 'Picture',
    dataIndex: 'picture',
    key: 'picture',
    render: (text: any) => <img src={text} className="w-16 h-16 order-img" alt="" />,
  },
  {
    title: 'Wechat Assets Link',
    dataIndex: 'assetLink',
    key: 'assetLink',
    width: '40%',
    render: (text: any) => (<div style={{wordBreak: "break-all"}}>{text}</div>)
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
  }
];

const voiceColumns = [
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
  }
];

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
const videoColumns = [
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
  }
];

// @ts-ignore
const graphicColumns = [
  {
    title: "Graphic main cover",
    dataIndex: "cover",
    key: "cover",
    render: (_text: any, record: any) => <img src={record?.articleList?.[0]?.thumbPic ?? ""} style={{width:100,height:50,objectFit:"cover"}} />
  },
  {
    title: "Wechat Assets ID",
    dataIndex: "mediaId",
    key: "mediaId"
  },
  {
    title: "title",
    dataIndex: "title",
    key: "title",
    render: (_text: any, record: any) => record?.articleList?.[0]?.title ?? ""
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_text: boolean,record: any) => {
      // @ts-ignore
      return list[`${record.status}`]
    }
  }
]

const AssetsModal = (props: IProps) => {
  const [list, setList] = React.useState<Asset[]>([])
  const [articles, setArticles] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [current, setCurrent] = React.useState<number>(1)
  const [total, setTotal] = React.useState<number>(0)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [selectedRows, setSelectedRows] = useState<any[]>([])

  const getList = async (currentPage: number) => {
    const params = props.assetType === "news" ? {
      offset: currentPage * 10 - 10,
      limit: 10,
    } : {
      sample: { type: props.assetType, status: props.onlySync ?? undefined },
      offset: currentPage * 10 - 10,
      limit: 10,
    }
    setLoading(true)
    const res = props.assetType === "news" ? (await getArticlesList(params)) : (await getMedias(params))
    setTotal(res.total)
    if (props.assetType === "news") {
      setArticles(res.records)
    } else {
      setList(res.records)
    }
    setLoading(false)
  }

  useEffect(() => {
    getList(1)
  }, [])

  return (
    <Modal
      title={props.assetType === 'image' ? 'Pictures' : props.assetType === 'voice' ? 'Voices' : props.assetType === 'news'?'Graphic message':'Videos'}
      visible={props.visible}
      width={900}
      okText="Confirm"
      cancelText="Cancel"
      onOk={() => {
        if (props.onConfirm) {
           props.onConfirm(selectedRows[0])
        } else {
          props.onCancel()
        }
      }}
      okButtonProps={{disabled: selectedRowKeys.length === 0}}
      onCancel={props.onCancel}
    >
      <Table
        rowKey="id"
        columns={props.assetType === 'image' ? imageColumns : props.assetType === 'voice' ? voiceColumns : props.assetType === "video" ? videoColumns : graphicColumns}
        dataSource={props.assetType === "news" ? articles : list}
        loading={loading}
        pagination={{
          current: current,
          total: total,
          onChange: (page) => {
            setCurrent(page)
            getList(page)
          }
        }}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys)
            setSelectedRows(selectedRows)
          }
        }}
      />
    </Modal>
  )
}

export default AssetsModal
