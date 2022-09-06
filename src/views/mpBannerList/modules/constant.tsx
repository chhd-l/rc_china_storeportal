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
import intl from 'react-intl-universal'


enum StatusType {
  Closef,
  Open,
}

interface TableColumnsProps {
  handleDelete: (e: string) => void;
  changeStatus: (e: boolean, id: string) => void;
  handlePreview: (e: string) => void;
  navigator: any
  list:any
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
                               list
                             }: TableColumnsProps) => {

  const columns: ProColumns<ColumnsProps>[] = [
    {
      title: intl.get('wx.mini_program'),
      dataIndex: 'accountName',
      valueEnum: handleValueEnum(list)
    },
    {
      title: intl.get('wx.banner_name'),
      dataIndex: 'name',
    },
    {
      title: intl.get('wx.page'),
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
      title: intl.get('wx.click_type'),
      dataIndex: 'clickType',
      valueEnum: {
        NO_OPERATION: { text: intl.get('wx.no_operation') },
        OPEN_THE_WEB_PAGE: { text: intl.get('wx.open_web_page') },
        OPEN_THE_MP_PAGE: { text: intl.get('wx.open_mp_page') },
        OPEN_OTHER_MP_PAGE: { text: intl.get('wx.open_other_mp_page') },
      },
    },
    {
      title: intl.get('wx.page_path'),
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
      title: intl.get('wx.sort'),
      dataIndex: 'sort',
      hideInSearch: true,
    },
    {
      title: intl.get('public.status'),
      dataIndex: 'isActive',
      valueEnum: {
        true: { text: intl.get('public.enable') },
        false: { text: intl.get('public.disable') },
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
      title: intl.get('public.action'),
      hideInSearch: true,
      render: (_, record) => [
        <Tooltip title={intl.get('public.edit')}>
          <span className='mr-4 cursor-pointer iconfont icon-a-Group437 text-red-500' onClick={(e) => {
            e.stopPropagation()
            navigator('/mpbanner/mpbanner-detail', {
              state: { id: record.id },
            })
          }} />
        </Tooltip>,
        <Tooltip title={intl.get('wx.view_details')}>
          <span className='cursor-pointer mr-4 iconfont icon-bianzu text-red-500'
                onClick={() => {
                  console.log(record.picUrl)
                  handlePreview(record.picUrl)
                }}
          />
        </Tooltip>,
        <Tooltip title={intl.get('public.delete')}>
          <span className='cursor-pointer text-xl iconfont icon-delete text-red-500' onClick={() => {
            handleDelete(record.id)
          }} />
        </Tooltip>,
      ],
    },
  ]

  return columns
}
