import ProTable from '@/components/common/ProTable'
import './index.less'
import { Button } from 'antd'
import { FileSearchOutlined } from '@ant-design/icons'
import { tableColumns } from './modules/constant'
import { ContentContainer } from '@/components/ui'
import { useEffect, useState } from 'react'
import AddTemplate from './components/AddTemplate'
import ViewIndustry from './components/ViewIndustry'
import CardList from './components/CardList'
import {
  getTemplateItems,
  getTemplateMessages,
  syncTemplateItem,
  updateTemplateMessage,
} from '@/framework/api/wechatSetting'
import { useAtom } from 'jotai'
import { userAtom } from '@/store/user.store'

const TemplateMessage = () => {
  const [addVisible, setAddVisible] = useState(false)
  const [industryVisible, setIndustryVisible] = useState(false)
  const [cardView, setCardView] = useState(false)
  const [templateMessageList, setTemplateMessageList] = useState<any[]>([])
  const [templateItems, setTemplateItems] = useState<any[]>([])
  const [userInfo] = useAtom(userAtom)

  const handleDelete = async (id: string) => {
    console.info('handleDelete', id)
    const res = await updateTemplateMessage({ id, isDeleted: true })
    if (res) {
      await getTemplateMessageList()
    }
  }
  const getTemplateItemList = async () => {
    const res = await getTemplateItems({})
    console.info('res.records', res.records)
    setTemplateItems(res.records)
  }
  const modifyTemplateMessage = async (templateMessage: any) => {
    console.log('1111', templateMessage)
    const res = await updateTemplateMessage({ id: templateMessage.id, status: !templateMessage.status })
    if (res) {
      await getTemplateMessageList()
    }
  }

  const columns = tableColumns({
    handleDelete,
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
    await syncTemplateItem({operator:userInfo?.username||'system'})
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
    <ContentContainer className='template-message'>
      {cardView ? (
        <CardList
          setCardView={setCardView}
          templateMessageList={templateMessageList}
          modifyTemplateMessage={modifyTemplateMessage}
        />
      ) : (
        <ProTable
          headerTitle={[
            <Button className='flex items-center mr-3' onClick={() => handleIndustires()}>
              <FileSearchOutlined />
              View Industries
            </Button>,
            <Button className='flex items-center  mr-3' onClick={() => Synchronous()}>
              <span className='iconfont icon-bianzu2 mr-2 text-xl' />
              Synchronous
            </Button>,
            <Button className='flex items-center  mr-3' onClick={() => setCardView(true)}>
              <span className='iconfont icon-bianzu2 mr-2 text-xl' />
              Graphical Representation
            </Button>,
          ]}
          toolBarRender={() => [
            <Button className='mt-8 text-white' type='primary' onClick={handleAdd} ghost>
              + Add
            </Button>,
          ]}
          columns={columns}
          request={async (params, sorter, filter) => {
            // 表单搜索项会从 params 传入，传递给后端接口。
            console.log('test sort', params, sorter, filter)
            const { current, pageSize, id, title, scenario } = params
            const queryParams = Object.assign(
              {},
              { offset: current * pageSize - pageSize, limit: pageSize },
              {
                sample: Object.assign(
                  {},
                  id ? { id } : {},
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
      <AddTemplate visible={addVisible} handleVisible={setAddVisible} />
      <ViewIndustry visible={industryVisible} handleVisible={setIndustryVisible} />
    </ContentContainer>
  )
}

export default TemplateMessage
function useStateuseState<T> (arg0: never[]): [any, any] {
  throw new Error('Function not implemented.')
}
