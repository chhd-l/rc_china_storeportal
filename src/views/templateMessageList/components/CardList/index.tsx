import ProCard from '@ant-design/pro-card'
import { ProFormSwitch } from '@ant-design/pro-form'
import { FC } from 'react'
import Mock from 'mockjs'
import { messageList } from '../../modules/mockdata'
import './index.less'
import { TemplateMessageItemProps } from '@/framework/types/wechat'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
export type Props = {
  setCardView: (val: boolean) => void
}
const templateTitleList = Mock.mock(messageList).list

const CardList: FC<Props> = ({ setCardView }) => {
  return (
    <div className='card-list'>
      <ProCard
        style={{ marginTop: 8 }}
        gutter={[24, 24]}
        title={
          <>
            <div className='mb-4'>Graphical Representation</div>
            <Button className='flex items-center  mr-3' onClick={() => setCardView(false)}>
              <span className='iconfont icon-bianzu2 mr-2 text-xl' />
              List Representation
            </Button>
          </>
        }
      >
        {templateTitleList.map((template: TemplateMessageItemProps) => (
          <ProCard
            title={template.scenario}
            bordered
            colSpan={8}
            extra={<ProFormSwitch name='status' label='Switch' />}
            headerBordered
          >
            <div className='template-content'>
              <div>{`${template.content}`}</div>

              <div className='modify-btn'>
                <Link to={`/template/template-message/${template.id}`} className='mr-4'>
                  Modify
                </Link>
              </div>
            </div>
            <div className='template-footer'>
              <div className='template-title'>Template Name:{template.title}</div>
              <div className=''>Template ID:</div>
              <div>{template.id}</div>
            </div>
          </ProCard>
        ))}
      </ProCard>
    </div>
  )
}

export default CardList
