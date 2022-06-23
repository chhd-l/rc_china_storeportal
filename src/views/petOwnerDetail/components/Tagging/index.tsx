import { CloseOutlined } from '@ant-design/icons'
import { Tag } from '@/framework/types/consumer'
import { getCustomTags } from '@/framework/api/consumer'
import { useEffect, useState } from 'react'
import { Empty, Select } from 'antd'
import { addConsumerTag, getTags, removeConsumerTag } from '@/framework/api/tag'

const Tagging = ({ id, consumerId }: { id: string; consumerId: string }) => {
  const [tagList, setTagList] = useState<Tag[]>([])
  const [option, setOption] = useState([])
  const [optionValue, setOptionValue] = useState([])

  const getTagList = async () => {
    const res = await getCustomTags({ consumerId })
    console.log(res, 9999)
    if (res && res.length > 0) {
      let arr: any = res.map(item => item.id)
      setOptionValue(arr)
    }
    setTagList(res)
  }
  const deleteTag = async (id: any) => {
    let res = await removeConsumerTag({
      consumerId: consumerId,
      tagId: id,
      operator: 'zz',
      storeId: '12345678',
    })

  }
  const handleSelect = async (value: string[]) => {
    await addConsumerTag({
      consumerIds: [consumerId],
      tagId: value,
      operator: 'zz',
      storeId: '12345678',
    })
  }
  const handleSearch = (value: string) => {
    deleteTag(value)
  }
  const handleChange = (value: any) => {
    setOptionValue(value)
  }

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
  }

  useEffect(() => {
    getTagList()
    getList()
  }, [])

  return (
    <div id={id}>
      <div className='text-xl font-medium'>Tagging</div>
      {/*{tagList.length > 0 ? (*/}
        <div className='flex flex-col'>
          <div className="py-2.5">Tag name</div>
          <Select placeholder='Select' value={optionValue} mode='multiple' onSelect={handleSelect}
                  onChange={handleChange} onDeselect={handleSearch}>
            {
              option.length > 0 && option.map((item: any) =>
                <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>,
              )
            }
          </Select>
        </div>
      {/*) : (*/}
      {/*  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />*/}
      {/*)}*/}
    </div>
  )
}
export default Tagging
