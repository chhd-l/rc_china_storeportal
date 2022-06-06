import { IsDefault, LabelOptionProps } from '@/framework/types/common'
import { handleValueEnum } from '@/utils/utils'
import {
  DeleteOutlined,
  FormOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { ProColumns } from '@ant-design/pro-table'
import { Switch, Tooltip } from 'antd'
import { Link } from 'react-router-dom'


enum StatusType {
  Closef,
  Open,
}

interface TableColumnsProps {
  handleDelete: (e: string) => void;
  changeStatus: (e: boolean, id: string) => void;
  handlePreview: (e: string) => void;
  navigator: any
}

interface ColumnsProps {
  officialAccount: string;
  name: string;
  picUrl: string;
  clickType: string;
  path: string;
  default: number;
  sort: number;
  id: string;
  page: string;
  isActive: boolean;
}

export const tableColumns = ({
                               handlePreview,
                               handleDelete,
                               changeStatus,
                               navigator,
                             }: TableColumnsProps) => {

  const columns: ProColumns<ColumnsProps>[] = [
    {
      title: 'Mini Program',
      dataIndex: 'accountName',
      hideInSearch: true,
    },
    {
      title: 'Banner Name',
      dataIndex: 'name',
    },
    {
      title: 'Page',
      dataIndex: 'page',
      hideInSearch: true,
    },
    // {
    //   title: "Banner Pic",
    //   dataIndex: "img",
    //   hideInSearch: true,
    //   render: (_, record) => (
    //     <a>
    //       <SearchOutlined
    //         onClick={() => {
    //           handlePreview(record.img);
    //         }}
    //       />
    //     </a>
    //   ),
    // },
    {
      title: 'Click Type',
      dataIndex: 'clickType',
      valueEnum: {
        NO_OPERATION: { text: 'No operation' },
        OPEN_THE_WEB_PAGE: { text: 'Open the WEB page' },
        OPEN_THE_MP_PAGE: { text: 'Open the MP page' },
        OPEN_OTHER_MP_PAGE: { text: 'Open other MP page' },
      },
    },
    {
      title: 'Path',
      dataIndex: 'path',
      hideInSearch: true,
    },
    // {
    //   title: "Default",
    //   dataIndex: "default",
    //   hideInSearch: true,
    //   render: (_, record) => <div>{IsDefault[record.default]}</div>,
    // },
    {
      title: 'Sort',
      dataIndex: 'sort',
      hideInSearch: true,
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      valueEnum: {
        true: { text: 'Enable' },
        false: { text: 'Disable' },
      },
      render: (_, record) => (
        <Switch
          checked={record.isActive}
          onChange={(checked: boolean) => {
            changeStatus(checked, record.id)
          }}
        />
      ),
    },
    {
      title: 'Action',
      hideInSearch: true,
      render: (_, record) => [
        <Tooltip title='Edit'>
          <a className='mr-4' href='' onClick={(e) => {
            e.stopPropagation()
            navigator('/mpbanner/mpbanner-detail', {
              state: { id: record.id },
            })
          }}>
            <span className='cursor-pointer iconfont icon-a-Group437 text-red-500'/>
          </a>
        </Tooltip>,
        <Tooltip title='View'>
          <a className=' mr-4'>
            <span className='cursor-pointer iconfont icon-bianzu'
                  onClick={() => {
                    console.log(record.picUrl)
                    handlePreview(record.picUrl)
                  }}
            />
          </a>
        </Tooltip>,
        <Tooltip title='Delete'>
          <Link to='' className='mr-4 text-xl' onClick={() => {
            handleDelete(record.id)
          }}>
            <span className='iconfont icon-delete' />
          </Link></Tooltip>,
      ],
    },
  ]

  return columns
}
