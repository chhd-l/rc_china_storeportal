import './index.less'
import { Form, Input, Button, Col, Row } from 'antd'
import { CloseOutlined, DeleteOutlined, DragOutlined } from '@ant-design/icons'
import { cloneDeep } from 'lodash'
import { useContext } from 'react'
import { arrayMoveImmutable } from 'array-move'
import { VariationosContext } from '../SalesInfo'
import { SortContainer } from '../../modules/constant'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'
import SortElement from '../SortElement'
import { ChangeType, SpecificationListProps, VarationProps } from '@/framework/types/product'

export type AddVariationProps = {}
const initVaration = {
  name: '',
  sortIdx: 0, //为了匹配
  specificationList: [{ option: '', sortIdx: '0-0' }],
}
const initSpec = { option: '', sortIdx: '0-0' }
const AddVariation = ({}: AddVariationProps) => {
  const { variationForm, setVariationForm } = useContext(VariationosContext)
  const [form] = Form.useForm()
  const DragHandle = SortableHandle(() => <DragOutlined className='mx-2' />)
  const SortElements = SortableElement(
    ({
      specification,
      variationIdx,
      specificationIdx,
    }: {
      specification: SpecificationListProps
      variationIdx: number
      specificationIdx: number
    }) => {
      const handleOption = (e: any) => {
        variationForm.variationList[variationIdx].specificationList[specificationIdx].option = e.target.value
        console.info('option', e.target.value)
        setVariationForm(cloneDeep(variationForm))
      }
      return (
        <Row className='pt-3'>
          <Col span={4} className='text-right'>
            Option：
          </Col>
          <Col span={15}>
            <Input
              defaultValue={specification.option}
              // value={specification.option}
              onBlur={handleOption}
              onChange={() => {
                console.info('....', specification.option)
              }}
              placeholder='Option'
              showCount
              maxLength={20}
            />
          </Col>
          <Col span={4} className='flex items-center'>
            <DragHandle />
            <DeleteOutlined
              onClick={() => {
                handleDelSpecification(variationIdx, specificationIdx)
              }}
              className='cursor-pointer'
            />
          </Col>
        </Row>
      )
    },
  )
  const handleDelSpecification = (variationIdx: number, specificationIdx: number) => {
    variationForm.variationList[variationIdx].specificationList.splice(specificationIdx, 1)
    variationForm.changeType = ChangeType.handleSpec
    console.info(variationForm, 'variationForm')
    setVariationForm(cloneDeep(variationForm))
  }
  const handleDelVariation = (variationIdx: number) => {
    variationForm.variationList.splice(variationIdx, 1)
    variationForm.changeType = ChangeType.handleVariation

    console.info(variationForm, 'variationForm')
    setVariationForm(cloneDeep(variationForm))
  }

  const handleVariationUpdate = () => {
    setVariationForm(form.getFieldsValue())
  }
  const onSortEnd = ({ oldIndex, newIndex, collection }: { oldIndex: number; newIndex: number; collection: any }) => {
    const { variationList } = variationForm
    variationList[collection].specificationList = arrayMoveImmutable(
      variationList[collection].specificationList,
      oldIndex,
      newIndex,
    )
    variationForm.changeType = ChangeType.handleSpec
    console.info('onSortEndonSortEndvariationFormvariationForm', variationForm)
    console.info('onSortEndonSortEndvariationFormvariationForm', JSON.stringify(variationForm))
    setVariationForm(cloneDeep(variationForm))
  }
  const handleAddVariation = () => {
    let initVarationData = cloneDeep(initVaration)
    let { variationList } = variationForm
    let variationIdx = variationList.length //varation  sortidx
    initVaration.sortIdx = variationIdx
    let specificationIdx = 0 // spec sortidx
    initVarationData.sortIdx = variationIdx
    initVarationData.specificationList[0].sortIdx = `${variationIdx}-${specificationIdx}`
    variationForm.changeType = ChangeType.handleVariation
    variationForm.variationList = [...variationList, initVarationData]
    setVariationForm(cloneDeep(variationForm))
  }

  const handleAddSpecification = (variationIdx: number) => {
    let specificationSortIdx = variationForm.variationList[variationIdx].specificationList.length
    initSpec.sortIdx = `${variationIdx}-${specificationSortIdx}`
    variationForm.changeType = ChangeType.handleSpec
    variationForm.variationList[variationIdx].specificationList.push(initSpec)
    setVariationForm(cloneDeep(variationForm))
  }
  const handleName = (e: any, variationIdx: number) => {
    variationForm.variationList[variationIdx].name = e.target.value
    console.info('option', e.target.value)
    setVariationForm(cloneDeep(variationForm))
  }
  return (
    <div className='add-variation'>
      <SortContainer
        useDragHandle={true}
        // key={variationIdx}
        onSortEnd={onSortEnd}
      >
        {variationForm.variationList.map((variation: VarationProps, variationIdx: number) => (
          <Row key={`variationIdx-${variationIdx}`} className='pt-6 relative'>
            <Col span={4} className='text-right'>
              variation{variationIdx}：
            </Col>
            <Col span={16} className='bg-gray-200 pt-6'>
              <Row>
                <Col span={4} className='text-right'>
                  Name：
                </Col>
                <Col span={15}>
                  <Input
                    defaultValue={variation.name}
                    onChange={e => {
                      handleName(e, variationIdx)
                    }}
                    placeholder='Name'
                    showCount
                    maxLength={14}
                  />
                </Col>
                <Col span={4}></Col>
              </Row>
              {variation.specificationList.map((specification: SpecificationListProps, specificationIdx: number) => (
                <SortElements
                  variationIdx={variationIdx}
                  specificationIdx={specificationIdx}
                  specification={specification}
                  index={specificationIdx}
                  collection={variationIdx}
                  // variationForm={variationForm}
                  // setVariationForm={setVariationForm}
                />
              ))}
              <Row className='py-3'>
                <Col span={15} offset={4}>
                  <Button
                    className='w-full'
                    onClick={() => {
                      handleAddSpecification(variationIdx)
                    }}
                  >
                    Add Specification
                  </Button>
                </Col>
              </Row>
              <CloseOutlined
                onClick={() => {
                  handleDelVariation(variationIdx)
                }}
                className='absolute top-1 right-1 cursor-pointer'
              />
            </Col>
          </Row>
        ))}
      </SortContainer>

      <Row className='py-3'>
        <Col span={16} offset={4}>
          <Row>
            <Col span={15} offset={4}>
              {variationForm.variationList.length < 2 ? (
                <Button className='w-full' onClick={handleAddVariation}>
                  Add Variation
                </Button>
              ) : null}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default AddVariation
