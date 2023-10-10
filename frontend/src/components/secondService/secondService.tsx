import React, { useRef, useState } from 'react'
import {
  Button,
  Col,
  Divider,
  Drawer,
  Empty,
  InputNumber,
  notification,
  Row,
  Space,
  Table,
  Typography,
} from 'antd'
import { useCreateStarship, useDisembarkStarship, useGetStarship } from '../../hooks'
import { columns } from './use-colums-config'
import { CreateStarshipForm } from './createStarship'
import { TDisembarkStarshipArg, TSpaceMarineFormRef } from '../../types'
import { useQueryClient } from 'react-query'

export const SecondService = () => {
  const { data, isLoading, isError } = useGetStarship()
  const form = useRef<TSpaceMarineFormRef>(null)
  const createStarship = useCreateStarship()
  const disembarkStarship = useDisembarkStarship();
  const [spaceMarineId, setSpaceMarineId] = useState<number | null>()
  const [starshipId, setStarshipId] = useState<number | null>()

  const queryClient = useQueryClient()
  const [api, contextHolder] = notification.useNotification()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 4,
  })
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
      queryClient.invalidateQueries('getStarship').catch((error) => {
        api.error({
          message: `ERROR`,
          description: <>{ `Correct your fields` }</>,
          placement: 'bottomLeft',
        })
      })
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
      { isError ? (
        <Row
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
          }}
        >
          <Empty
            image={
              <img src="https://yt3.ggpht.com/a/AATXAJwRgclZ8SqalCSHZrPQQLt-UP5hAALx0FOJQw=s900-c-k-c0xffffffff-no-rj-mo" />
            }
            description={ `The server is sleeping` }
          />
        </Row>
      ) : (
        <Table
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            showSizeChanger: true,
            pageSizeOptions: [4, 8, 16, 32],
            onChange: (current, pageSize) => {
              setPagination({
                current,
                pageSize,
              })
            }, //TODO это нужно будет убрать так как бэк выдает простыню
          }}
          loading={ isLoading }
          bordered
          dataSource={ data }
          columns={ columns }
        />
      ) }
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