import intl from 'react-intl-universal';

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
        title: intl.get("marketing.recom_basic_setting"),
        children: [
            {
                title: intl.get("marketing.recom_basic_setting_t1"),
                span: intl.get("marketing.recom_basic_setting_s1"),
                bgcImg: 'RecommendationCard',
            },
        ],
    },
    {
        title: intl.get("marketing.recom_strategy_manage"),
        children: [
            {
                title: intl.get("marketing.recom_strategy_manage_t1"),
                span: intl.get("marketing.recom_strategy_manage_s1"),
                bgcImg: 'TopRecommendationCard',
            },
            {
                title: intl.get("marketing.recom_strategy_manage_t2"),
                bgcImg: 'BasedOnProductRelativityCard',
                span: intl.get("marketing.recom_strategy_manage_s2"),
            },
            {
                title: intl.get("marketing.recom_strategy_manage_t3"),
                bgcImg: 'InterestyCardCard',
                span: intl.get("marketing.recom_strategy_manage_s3"),
            },
            {
                title: intl.get("marketing.recom_strategy_manage_t4"),
                bgcImg: 'ProductfinderCard',
                span: intl.get("marketing.recom_strategy_manage_s4"),
            },
        ],
    },
    {
        title: intl.get("marketing.recom_spot_manage"),
        children: [
            {
                title: intl.get("marketing.recom_spot_manage_t1"),
                bgcImg: 'ShoppingCartCard',
                span: intl.get("marketing.recom_spot_manage_s1"),
            },
            {
                title: intl.get("marketing.recom_spot_manage_t2"),
                bgcImg: 'ProductDetailCard',
                span: intl.get("marketing.recom_spot_manage_s2"),
            },
            {
                title: intl.get("marketing.recom_spot_manage_t3"),
                bgcImg: 'ProductListCard',
                span: intl.get("marketing.recom_spot_manage_s3"),
            },
            {
                title: intl.get("marketing.recom_spot_manage_t4"),
                bgcImg: 'MyAccountCard',
                span: intl.get("marketing.recom_spot_manage_s4"),
            },
            {
                title: intl.get("marketing.recom_spot_manage_t5"),
                bgcImg: 'MemberCenterCard',
                span: intl.get("marketing.recom_spot_manage_s5"),
            },
            {
                title: intl.get("marketing.recom_spot_manage_t6"),
                span: intl.get("marketing.recom_spot_manage_s6"),
                bgcImg: 'OrderConfirmationPageCard',
            },
            {
                title: intl.get("marketing.recom_spot_manage_t7"),
                bgcImg: 'CategoryCard',
                span: intl.get("marketing.recom_spot_manage_s7"),
            },
            {
                title: intl.get("marketing.recom_spot_manage_t8"),
                bgcImg: 'ChannelsCard',
                span: intl.get("marketing.recom_spot_manage_s8"),
            },
        ],
    },
]
