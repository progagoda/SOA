import React, { useRef, useState } from 'react'
import {
  Button,
  Col,
  Divider,
  Drawer,
  InputNumber,
  notification,
  Row,
  Space,
  Typography,
} from 'antd'
import { useCreateStarship, useDisembarkStarship} from '../../hooks'
import { CreateStarshipForm } from './createStarship'
import { TDisembarkStarshipArg, TSpaceMarineFormRef } from '../../types'

export const SecondService = () => {
  const form = useRef<TSpaceMarineFormRef>(null)
  const createStarship = useCreateStarship()
  const disembarkStarship = useDisembarkStarship();
  const [spaceMarineId, setSpaceMarineId] = useState<number | null>()
  const [starshipId, setStarshipId] = useState<number | null>()
  const [api, contextHolder] = notification.useNotification()
  const [open, setOpen] = useState(false)

  const handleCreateStarship = async (): Promise<any> => {
    const starship = form?.current?.getFieldsValue()
    const isEmpty = starship
      ? Object.values(starship).some(
          (value) => value === undefined || value === null || value === '',
        )
      : false

    if (isEmpty) {
      api.error({
        message: `ERROR`,
        description: <>{ `Correct your fields` }</>,
        placement: 'bottomLeft',
      })
    } else {
      if (starship) createStarship(starship)
      setOpen(false)
    }
  }
  const handleDisembarkStarship=()=>{
    if (!spaceMarineId || !starshipId ){
      api.error({
        message: `ERROR`,
        description: <>{ `Correct your fields` }</>,
        placement: 'bottomLeft',
      })
      return
    }
    const arg:TDisembarkStarshipArg = {
      spaceMarineId: spaceMarineId,
      starshipId: starshipId
    }
     disembarkStarship(arg)
  }

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const footer = (
    <Space>
      <Row gutter={ [120, 10] }>
        <Col>
          <Button htmlType="button" onClick={ onClose }>
            Close
          </Button>
        </Col>
        <Col>
          <Button
            htmlType="button"
            style={{ marginLeft: '48px' }}
            onClick={ () => form.current?.resetFields() }
          >
            Reset
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: '10px' }}
            onClick={ handleCreateStarship }
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Space>
  )

  return (
    <>
      { contextHolder }
      <Divider> Starships collection</Divider>
      <Button type="primary" onClick={ showDrawer } style={{ marginBottom: 16 }}>
        Create
      </Button>
      <Drawer
        title="Create Starship"
        placement="right"
        onClose={ onClose }
        open={ open }
        footer={ footer }
      >
        <CreateStarshipForm ref={ form } />
      </Drawer>
      <Typography.Title>Disembark the starship</Typography.Title>
      <Space>
        <InputNumber
          min={ 0 }
          onChange={ (value) => setSpaceMarineId(value) }
          addonBefore="spaceMarineId"
        />
        <InputNumber
          min={ 0 }
          onChange={ (value) => setStarshipId(value) }
          addonBefore="starshipId"
        />
        <Button onClick={ ()=>handleDisembarkStarship() }>Done</Button>
      </Space>
    </>
  )
}