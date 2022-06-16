import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router";
import { Consumer } from "@/framework/types/consumer";
import { getConsumer } from '@/framework/api/consumer'

const ConsumerInformation = ({ buyer }: { buyer: Consumer | any }) => {
  const navigation = useNavigate();
  const [consumer, setConsumer] = useState<any>(null)

  const getConsumerDetail = async () => {
    const res = await getConsumer({ consumerId: buyer.id })
    console.log('1111', res)
    setConsumer(res)
  }

  useEffect(() => {
    if (buyer.id) {
      getConsumerDetail()
    }
  }, [buyer.id])

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row items-center">
        <Avatar size="large" icon={<img src={consumer?.image || ''} alt='' />} />
        <span className="ml-4">{buyer.name}</span>
      </div>
      <Button
        className="rounded-4"
        type="primary"
        danger
        onClick={() => {
          sessionStorage.setItem('cur-pet-owner',JSON.stringify(consumer))
          navigation("/petOwner/pet-owner-detail", { state: { id: buyer.id } });
        }}
      >
        Detail
      </Button>
    </div>
  );
};
export default ConsumerInformation;
