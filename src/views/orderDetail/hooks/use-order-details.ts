import { useState, useEffect } from 'react'
import { orderDataSource } from "../modules/mockdata";
import Mock from "mockjs";
import {Order} from "@/framework/types/order";

const useOrderDetails = (initOrderNo: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errMsg, setErrMsg] = useState<string>('')
  const [orderNo, setOrderNo] = useState<string>(initOrderNo)
  const [orderDetail, setOrderDetail] = useState<Order | any>(null);

  useEffect(() => {
    console.log(orderNo, 'initOrderNo')
    const fetchData = async () => {
      try {
        setOrderDetail(Mock.mock(orderDataSource));
      } catch (err: any) {
        setErrMsg(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    if (orderNo) {
      fetchData()
    }
  }, [orderNo])

  return { orderDetail, isLoading, errMsg, setOrderNo }
}

export default useOrderDetails
