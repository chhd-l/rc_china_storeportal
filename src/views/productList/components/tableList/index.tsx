import { dataSource } from "../../modules/mockdata";
import Mock from "mockjs";
import { useState } from "react";
import { cloneDeep } from "lodash";
import {
  CaretDownFilled,
  CaretUpFilled,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Pagination } from "antd";
import "./index.less";
import { tableHeaders } from "../../modules/constant";
import { ProductListItemProps } from "@/framework/types/product";
const listData = Mock.mock(dataSource).prodcuts;
const ListTable = () => {
  const [list, setList] = useState<ProductListItemProps[]>(listData);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);
  const [tableHeader, setTableHeader] = useState(tableHeaders);
  const hanldeshowAll = (spu: ProductListItemProps, idx: number) => {
    list[idx].showAll = !list[idx].showAll;
    setList(cloneDeep(list));
  };
  const onChange = (idx: number) => {
    list[idx].checked = !list[idx].checked;
    let checkedArr = list.filter((el) => el.checked);
    let notCheckedArr = list.filter((el) => !el.checked);
    let isNotCheckedAll = !!checkedArr.length && !!notCheckedArr.length;
    setIndeterminate(isNotCheckedAll);
    if (notCheckedArr.length == list.length) {
      setCheckedAll(false);
    } else if (checkedArr.length == list.length) {
      setCheckedAll(true);
    }
    setList(cloneDeep(list));
  };
  const handleCheckedAll = () => {
    let isChecked = false;
    if (indeterminate || !checkedAll) {
      isChecked = true;
    }
    list.forEach((el) => {
      el.checked = isChecked;
    });
    setCheckedAll(!checkedAll);
    setIndeterminate(false);
    setList(cloneDeep(list));
  };
  const handlePagination = (page: number, pageSize: number) => {
    console.info(page, pageSize);
  };
  const handleSort = (key: string, sortDirection: string, index: number) => {
    tableHeader.forEach((el) => {
      el.sortDirection = "";
    });
    if (sortDirection == "ascend") {
      tableHeader[index].sortDirection = "descend"; //降序
    } else {
      tableHeader[index].sortDirection = "ascend";
    }
    setTableHeader(cloneDeep(tableHeader));
    // 接口请求
    console.info("key", key);
  };
  return (
    <div>
      <div className="border-l border-r border-solid border-gray-400">
        <div className="flex bg-gray-200 py-3">
          <div className="px-2">
            <Checkbox
              indeterminate={indeterminate}
              checked={checkedAll}
              onChange={handleCheckedAll}
            />
          </div>
          {tableHeader.map((item, idx) => (
            <div className={`flex items-center ${idx == 0 ? "w-52" : "w-40"} `}>
              <div> {item.title}</div>
              {item.sortble ? (
                <div
                  onClick={() => {
                    handleSort(item.dataIndex, item.sortDirection, idx);
                  }}
                  style={{ fontSize: "0.6rem" }}
                  className="pl-1 cursor-pointer"
                >
                  <div className="relative top-1">
                    <CaretUpFilled
                      className={item.sortDirection == "ascend" ? "active" : ""}
                    />
                  </div>
                  <div className="relative -top-2">
                    {item.sortDirection == "descend"}
                    <CaretDownFilled
                      className={
                        item.sortDirection == "descend" ? "active" : ""
                      }
                    />
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        {list.map((spu, spuIdx) => (
          <div className="flex bg-white border-b border-solid border-gray-400">
            <div className="px-2 py-1">
              <Checkbox
                checked={spu.checked}
                onChange={() => {
                  onChange(spuIdx);
                }}
              />
            </div>
            <div className="w-52 flex py-1">
              <div>
                <img src={spu.img} />
              </div>
              <div className="pl-1">
                <div>{spu.name}</div>
                <div className="text-gray-400">{spu.no}</div>
              </div>
            </div>
            <div>
              {spu.skus
                .filter((el, idx) => idx < 3)
                .map((sku: any) => (
                  <div className="flex py-1">
                    {tableHeader.map((item, itemIdx) => (
                      <>
                        {itemIdx > 0 ? (
                          <div className="w-40">
                            {item.dataIndex == "actions"
                              ? item?.render?.(spu, spuIdx)
                              : sku[item.dataIndex]}
                          </div>
                        ) : null}
                      </>
                    ))}
                  </div>
                ))}
              {spu.skus.length > 3 && spu.showAll ? (
                spu.skus
                  .filter((el, idx) => idx > 3)
                  .map((sku: any, index: number) => (
                    <>
                      <div className="flex py-1">
                        {tableHeader.map((item, itemIdx) => (
                          <>
                            {itemIdx > 0 ? (
                              <div className="w-40">{sku[item.dataIndex]}</div>
                            ) : null}
                          </>
                        ))}
                      </div>
                      {spu.skus.length - 5 === index ? (
                        <div
                          className="cursor-pointer"
                          onClick={() => hanldeshowAll(spu, spuIdx)}
                        >
                          <div className="border-b border-solid mt-4 boder-gary-400 relative mb-8">
                            <div className="flex items-center absolute bg-white px-4 py-2 left-2/4 -translate-x-2/4 -translate-y-2/4">
                              hide <UpOutlined />
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </>
                  ))
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() => hanldeshowAll(spu, spuIdx)}
                >
                  <div className="border-b border-solid mt-4 boder-gary-400 relative mb-8">
                    <div className="flex items-center absolute bg-white px-4 py-2 left-2/4 -translate-x-2/4 -translate-y-2/4">
                      More({spu.skus.length - 3} Products SKUs) <DownOutlined />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white">
        <Pagination
          className="text-right my-8"
          onChange={handlePagination}
          defaultCurrent={1}
          total={500}
        />
      </div>
      <div className="bg-white flex justify-between py-4">
        <div>
          <Checkbox
            indeterminate={indeterminate}
            checked={checkedAll}
            onChange={handleCheckedAll}
          />
        </div>
        <div>
          <span className="mr-4">
            {list.filter((el) => el.checked)?.length || 0} products selected
          </span>
          <Button className="mr-4">Delete</Button>
          <Button className="mr-4">Delist</Button>
          <Button className="mr-4" type="primary">
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ListTable;
