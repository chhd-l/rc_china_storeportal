export interface CardType {
  title: string
  span: string
  icon: string
  backColor: string
  url?: string
}

export const PromotionTabList: any[] = [
  {
    title: 'Boost Sales with Promotion',
    children: [
      {
        title: 'Vouchers',
        span: 'Increase orders by offering buyers reduced prices at checkout with vouchers',
        bacImg: 'bacImgVouchers',
        url: '/marketingCenter/vouchers',
      },
      {
        title: 'Discount Promotions',
        span: 'Set discounts on your products to boost Sales',
        bacImg: 'bacImgDiscount',
        url: '/marketingCenter/comingSoon',
      },
      {
        title: 'Campaigns',
        span: 'Boost product sales by creating campaigns in your shop ',
        bacImg: 'bacImgCampaigns',
        url: '/marketingCenter/comingSoon',
      },
    ],
  },
  {
    title: 'Engage with Your Pet Owner',
    children: [
      {
        title: 'Live Streaming',
        span: 'Connect Live with your audience and answer shopper questions easily',
        bacImg: 'bacImgStreaming',
        url: '/marketingCenter/liveStreaming',
      },
    ],
  },
]
