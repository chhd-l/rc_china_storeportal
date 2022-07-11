import { Button, Form, Input, message, Modal, Tooltip } from 'antd'
import React, { useState } from 'react'
import { Comment } from '@/framework/types/order'
import { handleReturnTime } from '@/utils/utils'
import { updateComment } from '@/framework/api/order'
import { useAtom } from 'jotai'
import { userAtom } from '@/store/user.store'
import userIcon from '@/assets/images/userIcon.svg'
import { omit } from 'lodash'
import './index.less'

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
        : Object.assign(omit(curComment, ['avatarUrl']), {
            content: values.comment,
          })
    const params = {
      orderNum: orderNum,
      comment,
    }
    const res = await updateComment(params)
    if (res) {
      message.success({ className: 'rc-message', content: 'Operation success' })
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
      message.success({ className: 'rc-message', content: 'Operation success' })
      setDelModalShow(false)
      updateSuccess && updateSuccess()
    }
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
                  <img className="w-10 h-10 rounded-full" src={item?.avatarUrl || userIcon} alt={''} />
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
                        className="cursor-pointer iconfont text-sm icon-Edit text-theme-red ml-2"
                        onClick={() => {
                          setCurType('edit')
                          setCurComment(item)
                          form.setFieldsValue({ comment: item.content })
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Delete">
                      <span
                        className="cursor-pointer iconfont text-sm icon-delete text-theme-red ml-2"
                        onClick={() => {
                          setDelModalShow(true)
                          setCurComment(item)
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
          <Input.TextArea className="rounded-4" autoSize={{ minRows: 5, maxRows: 7 }} placeholder="Input comment" />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 0, marginTop: '-10px' }}
          wrapperCol={{ span: 24, offset: 20 }}
          className="form-button-end"
        >
          <Button className="rounded-4" danger htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
      <Modal
        className="rc-modal"
        title="Delete Comment"
        visible={delModalShow}
        okText={'Confirm'}
        onOk={() => deleteComment()}
        onCancel={() => setDelModalShow(false)}
      >
        <p>Are you sure you want to delete this comment?</p>
      </Modal>
    </div>
  )
}
export default OrderComment
