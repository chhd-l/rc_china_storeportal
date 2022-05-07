import { Button, Form, Input, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { ACCOUNT_FORM } from "@/views/addAccount/modules/form";
import { useLocation, useNavigate } from "react-router";
import { ContentContainer, InfoContainer } from "@/components/ui";
import { modifyAccount } from '@/framework/api/wechatSetting'

const AccountDetails = () => {
  const [data, setData] = useState<any>();
  const location = useLocation();
  const navigator = useNavigate();

  useEffect(() => {
    const state: any = location.state;
    console.log('state',state)
    setData(state)
    // setFormItems(state)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editAccount = async (values: any) => {
    console.log('values',values)
    let val = {
      ...data,
      ...values
    }
    delete val.messageEncryptionURL
    await modifyAccount({
      account: val,
    }).then(() => {
      navigator('/account/account-list')
    })
  };

  return (
    <ContentContainer>
      <InfoContainer>
        <div className="text-2xl text-medium mb-4">Account Details</div>
        {
          data ? (
            <Form
              initialValues={data}
              onFinish={editAccount}
              autoComplete="off"
              className="flex flex-row flex-wrap justify-start pr-4"
            >
              {ACCOUNT_FORM.map((item: any) => (
                <Form.Item
                  label={item.label}
                  name={item.name}
                  rules={item.rules}
                  className={`${item.type === "textarea" ? "w-full" : "w-1/2"}`}
                  labelCol={{ span: item.type === "textarea" ? 4 : 8 }}
                  wrapperCol={{ span: item.type === "textarea" ? 20 : 16 }}
                >
                  {item.type === "select" ? (
                    <Select placeholder={item.placeholder}>
                      {(item.selectList || []).map((el: any) => (
                        <Select.Option value={el.key}>{el.label}</Select.Option>
                      ))}
                    </Select>
                  ) : item.type === "textarea" ? (
                    <Input.TextArea
                      placeholder={item.placeholder}
                      autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                  ) : item.type === "upload" ? (
                    <Input.Group>
                      <Input
                        placeholder={item.placeholder}
                        style={{ width: "82%" }}
                      />
                      <Upload name="logo" action="/upload.do" listType="picture">
                        <Button>Select</Button>
                      </Upload>
                    </Input.Group>
                  ) : (
                    <Input placeholder={item.placeholder} />
                  )}
                </Form.Item>
              ))}
              <Form.Item
                className="w-full flex flex-row justify-end"
                wrapperCol={{ span: 4 }}
              >
                <Button
                  danger
                  className="mr-4"
                  onClick={() => {
                    navigator("/account/account-list");
                  }}
                >
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" danger>
                  Confirm
                </Button>
              </Form.Item>
            </Form>
          ) : null
        }
      </InfoContainer>
    </ContentContainer>
  );
};
export default AccountDetails;
