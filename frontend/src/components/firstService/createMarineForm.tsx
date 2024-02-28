import { Form, Input, InputNumber, Select, Space } from 'antd'
import React from 'react'
import { meleeWeapon } from '../../constants'
import { TSpaceMarineFormRef } from '../../types'

const { Option } = Select
export const CreateMarineForm = React.forwardRef<TSpaceMarineFormRef>(
  (props, ref) => {
    const [form] = Form.useForm()
    //@typescript-eslint/no-empty-function
    CreateMarineForm.displayName = 'CreateMarineForm'
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
        <Space>
          <Form.Item
            name="coordinatesX"
            label="CoordinatesX"
            rules={ [
              {
                required: true,
              },
            ] }
          >
            <InputNumber min={ -246 } addonBefore="x" />
          </Form.Item>
          <Form.Item
            name="coordinatesY"
            label="CoordinatesY"
            rules={ [
              {
                required: true,
              },
            ] }
          >
            <InputNumber min={ -67 } addonBefore="y" />
          </Form.Item>
        </Space>
        <Form.Item
          name="meleeWeapon"
          label="MeleeWeapon"
          rules={ [
            {
              required: true,
            },
          ] }
        >
          <Select
            placeholder="Select a option and change input text above"

          >
            { Object.values(meleeWeapon).map((item: meleeWeapon) => (
              <Option key={ item } value={ item }>
                { item }
              </Option>
            )) }
          </Select>
        </Form.Item>
        <Form.Item
          name="health"
          label="Health"
          rules={ [
            {
              required: true,
            },
          ] }
        >
          <InputNumber min={ 0 } />
        </Form.Item>
        <Form.Item
          name="loyal"
          label="Loyal"
          rules={ [
            {
              required: true,
            },
          ] }
        >
          <Select
            placeholder="Select a option and change input text above"

          >
            <Option key={ 1 } value={ true }>
              true
            </Option>
            <Option key={ 2 } value={ false }>
              false
            </Option>
          </Select>
        </Form.Item>
        <Space>
          <Form.Item
            name="chapterName"
            label="Name"
            rules={ [
              {
                required: true,
              },
            ] }
          >
            <Input placeholder="name" />
          </Form.Item>
          <Form.Item
            name="chapterParentLegion"
            label="Legion"
            rules={ [
              {
                required: true,
              },
            ] }
          >
            <Space>
              <Input placeholder="parentLegion" />
            </Space>
          </Form.Item>
          <Form.Item
            name="chapterWorld"
            label="World"
            rules={ [
              {
                required: true,
              },
            ] }
          >
            <Space>
              <Input placeholder="world" />
            </Space>
          </Form.Item>
        </Space>
        <Form.Item
          name="height"
          label="Height"
          rules={ [
            {
              required: true,
            },
          ] }
        >
          <InputNumber min={ 0 } />
        </Form.Item>
        <Form.Item
          name="starshipId"
          label="StarshipId"
          rules={ [
            {
              required: true,
            },
          ] }
        >
          <InputNumber min={ 0 } />
        </Form.Item>
      </Form>
    )
  },
)
