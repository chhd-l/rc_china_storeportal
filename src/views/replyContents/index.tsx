import React, { useEffect, useState } from 'react'
import Search from '@/components/common/Search'
import './index.less'
import { WxReplyContent } from '@/framework/types/wechat'
import { normaliseReplyContent } from '@/framework/normalize/wechatSetting'
import { getReplyContentList, deleteReplyContent, updateReplyContent } from '@/framework/api/wechatSetting'
import { formItems } from './modules/form'
import Table from './components/Table'
import { openConfirmModal } from '@/utils/utils'
import { ContentContainer, DivideArea, SearchContainer, TableContainer } from '@/components/ui'
import intl from 'react-intl-universal'

const SelectContentModal = () => {
  const [replyContents, setReplyContents] = useState<WxReplyContent[]>([])
  const [pages, setPages] = useState<{ page: number; limit: number; total: number }>({ page: 1, limit: 10, total: 0 })
  const [quneryParams, setQueryParams] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getReplyContents(1, 10, {})
  }, [])

  const getReplyContents = async (current: number = 1, limit: number = 10, params: any = {}) => {
    setLoading(true)
    const list = await getReplyContentList({
      offset: current * limit - limit,
      limit: limit,
      sample:
        params.description || params.type || params.status !== undefined
          ? {
              responseDescribeFuzzy: params?.description ?? undefined,
              responseType: params?.type ?? undefined,
              isActive: params?.status ?? undefined,
            }
          : undefined,
    })
    setQueryParams(params)
    setPages(Object.assign({}, pages, { page: current, total: list?.total ?? 0 }))
    setReplyContents(normaliseReplyContent(list.records))
    setLoading(false)
  }

  const handlePageChange = (current: number) => {
    getReplyContents(current, pages.limit, quneryParams)
  }

  const handleDelete = (id: string) => {
    openConfirmModal({
      title: intl.get('reply.Confirm Delete?'),
      content: intl.get('public.Are you sure you want to delete the item?'),
      onOk: () => {
        setLoading(true)
        deleteReplyContent(id).then((isDeleted) => {
          if (isDeleted) {
            setPages(Object.assign({}, pages, { page: 1 }))
            getReplyContents(1, 10, quneryParams)
          } else {
            setLoading(false)
          }
        })
      },
    })
  }

  const handleDisableOrEnable = (id: string, param: any) => {
    openConfirmModal({
      title: param.isActive ? intl.get('public.enable_item') : intl.get('public.disable_item'),
      content: `${intl.get('reply.Are you sure you want to')} ${
        param.isActive ? intl.get('public.enable') : intl.get('public.Disable')
      } ${intl.get('reply.this item?')}`,
      onOk: () => {
        setLoading(true)
        updateReplyContent(id, param).then((isSuccess) => {
          if (isSuccess) {
            getReplyContents(pages.page, pages.limit, quneryParams)
          } else {
            setLoading(false)
          }
        })
      },
    })
  }

  return (
    <ContentContainer>
      <SearchContainer>
        <Search query={getReplyContents} formItems={formItems} pages={pages} />
      </SearchContainer>
      <DivideArea />
      <TableContainer>
        <Table
          loading={loading}
          replyContents={replyContents}
          onPageChange={handlePageChange}
          pages={pages}
          onChangeStatus={handleDisableOrEnable}
          onDelete={handleDelete}
        />
      </TableContainer>
    </ContentContainer>
  )
}
export default SelectContentModal
