export type CardType = {
    title: string
    span: string
    Enable?: Function | null
    Edit?: Function | null
    Details?: Function | null
    open?: Function | null
    bgcImg: string
}
export type CardTypeList = {
    title: string
    children: CardType[]
}

export const IntelligentRecommendationList: CardTypeList[] = [
    {
        title: 'Recommended Basic Settings',
        children: [
            {
                title: 'Product Recommendation Management',
                span: 'Manually set weight for products or ban certain products',
                bgcImg: 'RecommendationCard',
            },
        ],
    },
    {
        title: 'Recommendation Strategy Management',
        children: [
            {
                title: 'Top Recommendation',
                span: 'Sorting products according to the overall dimensional statistics, which is usually used in "Hot Sale".',
                bgcImg: 'TopRecommendationCard',
            },
            {
                title: 'Recommendation Based On Product Relativity',
                bgcImg: 'BasedOnProductRelativityCard',
                span: 'Recommend items related to the current item to enhance product co-sale. Commonly found in modules such as "Related Recommendations" on the product details page.',
            },
            {
                title: 'Recommendation Based On Consumer Interest',
                bgcImg: 'InterestyCardCard',
                span: 'Provide custom recommendation service including recommending products based on user interests, which is often used in modules such as "you may also like".',
            },
            {
                title: 'Product finder',
                bgcImg: 'ProductfinderCard',
                span: 'Provide custom recommendation service including recommending products based on subscription type and pet information, which is often used in modules such as "product finder".',
            },
        ],
    },
    {
        title: 'Recommended Spot management',
        children: [
            {
                title: 'Shopping Cart',
                bgcImg: 'ShoppingCartCard',
                span: 'Recommendation based on product relativity',
            },
            {
                title: 'Product Detail',
                bgcImg: 'ProductDetailCard',
                span: 'Recommendation based on user interest',
            },
            {
                title: 'Product List',
                bgcImg: 'ProductListCard',
                span: 'Top recommendation',
            },
            {
                title: 'My Account',
                bgcImg: 'MyAccountCard',
                span: 'Recommendation based on user interest',
            },
            {
                title: 'Member Center',
                bgcImg: 'MemberCenterCard',
                span: 'Recommendation based on user interest',
            },
            {
                title: 'Order Confirmation Page',
                span: 'Top recommendation',
                bgcImg: 'OrderConfirmationPageCard',
            },
            {
                title: 'Category',
                bgcImg: 'CategoryCard',
                span: 'Recommendation based on product relativity',
            },
            {
                title: 'Category Recommendation Channels',
                bgcImg: 'ChannelsCard',
                span: 'Recommendation based on user interest',
            },
        ],
    },
]
