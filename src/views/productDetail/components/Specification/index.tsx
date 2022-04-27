import FormItem from '@/components/common/FormItem'

import { FormProps } from '@/framework/types/common'
import { Col, Form, Row, Select } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { DetailContext } from '../..'
import { getAttrs } from '@/framework/api/get-product'

import { selectList } from '../../modules/constant'
import { AttributeListProps } from '@/framework/types/product'
import { GoodsAttributeAndValue } from '@/framework/schema/product.schema'
const Specification = (props: FormProps) => {
  const { detail } = useContext(DetailContext)
  const [specificationList, setSpecificationList] = useState<AttributeListProps[]>([])
  useEffect(() => {
    console.info('......................', detail.cateId)
    getAttrList()
  }, [detail.cateId])
  useEffect(() => {
    //to do
    let list = detail.attributeList?.map((item: any) => {
      item.className = 'w-1/2'
      item.type = 'select'
      return item
    })
    setSpecificationList(list)
  }, [])
  const getAttrList = async () => {
    let data = await getAttrs({ storeId: '12345678', categoryId: '12' })
    let list = data.map((item: any) => {
      item.className = 'w-1/2'
      item.type = 'select'
      item.defaultVal = detail?.goodsAttributeValueRel?.find((el: GoodsAttributeAndValue) => {
        return el.attributeValueId === item.id
      })?.attributeValueName
      return item
    })

    console.info('datagetAttrs', list)
    setSpecificationList(list)
  }
  const handleChange = (value: any) => {
    console.info(',,,,', value)
  }
  return (
    <div className='overflow-hidden'>
      {specificationList?.map(specification => {
        return (
          <Row key={specification.id} className='w-1/2 float-left ant-form-item'>
            <Col span={5}>{specification.label}</Col>
            <Col span={16}>
              <Select
                className='w-full'
                labelInValue
                defaultValue={{
                  value: specification.defaultVal,
                }}
                style={{ width: 120 }}
                options={specification.options}
                onChange={handleChange}
              ></Select>
            </Col>
          </Row>
        )
      })}
      {/* {specificationList.length ? (
        <Form.List name='specification'>
          {fields =>
            fields.map((field, idx) => (
              <div className='flex flex-wrap'>
                <FormItem {...field} parentName={[field.name]} list={specificationList} />
              </div>
            ))
          }
        </Form.List>
      ) : null} */}
    </div>
  )
}
export default Specification
