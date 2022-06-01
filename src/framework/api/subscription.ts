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
