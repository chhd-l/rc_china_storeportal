import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { Button, Form, Input } from "antd";
import { fansDetailForm } from "./modules/form";
import { initFansDetail } from "./modules/constants";
import {
  ContentContainer,
  InfoContainer,
} from "@/components/ui";

const FansDetail = () => {
  const [fansDetail, setFansDetail] = useState<any>(initFansDetail);
  const location = useLocation();
  const navigator = useNavigate();

  useEffect(() => {
    const state: any = location.state;
    console.log('state',state)
    setFansDetail(state)
    // setFansDetail(Mock.mock(fansDetailSource));
  }, []);

  return (
    <ContentContainer>
      <InfoContainer>
        <div className="text-2xl text-bold mb-2">Fans Detail</div>
        {fansDetail.accountId ? (
          <Form
            autoComplete="off"
            className="flex flex-row flex-wrap justify-start pr-8"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            {fansDetailForm.map((item) => {
              let val = fansDetail[item.name]
              if(item.label === "Sex") {
                fansDetail[item.name] === '0' ? val = 'Male' : val = 'Female'
              }
              return (
                <Form.Item
                  label={item.label}
                  className="w-1/2"
                  key={item.name}
                >
                  <Input disabled value={val} className="bg-white text-black" />
                </Form.Item>
                )
            })}
          </Form>
        ) : null}
        <div className="flex justify-end">
          <Button onClick={() => {
              navigator("/fans/fans-list");
          }}>Cancel</Button>
        </div>
      </InfoContainer>
    </ContentContainer>
  );
};
export default FansDetail;
