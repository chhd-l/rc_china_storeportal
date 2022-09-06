import { Tag } from '@/framework/types/consumer'
import { useEffect, useState, useRef } from 'react'
import { Empty, Select, Modal } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { addConsumerTag, getCustomTags, getTags, removeConsumerTag } from '@/framework/api/tag'

import "./index.less";

interface TagItem extends Tag {
  type?: string
}

const Tagging = ({ id, consumerId }: { id: string; consumerId: string }) => {
  const [tagList, setTagList] = useState<TagItem[]>([])
  const [selected, setSelected] = useState<TagItem[]>([])
  const [option, setOption] = useState<any[]>([])
  const [allOption, setAllOption] = useState<any[]>([])
  const [visible, setVisible] = useState(false)

  const selectEl = useRef<any>(null);

  const deleteTag = async (id: any) => {
    // await removeConsumerTag({
    //   consumerId: consumerId,
    //   tagId: id,
    // })
    const itemIdx = selected.findIndex(t => t.id === id);
    selected.splice(itemIdx, 1);
    setSelected(selected.slice());
    const deletedOption = allOption.find(t => t.id === id);
    option.push(deletedOption);
    setOption(option.slice());
  }
  const handleSelect = async (value: string) => {
    // await addConsumerTag({
    //   consumerIds: [consumerId],
    //   tagId: value,
    // })
    selectEl.current.blur();
    const item = allOption.find(t => t.id === value);
    selected.push({ id: item.id, name: item.name, isEnabled: item.isEnabled });
    setSelected(selected.slice());
    const optIdx = option.findIndex(t => t.id === value);
    option.splice(optIdx, 1);
    setOption(option.slice());
  }

  const getList = async () => {
    Promise.all([
      getTags({
        offset: 0,
        limit: 10000,
        withTotal: true,
      }),
      getCustomTags({ consumerId })
    ]).then(([res1, res2]) => {
      initData(res1.records ?? [], res2);
    })
  }

  const initData = (res1: any[], res2: any[]) => {
    const consumerTags = (res2 ?? []).map(t => ({...t, type: (res1 ?? []).find(x => x.id === t.id)?.type }));
    const options = (res1 ?? []).filter((t: any) => t.type !== 'SYSTEM' && consumerTags.findIndex(x => x.id === t.id) < 0);
    setTagList(consumerTags.slice());
    setSelected(consumerTags.slice());
    setOption(options.slice());
    setAllOption((res1 ?? []).filter((t: any) => t.type !== 'SYSTEM'));
  }

  const handleOpenModal = () => {
    const options = allOption.filter((t: any) => t.type !== 'SYSTEM' && tagList.findIndex(x => x.id === t.id) < 0);
    setSelected(tagList.slice());
    setOption(options.slice());
    setVisible(true);
  }

  const handleSave = async () => {
    // 找出新增的和删除的tagids
    const addIds: string[] = [], delIds: string[] = [];
    selected.forEach((item: TagItem) => {
      if (item.id && tagList.findIndex(x => x.id === item.id) === -1) {
        addIds.push(item.id);
      }
    });
    tagList.forEach((item: TagItem) => {
      if (item.id && selected.findIndex(x => x.id === item.id) === -1) {
        delIds.push(item.id);
      }
    });
    await Promise.all([
      ...addIds.map(t => addConsumerTag({ consumerIds: [consumerId], tagId: t })),
      ...delIds.map(t => removeConsumerTag({ consumerId: consumerId, tagId: t }))
    ]);
    setVisible(false);
    getList()
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <div id={id}>
      <div className='text-xl font-medium'>Tagging <span className="ml-2 iconfont icon-Edit text-lg primary-color cursor-pointer" onClick={handleOpenModal} /></div>
      {/*{tagList.length > 0 ? (*/}
      <div className='pt-2 flex'>
        {tagList.map((tag: Tag, idx: number) => (
          <div key={idx} className="customer-tag flex items-center">
            <span>{tag.name}</span>
          </div>
        ))}
      </div>
      {/*) : (*/}
      {/*  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />*/}
      {/*)}*/}
      <Modal
        visible={visible}
        width={960}
        title="Tagging"
        cancelText="Cancel"
        okText="Confirm"
        onCancel={() => setVisible(false)}
        onOk={handleSave}
      >
        <div className="p-2 border border-style-solid rounded-sm" style={{minHeight: 200}} onClick={() => selectEl.current.focus()}>
          <div className="consumer-tag-container flex items-start flex-wrap">
            {selected.map((item: TagItem, idx: number) => (
              <div key={idx} className="customer-tag flex items-center">
                <span>{item.name}</span>
                {item.type !== 'SYSTEM' ? <CloseOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTag(item.id);
                  }}
                /> : null}
              </div>
            ))}
            <Select
              ref={selectEl}
              bordered={false}
              placeholder=''
              value={[]}
              mode='multiple'
              onSelect={handleSelect}
              placement="bottomLeft"
              optionFilterProp="label"
              style={{borderWidth: 0, width: 180}}
              options={option.map(t => ({ label: t.name, value: t.id }))}
            >
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default Tagging
