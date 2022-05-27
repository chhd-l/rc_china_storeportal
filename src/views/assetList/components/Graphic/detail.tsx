import React from 'react';
import { Modal, Table, Tooltip } from 'antd';
import moment from 'moment';

interface IProps {
  visible: boolean
  articleList: any[]
  createdAt: string
  onClose: () => void
}

const ArticleDetail: React.FC<IProps> = ({ visible, articleList, createdAt, onClose }) => {
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
          <Tooltip title="Preview">
            <a
              className="cursor-pointer ml-2 iconfont icon-kjafg primary-color text-xl"
              href={record?.downURL}
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
        columns={column}
        dataSource={articleList}
        className="rc-table"
        pagination={false}
      />
    </Modal>
  );
}

export default ArticleDetail
