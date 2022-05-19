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
        icon: 'icon-Vouchers',
        backColor: '#E6EEFA',
        url: '/marketingCentre/vouchers',
      },
      {
        title: 'Discount Promotions',
        span: 'Set discounts on your products to boost Sales',
        icon: 'icon-Discount',
        backColor: '#E6EEFA',
        url: '/marketingCentre/vouchers',
      },
      {
        title: 'Campaigns',
        span: 'Boost product sales by creating campaigns in your shop ',
        icon: 'icon-Campaigns',
        backColor: '#E6EEFA',
        url: '/marketingCentre/vouchers',
      },
    ],
  },
  {
    title: 'Engage with Your Pet Owner',
    children: [
      {
        title: 'Live Streaming',
        span: 'Connect Live with your audience and answer shopper questions easily',
        icon: 'icon-a-LiveStreaming',
        backColor: '#E5F5F4',
        url: '/marketingCentre/vouchers',
      },
    ],
  },
]
