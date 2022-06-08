import { Button, Form, Input, Select, DatePicker } from "antd";
import React from "react";
import { SearchFormItemProps } from "@/framework/types/common";
import moment from "moment";
import './index.less'

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const Search = ({
  query,
  formItems,
  classes = "",
  // style = { width: "358px" },
  state = false,
  pages
}: {
  query: Function;
  formItems: SearchFormItemProps[];
  classes?: string;
  style?: any;
  state?: boolean;
  pages?: any;
}) => {
  const [form] = Form.useForm();

  const search = (values: any) => {
    const val = {...values, followTime: undefined}
    if(values?.followTime) {
      val.followStartTime = moment(values.followTime[0]._d).utc().startOf('day').format()
      val.followEndTime = moment(values.followTime[1]._d).utc().endOf('day').format()
    }
    Object.keys(val).forEach((k) => {
      if (val[k] === "") {
        val[k] = undefined
      }
    });
    query(pages.page, pages.limit ,val);
  };

  return (
    <div id="fanslist">
      <Form
        form={form}
        onFinish={search}
        autoComplete="off"
        className={`${classes} flex flex-row flex-wrap ${ state ? 'justify-between' : 'justify-between' } items-center`}
        layout={"inline"}
      >
        {formItems.map((item) => (
          <Form.Item
            label={item.label}
            name={item.name}
            className='mb-4'
            key={item.name}
          >
            {item.type === "select" ? (
              <Select placeholder={item.placeholder} style={{minWidth: 280}} allowClear>
                {(item.selectList || []).map((el, index) => (
                  <Select.Option value={el.key} key={index}>
                    {el.label}
                  </Select.Option>
                ))}
              </Select>
            ) : item.type === "textarea" ? (
              <Input.TextArea
                placeholder={item.placeholder}
                autoSize={{ minRows: 3, maxRows: 5 }}
                style={{minWidth: 280}}
              />
            ) : item.type === "dateTime" ? (
              <RangePicker
                className="flex items-center"
                // defaultValue={[moment('2021/11/09', dateFormat), moment('2021/11/12', dateFormat)]}
                format={dateFormat}
                style={{minWidth: 280}}
              />
            ) : (
              <Input placeholder={item.placeholder} style={{minWidth: 280}} />
            )}
          </Form.Item>
        ))}
        <Form.Item className="w-full flex flex-row">
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            className="ml-4"
            htmlType="button"
            onClick={() => {
              form.resetFields();
              query()
            }}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Search;
