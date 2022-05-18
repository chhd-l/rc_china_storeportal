export interface CardType {
    title: string;
    span: string;
    icon: string;
    backColor: string;
}

export const conter: CardType[] = [
    {
        title: 'Vouchers',
        span: 'Increase orders by offering buyers reduced prices at checkout with vouchers',
        icon: 'icon-Vouchers',
        backColor: '#E6EEFA'
    },
    {
        title: 'Discount Promotions',
        span: 'Set discounts on your products to boost Sales',
        icon: 'icon-Discount',
        backColor: '#E6EEFA'
    },
    {
        title: 'Campaigns',
        span: 'Boost product sales by creating campaigns in your shop ',
        icon: 'icon-Vouchers',
        backColor: '#E6EEFA'
    },
]