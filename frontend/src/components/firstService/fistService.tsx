import {
  Button,
  Col,
  Divider,
  Drawer,
  Empty,
  notification,
  Row,
  Select,
  Space,
  Table, Typography,
} from 'antd'
import { columns } from './use-colums-config'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
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
import {
  FIRST_SERVICE_ACTION,
  meleeWeapon,
  spaceMarineInit,
} from '../../constants'
import { buildFilters } from '../../helpers'
import { DeleteOutlined } from '@ant-design/icons'

const { Option } = Select

export const FirstService = () => {
  const [open, setOpen] = useState(false)
  const [isDelete, setDelete] = useState(false)
  const [isCreate, setCreate] = useState(false)
  const [isEditing, setEditing] = useState(false)
  const [editingMarine, setEditingMarine] = useState(spaceMarineInit)
  const form = useRef<TSpaceMarineFormRef>(null)
  const [additional, setAdditional] = useState<ReactElement>()
  const queryClient = useQueryClient()
  const [api, contextHolder] = notification.useNotification()
  const { data, isLoading, isError, update } = useSpaceMarines()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 4,
  })
  const handleEditSpaceMarine = async (record: TSpaceMarine) => {
    setEditing(true)
    setEditingMarine({ ...record })
  }
  const handleDeleteSpaceMarine = async (id: number) => {
    console.error(isDelete)
    setDelete(false)
    await deleteSpaceMarine(id).catch((error) => {
      api.error({
        message: `ERROR`,
        description: <>{ `${error}` }</>,
      })
    })
    setDelete(true)
  }
  const handleCreateSpaceMarine = async (): Promise<any> => {
    const spaceMarine = form?.current?.getFieldsValue()
    const isEmpty = spaceMarine
      ? Object.values(spaceMarine).some(
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
      if (spaceMarine)
        await createSpaceMarine(spaceMarine).catch((error) => {
          api.error({
            message: `ERROR`,
            description: <>{ `${error}` }</>,
          })
        })
      setCreate(true)
      setOpen(false)
    }
  }

  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

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

  const columnsConfig = columns({
    handleDeleteSpaceMarine,
    handleEditSpaceMarine,
  })

  const updateMarine = () => {
    update()
    if (isError) {
      api.error({
        message: `ERROR`,
        description: <>{ `The server is sleeping` }</>,
      })
    }
  }
  const handleChange = (action: string) => {
    if (action === FIRST_SERVICE_ACTION.DeleteMarineForMelee) {
      setAdditional(
        <Space wrap>
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            { Object.values(meleeWeapon).map((item: meleeWeapon) => (
              <Option key={ item } value={ item }>
                { item }
              </Option>
            )) }
          </Select>
          <DeleteOutlined
            onClick={ ()=>console.error() }
            style={{ color: 'red', marginLeft: 12 }}
          />
        </Space>
      )
    }
  }
  useEffect(() => {
    queryClient.invalidateQueries('getSpaceMarines').catch((error) => {
      api.error({
        message: `ERROR`,
        description: <>{ `${error}` }</>,
      })
    })
  }, [open, isCreate, isDelete])


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
          dataSource={ data }
          columns={ columnsConfig }
          onChange={ onChange }
        />
      ) }
      <EditMarineForm
        isEditing={ isEditing }
        setEditing={ setEditing }
        editingMarine={ editingMarine }
        api={ api }
        contextHolder={ contextHolder }
      />
      <Divider> First service additional</Divider>
      <Typography> Choose action</Typography>
      <Space>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
          onChange={ handleChange }
        >
          { Object.values(FIRST_SERVICE_ACTION).map(
            (item: FIRST_SERVICE_ACTION) => (
              <Option key={ item } value={ item }>
                { item }
              </Option>
            ),
          ) }
        </Select>
        { additional ?? null }
      </Space>
    </>
  )
}
