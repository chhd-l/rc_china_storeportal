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

export const delWxMenu: (wxMenus: WxMenuItem[], key: string) => WxMenuItem[] = (wxMenus: WxMenuItem[], key: string) => {
  return wxMenus.reduce((prev: WxMenuItem[], curr: WxMenuItem) => {
    if (curr.key !== key) {
      curr.sub_button = delWxMenu(curr.sub_button || [], key)
      prev.push(curr);
    }
    return prev;
  }, []);
}

export const moveWxMenu: (wxMenus: WxMenuItem[], key: string, direction: 'forward' | 'backward') => WxMenuItem[] = (wxMenus, key, direction) => {
  const targetMenuIdx = wxMenus.findIndex(item => item.key === key);
  if ((targetMenuIdx === wxMenus.length - 1 && direction === 'backward') || (targetMenuIdx === 0 && direction === 'forward')) {
    return wxMenus;
  } else if (targetMenuIdx < 0) {
    return wxMenus.map(item => {
      item.sub_button = moveWxMenu(item.sub_button || [], key, direction);
      return item;
    });
  } else {
    const targetMenu = wxMenus[targetMenuIdx];
    wxMenus.splice(targetMenuIdx, 1);
    wxMenus.splice(direction === 'forward' ? targetMenuIdx - 1 : targetMenuIdx + 1, 0, targetMenu);
    return wxMenus;
  }
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
