import {
  Button,
  Col,
  Divider,
  Drawer,
  Empty,
  Flex,
  InputNumber,
  Modal,
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
import { meleeWeapon, spaceMarineInit } from '../../constants'
import { buildFilters, mapSpaceMarine } from '../../helpers'
import { DeleteOutlined } from '@ant-design/icons'
import { useQueryClient } from 'react-query'
import _ from 'lodash'

export const FirstService = () => {
  const [open, setOpen] = useState(false)
  const [isDelete, setDelete] = useState(false)
  const [isEditing, setEditing] = useState(false)
  const [editingMarine, setEditingMarine] = useState(spaceMarineInit)
  const form = useRef<TSpaceMarineFormRef>(null)
  const queryClient = useQueryClient()
  const [mlWeapon, setMlWeapon] = useState(meleeWeapon.POWER_BLADE)
  const [health, setHealth] = useState<number>(1)
  const [api, contextHolder] = notification.useNotification()
  const deleteSpaceMarine = useDeleteSpace()
  const [sorter, setSorter] = useState()
  const [filters, setFilters] = useState()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 4,
  })
  const createSpaceMarine = useCreateSpaceMarine()
  const { data, isLoading, isError } = useSpaceMarines(
    sorter,
    filters,
    pagination,
  )
  const deleteSpaceMarineForMelee = useDeleteMarineForMelee()
  const getSpaceMarineForHealth = useGetSpaceMarineForHealth(health)
  const getSpaceMarineForMinCoords = useGetSpaceMarineForMinCoords()
  const [isModalOpen, setIsModalOpen] = useState(false) 
  const [isHealth, setIsHealth] = useState(false)
  const showModal = (healthArg?: number) => {
    if(healthArg){
      getSpaceMarineForHealth.refetch()
      setIsHealth(true);
    }
    else{
      getSpaceMarineForMinCoords.refetch()
      setIsHealth(false);
      }
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const handleEditSpaceMarine = async (record: TSpaceMarine) => {
    setEditing(true)
    setEditingMarine(record)
  }
  const handleDeleteSpaceMarine = async (id: number) => {
    deleteSpaceMarine(id)
    setDelete(true)
  }
  const handleCreateSpaceMarine = () => {
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
    setOpen(false)
  }

  const onChange = async (
    pagination: any,
    filters: any,
    sorter: any,
  ) => {
    const { sorterCopy, paginationCopy } = buildFilters(
      pagination,
      filters,
      sorter,
    )
    setSorter(sorterCopy)
    setFilters(filters)
    await queryClient.invalidateQueries([
      'getSpaceMarine',
      sorterCopy,
      filters,
      paginationCopy,
    ])
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
            style={{ marginLeft: '10px' }}
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
  const parseSpaceMarine = (spaceMarine: TSpaceMarine) =>
    _.map(spaceMarine, (value, key) => (
      <div key={ key }>
        <>
          { key }: { value }
        </>
      </div>
    ))

  const changeMelee = (item: meleeWeapon) => {
    setMlWeapon(item)
  }

  useEffect(() => {
    queryClient.invalidateQueries('getSpaceMarines')
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
          <Empty description={ `The server is sleeping` } />
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
      <Flex>
        <Space direction="vertical" size={ [8, 16] }>
          <Button onClick={ ()=>showModal() }>Get marine for min coords</Button>
          <Space wrap>
            <InputNumber
              required
              onChange={ (value) => value? setHealth(value): false }
              min={ -67 }
              addonBefore="health"
              value={ health }
            />
            <Button
              onClick={ () => showModal(health) }
            >
              Get marine is less than the current value
            </Button>
          </Space>
          <Space wrap>
            <Select
              placeholder="Select a option and change input text above"
              defaultValue={ mlWeapon }
              onChange={ changeMelee }
              options={ Object.values(meleeWeapon).map((item) => ({
                label: item,
                value: item,
              })) }
            />
            <DeleteOutlined
              onClick={ () => {
                deleteSpaceMarineForMelee(mlWeapon)
              } }
              style={{ color: 'red', marginLeft: 12 }}
            />
          </Space>
        </Space>
        <Modal
          title="First additional service"
          open={ isModalOpen }
          onOk={ handleOk }
          onCancel={ handleCancel }
        >
          { isHealth ?
            getSpaceMarineForHealth.data?? 'No content yet'
            : getSpaceMarineForMinCoords.data ? parseSpaceMarine(mapSpaceMarine(getSpaceMarineForMinCoords.data)) :  'No content yet' }
        </Modal>
      </Flex>
    </>
  )
}