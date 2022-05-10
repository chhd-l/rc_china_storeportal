import ProTable from '@/components/common/ProTable'
import './index.less'
import { mockList } from './modules/mockdata'
import Mock from 'mockjs'
import { Button } from 'antd'
import { FileSearchOutlined } from '@ant-design/icons'
import { tableColumns } from './modules/constant'
import { mockOptionsList } from '../qrCodeManageList/modules/mockdata'
import { ContentContainer } from '@/components/ui'
import { useEffect, useState } from 'react'
import AddTemplate from './components/AddTemplate'
import ViewIndustry from './components/ViewIndustry'
import CardList from './components/CardList'
import {getTemplateMessages } from '@/framework/api/wechatSetting'

const TemplateMessage = () => {
  const [addVisible, setAddVisible] = useState(false)
  const [industryVisible, setIndustryVisible] = useState(false)
  const [cardView, setCardView] = useState(true)
  const handleDelete = (id: string) => {
    console.info('handleDelete', id)
  }

  const [templateMessageList,setTemplateMessageList] = useState(Mock.mock(mockOptionsList).list)

  const columns = tableColumns({ handleDelete, templateTitleList:templateMessageList })
  const handleAdd = () => {
    setAddVisible(true)
  }
  const handleIndustires = () => {
    setIndustryVisible(true)
  }
  const Synchronous = () => {}

  const getTemplateMessageList=async()=>{
    const res=await getTemplateMessages({})
    setTemplateMessageList(res.records)
  }

  useEffect(()=>{
    getTemplateMessageList()
  },[])

  return (
    <ContentContainer className='template-message'>
      {cardView ? (
        <CardList setCardView={setCardView} templateMessageList={templateMessageList}/>
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
            </Button>
          ]}
          columns={columns}
          request={(params, sorter, filter) => {
            // 表单搜索项会从 params 传入，传递给后端接口。
            console.log('test sort', params, sorter, filter)
            return Promise.resolve({
              data:templateMessageList,
              success: true,
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
