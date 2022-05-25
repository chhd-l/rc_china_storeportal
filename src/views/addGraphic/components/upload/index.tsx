import React from "react";
import { Dropdown, Menu, Upload } from 'antd';
import './index.less';

const MyUpload: React.FC = () => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Upload>
          <span>Select</span>
        </Upload>
      </Menu.Item>
      <Menu.Item key="1">Picture Assets</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <div className="upload-container flex justify-center items-center">
        <span className="iconfont icon-jiahao"></span>
      </div>
    </Dropdown>
  );
}

export default MyUpload
