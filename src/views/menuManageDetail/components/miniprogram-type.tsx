import React from 'react'
import { Input, Form } from 'antd'
import { WxMenuContext, setWxMenu, getActiveWxMenu } from '../context'
import _ from 'lodash'

const MiniProgramType = () => {
  const { wxMenus, setWxMenus } = React.useContext(WxMenuContext)
  const activeMenu = getActiveWxMenu(wxMenus || [])

  const changeMenuItem = (key: string, value: any) => {
    const newWxMenus = setWxMenu(wxMenus || [], key, value)
    setWxMenus && setWxMenus(_.cloneDeep(newWxMenus))
  }

  return (
    <div className="redirection-type p-4 border border-gray-200 bg-white">
      <Form layout="horizontal" labelCol={{span: 6}} wrapperCol={{span: 12}} labelAlign="right">
        <div className="text-gray-400 mb-4">Subscribers click on this menu to jump to the following Mini Program</div>
        <Form.Item label="URL">
          <Input value={activeMenu?.url} onChange={(e) => changeMenuItem(activeMenu?.key || '', { url: e.target.value })} />
        </Form.Item>
        <Form.Item label="AppID">
          <Input value={activeMenu?.appid} onChange={(e) => changeMenuItem(activeMenu?.key || '', { appid: e.target.value })} />
        </Form.Item>
        <Form.Item label="PagePath">
          <Input value={activeMenu?.pagepath} onChange={(e) => changeMenuItem(activeMenu?.key || '', { pagepath: e.target.value })} />
        </Form.Item>
      </Form>
    </div>
  )
}

export default MiniProgramType
