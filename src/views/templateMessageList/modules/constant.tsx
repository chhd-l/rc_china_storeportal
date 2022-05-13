import { ProColumns } from '@/components/common/ProTable'
import { Switch, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { handleValueEnum } from '@/utils/utils'
import { LabelOptionProps } from '@/framework/types/common'
import React from 'react'

interface TableColumnsProps {
  openDelTipModal: (e: string) => void
  modifyTemplateMessage: (e: any) => void
  templateTitleList: LabelOptionProps[]
}
interface ColumnsProps {
  channel: string
  scenario: string
  id: string
  path: string
  title: string
  status: boolean
}
export const tableColumns = ({ openDelTipModal, templateTitleList, modifyTemplateMessage }: TableColumnsProps) => {
  const columns: ProColumns<ColumnsProps>[] = [
    {
      title: 'Template ID',
      dataIndex: 'templateId',
      order: 4,
    },
    {
      title: 'Scenario',
      dataIndex: 'scenario',
      hideInSearch: true,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      hideInSearch: true,
    },
    {
      title: 'Template Title',
      dataIndex: 'title',
      order: 3,
      hideInTable: true,
      valueEnum: () => {
        let data =
          templateTitleList?.map((el: any) => {
            return {
              value: el.title,
              label: el.title,
            }
          }) || []
        const res = handleValueEnum(data)
        return res
      },
    },
    {
      title: 'Scenario',
      dataIndex: 'scenario',
      initialValue: 'all',
      order: 2,
      hideInTable: true,
      valueEnum: {
        all: { text: 'All', status: 'Default' },
        SHIPPED: { text: 'SHIPPED', status: 'Default' },
        'CANCEL REMINDER': { text: 'CANCEL REMINDER', status: 'Processing' },
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      hideInSearch: true,
      render: (_, record) => (
        <Switch
          defaultChecked={record.status}
          onChange={(checked: boolean) => {
            console.log(`switch to ${checked}`)
            modifyTemplateMessage && modifyTemplateMessage(record)
          }}
        />
      ),
    },
    {
      title: 'Action',
      hideInSearch: true,
      render: (_, record) => [
        <Tooltip title="Edit">
          <Link to={`/template/template-message/${record.id}`}>
            <span className="cursor-pointer iconfont text-sm icon-Edit text-red-500" />
          </Link>
        </Tooltip>,
        <Tooltip title="Delete">
          <span
            className="cursor-pointer iconfont text-sm icon-delete text-red-500 ml-2"
            onClick={() => {
              openDelTipModal(record.id)
            }}
          />
        </Tooltip>,
      ],
    },
  ]
  return columns
}
