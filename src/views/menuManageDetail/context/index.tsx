import React from 'react';
import { WxMenuItem } from '../type';

interface IWxMenuContext {
  wxMenus?: WxMenuItem[]
  setWxMenus?: (wxMenus: WxMenuItem[]) => void
}

export const WxMenuContext = React.createContext<IWxMenuContext>({});

const WxMenuContextProvider = (props: { value: IWxMenuContext, children: React.ReactElement }) => (
  <WxMenuContext.Provider value={props.value}>
    {props.children}
  </WxMenuContext.Provider>
);

export const getActiveWxMenu: (wxMenus: WxMenuItem[]) => WxMenuItem | null | undefined = (wxMenus: WxMenuItem[]) => {
  const firstActiveMenu = wxMenus.find(item => item.active);
  const secondActiveMenu = (firstActiveMenu?.sub_button ?? []).find(item => item.active);
  return secondActiveMenu || firstActiveMenu
}

export const setActiveWxMenu: (wxMenus: WxMenuItem[], key: string) => WxMenuItem[] = (wxMenus: WxMenuItem[], key: string) => {
  return wxMenus.map((item) => {
    if (item.key === key) {
      item.active = true
    } else {
      item.active = false
    }
    return item
  })
}

export const setWxMenu = (wxMenus: WxMenuItem[], key: string, activeMenu: any) => {
  wxMenus.forEach(item => {
    if (item.key === key) {
      item = Object.assign(item, activeMenu)
    } else {
      item.sub_button = setWxMenu(item.sub_button || [], key, activeMenu);
    }
  });
  return wxMenus;
}

export default WxMenuContextProvider
