import ProCard from '@ant-design/pro-card'
import { ProFormSwitch } from '@ant-design/pro-form'
import { FC } from 'react'
import './index.less'
import { TemplateMessageItemProps } from '@/framework/types/wechat'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import intl from 'react-intl-universal'

export type Props = {
  setCardView: (val: boolean) => void
  templateMessageList: any[]
  modifyTemplateMessage: Function
}

const CardList: FC<Props> = ({ setCardView, templateMessageList, modifyTemplateMessage }) => {
  return (
    <div className="card-list">
      <ProCard
        style={{ marginTop: 8 }}
        gutter={[24, 24]}
        title={
          <>
            <div className="mb-4">{intl.get('templateMessage.Graphical Representation')}</div>
            <Button className="flex items-center  mr-3" onClick={() => setCardView(false)}>
              <span className="iconfont icon-bianzu2 mr-2 text-xl" />
              {intl.get('templateMessage.List Representation')}
            </Button>
          </>
        }
      >
        {templateMessageList.map((template: TemplateMessageItemProps) => (
          <ProCard
            title={template.scenario}
            key={template.id}
            bordered
            colSpan={8}
            extra={
              <ProFormSwitch
                name="status"
                fieldProps={{
                  onChange: () => modifyTemplateMessage && modifyTemplateMessage(template),
                  checked: template.status,
                }}
              />
            }
            headerBordered
          >
            <div className="template-content">
              <div>
                {template.example?.split('\r\n')?.map((item: string) => (
                  <div>{item}</div>
                ))}
              </div>
              <div className="modify-btn">
                <Link to={`/template/template-message/${template.id}`} className="mr-4">
                  {intl.get('templateMessage.Modify')}
                </Link>
              </div>
            </div>
            <div className="template-footer">
              <div className="template-title">
                {intl.get('templateMessage.Template Name:')}
                {template.title}
              </div>
              <div className="">{intl.get('templateMessage.Template ID:')}</div>
              <div>{template.id}</div>
            </div>
          </ProCard>
        ))}
      </ProCard>
    </div>
  )
}

export default CardList
