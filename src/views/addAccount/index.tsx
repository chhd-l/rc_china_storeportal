import { Button, Form, Input, Select, Upload } from "antd";
import { ACCOUNT_FORM, ACCOUNT_FORM_TWO } from "@/views/addAccount/modules/form";
import { useNavigate } from "react-router";
import { ContentContainer, InfoContainer } from "@/components/ui";
import { createAccount } from '@/framework/api/wechatSetting'
import { useState } from "react";
import './Style.less'

const AddAccount = () => {
  const navigator = useNavigate();
  const [serviceAccount, setServiceAccount] = useState('serviceAccount')

  const addAccount = async (values: any) => {
    //新增
    await createAccount(values).then(() => {
      navigator("/account/account-list")
    })
  };

  const onChange = (v: any) => {
    setServiceAccount(v)
  }

  return (
    <ContentContainer className="addAccount">
      <InfoContainer>
        <div className="text-2xl text-medium mb-4">Add Account</div>
        <Form
          initialValues={{ type: "serviceAccount" }}
          // onValuesChange={formValuesChange}
          onFinish={addAccount}
          autoComplete="off"
          className="flex flex-row flex-wrap justify-start pr-4"
        > 
          {
            serviceAccount === 'serviceAccount' ? (
              ACCOUNT_FORM.map((item) => {
                  return item.name === 'accountType' ? (
                    <Form.Item
                      label={item.label}
                      key={item.name}
                      name={item.name}
                      rules={item.rules}
                      className={`${item.type === "textarea" ? "w-full" : "w-1/2"}`}
                      labelCol={{ span: item.type === "textarea" ? 4 : 8 }}
                      wrapperCol={{ span: item.type === "textarea" ? 20 : 16 }}
                      initialValue={serviceAccount}
                    >
                      <Select value={serviceAccount} onChange={onChange} placeholder={item.placeholder}>
                          {(item.selectList || []).map((el) => (
                            <Select.Option value={el.key}>{el.label}</Select.Option>
                          ))}
                      </Select>
                    </Form.Item>
                  ) : (
                    <Form.Item
                      label={item.label}
                      key={item.name}
                      name={item.name}
                      rules={item.rules}
                      className={`${item.type === "textarea" ? "w-full" : "w-1/2"}`}
                      labelCol={{ span: item.type === "textarea" ? 4 : 8 }}
                      wrapperCol={{ span: item.type === "textarea" ? 20 : 16 }}
                    >
                      {item.type === "select" ? (
                        <Select placeholder={item.placeholder}>
                          {(item.selectList || []).map((el) => (
                            <Select.Option value={el.key}>{el.label}</Select.Option>
                          ))}
                        </Select>
                      ) : item.type === "textarea" ? (
                        <Input.TextArea
                          placeholder={item.placeholder}
                          autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                      ) : item.type === "upload" ? (
                        <Input.Group className="flex">
                          <Input
                            placeholder={item.placeholder}
                            style={{ width: "85%" }}
                          />
                          <Upload name="logo" action="/upload.do" listType="picture">
                            <Button>Select</Button>
                          </Upload>
                        </Input.Group>
                      ) : (
                        <Input placeholder={item.placeholder} />
                      )}
                    </Form.Item>
                    )})
            ) : (
              ACCOUNT_FORM_TWO.map((item) => {
                  return item.name === 'accountType' ? (
                    <Form.Item
                      label={item.label}
                      key={item.name}
                      name={item.name}
                      rules={item.rules}
                      className={`${item.type === "textarea" ? "w-full" : "w-1/2"}`}
                      labelCol={{ span: item.type === "textarea" ? 4 : 8 }}
                      wrapperCol={{ span: item.type === "textarea" ? 20 : 16 }}
                    >
                      <Select value={serviceAccount} onChange={onChange} placeholder={item.placeholder}>
                          {(item.selectList || []).map((el) => (
                            <Select.Option value={el.key}>{el.label}</Select.Option>
                          ))}
                      </Select>
                    </Form.Item>
                  ) : (
                    <Form.Item
                      label={item.label}
                      key={item.name}
                      name={item.name}
                      rules={item.rules}
                      className={`${item.type === "textarea" ? "w-full" : "w-1/2"}`}
                      labelCol={{ span: item.type === "textarea" ? 4 : 8 }}
                      wrapperCol={{ span: item.type === "textarea" ? 20 : 16 }}
                    >
                      {item.type === "select" ? (
                        <Select placeholder={item.placeholder}>
                          {(item.selectList || []).map((el) => (
                            <Select.Option value={el.key}>{el.label}</Select.Option>
                          ))}
                        </Select>
                      ) : item.type === "textarea" ? (
                        <Input.TextArea
                          placeholder={item.placeholder}
                          autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                      ) : item.type === "upload" ? (
                        <Input.Group className="flex">
                          <Input
                            placeholder={item.placeholder}
                            style={{ width: "85%" }}
                          />
                          <Upload name="logo" action="/upload.do" listType="picture">
                            <Button>Select</Button>
                          </Upload>
                        </Input.Group>
                      ) : (
                        <Input placeholder={item.placeholder} />
                      )}
                    </Form.Item>
                    )})
            )
          }
          <Form.Item
            className="w-full flex flex-row justify-end boyn"
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
      </InfoContainer>
    </ContentContainer>
  );
};
export default AddAccount;
