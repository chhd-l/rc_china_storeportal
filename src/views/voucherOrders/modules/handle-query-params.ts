import { OrderSearchParamsProps } from '@/framework/types/order'
import { PageParamsProps } from '@/framework/types/common'
import { handlePageParams } from '@/utils/utils'

export const handleQueryParams = ({
  searchParams,
  pageParams,
  voucherId,
}: {
  searchParams: OrderSearchParamsProps
  pageParams: PageParamsProps
  voucherId: string
}) => {
  const { startTime, endTime } = searchParams
  const sample = Object.assign(
    { voucherId },
    startTime !== '' ? { startDate: new Date(startTime).toISOString() } : {},
    endTime !== '' ? { endDate: new Date(endTime).toISOString() } : {},
  )
  let params = Object.assign(
    handlePageParams(pageParams),
    {
      isNeedTotal: true,
    },
    { sample: sample },
  )
  return params
}
