import { Modal, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import Mock from 'mockjs'
import { assetListSource } from '@/views/assetList/modules/mockdata'
import { Asset } from '@/framework/types/wechat'
import { cloneDeep } from 'lodash'
import Search from '@/components/common/Search'
import intl from 'react-intl-universal'

const formItems = [{ label: 'Title', name: 'title' }]

const column = [
  {
    title: intl.get('reply.Wechat Assets ID'),
    dataIndex: 'assetId',
    key: 'assetId',
  },
  {
    title: intl.get('reply.Create Time'),
    dataIndex: 'createTime',
    key: 'createTime',
    render: (text: any, record: any) => (record.status === 'synchronized' ? record.syncTime : text),
    //Status = Synchronized时,显示素材同步时间；Status = Not Synchronized时，显示素材添加时间
  },
  {
    title: intl.get('public.status'),
    dataIndex: 'status',
    key: 'status',
  },
]

const pictureColumn = {
  title: intl.get('reply.Picture'),
  dataIndex: 'picture',
  key: 'picture',
}

const voiceColumn = {
  title: intl.get('reply.Voice'),
  dataIndex: 'voice',
  key: 'voice',
  render: (text: any) => (
    <audio controls style={{ height: '40px' }}>
      <source src={text} type="video/mp4" />
    </audio>
  ),
}

const videoColumn = {
  title: intl.get('reply.Video'),
  dataIndex: 'video',
  key: 'video',
}

const graphicColumn = {
  title: intl.get('reply.Graphic main cover'),
  dataIndex: 'graphic',
  key: 'graphic',
}

const titleColumn = {
  title: intl.get('reply.Title'),
  dataIndex: 'title',
  key: 'title',
}

const SelectContentModal = ({
  modalVisible,
  onCancel,
  onConfirm,
  type,
}: {
  modalVisible: boolean
  onCancel: Function
  onConfirm: Function
  type: string
}) => {
  const [assets, setAssets] = useState<Asset[]>([])
  const [selectAsset, setSelectAsset] = useState(null)
  const [columns, setColumns] = useState(column)

  const changeSelect = (selectedRowKeys: any, selectedRows: any) => {
    console.log(selectedRowKeys, selectedRows)
    setSelectAsset(selectedRows[0])
  }

  const handleColumns = () => {
    let baseColumn = cloneDeep(column)
    switch (type) {
      case 'picture':
        baseColumn.unshift(pictureColumn)
        break
      case 'voice':
        baseColumn.unshift(voiceColumn)
        break
      case 'video':
        baseColumn.unshift(videoColumn)
        baseColumn.splice(2, 1, titleColumn)
        break
      case 'graphic':
        baseColumn.unshift(graphicColumn)
        baseColumn.splice(2, 1, titleColumn)
        break
      default:
        break
    }
    setColumns(baseColumn)
  }

  const getAssets = () => {}

  useEffect(() => {
    setAssets(Mock.mock(assetListSource).array)
  }, [])

  useEffect(() => {
    handleColumns()
  }, [type])

  return (
    <Modal
      title={intl.get('reply.Select Assets')}
      destroyOnClose={true}
      visible={modalVisible}
      closable={false}
      cancelText={intl.get('public.cancel')}
      okText={intl.get('public.confirm')}
      width={900}
      onCancel={() => {
        onCancel && onCancel()
      }}
      onOk={() => {
        if (selectAsset) {
          onConfirm && onConfirm(selectAsset)
        }
      }}
    >
      {type === 'video' || type === 'graphic' ? (
        <Search query={getAssets} formItems={formItems} classes={'select-content-search mb-4'} />
      ) : null}
      <Table
        columns={columns}
        dataSource={assets}
        rowSelection={{
          onChange: changeSelect,
          hideSelectAll: true,
          type: 'radio',
        }}
        rowKey={'id'}
        className="rc-table"
      />
    </Modal>
  )
}
export default SelectContentModal
