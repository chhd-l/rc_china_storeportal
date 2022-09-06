import ProTable from '@/components/common/ProTable'
import { ContentContainer } from '@/components/ui'
import {
  getTemplateItems,
  getTemplateMessages,
  syncTemplateItem,
  updateTemplateMessage,
} from '@/framework/api/wechatSetting'
import { FileSearchOutlined } from '@ant-design/icons'
import { Button, message, Modal } from 'antd'
import { useEffect, useRef, useState } from 'react'
import AddTemplate from './components/AddTemplate'
import CardList from './components/CardList'
import ViewIndustry from './components/ViewIndustry'
import './index.less'
import { tableColumns } from './modules/constant'
import intl from 'react-intl-universal'

const WxTemplateMessage = () => {
  const [addVisible, setAddVisible] = useState(false)
  const [industryVisible, setIndustryVisible] = useState(false)
  const [cardView, setCardView] = useState(false)
  const [templateMessageList, setTemplateMessageList] = useState<any[]>([])
  const [templateItems, setTemplateItems] = useState<any[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [curSelectId, setCurSelectId] = useState('')
  const [loading, setLoading] = useState(false)
  const tableRef = useRef<any>()

  const confirmDelete = async () => {
    setLoading(true)
    const res = await updateTemplateMessage({ id: curSelectId, isDeleted: true })
    if (res) {
      setIsModalVisible(false)
      message.success({ className: 'rc-message', content: intl.get('public.operate_success') })
      tableRef.current.reload()
    }
    setLoading(false)
  }

  const openDelTipModal = (id: string) => {
    setCurSelectId(id)
    setIsModalVisible(true)
  }

  const getTemplateItemList = async () => {
    const res = await getTemplateItems({})
    console.info('res.records', res.records)
    setTemplateItems(res.records)
  }

  const modifyTemplateMessage = async (templateMessage: any) => {
    console.log('1111', templateMessage)
    const res = await updateTemplateMessage({
      id: templateMessage.id,
      status: !templateMessage.status,
      templateId: templateMessage.templateId,
    })
    if (res) {
      message.success({ className: 'rc-message', content: intl.get('public.operate_success') })
      if (cardView) {
        await getTemplateMessageList()
      } else {
        tableRef.current.reload()
      }
    }
  }

  const columns = tableColumns({
    openDelTipModal,
    modifyTemplateMessage,
    templateTitleList: templateItems,
  })

  const handleAdd = () => {
    setAddVisible(true)
  }
  const handleIndustires = () => {
    setIndustryVisible(true)
  }
  const Synchronous = async () => {
    if (await syncTemplateItem()) {
      message.success({ className: 'rc-message', content: intl.get('public.operate_success') })
    }
  }

  const getTemplateMessageList = async () => {
    const res = await getTemplateMessages({ offset: 0, limit: 10 })
    setTemplateMessageList(res.records)
  }

  useEffect(() => {
    getTemplateMessageList()
    getTemplateItemList()
  }, [])

  return (
    <ContentContainer className="template-message">
      {cardView ? (
        <CardList
          setCardView={setCardView}
          templateMessageList={templateMessageList}
          modifyTemplateMessage={modifyTemplateMessage}
        />
      ) : (
        <ProTable
          actionRef={tableRef}
          headerTitle={[
            <Button className="flex items-center mr-3" onClick={() => handleIndustires()}>
              <FileSearchOutlined />
              {intl.get('templateMessage.View Industries')}
            </Button>,
            <Button className="flex items-center  mr-3" onClick={() => Synchronous()}>
              <span className="iconfont icon-bianzu2 mr-2 text-xl" />
              {intl.get('templateMessage.Synchronous')}
            </Button>,
            <Button className="flex items-center  mr-3" onClick={() => setCardView(true)}>
              <span className="iconfont icon-bianzu2 mr-2 text-xl" />
              {intl.get('templateMessage.Graphical Representation')}
            </Button>,
          ]}
          toolBarRender={() => [
            <Button className="mt-8 text-white" type="primary" onClick={handleAdd} ghost>
              + {intl.get('templateMessage.Add')}
            </Button>,
          ]}
          columns={columns}
          search={{
            searchText: intl.get('public.search'),
            span: 8,
            optionRender: (searchConfig, formProps, dom) => {
              return dom
                .map((item: any) => {
                  return <Button {...item.props} loading={false} />
                })
                .reverse()
            },
          }}
          request={async (params, sorter, filter) => {
            // 表单搜索项会从 params 传入，传递给后端接口。
            console.log('test sort', params, sorter, filter)
            const { current, pageSize, templateId, title, scenario } = params
            const queryParams = Object.assign(
              {},
              { offset: current * pageSize - pageSize, limit: pageSize },
              {
                sample: Object.assign(
                  {},
                  templateId ? { id: templateId } : {},
                  title ? { title } : {},
                  scenario !== 'all' ? { scenario } : {},
                ),
              },
            )
            const res = await getTemplateMessages(queryParams)
            return Promise.resolve({
              data: res.records,
              success: true,
              total: res.total,
            })
          }}
        />
      )}
      <AddTemplate
        visible={addVisible}
        handleVisible={setAddVisible}
        addSuccess={() => {
          tableRef.current.reload()
        }}
      />
      <ViewIndustry visible={industryVisible} handleVisible={setIndustryVisible} />
      <Modal
        key="assetDelete"
        className="rc-modal"
        title="Delete Item"
        okText="Confirm"
        visible={isModalVisible}
        onOk={confirmDelete}
        confirmLoading={loading}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>{intl.get('public.Are you sure you want to delete the item?')}</p>
      </Modal>
    </ContentContainer>
  )
}

export default WxTemplateMessage
