import React from 'react'
import { Form, Input, InputNumber, Modal, Select, Space } from 'antd'
import { TSpaceMarine } from '../../types'
import { editSpaceMarine } from '../../api'
import { meleeWeapon } from '../../constants'
import { useSpaceMarines } from '../../hooks'

const { Option } = Select
const EditMarineForm = ({
  isEditing,
  setEditing,
  editingMarine,
}: {
  isEditing: boolean
  setEditing: (isEditing: boolean) => void
  editingMarine: TSpaceMarine
}) => {
  const [form] = Form.useForm()
  const {update} = useSpaceMarines()
  const saveEditMarine = async () => {
    const spaceMarine = form.getFieldsValue()
    console.error(spaceMarine)
    await editSpaceMarine(spaceMarine,editingMarine.id)
    update()
  }
  return (
    <Modal
      open={ isEditing }
      title={ 'Edit Space Marine' }
      okText={ 'Save' }
      onCancel={ () => setEditing(false) }
      onOk={ () => {
        saveEditMarine()
        setEditing(false)
      } }
    >
      <Form
        layout="vertical"
        name="control-hooks"
        form={ form }
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          initialValue={ editingMarine.name }
          rules={ [
            {
              required: true,
            },
          ] }
        >
          <Input value={ editingMarine.name }></Input>
        </Form.Item>
        <Space>
          <Form.Item
            name="coordinatesX"
            label="CoordinatesX"
            initialValue={ editingMarine.coordinatesX }
            rules={ [
              {
                required: true,
              },
            ] }
          >
            <InputNumber
              value={ editingMarine.coordinatesX }
              min={ -246 }
              addonBefore="x"
            />
          </Form.Item>
          <Form.Item
            name="coordinatesY"
            label="CoordinatesY"
            initialValue={ editingMarine.coordinatesX }
            rules={ [
              {
                required: true,
              },
            ] }
          >
            <InputNumber
              value={ editingMarine.coordinatesY }
              min={ -67 }
              addonBefore="y"
            />
          </Form.Item>
        </Space>
        <Form.Item
          name="meleeWeapon"
          label="MeleeWeapon"
          initialValue={ editingMarine.meleeWeapon }
          rules={ [
            {
              required: true,
            },
          ] }
        >
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            { Object.values(meleeWeapon).map((item: meleeWeapon) => (
              <Option
                key={ item }
                value={ item }
              >
                { item }
              </Option>
            )) }
          </Select>
        </Form.Item>
        <Form.Item
          initialValue={ editingMarine.health }
          name="health"
          label="Health"
          rules={ [
            {
              required: true,
            },
          ] }
        >
          <InputNumber value={ editingMarine.health } min={ 0 } ></InputNumber>
        </Form.Item>
        <Form.Item
          initialValue={ editingMarine.loyal }
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
            allowClear
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
            initialValue={ editingMarine.chapterName }
            name="chapterName"
            label="Name"
            rules={ [
              {
                required: true,
              },
            ] }
          >
            <Input placeholder="name" value={ editingMarine.chapterName }></Input>
          </Form.Item>
          <Form.Item
            name="chapterParentLegion"
            initialValue={ editingMarine.chapterParentLegion }
            label="Legion"
            rules={ [
              {
                required: true,
              },
            ] }
          >
            <Space>
              <Input placeholder="parentLegion" value={ editingMarine.chapterParentLegion }></Input>
            </Space>
          </Form.Item>
          <Form.Item
            name="chapterWorld"
            initialValue={ editingMarine.chapterWorld }
            label="World"
            rules={ [
              {
                required: true,
              },
            ] }
          >
            <Space>
              <Input value = { editingMarine.chapterWorld } placeholder="world" />
            </Space>
          </Form.Item>
        </Space>
        <Form.Item
          name="height"
          label="Height"
          initialValue={ editingMarine.height }
          rules={ [
            {
              required: true,
            },
          ] }
        >
          <InputNumber value={ editingMarine.height } min={ 0 } />
        </Form.Item>
        <Form.Item
          name="starshipId"
          initialValue={ editingMarine.starshipId }
          label="StarshipId"
          rules={ [
            {
              required: true,
            },
          ] }
        >
          <InputNumber value={ editingMarine.starshipId } min={ 0 } />
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default EditMarineForm
