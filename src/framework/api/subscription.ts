import apis from '@/framework/config/api-config'
import ApiRoot from '@/framework/api/fetcher'

export const getSubscriptionList = async (param: any) => {
  const res = await ApiRoot({ url: apis?.sc_subscription }).subscriptions().getSubscriptionListPage({
    body: param
  })
  console.log('get subscriptionlistpage view data:', res)
  return {
    records: res?.subscriptionFindPage?.records ?? [],
    total: res?.subscriptionFindPage?.total ?? 0
  }
}

export const pauseSubscription = async (id: string) => {
  const res = await ApiRoot({ url: apis?.sc_subscription }).subscriptions().pauseSubscription(id)
  console.log('pause subscription view data:', res)
  return res?.subscriptionPause || false
}

export const resumeSubscription = async (id: string) => {
  const res = await ApiRoot({ url: apis?.sc_subscription }).subscriptions().resumeSubscription(id)
  console.log('resume subscription view data:', res)
  return res?.subscriptionResume || false
}

export const getSubscriptionDetail = async (id: string) => {
  const res = await ApiRoot({ url: apis?.com_subscription }).subscriptions().subscriptionDetail({
    id
  })
  console.log("get subscriptiondetail view data:", res)
  return res || {}
}
// export const getSubscriptionFindByConsumerId = async (consumerId: any) => {
//   const res = await ApiRoot().subscriptions().subscriptionFindByConsumerId({
//     consumerId
//   })
//   console.log("get subscriptiondetail view data:", res)
//   return res?.subscriptionFindByConsumerId || []
// }

export const updateSubscriptionAddress = async (id: string, address: any) => {
  const res = await ApiRoot({ url: apis?.sc_subscription }).subscriptions().updateSubscriptionAddress(id, address)
  console.log("update subscription address view data:", res)
  return res?.subscriptionUpdateAddress || false
}

export const updateNextDeliveryDate = async (id: string, date: string) => {
  const res = await ApiRoot({ url: apis?.com_subscription }).subscriptions().subscriptionScheduleNextDelivery({ body: { id, nextDeliveryDate: date, operator: 'zz' } })
  console.log("update subscription next delivery date view data:", res)
  return res?.subscriptionScheduleNextDelivery || false
}

export const upsertSubscriptionComment = async (param: any) => {
  const res = await ApiRoot({ url: apis?.sc_subscription }).subscriptions().upsertSubscriptionComment({ body: param })
  console.log("upsert subscription comment view data:", res)
  return res?.subscriptionCommentUpsert || false
}
