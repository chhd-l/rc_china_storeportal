import dashboard_bg_1 from '../../../assets/images/dashboard_bg_1.png'
import dashboard_bg_2 from '../../../assets/images/dashboard_bg_2.png'
import dashboard_bg_3 from '../../../assets/images/dashboard_bg_3.png'
import dashboard_bg_4 from '../../../assets/images/dashboard_bg_4.png'
import dashboard_bg_5 from '../../../assets/images/dashboard_bg_5.png'
import dashboard_bg_6 from '../../../assets/images/dashboard_bg_6.png'
import dashboard_bg_7 from '../../../assets/images/dashboard_bg_7.png'
import dashboard_bg_8 from '../../../assets/images/dashboard_bg_8.png'
// import dashboard_bg_7 from '../../../assets/images/dashboard_bg_7.png'

const mainFunction = [
    {
        title: 'Shipment',
        span: 'Provide shipment tool for staff to achieve delivery of orders to consumers.',
        img: dashboard_bg_1,
        url: '/shipment-list'
    },
    {
        title: 'Order',
        span: 'Staff can manage order status, query order information, and provide comments for orders.',
        img: dashboard_bg_2,
        url: '/order/order-list'
    },
    {
        title: 'Subscription',
        span: 'Provide subscription tool for staff to query information, modify the delivery time, modify deliver address and add comment of subscription.',
        img: dashboard_bg_3,
        url: '/subscription/subscription-list'
    },
    {
        title: 'Product',
        span: 'Publish multiple types of products, including bundles and regular, and maintain product categories, product images, attributes, and specifications.',
        img: dashboard_bg_4,
        url: '/product/product-list'
    },
    {
        title: 'Marketing Center',
        span: 'Provide discounts, vouchers and other marketing tools to help store drainage and drive consumers to re-purchase.',
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
        title: 'Wechat Management',
        span: 'Support account management, fan management, automatic reply, wechat menu, graphic assets and other functions.',
        img: dashboard_bg_6,
        url: '/account/account-list'
    },
]
const exploreMore = [{
    title: 'D2C Solution',
    span: 'Through coupons, live streaming and other marketing methods to help users achleve precision marketing.',
    img: dashboard_bg_7,
    url: 'https://www.fivefen.com'
},
{
    title: 'API Document',
    span: 'Store decoration management order status and query comment.',
    img: dashboard_bg_8,
    url: 'https://apistg.fivefen.com'
},]
export const dashboardList = [{
    title: "Main Function",
    content: mainFunction
}, {
    title: "Explore More",
    content: exploreMore
}]