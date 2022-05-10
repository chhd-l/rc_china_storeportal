import { CloseOutlined } from '@ant-design/icons'
import { Tag } from '@/framework/types/customer'
import { getCustomTags } from '@/framework/api/customer'
import { useEffect, useState } from 'react'
import { Empty } from 'antd'

const Tagging = ({ id, customerId }: { id: string; customerId: string }) => {
  const [tagList, setTagList] = useState<Tag[]>([])

  const getTagList = async () => {
    const res = await getCustomTags({ customerId })
    setTagList(res)
  }
  const deleteTag = () => {}

  useEffect(() => {
    getTagList()
  }, [])

  return (
    <div id={id}>
      <div className="text-xl font-medium">Tagging</div>
      {tagList.length > 0 ? (
        <div className="flex flex-col">
          <div>Tag name</div>
          <div className="border flex flex-row flex-wrap p-2 mt-2">
            {tagList.map((item: Tag) => (
              <div className="bg-gray1 p-1 font-normal flex items-center mr-4" key={item.id}>
                <div className="mr-2">{item.name}</div> <CloseOutlined onClick={() => deleteTag()} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  )
}
export default Tagging
