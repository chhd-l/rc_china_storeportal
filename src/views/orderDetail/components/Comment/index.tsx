import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Form, Input, Modal, Tooltip } from 'antd'
import React, { useState } from 'react'
import { Comment } from '@/framework/types/order'
import { handleReturnTime } from '@/utils/utils'
import { updateComment } from '@/framework/api/get-order'
import { useAtom } from 'jotai'
import { userAtom } from '@/store/user.store'

const OrderComment = ({
  comments,
  orderNum,
  updateSuccess,
}: {
  comments: Comment[]
  orderNum: string
  updateSuccess: Function
}) => {
  const [form] = Form.useForm()
  const [userInfo] = useAtom(userAtom)
  const [curType, setCurType] = useState('new')
  const [curComment, setCurComment] = useState<any>(null)
  const [delModalShow, setDelModalShow] = useState(false)

  const updateOrNewComment = async (values: any) => {
    const comment =
      curType == 'new'
        ? {
            content: values.comment,
            createdBy: userInfo?.nickname || 'zz',
            createId: userInfo?.id || '',
          }
        : Object.assign(curComment, {
            content: values.comment,
          })
    const params = {
      orderNum: orderNum,
      comment,
    }
    const res = await updateComment(params)
    if (res) {
      form.resetFields()
      setCurType('new')
      updateSuccess && updateSuccess()
    }
  }

  const deleteComment = async () => {
    const res = await updateComment({
      orderNum: orderNum,
      isDelete: true,
      comment: {
        id: curComment.id,
      },
    })
    if (res) {
      setDelModalShow(false)
      updateSuccess && updateSuccess()
    }
  }

  return (
    <div className="bg-white p-4">
      <div className="h-80 border-b-2">
        {comments.map((item) => {
          return (
            <div className="mb-2">
              <div className="flex justify-between">
                <span className="flex items-center">
                  <Avatar size="small" icon={<UserOutlined />} />
                  <span className="ml-2">{item.createdBy}</span>
                  {item.createId === userInfo?.id ? (
                    <>
                      <Tooltip title="Edit">
                        <span
                          className="cursor-pointer iconfont text-sm icon-rc-edit text-black-500 ml-2"
                          onClick={() => {
                            setCurType('edit')
                            setCurComment(item)
                            form.setFieldsValue({ comment: item.content })
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <span
                          className="cursor-pointer iconfont text-sm icon-delete text-black-500 ml-2"
                          onClick={() => {
                            setDelModalShow(true)
                            setCurComment(item)
                          }}
                        />
                      </Tooltip>
                    </>
                  ) : null}
                </span>
                <span className="text-sm">{handleReturnTime(item.createdAt)}</span>
              </div>
              <div className="text-left pl-8">{item.content}</div>
            </div>
          )
        })}
      </div>
      <Form form={form} name="dynamic_rule" onFinish={updateOrNewComment}>
        <Form.Item
          name="comment"
          rules={[
            {
              required: true,
              message: 'Please input your comment',
            },
          ]}
        >
          <Input.TextArea
            style={{ border: 'none' }}
            autoSize={{ minRows: 3, maxRows: 5 }}
            placeholder="Input Enter,quickly save comment"
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }} wrapperCol={{ span: 24, offset: 18 }}>
          <Button type="text" danger htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
      <Modal title="提示" visible={delModalShow} onOk={() => deleteComment()} onCancel={() => setDelModalShow(false)}>
        <p>是否删除该评论？</p>
      </Modal>
    </div>
  )
}
export default OrderComment
