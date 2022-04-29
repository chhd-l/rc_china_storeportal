import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router";
import { Customer } from "@/framework/types/customer";
import { getCustomer } from '@/framework/api/customer'

const CustomerInformation = ({ buyer }: { buyer: Customer | any }) => {
  const navigation = useNavigate();
  const [customer, setCustomer] = useState<any>(null)

  const getCustomerDetail = async () => {
    const res = await getCustomer({ customerId: buyer.id })
    console.log('1111', res)
    setCustomer(res)
  }

  useEffect(() => {
    if (buyer.id) {
      getCustomerDetail()
    }
  }, [buyer.id])

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row items-center">
        <Avatar size="large" icon={<img src={customer?.image || ''} alt='' />} />
        <span className="ml-4">{buyer.name}</span>
      </div>
      <Button
        type="primary"
        danger
        onClick={() => {
          sessionStorage.setItem('cur-pet-owner',JSON.stringify(customer))
          navigation("/petOwner/pet-owner-detail", { state: { id: buyer.id } });
        }}
      >
        Detail
      </Button>
    </div>
  );
};
export default CustomerInformation;
