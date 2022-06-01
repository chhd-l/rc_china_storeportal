import { CloseOutlined } from '@ant-design/icons'
import { Tag } from '@/framework/types/customer'
import { getCustomTags } from '@/framework/api/customer'
import { useEffect, useState } from 'react'
import { Empty, Select } from 'antd'
import { addCustomerTag, getTags, removeCustomerTag } from '@/framework/api/tag'

const Tagging = ({ id, customerId }: { id: string; customerId: string }) => {
  const [tagList, setTagList] = useState<Tag[]>([])
  const [option, setOption] = useState([])
  const [optionValue, setOptionValue] = useState([])

  const getTagList = async () => {
    const res = await getCustomTags({ customerId })
    console.log(res, 9999)
    if(res&&res.length>0){
     let arr:any= res.map(item=>item.id)
      setOptionValue(arr)
    }
    setTagList(res)
  }
  const deleteTag = async (id: any) => {
    let res = await removeCustomerTag({
      customerId: customerId,
      tagId: id,
      operator: 'zz',
      storeId: '12345678',
    })
    if (res.removeCustomerTag) {
      getTagList()
    }
  }
  const handleChange = async (value: string[]) => {
    let res = await addCustomerTag({
      customerIds: [customerId],
      tagId: value,
      operator: 'zz',
      storeId: '12345678',
    })
    if (res?.addCustomerTag) {
      getTagList()
    }
  };
  const handleSearch = (value: string) => {
    deleteTag(value)
  };

  const getList = async () => {
    const res = await getTags({
      offset: 0,
      limit: 10000,
      isNeedTotal: true,
      operator: 'zz',
    })
    if (res.records) {
      setOption(res.records)
    }
    console.log(res, 99999)
  }

  useEffect(() => {
    getTagList()
    getList()
  }, [])

  return (
    <div id={id}>
      <div className='text-xl font-medium'>Tagging</div>
      {tagList.length > 0 ? (
        <div className='flex flex-col'>
          <div>Tag name</div>
          <Select placeholder='Select' value={optionValue} mode='multiple' onSelect={handleChange} onDeselect={handleSearch}>
            {
              option.length > 0 && option.map((item: any) =>
                <Select.Option value={item.id}>{item.name}</Select.Option>
              )
            }
          </Select>
          {/*<div className="border flex flex-row flex-wrap p-2 mt-2">*/}
          {/*  {tagList.map((item: Tag,index) => (*/}
          {/*    <div className="bg-gray1 p-1 font-normal flex items-center mr-4" key={item.id}>*/}
          {/*      <div className="mr-2">{item.name}</div> <CloseOutlined onClick={() => deleteTag(item,index)} />*/}
          {/*    </div>*/}
          {/*  ))}*/}
          {/*</div>*/}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  )
}
export default Tagging
