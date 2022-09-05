import dashboard_bg_1 from '../../../assets/images/dashboard_bg_1.png'
import dashboard_bg_2 from '../../../assets/images/dashboard_bg_2.png'
import dashboard_bg_3 from '../../../assets/images/dashboard_bg_3.png'
import dashboard_bg_4 from '../../../assets/images/dashboard_bg_4.png'
import dashboard_bg_5 from '../../../assets/images/dashboard_bg_5.png'
import dashboard_bg_6 from '../../../assets/images/dashboard_bg_6.png'
import dashboard_bg_7 from '../../../assets/images/dashboard_bg_7.png'
import dashboard_bg_8 from '../../../assets/images/dashboard_bg_8.png'
// import dashboard_bg_7 from '../../../assets/images/dashboard_bg_7.png'
import intl from 'react-intl-universal'

const mainFunction = [
    {
        title: intl.get("dashboard.shipment"),
        span: intl.get("dashboard.shipment_desc"),
        img: dashboard_bg_1,
        url: '/shipment-list'
    },
    {
        title: intl.get("dashboard.order"),
        span: intl.get("dashboard.order_desc"),
        img: dashboard_bg_2,
        url: '/order/order-list'
    },
    {
        title: intl.get("dashboard.subscription"),
        span: intl.get("dashboard.subscription_desc"),
        img: dashboard_bg_3,
        url: '/subscription/subscription-list'
    },
    {
        title: intl.get("dashboard.product"),
        span: intl.get("dashboard.product_desc"),
        img: dashboard_bg_4,
        url: '/product/product-list'
    },
    {
        title: intl.get("dashboard.marketing"),
        span: intl.get("dashboard.marketing_desc"),
        img: dashboard_bg_5,
        url: '/marketingCenter/marketingCenter-list'
    },
    // {
    //     title: 'Shop Decoration',
    //     span: 'Support staff to quickly build a distinctive mall with component modules to achieve personalized display of store content.',
    //     img: dashboard_bg_6,
    //     url: ''
    // },
    {
        title: intl.get("dashboard.channel"),
        span: intl.get("dashboard.channel_desc"),
        img: dashboard_bg_6,
        url: '/account/account-list'
    },
]
const exploreMore = [{
    title: intl.get("dashboard.solution"),
    span: intl.get("dashboard.solution_desc"),
    img: dashboard_bg_7,
    url: 'https://www.fivefen.com'
},
{
    title: intl.get("dashboard.apidoc"),
    span: intl.get("dashboard.apidoc_desc"),
    img: dashboard_bg_8,
    url: 'https://apistg.fivefen.com'
},]
export const dashboardList = [{
    title: intl.get("dashboard.main"),
    content: mainFunction
},
    // {
    //     title: intl.get("dashboard.more"),
    //     content: exploreMore
    // }
]