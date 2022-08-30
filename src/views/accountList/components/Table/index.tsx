import { Button, Switch, Table, Tooltip, Modal, Image } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { WxAccount } from "@/framework/types/wechat";
import { modifyAccount } from '@/framework/api/wechatSetting'
import intl from 'react-intl-universal'
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
      title: intl.get('wx.account_principal'),
      dataIndex: "principal",
      key: "principal",
    },
    {
      title: intl.get('wx.account_type'),
      dataIndex: "type",
      key: "type",
      render: (_text: string) => _text === "WxServiceAccount" ? "Wechat Service Account" : _text === "WxMiniProgram" ? "Wechat Mini Program" : "Alipay Mini Program"
    },
    {
      title: intl.get('wx.account_name'),
      dataIndex: "name",
      key: "name",
    },
    {
      title: intl.get('wx.official_account_type'),
      dataIndex: "officialAccountType",
      key: "officialAccountType",
    },
    {
      title: intl.get('public.status'),
      dataIndex: "isActive",
      key: "isActive",
      render: (text: any, record: any) => {
        return (
          <Switch checked={text} onChange={(v) => {
            setItem({
              isActive: v,
              id: record.id,
              type: record.type
            })
            setIsOpen(true)
          }} />
        )
      }
    },
    {
      title: intl.get('public.action'),
      key: "Action",
      render: (text: any, record: any) => (
        <>
          <Tooltip title={intl.get('public.edit')}>
            <span
              className="cursor-pointer iconfont icon-a-Group437 text-red-500 text-xl"
              onClick={() => {
                navigator("/account/account-details", { state: record });
              }}
            />
          </Tooltip>
          {/*避免误删除现在用的accountId*/}
          {record.id !== '000001' && (
            <Tooltip title={intl.get('public.delete')}>
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
              <Tooltip title={intl.get('wx.view_qr_code')}>
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
          + {intl.get('wx.add_account')}
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
        title={intl.get('public.delete_item')}
        visible={isModalVisible}
        onOk={() => handleOk(ID)}
        confirmLoading={loading}
        onCancel={handleCancel}
        okText={intl.get('public.confirm')}
      // mask={false}
      >
        <div>{intl.get('public.are_you_sure_delete')}</div>
      </Modal>
      <Modal
        className="rc-modal"
        title={item?.isActive ? intl.get('public.enable_item') : intl.get('public.disable_item')}
        visible={isOpen}
        confirmLoading={loading}
        onOk={() => handleOpenOk(item)}
        onCancel={() => setIsOpen(false)}
        okText='Confirm'
      // mask={false}
      >
        {item.isActive 
          ? (item.type === 'WxServiceAccount' ? <div>{intl.get('wx.account_enable_tip1')}</div> : <div>{intl.get('wx.account_enable_tip2')}</div>)
          : (item.type === 'WxServiceAccount' ? <div>{intl.get('wx.account_disable_tip1')}</div> : <div>{intl.get('wx.account_disable_tip2')}</div>)
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
