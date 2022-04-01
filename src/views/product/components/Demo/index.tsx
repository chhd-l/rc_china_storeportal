import { FC, useState } from "react";
import { message, Descriptions } from "antd";
import ProForm, {
  ProFormDependency,
  ProFormList,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-form";
import { PageContainer } from "@ant-design/pro-layout";
import ProCard from "@ant-design/pro-card";

const BasicForm: FC<Record<string, any>> = () => {
  return (
    <PageContainer content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
      <ProForm
        onFinish={async (values) => {
          console.log(values);
          message.success("提交成功");
        }}
      >
        <ProFormList
          name="variation"
          // label="name"

          actionGuard={{
            beforeAddRow: async (defaultValue, insertIndex, index) => {
              return new Promise((resolve) => {
                console.log(defaultValue, insertIndex, index);
                setTimeout(() => resolve(true), 100);
              });
            },
          }}
          itemRender={({ listDom, action }, { record }) => {
            console.log("record", record);
            return (
              <ProCard
                bordered
                extra={action}
                title="variation"
                style={{
                  marginBottom: 8,
                  maxWidth: 500,
                }}
              >
                {listDom}
              </ProCard>
            );
          }}
        >
          <ProFormText name="name" label="name" width="sm" />
          <ProFormList
            name="options"
            label="options"
            creatorButtonProps={{
              creatorButtonText: "Add Options",
            }}
          >
            <ProFormText name="option" width="sm" />
          </ProFormList>
        </ProFormList>

        <ProFormDependency name={["variation"]}>
          {({ variation }) => {
            console.log("variation", variation);
            return (
              <Descriptions title="Variation List" layout="vertical" bordered>
                <Descriptions.Item label="image">
                  <ProFormUploadButton name="upload" action="upload.do" />
                </Descriptions.Item>
                {variation?.map((item: any, index: number) => (
                  <Descriptions.Item label={item?.name} key={index}>
                    {item?.options?.map((child: any, ind: number) => (
                      <div key={ind}>{child?.option}</div>
                    ))}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            );
          }}
        </ProFormDependency>
      </ProForm>
    </PageContainer>
  );
};

export default BasicForm;
