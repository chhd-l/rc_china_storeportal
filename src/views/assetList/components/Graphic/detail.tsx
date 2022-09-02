import React from 'react';
import { Modal, Table, Tooltip } from 'antd';
import { getArticlePreviewUrls } from '@/framework/api/wechatSetting';
import moment from 'moment';
import intl from 'react-intl-universal';

interface IProps {
  mediaId: string
  synced: string
  visible: boolean
  articleList: any[]
  createdAt: string
  onClose: () => void
}

const ArticleDetail: React.FC<IProps> = ({ mediaId, synced, visible, articleList, createdAt, onClose }) => {
  const [list, setList] = React.useState<any[]>(articleList);
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    getPreviewList()
  }, []);
  const getPreviewList = async () => {
    if (!synced) {
      return Promise.resolve(true);
    }
    setLoading(true)
    var urls: any[]
    if (synced!=='PULISHED'){
       urls = await getArticlePreviewUrls(mediaId)
    }

    setList(list.map((item: any, idx: number) => ({
      ...item,
      previewUrl: synced==='PULISHED'?item.downURL:urls[idx]
    })));
    setLoading(false);
  }
  const column = [
    {
      title: intl.get('wx.main_cover'),
      dataIndex: 'id',
      key: 'keyid',
      render: (_text: any, record: any) => <img src={record?.thumbPic ?? ""} style={{width:200,height:120,objectFit:"cover"}} />
    },
    {
      title: intl.get('wx.title'),
      dataIndex: 'title',
      key: 'title',
      render: (_text: any, record: any) => record?.title ?? ""
    },
    {
      title: intl.get('wx.create_time'),
      dataIndex: 'createdAt',
      key: 'createTime',
      render: () => createdAt ? moment(createdAt).format("YYYY/MM/DD HH:mm:ss") : null,
    },
    {
      title: intl.get('public.action'),
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: any) => (
        <>
          <Tooltip title={synced ? "Preview" : "Not synced"}>
            <a
              className={`cursor-pointer ml-2 iconfont icon-kjafg text-xl ${synced ? "primary-color" : "text-gray-400"}`}
              href={record?.previewUrl}
              target="_blank" rel="noreferrer"
            />
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Modal
      width={900}
      title={intl.get('wx.graphic_message')}
      footer={null}
      visible={visible}
      onCancel={onClose}
    >
      <Table
        rowKey="id"
        loading={loading}
        columns={column}
        dataSource={list}
        className="rc-table"
        pagination={false}
      />
    </Modal>
  );
}

export default ArticleDetail
