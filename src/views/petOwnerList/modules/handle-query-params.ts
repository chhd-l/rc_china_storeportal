import { SearchParamsProps } from '@/framework/types/customer'
import { PageParamsProps } from '@/framework/types/common'
import { handlePageParams } from '@/utils/utils'

export const handleQueryParams = ({
  searchParams,
  pageParams,
}: {
  searchParams: SearchParamsProps
  pageParams: PageParamsProps
}) => {
  const { name, phone, loginStartTime, loginEndTime } = searchParams
  const sample = Object.assign({}, name !== '' ? { nickName: name } : {}, phone !== '' ? { phone: phone } : {})
  const where = Object.assign(
    {},
    loginStartTime !== '' ? { lastLoginTimeForm: new Date(loginStartTime).toISOString() } : {},
    loginEndTime !== '' ? { lastLoginTimeTo: new Date(loginEndTime).toISOString() } : {},
  )
  let params = Object.assign(
    {
      isNeedTotal: true,
    },
    handlePageParams(pageParams),
    JSON.stringify(sample) !== '{}' ? { sample: sample } : {},
    JSON.stringify(where) !== '{}' ? { where: where } : {},
  )
  return params
}
