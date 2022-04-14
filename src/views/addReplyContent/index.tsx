import { Button, Form, Input, Select } from "antd";
import {
  ADD_REPLY_CONTENT_FORM,
  BASE_FORM,
  TEXT_FORM,
  VIDEO_FORM,
} from "./modules/form";
import { useNavigate } from "react-router";
import { useState } from "react";
import SelectContext from "./components/SelectAssets";
import { Asset } from "@/framework/types/wechat";
import { Container, ContentContainer, InfoContainer } from "@/components/ui";

const AddAccount = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigator = useNavigate();
  const [formItems, setFromItems] = useState(
    ADD_REPLY_CONTENT_FORM.concat(BASE_FORM)
  );
  const [form] = Form.useForm();

  const formValuesChange = (changedValues: any, allValues: any) => {
    console.log(changedValues, allValues);
    let baseFormItems = ADD_REPLY_CONTENT_FORM;
    switch (allValues.type) {
      case "":
      case "picture":
      case "voice":
        baseFormItems = baseFormItems.concat(BASE_FORM);
        break;
      case "text":
        baseFormItems = baseFormItems.concat(TEXT_FORM);
        break;
      case "video":
      case "graphic":
        baseFormItems = baseFormItems.concat(BASE_FORM, VIDEO_FORM);
        break;
      default:
        break;
    }
    setFromItems(baseFormItems);
  };

  const searchDescription = () => {
    setModalVisible(true);
  };

  const addAccount = (values: any) => {
    console.log(values);
  };

  const setAssetId = (selectAsset: Asset) => {
    form.setFieldsValue({ assetId: selectAsset.assetId });
    setModalVisible(false);
  };

  return (
    <ContentContainer>
      <InfoContainer>
        <div className="text-2xl text-medium mb-4">add Reply Content</div>
        <Form
          onValuesChange={formValuesChange}
          onFinish={addAccount}
          autoComplete="off"
          className="w-3/4"
          form={form}
        >
          {formItems.map((item) => (
            <Form.Item
              label={item.label}
              name={item.name}
              rules={item.rules}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              key={item.name}
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
              ) : item.type === "search" ? (
                <Input.Search
                  placeholder={item.placeholder}
                  onSearch={searchDescription}
                />
              ) : (
                <Input
                  placeholder={item.placeholder}
                  disabled={item.name === "assetTitle"}
                  className="bg-white"
                />
              )}
            </Form.Item>
          ))}
          <Form.Item
            className="w-full flex flex-row justify-end"
            wrapperCol={{ span: 8 }}
          >
            <Button
              danger
              className="mr-4"
              onClick={() => {
                navigator("/account-list");
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
      <SelectContext
        modalVisible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
        }}
        onConfirm={setAssetId}
        type={form.getFieldValue("type")}
      />
    </ContentContainer>
  );
};
export default AddAccount;
