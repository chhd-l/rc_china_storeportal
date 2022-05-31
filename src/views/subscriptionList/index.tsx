import React, { useState, useEffect } from 'react'
import { ContentContainer, SearchContainer, TableContainer } from '@/components/ui'
import { Tabs, Pagination, Modal, Spin } from 'antd'
import { getSubscriptionList, pauseSubscription, resumeSubscription } from '@/framework/api/subscription'
import Search from './components/Search'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'

type THandleTips = {
  visible: boolean
  isResume: boolean
  id: string
}

const SubscriptionList: React.FC<{}> = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pages, setPages] = useState<{page:number,limit:number,total:number}>({page:1,limit:10,total:0});
  const [params, setParams] = useState<any>({ sample: undefined, where: undefined });
  const [akey, setAkey] = useState<string>("all");
  const [list, setList] = useState<any[]>([]);
  const [tipObj, setTipObj] = useState<THandleTips>({ visible: false, isResume: false, id: "" })

  useEffect(() => {
    getSubscriptions(1, 10);
  }, []);
  
  const getSubscriptions = async (current: number, limit: number, param: any = { sample: undefined, where: undefined }) => {
    setLoading(true);
    const data = await getSubscriptionList({
      offset: current * limit - limit,
      limit: limit,
      isNeedTotal: true,
      sample: param.sample,
      where: param.where,
    });
    setPages({page:current,limit:limit,total:data?.total ?? 0})
    setList(data?.records ?? [])
    setLoading(false);
  }

  const getParam = (param: any, activeKey: string) => {
    return activeKey === "all" ? param : {
      sample: param.sample ? { ...param.sample, status: activeKey } : { status: activeKey },
      where: param.where
    }
  }

  const handleSearch = (param: any) => {
    setParams(param);
    getSubscriptions(1, pages.limit, getParam(param, akey));
  }

  const changePage = (page: number, pageSize: number) => {
    getSubscriptions(page, pageSize, getParam(params, akey));
  }

  const handleChangeTab = (activeKey: string) => {
    setAkey(activeKey)
    getSubscriptions(1, pages.limit, getParam(params, activeKey))
  }

  const handlePauseAndRestart = async () => {
    let success = false;
    setTipObj({ ...tipObj, visible: false })
    if (tipObj.isResume) {
      success = await resumeSubscription(tipObj.id);
    } else {
      success = await pauseSubscription(tipObj.id);
    }
    if (success) {
      getSubscriptions(pages.page, pages.limit, getParam(params, akey));
    }
  }

  return (
    <ContentContainer>
      <SearchContainer className="pt-0">
        <Tabs activeKey={akey} onChange={handleChangeTab}>
          <Tabs.TabPane key="all" tab="All" />
          <Tabs.TabPane key="ONGOING" tab="Ongoing" />
          <Tabs.TabPane key="PAUSED" tab="Paused" />
          <Tabs.TabPane key="COMPLETED" tab="Completed" />
          <Tabs.TabPane key="INACTIVE" tab="Inactive" />
        </Tabs>
        <Search onSearch={handleSearch} />
      </SearchContainer>
      <TableContainer className="py-0 pb-5">
        <Spin spinning={loading}>
          <div className="mb-4 text-left text-xl font-bold">{pages.total} Subscriptions</div>
          <TableHeader />
          {(list || []).map((subs: any, index: number) => (
            <TableRow key={index} data={subs} handlePauseOrRestart={(isResume: boolean, id: string) => setTipObj({ visible: true, isResume, id })} />
          ))}
          <div className="flex flex-row justify-end mt-4">
          <Pagination
              current={pages.page}
              total={pages.total}
              pageSize={pages.limit}
              onChange={changePage}
              showSizeChanger={true}
              className="rc-pagination"
            />
          </div>
        </Spin>
      </TableContainer>
      <Modal
        visible={tipObj.visible}
        className="rc-modal"
        title={tipObj.isResume ? "Restart Subscription" : "Pause Subscription"}
        cancelText="Cancel"
        okText="Confirm"
        onCancel={() => setTipObj(Object.assign({}, tipObj, { visible: false }))}
        onOk={handlePauseAndRestart}
      >
        <div>{tipObj.isResume ? "Are you sure you want to restart this subscription?" : "Are you sure you want to pause this subscription?"}</div>
      </Modal>
    </ContentContainer>
  )
}

export default SubscriptionList
