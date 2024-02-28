import { Form, Input } from 'antd'
import React from 'react'
import { TStarshipFormRef } from '../../types'

export const CreateStarshipForm = React.forwardRef<TStarshipFormRef>(
  (props, ref) => {
    const [form] = Form.useForm()
    CreateStarshipForm.displayName = 'CreateStarshipForm'
    const layout = {
      labelCol: {
        span: 16,
      },
      wrapperCol: {
        span: 40,
      },
    }

    return (
      <Form
        ref={ ref }
        { ...layout }
        layout="vertical"
        form={ form }
        name="control-hooks"
        scrollToFirstError
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={ [
            {
              required: true,
              message: "Please write name"
            },
          ] }
          hasFeedback
        >
          <Input />
        </Form.Item>
      </Form>
    )
  },
)
