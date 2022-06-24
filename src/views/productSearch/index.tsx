

import {  PlusOutlined } from '@ant-design/icons';
import { Button,Space, Switch, Tag } from 'antd';
import { useRef } from 'react';
import deleteIcon from '@/assets/images/delete.png'
import ProTable, { ActionType, ProColumns } from '@/components/common/ProTable'
import './index.less'
import AddNewSearch from './components/AddNewSearch';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: boolean;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
  index:number
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: 'Top Search Name',
    dataIndex: 'title',
  },
  {
    title: 'Priority',
    dataIndex: 'comments',
    search: false,
  },
  {
    title: 'Status',
    dataIndex: 'state',
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: 'Action',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => <img src={deleteIcon} alt="" className='w-1 h-1'/>
  },
];


const ProductSearch= () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable
      columns={columns}
      actionRef={actionRef}
      cardBordered
      className='searchTable'
      tableClassName="rc-table"
      // request={}
      // dataSource={dataSource}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
        span:10,
        searchText: 'Search',
        optionRender: (searchConfig, formProps, dom) => {
          return dom
            .map((item: any) => {
              return <Button {...item.props} loading={false} />
            })
            .reverse()
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle={<div className='flex flex-row items-top text-grayTitle text-14'>Top Search is visible on shop
      <Switch defaultChecked onChange={()=>{}} className="ml-4"/></div>}
      toolBarRender={() => [
        <AddNewSearch />
       
      ]}
    />
  );
};


export default ProductSearch