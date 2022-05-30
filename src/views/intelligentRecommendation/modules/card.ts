export interface CardType {
    title: string
    children?: CardType[]
    span?: string
    Enable?: Function
    Edit?: Function
    Details?: Function
    open?: Function
}

export const IntelligentRecommendationList: CardType[] = [
    {
        title: 'Recommended Basic Settings',
        children: [
            {
                title: 'Product Recommendation Management',
                span: 'Manually set weight for products or ban certain products',
            },
        ],
    },
    {
        title: 'Recommendation Strategy Management',
        children: [
            {
                title: 'Top Recommendation',
                span: 'Sorting products according to the overall dimensional statistics, which is usually used in "Hot Sale".',
            },
            {
                title: 'Recommendation Based On Product Relativity',
                span: 'Recommend items related to the current item to enhance product co-sale. Commonly found in modules such as "Related Recommendations" on the product details page.',
            },
            {
                title: 'Recommendation Based On Consumer Interest',
                span: 'Provide custom recommendation service including recommending products based on user interests, which is often used in modules such as "you may also like".',
            },
            {
                title: 'Product finder',
                span: 'Provide custom recommendation service including recommending products based on subscription type and pet information, which is often used in modules such as "product finder".',
            },
        ],
    },
    {
        title: 'Recommended Spot management',
        children: [
            {
                title: 'Shopping Cart',
                span: 'Recommendation based on product relativity',
            },
            {
                title: 'Product Detail',
                span: 'Recommendation based on user interest',
            },
            {
                title: 'Product List',
                span: 'Top recommendation',
            },
            {
                title: 'My Account',
                span: 'Recommendation based on user interest',
            },
            {
                title: 'Member Center',
                span: 'Recommendation based on user interest',
            },
            {
                title: 'Order Confirmation Page',
                span: 'Top recommendation',
            },
            {
                title: 'Category',
                span: 'Recommendation based on product relativity',
            },
            {
                title: 'Category Recommendation Channels',
                span: 'Recommendation based on user interest',
            },
        ],
    },
]
