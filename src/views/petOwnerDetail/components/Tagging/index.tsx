import { CloseOutlined } from '@ant-design/icons'
import { Tag } from '@/framework/types/customer'
import { getCustomTags } from '@/framework/api/customer'
import { useEffect, useState } from 'react'

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
      <div className="py-4 px-2 border-b text-xl font-medium">Tagging</div>
      {tagList.length>0?(
      <div className="px-2 py-4 flex flex-col">
        <div>Tag name</div>
          <div className="border flex flex-row flex-wrap p-2 mt-2">
            {tagList.map((item: Tag) => (
              <div className="bg-gray1 p-1 font-normal flex items-center mr-4" key={item.id}>
                <div className="mr-2">{item.name}</div> <CloseOutlined onClick={() => deleteTag()} />
              </div>
            ))}
          </div>
      </div>) :<div className="w-full flex justify-center items-center my-4">no tag</div>}
    </div>
  )
}
export default Tagging
