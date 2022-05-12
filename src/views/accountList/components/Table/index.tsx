import { Button, Switch, Table, Tooltip, Modal, Image } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Account } from "@/framework/types/wechat";
import { modifyAccount } from '@/framework/api/wechatSetting'
import './Style.less'

const Index = ({ accountList, getAccounts, pages, setPages, total, loading, setLoading }: {
  accountList: Account[],
  getAccounts: Function,
  setPages: Function,
  pages: any,
  total: number,
  loading: boolean,
  setLoading: Function
}) => {
  const navigator = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [imgModal, setImgModal] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [ID, setID] = useState('')
  const [item, setItem] = useState({})
  const [imgUrl, setImgUrl] = useState('')

  const handleOk = async (id: string) => {
    const items = {
      account: {
        id: id,
      },
      isDeleted: true
    }
    setLoading(true)
    await modifyAccount(items)
    getAccounts && getAccounts()
    setIsModalVisible(false)
  }

  const handleOpenOk = async (item: any) => {
    const items = {
      account: item,
    }
    setLoading(true)
    await modifyAccount(items)
    getAccounts && getAccounts()
    setIsOpen(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setImgModal(false)
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
      dataIndex: "isActive",
      key: "isActive",
      render: (text: any, record: any) => {
        return (
          <Switch checked={text} onChange={(v) => {
            setItem({
              isActive: v,
              id: record.id
            })
            setIsOpen(true)
          }} />
        )
      }
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
          {record.id !== '000001' && (
            <Tooltip title="Delete">
              <span
                className="cursor-pointer ml-2 iconfont icon-delete text-red-500 text-xl"
                onClick={() => {
                  setID(record.id)
                  setIsModalVisible(true)
                }}
              />
            </Tooltip>
          )}
          {
            record.qrCodePath ? (
              <Tooltip title="View QR Code">
                <span
                  className="cursor-pointer ml-2 iconfont icon-Frame-1 text-red-500 text-xl"
                  onClick={() => {
                    setImgUrl(record.qrCodePath)
                    setImgModal(true)
                  }}
                />
              </Tooltip>
            ) : null
          }
        </>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end items-center h-full pb-4 pt-4">
        <Button
          type="primary"
          onClick={() => {
            navigator("/account/add-account");
          }}
        >
          + Add Account
        </Button>
      </div>
      <Table
        dataSource={accountList}
        loading={loading}
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
            getAccounts(page, pageSize)
          }
        }}
      />
      <Modal
        className="rc-modal"
        title='Delete Item'
        visible={isModalVisible}
        onOk={() => handleOk(ID)}
        confirmLoading={loading}
        onCancel={handleCancel}
        okText='Confirm'
      // mask={false}
      >
        <div>Are you sure you want to delete the item ?</div>
      </Modal>
      <Modal
        className="rc-modal"
        title='Enable/Disable Item'
        visible={isOpen}
        confirmLoading={loading}
        onOk={() => handleOpenOk(item)}
        onCancel={() => setIsOpen(false)}
        okText='Confirm'
      // mask={false}
      >
        <div>Are you sure you want to enable/disable the item ?</div>
      </Modal>
      <Modal
        visible={imgModal}
        closable={false}
        onCancel={handleCancel}
        footer={null}
      >
        <Image
          src={imgUrl}
          width='100%'
          height='100%'
          preview={false}
        />
      </Modal>
    </>
  );
};

export default Index;
