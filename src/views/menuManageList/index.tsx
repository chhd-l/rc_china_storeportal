import React, { useState, useEffect } from 'react';
import { Button, Table, Modal } from "antd"
import "./index.less"
import { tableColumns, TWxMenuUpdateParam } from "./modules/constant"
import { ContentContainer } from "@/components/ui"
import { getWxMenusList, updateWxMenu } from '@/framework/api/wechatSetting'
import { WxMenu } from '@/framework/types/wechat'

import { PageProps } from '@/framework/types/common'

const MenuManage = () => {
  const [list, setList] = useState<WxMenu[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [current, setCurrent] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [pendingToDelete, setPendingToDelete] = useState<any>({})

  const getList = async (pageNumber: number) => {
    const param: PageProps = {
      offset: pageNumber - 1,
      limit: 10,
      isNeedTotal: true
    }
    setLoading(true)
    const res = await getWxMenusList(param)
    console.log("page data:", res);
    setLoading(false)
    setList(res.records)
    setTotal(res.total)
  }

  useEffect(() => {
    getList(1)
  }, [])

  const changeStatus = async (updateParam: TWxMenuUpdateParam) => {
    setLoading(true)
    const updated = await updateWxMenu(updateParam)
    if (updated) {
      setList(list.map((curr) => {
        if (curr.id === updateParam.id) {
          curr.isEnabled = updateParam.isEnabled
        }
        return curr
      }))
    }
    setLoading(false)
  }
  const handleDelete = (updateParam: TWxMenuUpdateParam) => {
    setIsModalVisible(true)
    setPendingToDelete(updateParam)
  }
  const confirmDelete = async () => {
    setLoading(true)
    const deleted = await updateWxMenu(pendingToDelete)
    if (deleted) {
      setIsModalVisible(false)
      setCurrent(1)
      getList(1)
    }
    setLoading(false)
  }
  const columns = tableColumns({ changeStatus, handleDelete })
  console.info("sdsd")
  return (
    <ContentContainer className="menu-manage bg-white">
      <div className="btn-area">
        <Button danger size="large">+ Add</Button>
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={list}
        loading={loading}
        className="rc-table"
        pagination={{
          current: current,
          pageSize: 10,
          total: total,
          onChange: (page) => {
            setCurrent(page)
            getList(page)
          }
        }}
      />
      <Modal
        className="rc-modal"
        title="Delete Item"
        okText='Confirm'
        visible={isModalVisible}
        onOk={confirmDelete}
        confirmLoading={loading}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Are you sure you want to delete the item?</p>
      </Modal>
    </ContentContainer>
  )
}

export default MenuManage
