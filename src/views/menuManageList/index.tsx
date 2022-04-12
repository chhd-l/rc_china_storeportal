import ProTable from "@/components/common/ProTable";
import { Button } from "antd";
import "./index.less";
import { mockList } from "./modules/mockdata";
import Mock from "mockjs";
import { tableColumns } from "./modules/constant";
const MenuManage = () => {
  const changeStatus = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  const handleDelete = (id: string) => {
    console.info("handleDelete", id);
  };
  const columns = tableColumns({ changeStatus, handleDelete });
  console.info("sdsd");
  return (
    <div className="menu-manage">
      <ProTable
        search={false}
        toolBarRender={() => [
          <Button className="mt-8 " type="primary" ghost>
            + Add
          </Button>,
        ]}
        columns={columns}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log("test sort", params, sorter, filter);
          return Promise.resolve({
            data: Mock.mock(mockList).list,
            success: true,
          });
        }}
      />
    </div>
  );
};

export default MenuManage;
