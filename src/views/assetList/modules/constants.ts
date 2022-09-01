import { BaseListProps } from "@/framework/types/common";
import intl from 'react-intl-universal';

export const tabList: any[] = [
  {
    label: intl.get('wx.picture'),
    key: "image",
  },
  {
    label: intl.get('wx.graphic_message'),
    key: 'news',
  },
  {
    label: intl.get('wx.voice'),
    key: 'voice',
  },
  {
    label: intl.get('wx.video'),
    key: 'video',
  },
];
