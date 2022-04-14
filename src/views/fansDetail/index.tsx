import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { fansDetailForm } from "./modules/form";
import { fansDetailSource } from "./modules/mockdata";
import { initFansDetail } from "./modules/constants";
import Mock from "mockjs";
import {
  ContentContainer,
  DivideArea,
  InfoContainer,
  SearchContainer,
  TableContainer,
} from "@/components/ui";

const FansDetail = () => {
  const [fansId, setFansId] = useState("");
  const [fansDetail, setFansDetail] = useState(initFansDetail);
  const location = useLocation();

  useEffect(() => {
    const state: any = location.state;
    console.log("333", state.id);
    setFansId(state.id);
    console.log(fansId);
    setFansDetail(Mock.mock(fansDetailSource));
  }, []);

  return (
    <ContentContainer>
      <InfoContainer>
        <div className="text-2xl text-bold mb-2">Fans Detail</div>
        {fansDetail.account ? (
          <Form
            autoComplete="off"
            className="flex flex-row flex-wrap justify-start pr-8"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={fansDetail}
          >
            {fansDetailForm.map((item) => (
              <Form.Item
                label={item.label}
                name={item.name}
                className="w-1/2"
                key={item.name}
              >
                <Input disabled className="bg-white text-black" />
              </Form.Item>
            ))}
          </Form>
        ) : null}
        <div className="flex justify-end">
          <Button>Cancel</Button>
        </div>
      </InfoContainer>
    </ContentContainer>
  );
};
export default FansDetail;
