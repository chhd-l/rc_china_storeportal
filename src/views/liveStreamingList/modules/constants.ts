import intl from 'react-intl-universal';

export interface SearchParamsProps {
  roomId: string
  name: string
  anchorName: string
  startTime: string
  endTime: string
  accountName: any
}

export const initSearchParams: SearchParamsProps = {
  roomId: '',
  name: '',
  anchorName: '',
  startTime: '',
  endTime: '',
  accountName: null
}

export const liveStreamTabList = [
  {
    label: intl.get('wx.all'),
    key: '',
  },
  {
    label: intl.get('wx.ongoing'),
    key: 101,//直播中
  },
  {
    label: intl.get('wx.upcoming'),
    key: 102,//未开始
  },
  {
    label: intl.get('wx.expired'),
    key: 107,//已过期
  },
]
