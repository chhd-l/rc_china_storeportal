import React from 'react'
import { WxMenuContext, getActiveWxMenu, setWxMenu, delWxMenu, moveWxMenu } from '../context'
import { Input, Form, Radio, RadioChangeEvent, Tooltip, Modal } from 'antd'
import { getAccountList } from "@/framework/api/wechatSetting";
import _ from 'lodash'
import ResponseType from './response-type'
import RedirectionType from './redirection-type'
import MiniProgramType from './miniprogram-type'

const WxMenuSetting = () => {
  const { wxMenus, setWxMenus } = React.useContext(WxMenuContext);
  const [miniProgramList, setMiniProgramList] = React.useState<any[]>([]);
  const activeMenu = getActiveWxMenu(wxMenus || []);

  const miniProgramFormRef = React.useRef<any>();

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

  const deleteWxMenu = (key: string) => {
    Modal.confirm({
      className: 'rc-modal',
      title: 'Delete',
      content: 'Are you sure you want to delete it? The content set under this menu will be deleted after deletion.',
      okText: 'Confirm',
      cancelText: 'Cancel',
      closable: true,
      icon: null,
      onOk: () => {
        const newWxMenus = delWxMenu(wxMenus || [], key);
        setWxMenus && setWxMenus(_.cloneDeep(newWxMenus));
      }
    });
  }

  const moveWxMenuInOrder = (key: string, direction: 'forward' | 'backward') => {
    const newWxMenus = moveWxMenu(wxMenus || [], key, direction);
    setWxMenus && setWxMenus(_.cloneDeep(newWxMenus));
  }

  React.useEffect(() => {
    getMiniProgramList()
  }, [])

  const getMiniProgramList = async () => {
    const data = await getAccountList({
      limit: 100,
      offset: 0,
      sample: { storeId: "12345678", status: true },
    });
    setMiniProgramList((data?.records ?? []).filter((item: any) => item.accountType === 'MiniProgram'));
  }

  return (
    <div className="bg-gray-primary">
      <div className="p-4 border-b border-gray-200 flex justify-between">
        <span className="text-lg">Menu Name</span>
        {activeMenu && <div className="space-x-4">
          <Tooltip title="Delete">
            <span className="iconfont icon-delete primary-color cursor-pointer" onClick={() => deleteWxMenu(activeMenu.key)}></span>
          </Tooltip>
          {(wxMenus || []).findIndex(item => item.key === activeMenu.key) > -1 ? <>
            <Tooltip title="Move Left">
              <span className="iconfont icon-Frame5 primary-color cursor-pointer" onClick={() => moveWxMenuInOrder(activeMenu.key, 'forward')}></span>
            </Tooltip>
            <Tooltip title="Move right">
              <span className="iconfont icon-Frame-12 primary-color cursor-pointer" onClick={() => moveWxMenuInOrder(activeMenu.key, 'backward')}></span>
            </Tooltip>
          </> : <>
            <Tooltip title="Move Up">
              <span className="iconfont icon-Frame-21 primary-color cursor-pointer" onClick={() => moveWxMenuInOrder(activeMenu.key, 'forward')}></span>
            </Tooltip>
            <Tooltip title="Move Down">
              <span className="iconfont icon-Frame-31 primary-color cursor-pointer" onClick={() => moveWxMenuInOrder(activeMenu.key, 'backward')}></span>
            </Tooltip>
          </>}
        </div>}
      </div>
      {activeMenu && <div className="p-8">
        <Form layout="horizontal">
          <Form.Item label="Menu Name" extra={<div className="text-xs text-gray-400">No longer than 4 Chinese characters or 8 English characters are recommended</div>}>
            <Input style={{maxWidth: 300}} value={activeMenu.name} onChange={(e) => changeMenuName(e, activeMenu.key)} />
          </Form.Item>
          {activeMenu?.sub_button?.length ? null : <React.Fragment>
            <Form.Item label="Content">
              <Radio.Group value={activeMenu.type} onChange={(e) => changeMenuType(e, activeMenu.key)}>
                <Radio value="media_id">Send response message</Radio>
                <Radio value="view">Web redirection</Radio>
                <Radio value="miniprogram">Joint with Miniprogram</Radio>
              </Radio.Group>
            </Form.Item>
            {activeMenu.type === 'media_id' ? <ResponseType /> : activeMenu.type === 'view' ? <RedirectionType /> : <MiniProgramType miniProgramList={miniProgramList} ref={miniProgramFormRef} />}
          </React.Fragment>}
        </Form>
      </div>}
    </div>
  )
}

export default WxMenuSetting
