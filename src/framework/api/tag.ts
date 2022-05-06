import ApiRoot from './fetcher'

export const getTags = async () => {
  try {
    let res = await ApiRoot.tags().getTags({ body: { offset: 0, limit: 10, isNeedTotal: true, operator: 'zz' } })
    console.log('get tag list view data', res)
    return res?.findTagPage
  } catch (e) {
    console.log(e)
    return []
  }
}
