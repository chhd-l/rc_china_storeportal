import { Button, Switch, Table, Tooltip, Modal, Image } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { WxAccount } from "@/framework/types/wechat";
import { modifyAccount } from '@/framework/api/wechatSetting'
import './Style.less'

const Index = ({ accountList, getAccounts, pages, setPages, total, loading, setLoading }: {
  accountList: WxAccount[],
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
  const [item, setItem] = useState<any>({})
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
      dataIndex: "principal",
      key: "principal",
    },
    {
      title: "Account Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Account Name",
      dataIndex: "name",
      key: "name",
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
              id: record.id,
              accountType: record.accountType
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
        title={item?.isActive ? "Enable Item" : "Disable Item"}
        visible={isOpen}
        confirmLoading={loading}
        onOk={() => handleOpenOk(item)}
        onCancel={() => setIsOpen(false)}
        okText='Confirm'
      // mask={false}
      >
        {item.isActive 
          ? (item.type === 'ServiceAccount' ? <div>Are you sure that you want to enable the official account? If yes, the other modules of Wechat Management（Fans managment, Assets management, Medule management...) would only be associated with the activied account.</div> : <div>Are you sure you want to enable this account?</div>)
          : (item.type === 'ServiceAccount' ? <div>Are you sure that you want to disable the official account? If yes, the other modules of Wechat Management（Fans managment, Assets management, Medule management...) would only be associated with the activied account.</div> : <div>Are you sure you want to disable this account?</div>)
        }
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
