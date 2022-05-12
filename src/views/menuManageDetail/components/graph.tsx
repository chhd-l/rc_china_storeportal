import React from 'react'
import { WxMenuContext, setActiveWxMenu } from '../context'
import { uuid } from '@/utils/utils'
import _ from 'lodash';

const WxMenuGraph = () => {
  const { wxMenus, setWxMenus } = React.useContext(WxMenuContext)

  const addNewMainMenu = () => {
    const newWxMenus = _.cloneDeep(wxMenus) || [];
    const newWxMenuKey = uuid();
    newWxMenus.push({
      key: newWxMenuKey,
      name: 'Menu Name',
      type: 'click',
      sub_button: []
    });
    setWxMenus && setWxMenus(setActiveWxMenu(newWxMenus, newWxMenuKey));
  }

  const addSubMenu = (e: React.MouseEvent, firstKey: string) => {
    e.stopPropagation();
    const newWxMenus = wxMenus || [];
    const newSubMenuKey = uuid();
    newWxMenus.forEach(item => {
      if (item.key === firstKey) {
        const subMenus = item.sub_button || [];
        subMenus.push({
          key: newSubMenuKey,
          name: 'Menu Name',
          type: 'click'
        });
        item.sub_button = setActiveWxMenu(subMenus, newSubMenuKey)
      }
    });
    setWxMenus && setWxMenus(_.cloneDeep(newWxMenus))
  }

  const chooseFirstMenu = (key: string) => {
    const newWxMenus = wxMenus || [];
    newWxMenus.forEach(item => {
      item.sub_button = setActiveWxMenu(item.sub_button || [], '')
    });
    setWxMenus && setWxMenus(_.cloneDeep(setActiveWxMenu(newWxMenus, key)))
  }

  const chooseSencondMenu = (e: React.MouseEvent, firstKey: string, secondKey: string) => {
    e.stopPropagation();
    const newWxMenus = wxMenus || [];
    newWxMenus.forEach(item => {
      if (item.key === firstKey) {
        item.sub_button = setActiveWxMenu(item.sub_button || [], secondKey)
      }
    });
    setWxMenus && setWxMenus(_.cloneDeep(newWxMenus))
  }

  return (<div className="wx-container">
    <div className="wx-graph bg-white">
      <div className="wx-header">App</div>
      <div className="wx-menus flex">
        {wxMenus?.map((item, idx) => (
          <div key={idx} className={`wx-menu-item flex-grow ${item.active ? 'active' : ''}`} onClick={() => chooseFirstMenu(item.key)}>
            <div>{item.name}</div>
            {item.active ? <div className="wx-submenu">
              {(item.sub_button || []).map((sitem, sidx) => (
                <div key={`${idx}-${sidx}`} className={`wx-menu-item flex-grow ${sitem.active ? 'active' : ''}`} onClick={(e) => chooseSencondMenu(e, item.key, sitem.key)}>{sitem.name}</div>
              ))}
              {(item.sub_button || []).length < 5 ? <div key={`${idx}-add`} className="wx-menu-item flex-grow" onClick={(e) => addSubMenu(e, item.key)}>+ Menu</div> : null}
            </div> : null}
          </div>
        ))}
        {(wxMenus ?? []).length < 3 ? <div key="main-add" className="wx-menu-item flex-grow" onClick={() => addNewMainMenu()}>+ Menu</div> : null}
      </div>
    </div>
  </div>)
}

export default WxMenuGraph