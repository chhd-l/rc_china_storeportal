import { OrderSearchParamsProps } from '@/framework/types/order'
import { PageParamsProps } from '@/framework/types/common'
import { handlePageParams } from '@/utils/utils'

export const handleQueryParams = ({
  searchParams,
  pageParams,
  orderState,
  shoppingCompany,
}: {
  searchParams: OrderSearchParamsProps
  pageParams: PageParamsProps
  orderState: string
  shoppingCompany: string
}) => {
  const { searchType, searchTypeValue, startTime, endTime } = searchParams
  const sample = Object.assign(
    {},
    searchType !== '' && searchTypeValue !== '' && searchType !== 'isSubscription'
      ? {
          queryParameters: {
            fieldName: searchType,
            fieldValue: searchTypeValue,
          },
        }
      : {},
    orderState !== '' ? { orderState } : {},
    startTime !== '' ? { startDate: new Date(startTime).toISOString() } : {},
    endTime !== '' ? { endDate: new Date(endTime).toISOString() } : {},
    shoppingCompany !== '' ? { shippingCompany: shoppingCompany } : {},
    searchType === 'isSubscription' ? { isSubscription: searchTypeValue } : {},
  )
  let params = Object.assign(
    {
      isNeedTotal: true,
      storeId: '12345678',
      operator: 'zz',
    },
    handlePageParams(pageParams),
    { sample: sample },
  )
  return params
}
