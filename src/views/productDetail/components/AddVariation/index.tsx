import './index.less'
import { Form, Input, Button, Col, Row } from 'antd'
import { CloseOutlined, DeleteOutlined, DragOutlined, PlusOutlined } from '@ant-design/icons'
import { cloneDeep } from 'lodash'
import { useContext } from 'react'
import { arrayMoveImmutable } from 'array-move'
import { VariationosContext } from '../SalesInfo'
import { SortContainer } from '../../modules/constant'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'
import SortElement from '../SortElement'
import { ChangeType, SpecificationListProps, VarationProps } from '@/framework/types/product'
import { DetailContext } from '../../index'
import classNames from 'classnames'

export type AddVariationProps = {}
const initVaration = {
  name: '',
  sortIdx: 100, //为了匹配
  specificationList: [{ option: '', sortIdx: '0-0' }],
}
const initSpec = { option: '', sortIdx: '0-0' }
const AddVariation = ({}: AddVariationProps) => {
  const { variationForm, setVariationForm } = useContext(VariationosContext)
  const { detail } = useContext(DetailContext)
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
        //编辑操作
        if (detail.id) {
          let variationData = detail.editChange.variationList
          // debugger
          if (!variationData[variationIdx]) {
            variationData[variationIdx] = {}
          }
          if (!variationData[variationIdx].specificationDetails) {
            variationData[variationIdx].specificationDetails = []
          }
          if (!variationData[variationIdx].specificationDetails[specificationIdx]) {
            variationData[variationIdx].specificationDetails[specificationIdx] = {}
          }
          if (variationForm.variationList[variationIdx].id) {
            variationData[variationIdx].id = variationForm.variationList[variationIdx].id
            // } else {
            variationData[variationIdx].specificationName = variationForm.variationList[variationIdx].name
            variationData[variationIdx].specificationNameEn = variationForm.variationList[variationIdx].name
          }
          if (variationForm.variationList[variationIdx].specificationList[specificationIdx].id) {
            variationData[variationIdx].specificationDetails[specificationIdx].id =
              variationForm.variationList[variationIdx].specificationList[specificationIdx].id
          }
          variationData[variationIdx].specificationDetails[specificationIdx].specificationDetailName = e.target.value
          variationData[variationIdx].specificationDetails[specificationIdx].specificationDetailNameEn = e.target.value
        }

        // let changedVariationList = detail.editChange.variationList
        // changedVariationList[variationIdx].specificationList[specificationIdx].option =
        //   e.target.value
        // console.info('option', e.target.value)
        updateVations(variationForm)
        setVariationForm(cloneDeep(variationForm))
      }
      return (
        <Row className={classNames('pt-3', specification.isDeleted ? 'hidden' : '')}>
          <Col span={4} className='text-right  mr-2'>
            <span className='primary-color required-text'>*</span> Option:
          </Col>
          <Col span={15}>
            <Input
              defaultValue={specification.option}
              // value={specification.option}
              onBlur={handleOption}
              className={classNames('get-variation-option', specification.isDeleted ? 'hidden' : '')}
              onChange={() => {
                // console.info('....', specification.option)
              }}
              placeholder='Option'
              showCount
              maxLength={20}
            />
          </Col>
          <Col span={4} className='flex items-center'>
            <DragHandle />
            {specificationIdx === 0 &&
            variationForm.variationList[variationIdx].specificationList?.filter((el: any) => !el.isDeleted)?.length <
              2 ? null : (
              <DeleteOutlined
                onClick={() => {
                  handleDelSpecification(variationIdx, specificationIdx)
                }}
                className='cursor-pointer'
              />
            )}
          </Col>
        </Row>
      )
    },
  )
  const handleDelSpecification = (variationIdx: number, specificationIdx: number) => {
    if (variationForm.variationList[variationIdx].specificationList[specificationIdx]?.id) {
      //之前就存在的就需要标记被删除，之前没有的直接删除
      variationForm.variationList[variationIdx].specificationList[specificationIdx].isDeleted = true
    } else {
      variationForm.variationList[variationIdx].specificationList.splice(specificationIdx, 1)
    }
    variationForm.changeType = ChangeType.handleSpec
    if (detail.id) {
      let variationData = detail.editChange.variationList
      if (!variationData[variationIdx]) {
        variationData[variationIdx] = {}
      }
      if (!variationData[variationIdx].specificationDetails) {
        variationData[variationIdx].specificationDetails = []
      }
      if (!variationData[variationIdx].specificationDetails[specificationIdx]) {
        variationData[variationIdx].specificationDetails[specificationIdx] = {}
      }
      if (variationForm.variationList[variationIdx].specificationList[specificationIdx]?.id) {
        // debugger
        variationData[variationIdx].id = variationForm.variationList[variationIdx].id
        variationData[variationIdx].specificationDetails[specificationIdx].id =
          variationForm.variationList[variationIdx].specificationList[specificationIdx].id
        variationData[variationIdx].specificationDetails[specificationIdx].isDeleted = true
      } else {
        let specificationDetailName =
          variationData[variationIdx].specificationDetails[specificationIdx]?.specificationDetailName
        for (let idxs = detail.editChange.productVariants.length; idxs--; idxs < 1) {
          let sku = detail.editChange.productVariants[idxs]
          if (sku) {
            let matched = sku?.specificationRelations.find((specItem: any) => {
              return specItem.specificationDetailName === specificationDetailName
            })
            if (matched) {
              detail.editChange.productVariants.splice(idxs, 1)
            }
          }
        }
        variationData[variationIdx].specificationDetails.splice(specificationIdx, 1)
        let hasChangedProductSpecificationDetail = variationData[variationIdx].specificationDetails.filter(
          (el: any) => el,
        )
        if (!hasChangedProductSpecificationDetail?.length) {
          delete variationData[variationIdx].specificationDetails
          if (!variationData[variationIdx]?.specificationName) {
            variationData.splice(variationIdx, 1)
          }
        }
      }
    }
    setVariationForm(cloneDeep(variationForm))
  }
  const handleDelVariation = (variationIdx: number) => {
    if (variationForm.variationList[variationIdx]?.id) {
      variationForm.variationList[variationIdx].isDeleted = true
    } else {
      variationForm.variationList.splice(variationIdx, 1)
    }
    // variationForm.variationList.splice(variationIdx, 1)

    variationForm.changeType = ChangeType.handleVariation
    if (detail.id) {
      let variationData = detail.editChange.variationList
      if (variationForm.variationList[variationIdx]?.id) {
        //是之前有的，删除的时候需要加上isDelete
        if (!variationData[variationIdx]) {
          variationData[variationIdx] = {}
        }
        variationData[variationIdx].id = variationForm.variationList[variationIdx].id
        variationData[variationIdx].isDeleted = variationForm.variationList[variationIdx].isDeleted
      } else {
        variationData.splice(variationIdx, 1)
      }
    }
    setVariationForm(cloneDeep(variationForm))
  }

  const onSortEnd = ({ oldIndex, newIndex, collection }: { oldIndex: number; newIndex: number; collection: any }) => {
    const { variationList } = variationForm
    if (detail.id) {
      //编辑
      // debugger
    }
    variationList[collection].specificationList = arrayMoveImmutable(
      variationList[collection].specificationList,
      oldIndex,
      newIndex,
    )
    variationForm.changeType = ChangeType.handleSpec
    setVariationForm(cloneDeep(variationForm))
  }
  const handleAddVariation = () => {
    let initVarationData = cloneDeep(initVaration)
    let { variationList } = variationForm
    let variationIdx = variationList.length //varation  sortidx
    initVaration.sortIdx = 100 + variationIdx
    let specificationIdx = 0 // spec sortidx
    initVarationData.sortIdx = 100 + variationIdx
    initVarationData.specificationList[0].sortIdx = `${100 + variationIdx}-${specificationIdx}`
    variationForm.changeType = ChangeType.handleVariation
    variationForm.variationList = [...variationList, initVarationData]
    setVariationForm(cloneDeep(variationForm))
  }
  const updateVations = ({ variationList }: { variationList: any }) => {
    // detail.productSpecificationsInput = variationList
  }

  const handleAddSpecification = (variationIdx: number) => {
    let specificationSortIdx = variationForm.variationList[variationIdx].specificationList.length
    debugger
    initSpec.sortIdx = `${100 + variationIdx}-${specificationSortIdx}`
    variationForm.changeType = ChangeType.handleSpec
    if (variationForm.variationList?.length > 1 && specificationSortIdx >= 1) {
      variationForm.changeType = ChangeType.handleVariation
    }
    variationForm.variationList[variationIdx].specificationList.push(initSpec)
    setVariationForm(cloneDeep(variationForm))
  }
  const handleName = (e: any, variationIdx: number) => {
    variationForm.variationList[variationIdx].name = e.target.value
    // console.info('option', e.target.value)
    // let changedVariationList = detail.editChange.variationList
    // changedVariationList[variationIdx].name = e.target.value
    // debugger
    if (detail.id) {
      let variationData = detail.editChange.variationList
      if (!variationData[variationIdx]) {
        variationData[variationIdx] = {}
      }
      if (variationForm.variationList[variationIdx].id) {
        variationData[variationIdx].id = variationForm.variationList[variationIdx].id
      }
      variationData[variationIdx].specificationName = e.target.value
      variationData[variationIdx].specificationNameEn = e.target.value
    }
    updateVations(variationForm)
    setVariationForm(cloneDeep(variationForm))
    debugger
  }
  return (
    <div
      className='add-variation tips-wrap'
      data-tips={`Variation:
<p>Can set up to two variation. Which the first layer should be more important one</p>`}
    >
      <SortContainer
        useDragHandle={true}
        // key={variationIdx}
        onSortEnd={onSortEnd}
      >
        {variationForm.variationList.map((variation: VarationProps, variationIdx: number) => (
          <Row
            key={`variationIdx-${variationIdx}`}
            className={classNames('pt-6 relative', variation.isDeleted ? 'hidden' : '')}
          >
            <Col span={4} className='text-right pr-2'>
              Variation{variationIdx + 1}
              {` :`}
            </Col>
            <Col span={16} className='pt-6' style={{ background: '#f8f8f8' }}>
              <Row>
                <Col span={4} className='text-right  mr-2'>
                  <span className='primary-color required-text'>*</span>Name:
                </Col>
                <Col span={15}>
                  <Input
                    className={classNames('get-variation-name', variation.isDeleted ? 'hidden' : '')}
                    defaultValue={variation.name}
                    onBlur={e => {
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
                    type='dashed'
                    className='w-full ml-2  flex justify-center'
                    onClick={() => {
                      handleAddSpecification(variationIdx)
                    }}
                  >
                    <div className=' w-6 h-6 p-1 cursor-pointer justify-center flex  mr-1'>
                      <div
                        className='rounded-full border border-solid p-1 border-primary w-full h-full justify-center flex items-center'
                        style={{ borderColor: 'rgb(81, 172, 245)', color: 'rgb(81, 172, 245)' }}
                      >
                        <PlusOutlined style={{ color: '#51ACF5', fontSize: 12 }} color='#51ACF5' />
                      </div>
                    </div>
                    Add Option
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

      {/* <div className=' flex' style={{ paddingLeft: '60px' }}>
        <div>Variation{variationForm.variationList.length + 1}:</div>
        {variationForm.variationList.length < 2 ? (
          <Button  type='dashed' onClick={handleAddVariation}>
            Add Variation
          </Button>
        ) : null}
      </div> */}
      {variationForm.variationList.filter((el: any) => !el.isDeleted).length < 2 ? (
        <Row className=' pb-4'>
          <Col span={4} className='text-right pr-2'>
            Variation
            {variationForm.variationList.filter((el: any) => el.isDeleted).length
              ? variationForm.variationList.length + 1
              : ''}
            {` :`}
          </Col>
          <Col span={16}>
            {/* <Row>
            <Col> */}

            <Button type='dashed' className='w-full flex justify-center items-center' onClick={handleAddVariation}>
              <div className=' w-8 h-8 p-1 cursor-pointer  items-center mr-1'>
                <div
                  className='rounded-full border border-solid p-1 border-primary w-full h-full justify-center flex items-center'
                  style={{ borderColor: 'rgb(81, 172, 245)', color: 'rgb(81, 172, 245)' }}
                >
                  <PlusOutlined style={{ color: '#51ACF5' }} color='#51ACF5' />
                </div>
              </div>
              Add Variation
            </Button>
            {/* </Col>
          </Row> */}
          </Col>
        </Row>
      ) : null}
    </div>
  )
}

export default AddVariation
