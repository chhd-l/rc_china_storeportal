import FormItem from '@/components/common/FormItem'

import { FormProps } from '@/framework/types/common'
import { Col, Form, Row, Select } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { DetailContext } from '../..'
import { getAttrs } from '@/framework/api/get-product'

import { selectList } from '../../modules/constant'
import { AttributeListProps } from '@/framework/types/product'
import { ProductAttributeAndValue } from '@/framework/schema/product.schema'
const Specification = (props: FormProps) => {
  const { detail } = useContext(DetailContext)
  const [specificationList, setSpecificationList] = useState<AttributeListProps[]>([])
  const [productAttributeValueRel, setProductAttributeValueRel] = useState<any>({})
  useEffect(() => {
    console.info('......................', detail.cateId)
    if (detail.cateId?.length) {
      getAttrList()
    }
  }, [detail.cateId])
  // useEffect(() => {
  //   //to do
  //   let list = detail.attributeList?.map((item: any) => {
  //     item.className = 'w-1/2'
  //     item.type = 'select'
  //     return item
  //   })
  //   setSpecificationList(list)
  // }, [])
  const getAttrList = async () => {
    let categoryId = detail.cateId[detail.cateId.length - 1]
    console.info('categoryId', categoryId)
    let data = await getAttrs({ categoryId })
    let list = data.map((item: any) => {
      item.className = 'w-1/2'
      item.type = 'select'
      item.defaultVal = detail?.productAttributeValueRel
        ?.filter((el: ProductAttributeAndValue) => {
          return el.attributeId === item.id
        })
        ?.map((el: ProductAttributeAndValue) => el.attributeValueId)
      // console.info(' item.defaultVal ', item.defaultVal)
      return item
    })
    let attributeInput: any = {}
    detail?.productAttributeValueRel?.forEach((el: any) => {
      if (attributeInput[el.attributeId]?.length) {
        attributeInput[el.attributeId].push(el.attributeValueId)
      } else {
        attributeInput[el.attributeId] = [el.attributeValueId]
      }
    })
    console.info('attributeInput', attributeInput)
    detail.productAttributeValueRelInput = attributeInput
    setProductAttributeValueRel(attributeInput)

    setSpecificationList(list)
  }

  return (
    <Row
      className='overflow-hidden tips-wrap'
      data-tips={`Product Attribute:
    <p>Product attributes should relate to the product name and description</p>
    `}
    >
      <Col span={24}>
        {specificationList?.map(specification => {
          return (
            <Row key={specification.id} className='w-1/2 float-left ant-form-item'>
              <Col className='text-right pr-6' span={8}>
                {specification.label}
              </Col>
              <Col span={16}>
                <Select
                  className='w-full'
                  // searchValue=''
                  labelInValue
                  onDeselect={(value: any, option: any) => {
                    console.info('value, optiononDeselectonDeselect', value, option)
                    Object.keys(detail.productAttributeValueRelInput)?.forEach((el: any) => {
                      if (el === option.attributeId) {
                        debugger
                        let idx = detail.productAttributeValueRelInput[el].findIndex((cel: any) => cel === option.id)
                        if (idx > -1) {
                          detail.productAttributeValueRelInput[el].splice(idx, 1)
                        }
                      }
                    })
                  }}
                  mode='multiple'
                  allowClear
                  showArrow
                  // defaultValue={['064fe462-a0ac-8f05-a800-8e927781', '4b1c30f4-c38c-b789-92c4-c0790cd1']}
                  defaultValue={specification.defaultVal}
                  placeholder={`Please select`}
                  style={{ width: 120 }}
                  options={specification.options}
                  onChange={(value, option: any) => {
                    console.info('value, option', value, option)
                    console.info(option)
                    if (option[0]?.attributeId) {
                      let newRel = Object.assign({}, productAttributeValueRel, {
                        // @ts-ignore
                        [option[0]?.attributeId]: value.map(el => el.value),
                      })
                      detail.productAttributeValueRelInput = newRel
                      console.info('newRel', newRel)
                      setProductAttributeValueRel(newRel)
                    }
                  }}
                ></Select>
              </Col>
            </Row>
          )
        })}
      </Col>
    </Row>
  )
}
export default Specification
