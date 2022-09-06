import intl from 'react-intl-universal'

export interface CardType {
  title: string
  span: string
  icon: string
  backColor: string
  url?: string
}

export const PromotionTabList: any[] = [
  {
    title: intl.get('marketing.boost_sale_promo'),
    children: [
      {
        title: intl.get('marketing.boost_sale_promo_t1'),
        span: intl.get('marketing.boost_sale_promo_s1'),
        bacImg: 'bacImgVouchers',
        url: '/marketingCenter/vouchers',
      },
      {
        title: intl.get('marketing.boost_sale_promo_t2'),
        span: intl.get('marketing.boost_sale_promo_s2'),
        bacImg: 'bacImgDiscount',
        url: '/marketingCenter/comingSoon',
      },
      {
        title: intl.get('marketing.boost_sale_promo_t3'),
        span: intl.get('marketing.boost_sale_promo_s3'),
        bacImg: 'bacImgCampaigns',
        url: '/marketingCenter/comingSoon',
      },
    ],
  },
  {
    title: intl.get('marketing.engage_petowner'),
    children: [
      {
        title: intl.get('marketing.engage_petowner_t1'),
        span: intl.get('marketing.engage_petowner_s1'),
        bacImg: 'bacImgStreaming',
        url: '/marketingCenter/liveStreaming',
      },
    ],
  },
]
