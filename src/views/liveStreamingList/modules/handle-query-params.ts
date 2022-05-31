import { SearchParamsProps } from './constants'
import { PageParamsProps } from '@/framework/types/common'
import { handlePageParams } from '@/utils/utils'

export const handleQueryParams = ({
  searchParams,
  pageParams,
  activeKey,
}: {
  searchParams: SearchParamsProps
  pageParams: PageParamsProps
  activeKey: any
}) => {
  let sample = Object.assign({}, activeKey !== '' ? { liveStatus: Number(activeKey) } : {})
  Object.keys(searchParams).map((name, index) => {
    if (Object.values(searchParams)[index] && Object.values(searchParams)[index] !== '') {
      sample = Object.assign(sample, {
        [name]: name === 'roomId' ? Number(Object.values(searchParams)[index]) : Object.values(searchParams)[index],
      })
    }
  })
  let params = Object.assign(
    {
      isNeedTotal: true,
      accountId: '000001',
    },
    handlePageParams(pageParams),
    JSON.stringify(sample) !== '{}' ? { sample: sample } : {},
  )
  return params
}
