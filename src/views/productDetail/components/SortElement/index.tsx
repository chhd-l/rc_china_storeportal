import { DragOutlined, DeleteOutlined } from "@ant-design/icons"
import { Col, Form, Input, Row, Space } from "antd"
import { cloneDeep } from "lodash"
import { useContext } from "react"
import { SortableElement, SortableHandle } from "react-sortable-hoc"
import { VariationosContext } from "../SalesInfo"

import "./index.less"
export type SortElementProps = {
  specification: any
  index: number
  specificationIdx: number
  removeSpecification: any
}
const DragHandle = SortableHandle(() => <DragOutlined className="mx-2" />)
const SortElement = SortableElement(
  ({
    specification,
    variationIdx,
    specificationIdx,
    variationForm,
    setVariationForm,
  }: {
    specification: any
    variationIdx: number
    specificationIdx: number
    variationForm: any
    setVariationForm: any
  }) => {
    console.info("optiosnvariationForm", variationForm)
    const handleOption = (e: any) => {
      variationForm.variationList[variationIdx].specificationList[
        specificationIdx
      ].option = e.target.value
      console.info("option", e.target.value)
      setVariationForm(cloneDeep(variationForm))
    }
    return (
      <Row className="pt-3">
        <Col span={4} className="text-right">
          Option：
        </Col>
        <Col span={15}>
          <Input
            defaultValue={specification.option}
            // value={specification.option}
            onBlur={handleOption}
            placeholder="Option"
            showCount
            maxLength={20}
          />
        </Col>
        <Col span={4} className="flex items-center">
          <DragHandle />
          <DeleteOutlined className="cursor-pointer" />
        </Col>
      </Row>
    )
  }
)

export default SortElement
