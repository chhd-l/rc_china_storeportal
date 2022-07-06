import { Avatar, Button } from "antd";
import React, { useState } from 'react'
import { useNavigate } from "react-router";
import { Consumer } from "@/framework/types/consumer";
import { getConsumer } from '@/framework/api/consumer'

const ConsumerInformation = ({ buyer }: { buyer: Consumer | any }) => {
  const navigation = useNavigate();
  const [consumer, setConsumer] = useState<any>(null)
  const [loading,setLoading]=useState(false)

  const getConsumerDetail = async () => {
    setLoading(true)
    const res = await getConsumer({ consumerId: buyer.id })
    console.log('1111', res)
    setConsumer(res)
    setLoading(false)
  }

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row items-center">
        <Avatar size="large" icon={<img src={buyer?.image || ''} alt='' />} />
        <span className="ml-4">{buyer.name}</span>
      </div>
      <Button
        className="rounded-4"
        type="primary"
        danger
        loading={loading}
        onClick={async() => {
          await getConsumerDetail()
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
