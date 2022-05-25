import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import WxMenuContextProvider, { filterWxMenus, checkWxMenus } from './context'
import WxMenuGraph from './components/graph'
import WxMenuSetting from './components/setting'
import { WxMenuItem, WxMenu } from './type'
import { Button, message, Input, Form } from 'antd'
import { createWxMenu, getWxMenuDetail, updateWxMenu } from '@/framework/api/wechatSetting'
import _ from 'lodash'
import './index.less';

interface IProps {
  pageType: 'add' | 'edit'
}

const MenuManageDetail = (props: IProps) => {
  const [wxMenus, setWxMenus] = useState<WxMenuItem[]>([])
  const [wxMenuItem, setWxMenuItem] = useState<WxMenu>({})
  const [loading, setLoading] = useState<boolean>(false)
  const updateWxMenusInContext = (wxMenus: WxMenuItem[]) => {
    setWxMenus(wxMenus)
  }

  const navigator = useNavigate()
  const pageParams = useParams()

  useEffect(() => {
    if (props.pageType === "edit") {
      getWxMenu()
    }
  }, []);

  const getWxMenu = async () => {
    setLoading(true)
    const data = await getWxMenuDetail(pageParams.id || '')
    if (!data) {
      message.error({ className: 'rc-message', content: 'Get menu failed' })
      navigator('/menuManagempqr/menu-manage-list')
    } else {
      setWxMenuItem(data)
      setWxMenus(JSON.parse(data?.description ?? '{}').button ?? [])
    }
    setLoading(false)
  }

  const handleSave = async () => {
    if (wxMenus.length <= 0) {
      message.warn({ className: 'rc-message', content: 'Please add menu' })
      return;
    }
    if (!wxMenuItem.name) {
      message.warn({ className: 'rc-message', content: 'Please input menu name' })
      return;
    }
    if (!checkWxMenus(wxMenus)) {
      return;
    }
    setLoading(true)
    let success = false;
    if (props.pageType === 'edit') {
      success = await updateWxMenu({
        id: wxMenuItem.id,
        accountId: wxMenuItem.accountId,
        content: JSON.stringify({button: filterWxMenus(_.cloneDeep(wxMenus || []))}),
        name: wxMenuItem.name,
        description: JSON.stringify({button: _.cloneDeep(wxMenus || [])})
      });
    } else {
      success = await createWxMenu(wxMenuItem.name || "", JSON.stringify({button: filterWxMenus(_.cloneDeep(wxMenus || []))}), JSON.stringify({button: _.cloneDeep(wxMenus || [])}))
    }
    setLoading(false)
    if (success) {
      message.success({ className: 'rc-message', content: 'Save menu success' })
      navigator('/menuManagempqr/menu-manage-list')
    } else {
      message.error({ className: 'rc-message', content: 'Save menu failed' })
    }
  }

  return <div className="menu-manage-detail bg-white">
    <WxMenuContextProvider
      value={{
        wxMenus: wxMenus,
        setWxMenus: updateWxMenusInContext
      }}
    >
      <React.Fragment>
        <div className="text-lg">{props.pageType === "add" ? "Add New Menu" : "Edit Menu"}</div>
        <Form layout="horizontal" className="my-4">
          <Form.Item label="Menu Name" required rules={[{required: true, message: "Please input menu name"}]}>
            <Input style={{width: 300}} value={wxMenuItem.name} onChange={(e) => setWxMenuItem(Object.assign({}, wxMenuItem, { name: e.target.value }))} />
          </Form.Item>
        </Form>
        <div className="flex bg-gray-primary">
          <div className="flex-shrink-0">
            <WxMenuGraph />
          </div>
          <div className="flex-grow">
            <WxMenuSetting />
          </div>
        </div>
        <div className="mt-4 text-right space-x-4">
          <Button type="default" onClick={() => navigator('/menuManagempqr/menu-manage-list')}>Cancel</Button>
          <Button type="primary" loading={loading} onClick={handleSave}>Save and Publish</Button>
        </div>
      </React.Fragment>
    </WxMenuContextProvider>
  </div>;
};

export default MenuManageDetail;
