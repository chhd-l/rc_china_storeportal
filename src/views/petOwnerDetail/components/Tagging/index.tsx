import { CloseOutlined } from '@ant-design/icons'
import { Tag } from '@/framework/types/customer'
import { getCustomTags } from '@/framework/api/customer'
import { useEffect, useState } from 'react'
import { Empty } from 'antd'
import { removeCustomerTag } from '@/framework/api/tag'

const Tagging = ({ id, customerId }: { id: string; customerId: string }) => {
  const [tagList, setTagList] = useState<Tag[]>([])

  const getTagList = async () => {
    const res = await getCustomTags({ customerId })
    setTagList(res)
  }
  const deleteTag = async (item:any,index:any) => {
    console.log(item,index)
    let res = await removeCustomerTag({
      customerId:customerId,
      tagId: item.id,
      operator: "zz",
      storeId:"12345678"
    })
    if(res.removeCustomerTag){
      tagList.splice(index,1)
      if(tagList.length===0){
        setTagList([])
      } else {
        setTagList(tagList)
      }

    }
  }

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
            {tagList.map((item: Tag,index) => (
              <div className="bg-gray1 p-1 font-normal flex items-center mr-4" key={item.id}>
                <div className="mr-2">{item.name}</div> <CloseOutlined onClick={() => deleteTag(item,index)} />
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
