import React, { useEffect, useState } from "react";
import Search from "@/components/common/Search";
import "./index.less";
import { ReplyContent } from "@/framework/types/wechat";
import { normaliseReplyContent } from "@/framework/normalize/wechatSetting";
import { getReplyContentList, deleteReplyContent, disableOrEnableReplyContent } from "@/framework/api/wechatSetting";
import { formItems } from "./modules/form";
import Table from "./components/Table";
import { Modal } from 'antd';
import {
  ContentContainer,
  DivideArea,
  SearchContainer,
  TableContainer,
} from "@/components/ui";

const SelectContentModal = () => {
  const [replyContents, setReplyContents] = useState<ReplyContent[]>([]);
  const [pages, setPages] = useState<{page: number, limit: number, total: number}>({page: 1, limit: 10, total: 0});
  const [quneryParams, setQueryParams] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getReplyContents(1, 10, {})
  }, []);

  const getReplyContents = async (current: number = 1, limit: number = 10, params: any = {}) => {
    setLoading(true);
    const list = await getReplyContentList({
      offset: current * limit - limit,
      limit: limit,
      sample: params.description || params.type || params.status !== undefined ? {
        responseDescribeFuzzy: params?.description ?? undefined,
        responseType: params?.type ?? undefined,
        isActive: params?.status ?? undefined
      }: undefined
    });
    setQueryParams(params);
    setPages(Object.assign({}, pages, { total: list?.total ?? 0 }));
    setReplyContents(normaliseReplyContent(list.records));
    setLoading(false);
  };

  const handlePageChange = (current: number) => {
    setPages(Object.assign({}, pages, { page: current }));
    getReplyContents(current, pages.limit, quneryParams);
  }

  const handleDelete = (id: string) => {
    Modal.confirm({
      className: "rc-modal",
      okText: "Confirm",
      cancelText: "Cancel",
      closable: true,
      icon: null,
      title: "Confirm Delete?",
      content: "Are you sure you want to delete the item?",
      okButtonProps: { loading: loading },
      onOk: () => {
        setLoading(true);
        deleteReplyContent(id).then(isDeleted => {
          if (isDeleted) {
            setPages(Object.assign({}, pages, { page: 1 }));
            getReplyContents(1, 10, quneryParams);
          } else {
            setLoading(false)
          }
        })
      }
    })
  }

  const handleDisableOrEnable = (param: any) => {
    Modal.confirm({
      className: "rc-modal",
      okText: "Confirm",
      cancelText: "Cancel",
      closable: true,
      icon: null,
      title: param.isActive ? 'Enable Item' : 'Disable Item',
      content: `Are you sure you want to ${param.isActive ? 'enable' : 'disable'} this item?`,
      okButtonProps: { loading: loading },
      onOk: () => {
        setLoading(true);
        disableOrEnableReplyContent(param).then(isSuccess => {
          if (isSuccess) {
            getReplyContents(pages.page, pages.limit, quneryParams);
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
        <Search query={getReplyContents} formItems={formItems} pages={pages} />
      </SearchContainer>
      <DivideArea />
      <TableContainer>
        <Table loading={loading} replyContents={replyContents} onPageChange={handlePageChange} pages={pages} onChangeStatus={handleDisableOrEnable} onDelete={handleDelete} />
      </TableContainer>
    </ContentContainer>
  );
};
export default SelectContentModal;
