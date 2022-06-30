import Table from "./components/Table";
import React, { useEffect, useState } from "react";
import { getFormItems } from "./modules/form";
import Search from "@/components/common/Search";
import { AutoReplies } from "@/framework/types/wechat";
import { BaseListProps } from "@/framework/types/common";
import { normaliseAutoReplies } from "@/framework/normalize/wechatSetting";
import { getAutomaticResponseList, getAccountList, deleteAutomaticResponse, updateAutomaticResponse } from "@/framework/api/wechatSetting";
import { openConfirmModal } from "@/utils/utils";
import {
  ContentContainer,
  DivideArea,
  SearchContainer,
  TableContainer,
} from "@/components/ui";

const AutoReplyList = () => {
  const [autoReplies, setAutoReplies] = useState<AutoReplies[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [quneryParams, setQueryParams] = useState<any>({});
  const [pages, setPages] = useState<{ page: number, limit: number, total: number }>({ page: 1, limit: 10, total: 0 });
  const [accountList, setAccountList] = useState<BaseListProps[]>([]);

  useEffect(() => {
    getAutoReplyList(1, 10, {});
    getAccountListForSelection();
  }, []);

  const getAutoReplyList = async (page: number = 1, limit: number = 10, param: any = {}) => {
    setLoading(true);
    const list = await getAutomaticResponseList({
      offset: page * limit - limit,
      limit: limit,
      isNeedTotal: true,
      sample: param.name || param.type || param.keywords || param.status !== undefined ? {
        accountName: param?.name ?? undefined,
        matchType: param?.type ?? undefined,
        keyWords: param?.keywords ?? undefined,
        isActive: param?.status ?? undefined,
      } : undefined
    });
    setPages(Object.assign({}, pages, { total: list?.total ?? 0 }));
    setAutoReplies((list?.records ?? []).map((item: any) => normaliseAutoReplies(item)));
    setLoading(false);
  };

  const getAccountListForSelection = async () => {
    const list = await getAccountList({
      limit: 100,
      offset: 0,
      sample: {storeId: "12345678"},
    });
    const accounts = (list?.records ?? []).reduce((prev: BaseListProps[], curr: any) => {
      if(prev.indexOf(curr.name) === -1 && curr.type === 'ServiceAccount') {
        prev.push({ key: curr.name as string, label: curr.name as string })
      }
      return prev;
    }, []);
    setAccountList(accounts);
  }

  const handlePageChange = (current: number) => {
    setPages(Object.assign({}, pages, { page: current }));
    getAutoReplyList(current, pages.limit, quneryParams);
  }

  const handleDelete = (id: string) => {
    openConfirmModal({
      title: "Confirm Delete?",
      content: "Are you sure you want to delete the item?",
      onOk: () => {
        setLoading(true);
        deleteAutomaticResponse(id).then(isDeleted => {
          if (isDeleted) {
            setPages(Object.assign({}, pages, { page: 1 }));
            getAutoReplyList(1, 10, quneryParams);
          } else {
            setLoading(false)
          }
        })
      }
    })
  }

  const handleDisableOrEnable = (id: string, param: any) => {
    openConfirmModal({
      title: param.isActive ? 'Enable Item' : 'Disable Item',
      content: `Are you sure you want to ${param.isActive ? 'enable' : 'disable'} this item?`,
      onOk: () => {
        setLoading(true);
        updateAutomaticResponse(id, param).then(isSuccess => {
          if (isSuccess) {
            getAutoReplyList(pages.page, pages.limit, quneryParams);
          } else {
            setLoading(false)
          }
        })
      }
    })
  }

  return (
    <ContentContainer>
      <SearchContainer>
        <Search query={getAutoReplyList} formItems={getFormItems(accountList)} pages={pages} />
      </SearchContainer>
      <DivideArea />
      <TableContainer>
        <Table autoReplies={autoReplies} pages={pages} loading={loading} onPageChange={handlePageChange} onChangeStatus={handleDisableOrEnable} onDelete={handleDelete} />
      </TableContainer>
    </ContentContainer>
  );
};
export default AutoReplyList;
