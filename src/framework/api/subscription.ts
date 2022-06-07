import ApiRoot from '@/framework/api/fetcher'

export const getSubscriptionList = async (param: any) => {
  const res = await ApiRoot.subscriptions().getSubscriptionListPage({
    body: param
  });
  console.log('get subscriptionlistpage view data:', res);
  return {
    records: res?.subscriptionFindPage?.records ?? [],
    total: res?.subscriptionFindPage?.total ?? 0
  }
}

export const pauseSubscription = async (id: string) => {
  const res = await ApiRoot.subscriptions().pauseSubscription(id);
  console.log('pause subscription view data:', res);
  return res?.subscriptionPause || false
}

export const resumeSubscription = async (id: string) => {
  const res = await ApiRoot.subscriptions().resumeSubscription(id);
  console.log('resume subscription view data:', res);
  return res?.subscriptionResume || false
}

export const getSubscriptionDetail = async (id: string) => {
  const res = await ApiRoot.subscriptions().subscriptionDetail({
    id
  });
  console.log("get subscriptiondetail view data:", res);
  return res?.subscriptionDetail || {}
}
export const getSubscriptionFindByCustomerId = async ( customerId:any ) => {
  const res = await ApiRoot.subscriptions().subscriptionFindByCustomerId({
    customerId
  });
  console.log("get subscriptiondetail view data:", res);
  return res?.subscriptionFindByCustomerId || []
}

export const updateSubscriptionAddress = async (id: string, address: any) => {
  const res = await ApiRoot.subscriptions().updateSubscriptionAddress(id, address);
  console.log("update subscription address view data:", res);
  return res?.subscriptionUpdateAddress || false
}

export const updateNextDeliveryDate = async (id: string, date: string) => {
  const res = await ApiRoot.subscriptions().subscriptionScheduleNextDelivery({ body: { id, nextDeliveryDate: date, operator: 'zz' } });
  console.log("update subscription next delivery date view data:", res);
  return res?.subscriptionScheduleNextDelivery || false
}
