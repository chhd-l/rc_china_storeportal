export interface SearchParamsProps {
  roomId: string
  name: string
  anchorName: string
  startTime: string
  endTime: string
  accountName:string
}

export const initSearchParams: SearchParamsProps = {
  roomId: '',
  name: '',
  anchorName: '',
  startTime: '',
  endTime: '',
  accountName:''
}

export const liveStreamTabList = [
  {
    label: 'All',
    key: '',
  },
  {
    label: 'Ongoing',
    key: 101,//直播中
  },
  {
    label: 'Upcoming',
    key: 102,//未开始
  },
  {
    label: 'Expired',
    key: 107,//已过期
  },
]
