import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import WxMenuContextProvider, { filterWxMenus } from './context'
import WxMenuGraph from './components/graph'
import WxMenuSetting from './components/setting'
import { WxMenuItem, WxMenu } from './type'
import { Button, message } from 'antd'
import { createWxMenu, getWxMenuDetail, updateWxMenu } from '@/framework/api/wechatSetting'
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
      setWxMenus(JSON.parse(data?.content ?? '{}').button ?? [])
    }
    setLoading(false)
  }

  const handleSave = async () => {
    if (wxMenus.length <= 0) {
      message.error({ className: 'rc-message', content: 'Please add menu' })
      return;
    }
    setLoading(true)
    let success = false;
    if (props.pageType === 'edit') {
      success = await updateWxMenu({
        id: wxMenuItem.id,
        accountId: wxMenuItem.accountId,
        content: JSON.stringify({button: filterWxMenus(wxMenus || [], [])})
      });
    } else {
      success = await createWxMenu(JSON.stringify({button: filterWxMenus(wxMenus || [], [])}))
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
        <div className="mb-8 text-lg">{props.pageType === "add" ? "Add New Menu" : "Edit Menu"}</div>
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
