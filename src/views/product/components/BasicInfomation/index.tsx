import React, { useEffect, useState } from 'react';
import Upload from '../../../../components/Upload';
import {
  Form,
  Space,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

export default(props:any) => {
  const [form] = Form.useForm();
  console.info('propsprops', props)
  const onFinish = (values: any) => {
    console.log(values);
  };
  const breedList = [{name:'breed1',value:'breed1'},{name:'breed2',value:'breed2'}]
  const salesStatusList = [{name:'status1',value:'status1'},{name:'status2',value:'status2'}]
 return <>
    <Form.Item {...props.field} label="Product Image" name={[props.field.name, 'img1']}>
        <div className='text-left'>
        <Upload />
        </div>
      </Form.Item>
      <Form.Item label="Product Video"  name={[props.field.name, 'video']}>
      <div className='text-left'>
        <Upload />
      </div>
      </Form.Item>
      <Form.Item label="SPU"  name={[props.field.name, 'spu']}  rules={[{ required: true, message: 'Missing SPU' }]}>
        <Input />
      </Form.Item>
      
      <Form.Item label="Product Name" name={[props.field.name, 'name']} rules={[{ required: true, message: 'Missing Product Name' }]}>
        <Input showCount maxLength={120}/>
      </Form.Item>
      
      <Form.Item label="Product Card Name" name={[props.field.name,"cardName"]} >
        <Input showCount maxLength={120}/>
      </Form.Item>
      
      <Form.Item label="Product Description" name={[props.field.name,'description']}  rules={[{ required: true, message: 'Missing Product Description' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Category" name={[props.field.name,'category']} >
        <Input />
      </Form.Item>
      <Form.Item label="Brand" name={[props.field.name,'brand']} >
      <Select options={breedList}  />
      </Form.Item>
      <Form.Item label="Sales Status" name={[props.field.name,'salesStatus']} >
      <Select options={salesStatusList} />
      </Form.Item>
 </>
  return (
    <Form
    form={form}
    onFinish={onFinish}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{"users": [{
        fieldKey: 0,
        isListField: true,
        key: 0,
        name: 0,
        endTime: "14:48",
        startTime: "14:48",
      }, {
        fieldKey: 1,
        isListField: true,
        key: 1,
        endTime: "14:48",
        startTime: "14:48",
        name: 1
      }]}}
    >
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                {key==0&&<Form.Item
                  {...restField}
                  name={[name, 'first']}
                  rules={[{ required: true, message: 'Missing first name' }]}
                >

                  <Input placeholder="First Name" />
                </Form.Item>}
                {key==1&&<Form.Item
                  {...restField}
                  name={[name, 'last']}
                  rules={[{ required: true, message: 'Missing last name' }]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>}
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      {/* <Form.Item label="Product Image" name="image1">
        <div className='text-left'>
        <Upload />
        </div>
      </Form.Item>
      <Form.Item label="Product Video" name="video">
      <div className='text-left'>
        <Upload />
      </div>
      </Form.Item>
      <Form.Item label="SPU" name="spu"  rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      
      <Form.Item label="Product Name" name="name"  rules={[{ required: true }]}>
        <Input showCount maxLength={120}/>
      </Form.Item>
      
      <Form.Item label="Product Card Name" name="cardName" >
        <Input showCount maxLength={120}/>
      </Form.Item>
      
      <Form.Item label="Product Description" name="description" rules={[{ required: true }]} >
        <Input />
      </Form.Item> */}
    </Form>
  );
};
