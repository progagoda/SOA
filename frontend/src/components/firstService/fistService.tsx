import {
  Button,
  Col,
  Divider,
  Drawer,
  Empty,
  message,
  Row,
  Space,
  Table,
} from 'antd'
import { columns } from './use-colums-config'
import React, { useEffect, useRef, useState } from 'react'
import { CreateMarineForm } from './createMarineForm'
import { TSpaceMarine, TSpaceMarineFormRef } from '../../types'
import { useQueryClient } from 'react-query'
import {
  createSpaceMarine,
  deleteSpaceMarine,
  getSpaceMarines,
} from '../../api'
import { useSpaceMarines } from '../../hooks'
import EditMarineForm from './editMarineForm'
import { spaceMarineInit } from '../../constants'
import { buildFilters } from '../../helpers'

export const FirstService = () => {
  const [open, setOpen] = useState(false)
  const [isDelete, setDelete] = useState(false)
  const [isCreate, setCreate] = useState(false)
  const [isEditing, setEditing] = useState(false);
  const [editingMarine, setEditingMarine] = useState(spaceMarineInit)
  const form = useRef<TSpaceMarineFormRef>(null)
  const queryClient = useQueryClient()
  const [messageApi, contextHolder] = message.useMessage()
  const { data, isLoading, isError, update } = useSpaceMarines()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 4,
  })
  const handleEditSpaceMarine = async (record: TSpaceMarine) => {
    setEditing(true);
    setEditingMarine({...record})
  }
  const handleDeleteSpaceMarine = async (id: number) => {
    setDelete(false)
    await deleteSpaceMarine(id).catch((err) => {
      messageApi.open({
        type: 'error',
        content: `${err}`,
      })
    })
    setDelete(true)
  }
  const handleCreateSpaceMarine = async (): Promise<any> => {
    const spaceMarine = form?.current?.getFieldsValue()
    queryClient
      .fetchQuery(['createSpaceMarines', { spaceMarine }], createSpaceMarine)
      .catch((err) => {
        messageApi.open({
          type: 'error',
          content: `${err}`,
        })
      })
    setCreate(true)
    setOpen(false)
  }

  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    queryClient.invalidateQueries('getSpaceMarines').catch((reason) => {
      messageApi.open({
        type: 'error',
        content: reason,
      })
    })
  }, [open, isDelete, isCreate])

  const onChange = async (
    pagination: any,
    filters: any,
    sorter: any,
    extra: any,
  ) => {
    const { sorterCopy, paginationCopy } = buildFilters(
      pagination,
      filters,
      sorter,
    )
    await getSpaceMarines(sorterCopy, filters, paginationCopy)
  }

  const footer = (
    <Space>
      <Row gutter={ [120, 10] }>
        <Col>
          <Button htmlType="button" onClick={ onClose }>
            Close
          </Button>
        </Col>
        <Col style={{ paddingRight: '0px' }}>
          <Button
            htmlType="button"
            style={{ marginRight: '8px' }}
            onClick={ () => form.current?.resetFields() }
          >
            Reset
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            onClick={ handleCreateSpaceMarine }
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Space>
  )

  const columnsConfig = columns({handleDeleteSpaceMarine, handleEditSpaceMarine})

  const updateMarine = () => {
    const error = update()
    if (error) {
      messageApi.open({
        type: 'error',
        content: error,
      })
    }
  }

  return (
    <>
      { contextHolder }
      <Divider> Space marines collection</Divider>
      <Space>
        <Button
          type="primary"
          onClick={ showDrawer }
          style={{ marginBottom: 16 }}
        >
          Create
        </Button>
        <Button
          type="primary"
          onClick={ () => updateMarine() }
          style={{ marginBottom: 16 }}
        >
          Update
        </Button>
        <Drawer
          title="Create Space Marine"
          placement="right"
          onClose={ onClose }
          open={ open }
          footer={ footer }
        >
          <CreateMarineForm ref={ form } />
        </Drawer>
      </Space>
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
            rowClassName="editable-row"
            // components={{
            //   body: {
            //     cell: UpdateInput,
            //   },
            // }}
            dataSource={ data }
            columns={ columnsConfig }
            onChange={ onChange }
          />

        ) }
      <EditMarineForm isEditing={ isEditing } setEditing={ setEditing } editingMarine={ editingMarine }  />

    </>
  )
}
