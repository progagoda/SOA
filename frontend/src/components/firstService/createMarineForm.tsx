import { Form, Input, InputNumber, Select, Space } from 'antd';
import React from 'react';
import { meleeWeapon } from '../../constants';
import { TSpaceMarineFormRef } from '../../types';


const { Option } = Select;
export const CreateMarineForm = React.forwardRef<TSpaceMarineFormRef>((props, ref) => {
    const [form] = Form.useForm();
    CreateMarineForm.displayName = 'CreateMarineForm';
    const layout = {
      labelCol: {
        span: 16,
      },
      wrapperCol: {
        span: 40,
      },
    };

    return (
      <Form
        ref={ref}
        {...layout}
        layout='vertical'
        form={form}
        name='control-hooks'
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          name='name'
          label='Name'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='coordinates'
          label='Coordinates'
          rules={[
            {
              required: true,
            },
          ]}>
          <Space>
            <InputNumber min={-246} addonBefore='x' />
            <InputNumber min={-67} addonBefore='y' />
          </Space>
        </Form.Item>
        <Form.Item
          name='meleeWeapon'
          label='MeleeWeapon'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder='Select a option and change input text above'
            allowClear
          >
            {Object.values(meleeWeapon).map((item: meleeWeapon) => <Option key={item} value={item}>{item}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          name='health'
          label='Health'
          rules={[
            {
              required: true,
            },
          ]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name='loyal'
          label='Loyal'
          rules={[
            {
              required: true,
            },
          ]}>
          <Select
            placeholder='Select a option and change input text above'
            allowClear
          >
            <Option key={1} value={true}>true</Option>
            <Option key={2} value={false}>false</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name='chapter'
          label='Chapter'
          rules={[
            {
              required: true,
            },
          ]}>
          <Space>
            <Input placeholder='name' />
            <Input placeholder='parentLegion' />
            <Input placeholder='world' />
          </Space>
        </Form.Item>
        <Form.Item
          name='health'
          label='Health'
          rules={[
            {
              required: true,
            },
          ]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name='starshipId'
          label='StarshipId'
          rules={[
            {
              required: true,
            },
          ]}>
          <InputNumber min={0} />
        </Form.Item>
      </Form>
    );
  },
);
