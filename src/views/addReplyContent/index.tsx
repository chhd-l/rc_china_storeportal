import { Button, Form, Input, Select } from "antd";
import {
  ADD_REPLY_CONTENT_FORM,
  BASE_FORM,
  TEXT_FORM,
  VIDEO_FORM,
} from "./modules/form";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import AssetsModal from "@/components/wechat/AssetsModal";
import { Asset } from "@/framework/types/wechat";
import { Container, ContentContainer, InfoContainer } from "@/components/ui";
import { createReplyContent, updateReplyContent, getReplyContentDetail } from "@/framework/api/wechatSetting";
import { ReplyContent } from "@/framework/types/wechat";
import { normaliseReplyContent } from "@/framework/normalize/wechatSetting";

const AddAccount = () => {
  const [title, setTitle] = useState<string>("Add New Reply Content");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [assetType, setAssetType] = useState<"image" | "video" | "voice">("image")
  const navigator = useNavigate();
  const [formItems, setFromItems] = useState(
    ADD_REPLY_CONTENT_FORM.concat(BASE_FORM)
  );
  const [form] = Form.useForm();
  const location = useLocation();

  useEffect(() => {
    const state: any = location.state;
    if (state?.id) {
      getReplyDetailIfEdit(state.id);
      setTitle("Edit Reply Content");
      setAssetType(state.type === "voice" ? 'voice' : state.type === "video" ? "video" : "image");
      formValuesChange({}, { type: state.type });
      form.setFieldsValue({
        type: state?.type ?? undefined,
        description: state?.description ?? undefined,
        assetId: state?.mediaId ?? undefined,
        message: state?.content ?? undefined,
      });
    }
  }, []);

  const getReplyDetailIfEdit = async (id: string) => {
    setLoading(true);
    const reply = await getReplyContentDetail(id);
    setLoading(false);
    form.setFieldsValue({
      assetTitle: reply?.title ?? ''
    });
  }

  const formValuesChange = (changedValues: any, allValues: any) => {
    console.log(changedValues, allValues);
    let baseFormItems = ADD_REPLY_CONTENT_FORM;
    switch (allValues.type) {
      case "":
      case "image":
        setAssetType("image");
        baseFormItems = baseFormItems.concat(BASE_FORM);
        break;
      case "voice":
        setAssetType("voice");
        baseFormItems = baseFormItems.concat(BASE_FORM);
        break;
      case "text":
        baseFormItems = baseFormItems.concat(TEXT_FORM);
        break;
      case "video":
        setAssetType("video");
        baseFormItems = baseFormItems.concat(BASE_FORM, VIDEO_FORM);
        break;
      case "news":
        baseFormItems = baseFormItems.concat(BASE_FORM);
        break;
      default:
        break;
    }
    setFromItems(baseFormItems);
  };

  const searchDescription = () => {
    setModalVisible(true);
  };

  const addAccount = async (values: any) => {
    console.log(values);
    setLoading(true);
    const newReplyContent = {
      accountId: '000001',
      responseDescribe: values.description,
      responseType: values.type,
      messageContent: values.type === 'text' ? values.message : undefined,
      mediaId: values.type !== 'text' ? values.assetId: undefined,
    };
    if ((location?.state as any)?.id) {
      await updateReplyContent((location.state as any).id, newReplyContent);
    } else {
      await createReplyContent(newReplyContent);
    }
    setLoading(false);
    navigator("/reply/reply-contents");
  };

  const setAssetId = (selectAsset: Asset) => {
    form.setFieldsValue({ assetId: selectAsset.assetId, assetTitle: assetType === 'video' ? selectAsset.assetTitle : undefined });
    setModalVisible(false);
  };

  return (
    <ContentContainer>
      <InfoContainer>
        <div className="text-2xl text-medium mb-4">{title}</div>
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
                  readOnly
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
                navigator("/reply/reply-contents");
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading} danger>
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </InfoContainer>
      <AssetsModal
        visible={modalVisible}
        assetType={assetType}
        onlySync={true}
        onConfirm={setAssetId}
        onCancel={() => setModalVisible(false)}
      />
    </ContentContainer>
  );
};
export default AddAccount;
