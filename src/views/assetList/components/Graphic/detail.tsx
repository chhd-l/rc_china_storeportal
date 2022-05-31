import React from 'react';
import { Modal, Table, Tooltip } from 'antd';
import { getArticlePreviewUrls } from '@/framework/api/wechatSetting';
import moment from 'moment';

interface IProps {
  mediaId: string
  synced: boolean
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
    const urls = await getArticlePreviewUrls(mediaId)
    setList(list.map((item: any, idx: number) => ({
      ...item,
      previewUrl: urls[idx]
    })));
    setLoading(false);
  }
  const column = [
    {
      title: 'Cover',
      dataIndex: 'id',
      key: 'keyid',
      render: (_text: any, record: any) => <img src={record?.thumbPic ?? ""} style={{width:200,height:120,objectFit:"cover"}} />
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (_text: any, record: any) => record?.title ?? ""
    },
    {
      title: 'Create Time',
      dataIndex: 'createdAt',
      key: 'createTime',
      render: () => createdAt ? moment(createdAt).format("YYYY/MM/DD HH:mm:ss") : null,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: any) => (
        <>
          <Tooltip title={synced ? "Preview" : "Not synced"}>
            <a
              className={`cursor-pointer ml-2 iconfont icon-kjafg text-xl ${synced ? "primary-color" : "text-gray-400"}`}
              href={record?.previewUrl}
              target="_blank"
            />
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Modal
      width={900}
      title="Graphic message"
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
