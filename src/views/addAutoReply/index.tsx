import { Button, Form, Input, Select } from "antd";
import { ADD_AUTO_REPLY_FORM } from "./modules/form";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ReplyModal from "@/components/wechat/ReplyModal";
import { ReplyContent } from "@/framework/types/wechat";
import { ContentContainer, InfoContainer } from "@/components/ui";
import { createAutomaticResponse, updateAutomaticResponse } from "@/framework/api/wechatSetting";
import { SearchOutlined } from "@ant-design/icons";

const AddAccount = () => {
  const [title, setTitle] = useState<string>("Add New Automatic Reply");
  const [modalVisible, setModalVisible] = useState(false);
  const [reply, setReply] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigator = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();

  useEffect(() => {
    const state: any = location.state;
    if (state?.id) {
      setTitle("Edit Automatic Reply");
      setReply({
        id: state.responseId,
        description: state?.responseDes
      });
      form.setFieldsValue({
        type: state?.matchType,
        keywords: state?.keywords,
        description: state?.responseDes,
      });
    }
  }, []);

  const searchDescription = () => {
    setModalVisible(true);
  };

  const addAccount = async (values: any) => {
    console.log(values);
    const state: any = location.state;
    setLoading(true);
    let success = false;
    if (state?.id) {
      success = await updateAutomaticResponse(state.id, {
        matchType: values.type,
        keyWords: values.keywords,
        replyContentId: reply?.id,
      }).then(res => !!res);
    } else {
      success = await createAutomaticResponse({
        accountId: "000001",
        matchType: values.type,
        keyWords: values.keywords,
        replyContentId: reply?.id,
        isActive: false,
      }).then(res => res.id);
    }
    setLoading(false);
    if (success) {
      navigator("/auto-reply/auto-reply-list");
    }
  };

  const setReplyDes = (selectReplyContent: ReplyContent) => {
    setReply(selectReplyContent);
    form.setFieldsValue({ description: selectReplyContent.description });
    setModalVisible(false);
  };

  return (
    <ContentContainer>
      <InfoContainer>
        <div className="text-2xl text-medium mb-4">{title}</div>
        <Form
          onFinish={addAccount}
          autoComplete="off"
          className="w-3/4"
          form={form}
        >
          {ADD_AUTO_REPLY_FORM.map((item) => (
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
              ) : item.type === "search" ? (
                <Input
                  readOnly
                  placeholder={item.placeholder}
                  onClick={searchDescription}
                  suffix={<SearchOutlined onClick={searchDescription} className="text-gray-400" />}
                />
              ) : (
                <Input placeholder={item.placeholder} />
              )}
            </Form.Item>
          ))}
          <Form.Item
            wrapperCol={{ span: 24 }}
          >
            <div className="flex flex-row justify-end space-x-4">
              <Button
                danger
                onClick={() => {
                  navigator("/auto-reply/auto-reply-list");
                }}
              >
                Cancel
              </Button>
              <Button loading={loading} type="primary" htmlType="submit" danger>
                Confirm
              </Button>
            </div>
          </Form.Item>
        </Form>
      </InfoContainer>
      {modalVisible ? <ReplyModal
        visible={modalVisible}
        onlyEnabled={true}
        onConfirm={setReplyDes}
        onCancel={() => setModalVisible(false)}
      /> : null}
    </ContentContainer>
  );
};
export default AddAccount;
