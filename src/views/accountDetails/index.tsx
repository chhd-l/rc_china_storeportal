import { Button, Form, Input, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { ACCOUNT_FORM, ACCOUNT_FORM_TWO } from "@/views/addAccount/modules/form";
import { useLocation, useNavigate } from "react-router";
import { ContentContainer, InfoContainer } from "@/components/ui";
import { modifyAccount } from '@/framework/api/wechatSetting'

const AccountDetails = () => {
  const [data, setData] = useState<any>();
  const location = useLocation();
  const navigator = useNavigate();
  const [serviceAccount, setServiceAccount] = useState('serviceAccount')

  useEffect(() => {
    const state: any = location.state;
    console.log('state',state)
    setData(state)
    // setFormItems(state)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editAccount = async (values: any) => {
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

  const onChange = (v: any) => {
    setServiceAccount(v)
  }

  return (
    <ContentContainer>
      <InfoContainer>
        <div className="text-2xl text-medium mb-4">Account Details</div>
        {
          data ? (
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
                    )})
            )
          ) : null
        }
      </InfoContainer>
    </ContentContainer>
  );
};
export default AccountDetails;
