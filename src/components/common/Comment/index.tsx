import React, { useState } from 'react'
import { Form, Input, Modal, Tooltip, Button } from 'antd'
import { handleReturnTime } from '@/utils/utils'
import { useAtom } from 'jotai'
import { userAtom } from '@/store/user.store'
import userIcon from '@/assets/images/userIcon.svg'
import { omit } from 'lodash'

type TComment = {
  id: string
  avatarUrl?: string
  createdBy: string
  createdAt: string
  createId: string
  content: string
}

interface IProps {
  comments: TComment[]
  defaultParam: { [key: string]: string | number }
  handleUpsertComment: (param: any) => void
}

const CommentWidget: React.FC<IProps> = ({ comments, defaultParam, handleUpsertComment }) => {
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const [curType, setCurType] = useState<'add' | 'edit'>('add')
  const [curComment, setCurComment] = useState<any>({})
  const [userInfo] = useAtom(userAtom)

  const handleDeleteComment = () => {
    handleUpsertComment({
      ...defaultParam,
      comment: {
        ...curComment,
        isDeleted: true,
      }
    });
  }

  const handleCancelDelete = () => {
    setCurComment({});
    setCurType("add");
    setVisible(false);
  }

  const handleSubmit = (values: any) => {
    const param = {
      ...defaultParam,
      comment: curType === "add" ? {
        content: values.comment,
        createdBy: userInfo?.nickname || 'zz',
        createId: userInfo?.id || '',
      } : Object.assign(omit(curComment, ['avatarUrl']), {
        content: values.comment,
      })
    };
    handleUpsertComment(param)
  }
  
  return (
    <div className="bg-white p-4">
      <div className="text-base font-medium pb-2 border-b mb-4">Remarks</div>
      <div className="max-h-96 overflow-y-scroll">
        {comments.map((item, index) => {
          return (
            <div className={`mb-2 pb-2 ${index !== comments.length - 1 ? 'border-b' : ''}`}>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <img className="w-10 h-10 rounded-full" src={item?.avatarUrl||userIcon} alt={''} />
                  <span className="ml-2">
                    {item.createdBy}
                    <br />
                    <span className="text-sm text-gray-400">{handleReturnTime(item.createdAt)}</span>
                  </span>
                </span>
                {item.createId === userInfo?.id ? (
                  <span>
                    <Tooltip title="Edit">
                      <span
                        className="cursor-pointer iconfont text-sm icon-Edit text-red-500 ml-2"
                        onClick={() => {
                          setCurType("edit")
                          setCurComment(item)
                          form.setFieldsValue({ comment: item.content })
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Delete">
                      <span
                        className="cursor-pointer iconfont text-sm icon-delete text-red-500 ml-2"
                        onClick={() => {
                          setCurComment(item)
                          setVisible(true)
                        }}
                      />
                    </Tooltip>
                  </span>
                ) : null}
              </div>
              <div className="text-left text-gray-400">{item.content}</div>
            </div>
          )
        })}
      </div>
      <Form form={form} name="dynamic_rule" onFinish={handleSubmit}>
        <Form.Item
          name="comment"
          rules={[
            {
              required: true,
              message: 'Please input your comment',
            },
          ]}
        >
          <Input.TextArea autoSize={{ minRows: 5, maxRows: 7 }} placeholder="Input comment" />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 0 }}
        >
          <div className="text-right">
            <Button danger htmlType="submit">
              Save
            </Button>
          </div>
        </Form.Item>
      </Form>
      <Modal
        className="rc-modal"
        title="Delete Comment"
        visible={visible}
        okText={'Confirm'}
        onOk={() => handleDeleteComment}
        onCancel={() => handleCancelDelete}
      >
        <p>Are you sure you want to delete this comment?</p>
      </Modal>
    </div>
  )
}

export default CommentWidget
