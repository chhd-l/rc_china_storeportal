import React, { useState, useRef } from "react";
import { EditableProTable } from "@ant-design/pro-table";
import ProCard from "@ant-design/pro-card";
import { Button, Space, Tag, Input } from "antd";
import { ProFormField } from "@ant-design/pro-form";
import type {
  ProColumns,
  ColumnsState,
  ActionType,
} from "@ant-design/pro-table";
type DataSourceType = {
  id: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  labels?: string[];
  created_at?: string;
  children?: DataSourceType[];
};
const TagList: React.FC<{
  value?: {
    key: string;
    label: string;
  }[];
  onChange?: (
    value: {
      key: string;
      label: string;
    }[]
  ) => void;
}> = ({ value, onChange }) => {
  const ref = useRef<any | null>(null);
  const [newTags, setNewTags] = useState<
    {
      key: string;
      label: string;
    }[]
  >([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tempsTags = [...(value || [])];
    if (
      inputValue &&
      tempsTags.filter((tag) => tag.label === inputValue).length === 0
    ) {
      tempsTags = [
        ...tempsTags,
        { key: `new-${tempsTags.length}`, label: inputValue },
      ];
    }
    onChange?.(tempsTags);
    setNewTags([]);
    setInputValue("");
  };

  return (
    <Space>
      {(value || []).concat(newTags).map((item) => (
        <Tag key={item.key}>{item.label}</Tag>
      ))}
      <Input
        ref={ref}
        type="text"
        size="small"
        style={{ width: 78 }}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
      />
    </Space>
  );
};
const defaultData: DataSourceType[] = new Array(5).fill(1).map((_, index) => {
  return {
    id: (Date.now() + index).toString(),
    title: `活动名称${index}`,
    decs: "这个活动真好玩",
    labels: ["test"],
    state: "open",
    created_at: "2020-05-26T09:42:56Z",
  };
});

export default () => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id)
  );
  const [dataSource, setDataSource] = useState<DataSourceType[]>(
    () => defaultData
  );

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: "活动名称",
      dataIndex: "title",
      width: "30%",
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: "此项是必填项",
          },
          {
            message: "必须包含数字",
            pattern: /[0-9]/,
          },
          {
            max: 16,
            whitespace: true,
            message: "最长为 16 位",
          },
          {
            min: 6,
            whitespace: true,
            message: "最小为 6 位",
          },
        ],
      },
    },

    {
      title: "状态",
      key: "state",
      dataIndex: "state",
      valueType: "select",
      valueEnum: {
        all: { text: "全部", status: "Default" },
        open: {
          text: "未解决",
          status: "Error",
        },
        closed: {
          text: "已解决",
          status: "Success",
        },
      },
    },
    {
      title: "test",
      key: "test",
      dataIndex: "test",
      // renderFormItem: () => <TagList />,
      renderFormItem: (_, row) => <div>{row?.record?.title}</div>,
      render: (_, row) => <div>tesdhsj</div>,
      // render: (_, row) =>
      //   row?.labels?.map((item) => <Tag key={Math.random()}>{item}</Tag>),
      valueType: "select",
      // valueEnum: {
      //   all: { text: "全部", status: "Default" },
      //   open: {
      //     text: "未解决",
      //     status: "Error",
      //   },
      //   closed: {
      //     text: "已解决",
      //     status: "Success",
      //   },
      // },
    },
    {
      title: "描述",
      dataIndex: "decs",
    },
    {
      title: "操作",
      valueType: "option",
      width: 250,
      render: () => {
        return null;
      },
    },
  ];
  const [columnsStateMap, setColumnsStateMap] = useState<
    Record<string, ColumnsState>
  >({
    title: {
      show: false,
      order: 2,
    },
  });
  const addRow = () => {
    actionRef.current?.addEditRecord?.({
      id: (Math.random() * 1000000).toFixed(0),
      title: "新的一行",
    });

    // setDataSource([
    //   ...dataSource,
    //   {
    //     id: Date.now().toString(),
    //     title: `活动名称test`,
    //     decs: "这个活动真好玩",
    //     labels: ["testtest"],
    //     state: "open",
    //     created_at: "2020-05-26T09:42:56Z",
    //   },
    // ]);
    console.info("addRow");
  };
  const addCol = () => {
    setColumnsStateMap({
      title: {
        show: true,
        order: 2,
      },
    });
    console.info("addCol");
  };
  return (
    <>
      <EditableProTable<DataSourceType>
        actionRef={actionRef}
        headerTitle="可编辑表格"
        columns={columns}
        columnsState={{
          value: columnsStateMap,
          onChange: (value) => {
            console.info("value", value);
            setColumnsStateMap(value);
          },
        }}
        rowKey="id"
        scroll={{
          x: 960,
        }}
        value={dataSource}
        onChange={setDataSource}
        // recordCreatorProps={false}
        recordCreatorProps={{
          newRecordType: "dataSource",
          record: () => ({
            id: Date.now(),
          }),
        }}
        toolBarRender={() => {
          return [
            <Button
              type="primary"
              key="save"
              onClick={() => {
                // dataSource 就是当前数据，可以调用 api 将其保存
                console.log(dataSource);
              }}
            >
              保存数据
            </Button>,
          ];
        }}
        editable={{
          type: "multiple",
          editableKeys,
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete];
          },
          onValuesChange: (record, recordList) => {
            setDataSource(recordList);
          },
          onChange: setEditableRowKeys,
          onlyAddOneLineAlertMessage: "??>>",
        }}
      />
      <Button onClick={addRow}>add new row</Button>
      <Button onClick={addCol}>add new col</Button>
      <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: "100%",
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  );
};
