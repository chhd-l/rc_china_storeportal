import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { fansDetailForm } from "./modules/form";
import { dataSource } from "./modules/mockdata";
import Mock from "mockjs";

const FansDetail = () => {
  const [fansId, setFansId] = useState("");
  const [fansDetail, setFansDetail] = useState({
    id: "",
    account: "",
    avatar: "",
    name: "",
    sex: "",
    isMember: "",
    followTime: "",
    status: "",
    language: "",
    country: "",
    province: "",
    city: "",
    openId: "",
    unionId: "",
    comment: "",
    qrCode: "",
  });
  const location = useLocation();

  useEffect(() => {
    const state: any = location.state;
    console.log("333", state.id);
    setFansId(state.id);
    console.log(fansId);
    setFansDetail(Mock.mock(dataSource));
    console.log(Mock.mock(dataSource))
  }, []);

  return (
    <>
      <div className="bg-gray1 p-4">
        <div className="bg-white p-4 flex flex-col text-left">
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
                  <Input disabled className="bg-white text-black"/>
                </Form.Item>
              ))}
            </Form>
          ) : null}
        </div>
        <div className="flex justify-end mt-4">
          <Button>Cancel</Button>
        </div>
      </div>
    </>
  );
};
export default FansDetail;
