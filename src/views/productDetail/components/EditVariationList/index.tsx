import "./index.less";
import { VariationosContext } from "../SalesInfo";
import { useContext, useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import { Form, Input } from "antd";
import { FormProps } from "@/framework/types/common";
import classNames from "classnames";
import {
  SpecificationListProps,
  VarationProps,
  VarationsFormProps,
} from "@/framework/types/product";
import { headerOrigition } from "../../modules/constant";
interface VarviationProps {
  img: string;
  sku: string;
  ean: string;
  listPrice: string;
  marketingPrice: string;
  spec: string;
  [key: string]: string;
}

const commonClass =
  "w-32 border-0 border-t border-r border-solid border-gray-200 text-center";
const EditVariationList = (props: FormProps) => {
  const { variationForm: cloneVariationForm } = useContext(VariationosContext);
  const [variationList, setVariationList] = useState<VarviationProps[]>([]);
  const [headerList, setHeaderList] = useState<string[]>([]);
  const [variationForm, setVariationForm] = useState({} as VarationsFormProps);
  // console.info("variationForm", variationForm);
  // const aa = {
  //   variationList: [
  //     {
  //       name: "test1",
  //       specificationList: [
  //         { option: 1111111111 },
  //         { option: 22 },
  //         { option: 33 },
  //       ],
  //     },
  //     {
  //       name: "test2",
  //       specificationList: [{ option: 4455555 }, { option: 55 }],
  //     },
  //     {
  //       name: "test3",
  //       specificationList: [{ option: 66 }, { option: 77 }],
  //     },
  //     {
  //       name: "test4",
  //       specificationList: [{ option: 66 }, { option: 77 }],
  //     },
  //     {
  //       name: "test5",
  //       specificationList: [{ option: 66 }, { option: 77 }],
  //     },
  //     {
  //       name: "test6",
  //       specificationList: [{ option: 66 }, { option: 77 }],
  //     },
  //   ],
  // };
  useEffect(() => {
    const variationForm = cloneDeep(cloneVariationForm);
    console.info("variationForm", variationForm);
    variationForm.variationList?.forEach((variation: any, idx: number) => {
      variation.name = variation.name || `Variation${idx}`;
      variation.specificationList.forEach((specification: any) => {
        specification.option = specification.option || "option";
      });
    });
    // variationForms
    setVariationForm(variationForm);
    if (variationForm.variationList[0]) {
      getRows(variationForm);
      initHeader(variationForm);
    }
  }, [cloneVariationForm]);

  const initHeader = (data: VarationsFormProps) => {
    let variationHeaders = data.variationList.map(
      (el, idx) => el.name || `Varations[${idx}]`
    );
    const cloneHeaderOrigition = [...headerOrigition];
    cloneHeaderOrigition.splice(1, 0, ...variationHeaders);
    setHeaderList(cloneHeaderOrigition);
  };
  const combination = (vartion: any) => {
    var heads = vartion[0];
    for (var i = 1, len = vartion.length; i < len; i++) {
      heads = addNewType(heads, vartion[i]);
    }
    debugger;
    return vartion.length > 1 ? heads : heads.map((el: any) => el.option); //only one variation
  };
  const addNewType = (heads: any, choices: any) => {
    var result = [];
    for (var i = 0, len = heads.length; i < len; i++) {
      for (var j = 0, lenj = choices.length; j < lenj; j++) {
        result.push((heads[i]?.option || heads[i]) + "," + choices[j].option);
      }
    }
    return result;
  };
  const initData = (data: any, formData: VarationsFormProps) => {
    let list = data.map((el: any) => {
      let newEl: VarviationProps = {
        spec: el,
        img: "",
        sku: "",
        subSku: "",
        Subscription: "",
        ean: "",
        listPrice: "",
        marketingPrice: "",
        SubscriptionPrice: "",
      };
      el.split(",").forEach((spec: string, idx: number) => {
        let name = formData.variationList[idx].name || `Varations[${idx}]`;
        newEl[name] = spec;
      });

      return newEl;
    });
    setVariationList(list);
  };

  const getRows = (data: VarationsFormProps) => {
    let specList: any = data?.variationList?.map((el) => {
      return el.specificationList;
    });
    if (specList?.[0]) {
      console.info("specList", specList);
      let varations: string[] = combination(specList);
      console.info("varations", varations);
      initData(varations, data);
    }
  };
  return (
    <>
      {variationForm.variationList?.length ? (
        <div className="edit-variation-list bg-white">
          <div className="border-l border-b border-solid border-gray-200 table table-warp">
            <div
              className={classNames(
                "list-header table-caption  table-row  bg-gray-200 z-10 h-12"
              )}
            >
              {headerList.map((el) => (
                <div className={classNames(commonClass, "align-middle")}>
                  {el}
                </div>
              ))}
            </div>
            {variationList.map((el) => (
              <Form className="list-content table-row ">
                <Form.Item name="img" className="table-cell">
                  <Input
                    value={el.img}
                    className={commonClass}
                    placeholder="input"
                  />
                </Form.Item>
                {variationForm.variationList.map(
                  (spec: VarationProps, idx: number) => (
                    <div className={classNames(commonClass, "px-2 table-cell")}>
                      {el[spec.name]}
                    </div>
                  )
                )}
                <Form.Item name="sku" className="table-cell">
                  <Input
                    value={el.sku}
                    className={commonClass}
                    placeholder="input"
                  />
                </Form.Item>
                <Form.Item name="subSku" className="table-cell">
                  <Input
                    value={el.subSku}
                    className={commonClass}
                    placeholder="input"
                  />
                </Form.Item>
                <Form.Item name="ean" className="table-cell">
                  <Input
                    value={el.ean}
                    className={commonClass}
                    placeholder="input"
                  />
                </Form.Item>
                <Form.Item name="listPrice" className="table-cell">
                  <Input
                    value={el.listPrice}
                    className={commonClass}
                    placeholder="input"
                  />
                </Form.Item>
                <Form.Item name="subscriptionPrice" className="table-cell">
                  <Input
                    value={el.subscriptionPrice}
                    className={commonClass}
                    placeholder="input"
                  />
                </Form.Item>
                <Form.Item name="subscription" className="table-cell">
                  <Input
                    value={el.subscription}
                    className={commonClass}
                    placeholder="input"
                  />
                </Form.Item>
              </Form>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default EditVariationList;
