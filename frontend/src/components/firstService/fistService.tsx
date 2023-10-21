import {
  Button,
  Col,
  Divider,
  Drawer,
  Empty,
  InputNumber,
  notification,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from 'antd'
import { columns } from './use-colums-config'
import React, { useEffect, useRef, useState } from 'react'
import { CreateMarineForm } from './createMarineForm'
import { TSpaceMarine, TSpaceMarineFormRef } from '../../types'
import {
  useCreateSpaceMarine,
  useDeleteMarineForMelee,
  useDeleteSpace,
  useGetSpaceMarineForHealth,
  useGetSpaceMarineForMinCoords,
  useSpaceMarines,
} from '../../hooks'
import EditMarineForm from './editMarineForm'
import {
  meleeWeapon,
  spaceMarineInit,
} from '../../constants'
import { buildFilters } from '../../helpers'
import { DeleteOutlined } from '@ant-design/icons'
import { useQueryClient } from 'react-query'


export const FirstService = () => {
  const [open, setOpen] = useState(false)
  const [isDelete, setDelete] = useState(false)
  const [isEditing, setEditing] = useState(false)
  const [editingMarine, setEditingMarine] = useState(spaceMarineInit)
  const form = useRef<TSpaceMarineFormRef>(null)
  const queryClient = useQueryClient()
  const [mlWeapon, setMlWeapon] = useState(meleeWeapon.POWER_BLADE)
  const [health, setHealth] = useState<number | null>()
  const [api, contextHolder] = notification.useNotification()
  const deleteSpaceMarine = useDeleteSpace()
  const [sorter,setSorter] = useState()
  const [filters, setFilters] = useState()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 4,
  })
  const createSpaceMarine = useCreateSpaceMarine()
  const { data, isLoading, isError } = useSpaceMarines(sorter, filters, pagination)
  const deleteSpaceMarineForMelee = useDeleteMarineForMelee();
  const getSpaceMarineForHealth = useGetSpaceMarineForHealth()
  const getSpaceMarineForMinCoords= useGetSpaceMarineForMinCoords()

  const handleEditSpaceMarine = async (record: TSpaceMarine) => {
    setEditing(true)
    setEditingMarine(record)
  }
  const handleDeleteSpaceMarine = async (id: number) => {
    deleteSpaceMarine(id)
    setDelete(true)
  }
  const handleCreateSpaceMarine =  ()=> {
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
      if (spaceMarine) createSpaceMarine(spaceMarine)
      setOpen(false)
    }
  }

  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    // eslint-disable-next-line no-console
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
    setSorter(sorterCopy)
    setFilters(filters)
    await queryClient.invalidateQueries(['getSpaceMarine', sorterCopy, filters, paginationCopy])
  }

  const footer = (
    <Space>
      <Row gutter={ [100, 40] }>
        <Col>
          <Button htmlType="button" onClick={ onClose }>
            Close
          </Button>
        </Col>
        <Col>
          <Button
            htmlType="button"
            style={{ marginLeft: '30px' }}
            onClick={ () => form.current?.resetFields() }
          >
            Reset
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: '10px'}}
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
  const changeMelee = (item: meleeWeapon)=>{
    // eslint-disable-next-line no-console
    console.log(item)
    setMlWeapon(item)
  }
  useEffect(() => {
    queryClient.invalidateQueries('getSpaceMarines').catch((error) => {
      api.error({
        message: `ERROR`,
        description: <>{ `${error}` }</>,
      })
    })
  }, [isDelete])

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
          onClick={ () => queryClient.invalidateQueries('getSpaceMarines') }
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
      <Space
        direction = 'vertical'
        size={ [8, 16] }
      >
        <Button
          onClick={ () => {
            // eslint-disable-next-line no-console
            console.log(getSpaceMarineForMinCoords.mutate)
            queryClient.setQueryData('getSpaceMarines', getSpaceMarineForMinCoords.mutate)
          } }
        >
          Get marine for min coords
        </Button>
        <Space wrap>
          <InputNumber
            onChange={ (value) => setHealth(value) }
            min={ -67 }
            addonBefore="health"
            value={ health }
          />
          <Button
            onClick={ () => {
              health ? getSpaceMarineForHealth(health): api.error({
                message: `ERROR`,
                description: <>{ `Correct input field` }</>,
              })
            } }
          >
            Get marine is less than the current value
          </Button>
        </Space>
        <Space wrap>
          <Select
            placeholder="Select a option and change input text above"
            defaultValue={ mlWeapon }
            onChange={ changeMelee }
            options={ Object.values(meleeWeapon).map((item) => ({ label: item, value: item })) }
          />
          <DeleteOutlined
            onClick={ () => {
              deleteSpaceMarineForMelee(mlWeapon)} }
            style={{ color: 'red', marginLeft: 12 }}
          />
        </Space>
      </Space>

    </>
  )
}