import React from 'react';
import { message } from 'antd';
import { WxMenuItem } from '../type';
import { validateUrl } from '@/utils/utils';
import intl from 'react-intl-universal';

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

const checkWxMenuItem: (wxMenu: WxMenuItem) => boolean = (wxMenu) => {
  if ((wxMenu.type === "media_id" && !wxMenu.media_id) || (wxMenu.type === "article_id" && !wxMenu.article_id)) {
    message.warn({ className: "rc-message", content: intl.get('wx.response_should_choose_asset') });
    return false;
  } else if (wxMenu.type === "view" && !validateUrl(wxMenu.url ?? '')) {
    message.warn({ className: "rc-message", content: intl.get('wx.redirect_should_contain_url') });
    return false;
  } else if (wxMenu.type === "miniprogram" && (!wxMenu.pageUrl || !wxMenu.appid || !wxMenu.pagePath)) {
    message.warn({ className: "rc-message", content: intl.get('wx.miniprogram_should_complete_setting') });
    return false;
  } else {
    return true;
  }
}

export const checkWxMenus: (wxMenus: WxMenuItem[]) => boolean = (wxMenus) => {
  let ret = true;
  try {
    wxMenus.forEach(item => {
      if ((item.sub_button || []).length) {
        item.sub_button?.forEach(sitem => {
          if (!checkWxMenuItem(sitem)) {
            throw new Error(intl.get('wx.menu_valid_fail'));
          }
        })
      } else if (!checkWxMenuItem(item)) {
        throw new Error(intl.get('wx.menu_valid_fail'));
      }
    });
  } catch(e) {
    ret = false;
  }
  return ret;
}

export const filterWxMenus: (wxMenus: WxMenuItem[]) => WxMenuItem[] = (wxMenus) => {
  wxMenus.forEach(item => {
    item.active = undefined;
    //??????api??????????????????news?????????responst?????????type???article_id, ????????????media_id?????????article_id
    if (item.type === "media_id" && item.rc_preview_type === "news") {
      item.type = "article_id";
      item.article_id = item.media_id;
      item.media_id = undefined;
    }
    (Object.keys(item) as Array<keyof WxMenuItem>).forEach((key: keyof WxMenuItem) => {
      if (key.startsWith('rc_preview')) {
        delete item[key]
      }
    });
    if (item.type === "media_id" || item.type === "article_id") {
      item.url = undefined;
      item.pageUrl = undefined;
      item.appid = undefined;
      item.pagePath = undefined;
    } else if (item.type === "view") {
      item.media_id = undefined;
      item.appid = undefined;
      item.pageUrl = undefined;
      item.pagePath = undefined;
    } else {
      item.media_id = undefined;
      item.url = item.pageUrl;
      item.pageUrl = undefined;
    }
    item.sub_button = filterWxMenus(item.sub_button || [])
  })
  return wxMenus
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
