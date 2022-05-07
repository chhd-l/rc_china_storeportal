import { Button, Switch, Table, Tooltip, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Account } from "@/framework/types/wechat";
import { modifyAccount } from '@/framework/api/wechatSetting'
import './Style.less'

const Index = ({ accountList, getAccounts, pages, setPages, total }: { 
  accountList: Account[], 
  getAccounts: Function,
  setPages: Function,
  pages: any,
  total: number
}) => {
  const navigator = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleOk = async (id: string) => {const items = {
    account: {
      id: id,
    },
    isDeleted: true
  }
    await modifyAccount(items)
    getAccounts&&getAccounts()
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }


  const columns = [
    {
      title: "Account Principal",
      dataIndex: "accountPrincipal",
      key: "accountPrincipal",
    },
    {
      title: "Account Type",
      dataIndex: "accountType",
      key: "accountType",
    },
    {
      title: "Account Name",
      dataIndex: "accountName",
      key: "accountName",
    },
    {
      title: "Official Account Type",
      dataIndex: "officialAccountType",
      key: "officialAccountType",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: any) => (
        <Switch checked={text} onChange={() => changeAccountStatus()} />
      ),
    },
    {
      title: "Action",
      key: "Action",
      render: (text: any, record: any) => (
        <>
          <Tooltip title="Edit">
            <span
              className="cursor-pointer iconfont icon-a-Group437 text-red-500 text-xl"
              onClick={() => {
                navigator("/account/account-details", { state: record });
               }}
            />
          </Tooltip>
          {/*避免误删除现在用的accountId*/}
          {record.id!=='000001'&&(
            <Tooltip title="Delete">
            <span
              className="cursor-pointer ml-2 iconfont icon-delete text-red-500 text-xl"
              onClick={() => setIsModalVisible(true)}
            />
            </Tooltip>
          )}
          {/* <Tooltip title="View QR Code">
            <span
              className="cursor-pointer ml-2 iconfont icon-Frame-1 text-red-500 text-xl"
              onClick={() => { }}
            />
          </Tooltip> */}
          <Modal
            className="acconutModal"
            title='Delete Item'
            visible={isModalVisible}
            onOk={() => handleOk(record.id)}
            onCancel={handleCancel}
            okText='Confirm'
          >
            <div>Are you sure you want to delete the item ?</div>
          </Modal>
        </>
      ),
    },
  ];
  const changeAccountStatus = () => { };

  return (
    <>
      <div className="flex justify-end items-center h-full pb-4 pt-4">
        <Button
          danger
          onClick={() => {
            navigator("/account/add-account");
          }}
        >
          + Add Account
        </Button>
      </div>
      <Table
        dataSource={accountList}
        columns={columns}
        rowKey="id"
        className="rc-table"
        pagination={{
          current: pages.page,
          pageSize: pages.limit,
          total: total,
          onChange: (page, pageSize) => {
            setPages({
              page,
              limit: pageSize
            })
          }
        }}
      />
    </>
  );
};

export default Index;
