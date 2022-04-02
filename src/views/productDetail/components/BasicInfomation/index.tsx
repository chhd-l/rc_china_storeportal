import Upload from "@/components/common/Upload";
import Wangeditor from "@/components/common/Wangeditor";
import { Form, Input, Select } from "antd";
import { useState } from "react";
import type { FormProps } from "@/framework/types/common";
const breedList = [
  { name: "breed1", value: "breed1" },
  { name: "breed2", value: "breed2" },
];
const salesStatusList = [
  { name: "status1", value: "status1" },
  { name: "status2", value: "status2" },
];
const BasicInfomation = (props: FormProps) => {
  // const [form] = Form.useForm();
  console.info("propsprops", props);
  // const onFinish = (values: any) => {
  //   console.log(values);
  // };
  const [editorHtml, setEditorHtml] = useState("");
  const [videoUrl, setvideoUrl] = useState("");
  const handleEditorChange = (html: string) => {
    setEditorHtml(html);
    console.info("editorHtml", editorHtml);
  };
  const handleImgUrl = (url: string) => {
    setvideoUrl(url);
    console.info("videoUrl", videoUrl);
  };

  return (
    <>
      <Form.Item
        {...props.field}
        label="Product Image"
        name={[props.field.name, "img1"]}
      >
        <div className="text-left">
          <Upload handleImgUrl={handleImgUrl} showUploadList={false} />
        </div>
      </Form.Item>
      <Form.Item label="Product Video" name={[props.field.name, "video"]}>
        <div className="text-left">
          <Upload handleImgUrl={handleImgUrl} showUploadList={false} />
        </div>
      </Form.Item>
      <Form.Item
        label="SPU"
        name={[props.field.name, "spu"]}
        rules={[{ required: true, message: "Missing SPU" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Product Name"
        name={[props.field.name, "name"]}
        rules={[{ required: true, message: "Missing Product Name" }]}
      >
        <Input showCount maxLength={120} />
      </Form.Item>

      <Form.Item
        label="Product Card Name"
        name={[props.field.name, "cardName"]}
      >
        <Input showCount maxLength={120} />
      </Form.Item>
      <Form.Item
        label="Product Description"
        name={[props.field.name, "description"]}
        rules={[{ required: true, message: "Missing Product Description" }]}
      >
        <Wangeditor onChange={handleEditorChange} />
      </Form.Item>
      <Form.Item label="Category" name={[props.field.name, "category"]}>
        <Input />
      </Form.Item>
      <Form.Item label="Brand" name={[props.field.name, "brand"]}>
        <Select placeholder="please select Brand" options={breedList} />
      </Form.Item>
      <Form.Item label="Sales Status" name={[props.field.name, "salesStatus"]}>
        <Select
          placeholder="please select Sales Status"
          options={salesStatusList}
        />
      </Form.Item>
    </>
  );
};

export default BasicInfomation;
