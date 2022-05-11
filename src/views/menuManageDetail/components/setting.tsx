import React from 'react'
import { WxMenuContext, getActiveWxMenu, setWxMenu } from '../context'
import { Input, Form, Radio, RadioChangeEvent } from 'antd'
import _ from 'lodash'
import ResponseType from './response-type'
import RedirectionType from './redirection-type'
import MiniProgramType from './miniprogram-type'

const WxMenuSetting = () => {
  const { wxMenus, setWxMenus } = React.useContext(WxMenuContext);
  const activeMenu = getActiveWxMenu(wxMenus || []);

  const changeMenuName = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const newWxMenus = setWxMenu(wxMenus || [], key, {
      name: e.target.value
    });
    setWxMenus && setWxMenus(_.cloneDeep(newWxMenus));
  }

  const changeMenuType = (e: RadioChangeEvent, key: string) => {
    const newWxMenus = setWxMenu(wxMenus || [], key, {
      type: e.target.value
    });
    setWxMenus && setWxMenus(_.cloneDeep(newWxMenus));
  }

  return (
    <div className="bg-gray-primary">
      <div className="p-4 border-b border-gray-200 flex">
        <span className="text-lg">Menu Name</span>
      </div>
      {activeMenu && <div className="p-8">
        <Form layout="horizontal">
          <Form.Item label="Menu Name" extra={<div className="text-xs text-gray-400">No longer than 4 Chinese characters or 8 English characters</div>}>
            <Input style={{maxWidth: 300}} value={activeMenu.name} onChange={(e) => changeMenuName(e, activeMenu.key)} />
          </Form.Item>
          {activeMenu?.sub_button?.length ? null : <React.Fragment>
            <Form.Item label="Content">
              <Radio.Group value={activeMenu.type} onChange={(e) => changeMenuType(e, activeMenu.key)}>
                <Radio value="click">Send response message</Radio>
                <Radio value="view">Web redirection</Radio>
                <Radio value="miniprogram">Joint with Miniprogram</Radio>
              </Radio.Group>
            </Form.Item>
            {activeMenu.type === 'click' ? <ResponseType /> : activeMenu.type === 'view' ? <RedirectionType /> : <MiniProgramType />}
          </React.Fragment>}
        </Form>
      </div>}
    </div>
  )
}

export default WxMenuSetting
