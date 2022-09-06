import React from 'react'
import { Input, Form, Select } from 'antd'
import { WxMenuContext, setWxMenu, getActiveWxMenu } from '../context'
import _ from 'lodash'
import intl from 'react-intl-universal'

const MiniProgramType = React.forwardRef((props: { miniProgramList: any[] }, ref) => {
  const { wxMenus, setWxMenus } = React.useContext(WxMenuContext)
  const activeMenu = getActiveWxMenu(wxMenus || [])
  const [form] = Form.useForm();

  const changeMenuItem = (key: string, value: any) => {
    const newWxMenus = setWxMenu(wxMenus || [], key, value)
    setWxMenus && setWxMenus(_.cloneDeep(newWxMenus))
  }

  React.useImperativeHandle(ref, () => ({ form }));

  return (
    <div className="redirection-type p-4 border border-gray-200 bg-white">
      <Form form={form} layout="horizontal" labelCol={{span: 6}} wrapperCol={{span: 12}} labelAlign="right">
        <div className="text-gray-400 mb-4">{intl.get('wx.click_to_jump_miniprogram')}</div>
        <Form.Item label={intl.get('wx.mini_program')}>
          <Select value={activeMenu?.appid} onChange={(val) => changeMenuItem(activeMenu?.key || '', { appid: val })}>
            {(props.miniProgramList ?? []).map((item, idx) => (
              <Select.Option key={idx} value={item.appId}>{item.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={intl.get('wx.url')}>
          <Input value={activeMenu?.pageUrl} onChange={(e) => changeMenuItem(activeMenu?.key || '', { pageUrl: e.target.value })} />
        </Form.Item>
        <Form.Item label={intl.get('wx.page_path')}>
          <Input value={activeMenu?.pagePath} onChange={(e) => changeMenuItem(activeMenu?.key || '', { pagePath: e.target.value })} />
        </Form.Item>
      </Form>
    </div>
  )
})

export default MiniProgramType
