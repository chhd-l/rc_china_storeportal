import React from 'react'
import { Input, Form } from 'antd'
import { WxMenuContext, setWxMenu, getActiveWxMenu } from '../context'
import _ from 'lodash'
import intl from 'react-intl-universal'

const RedirectionType = () => {
  const { wxMenus, setWxMenus } = React.useContext(WxMenuContext)
  const activeMenu = getActiveWxMenu(wxMenus || [])

  const changeUrl = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const newWxMenus = setWxMenu(wxMenus || [], key, {
      url: e.target.value
    })
    setWxMenus && setWxMenus(_.cloneDeep(newWxMenus))
  }

  return (
    <div className="redirection-type p-4 border border-gray-200 bg-white">
      <Form layout="horizontal" labelCol={{span: 6}} wrapperCol={{span: 12}} labelAlign="right">
        <div className="text-gray-400 mb-4">{intl.get('wx.click_to_jump_link')}</div>
        <Form.Item label={intl.get('wx.page_url')}>
          <Input value={activeMenu?.url} onChange={(e) => changeUrl(e, activeMenu?.key ?? '')} />
        </Form.Item>
      </Form>
    </div>
  )
}

export default RedirectionType
