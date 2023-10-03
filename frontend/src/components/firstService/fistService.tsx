import {Button, Col, Divider, Drawer, message, Row, Space, Table} from 'antd'
import {columns} from './use-colums-config'
import React, {useEffect, useRef, useState} from 'react'
import {CreateMarineForm} from './createMarineForm'
import {TSpaceMarineFormRef} from '../../types'
import {useQuery, useQueryClient} from 'react-query'
import {createSpaceMarine, deleteSpaceMarine, getSpaceMarines,} from '../../api'

export const FirstService = () => {
    const [open, setOpen] = useState(false)
    const [isDelete, setDelete] = useState(false)
    const form = useRef<TSpaceMarineFormRef>(null)
    const [messageApi, contextHolder] = message.useMessage()
    const {data, isLoading} = useQuery('getSpaceMarines', getSpaceMarines, {
        onError: (err) => {
            messageApi.open({
                type: 'error',
                content: `${err}`,
            })
        },
        enabled: false,
    })
    const queryClient = useQueryClient()
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 4,
    })
    const handleDeleteSpaceMarine = async (id: string) => {
        setDelete(false)
        await deleteSpaceMarine(id)
        setDelete(true)
    }
    const handleCreateSpaceMarine = async (): Promise<any> => {
        const spaceMarine = form?.current?.getFieldsValue()
        setOpen(false)
        queryClient.fetchQuery(['createSpaceMarines', {spaceMarine}], createSpaceMarine).catch(err => {
            messageApi.open({
                type: 'error',
                content: `${err}`
            })
        })
    }

    const showDrawer = () => {
        setOpen(true)
    }
    const onClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        queryClient.invalidateQueries('getSpaceMarines').catch(reason => {
            messageApi.open({
                type: 'error',
                content: reason,
            })
        })
    }, [open, isDelete])

    const onChange = async (
        pagination: any,
        filters: any,
        sorter: any,
        extra: any,
    ) => {
        const sorterCopy = {...sorter}
        const paginationCopy = {...pagination}
        sorterCopy.order = sorter.order === 'ascend' ? 'asc' : 'desc'
        sorterCopy.field = sorter.columnKey
        paginationCopy.page = pagination.current
        paginationCopy.size = pagination.pageSize
        await getSpaceMarines(sorterCopy, filters, paginationCopy)

        // eslint-disable-next-line no-console
        console.log('params', pagination, filters, sorter, extra)
    }

    const footer = (
        <Space>
            <Row gutter={[120, 10]}>
                <Col>
                    <Button htmlType="button" onClick={onClose}>
                        Close
                    </Button>
                </Col>
                <Col>
                    <Button
                        htmlType="button"
                        style={{marginRight: '10px'}}
                        onClick={() => form.current?.resetFields()}
                    >
                        Reset
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={handleCreateSpaceMarine}
                    >
                        Submit
                    </Button>
                </Col>
            </Row>
        </Space>
    )
    const columnsConfig = columns(handleDeleteSpaceMarine)
    return (
        <>
            {contextHolder}
            <Divider> Space marines collection</Divider>
            <Button type="primary" onClick={showDrawer} style={{marginBottom: 16}}>
                Create
            </Button>
            <Drawer
                title="Create Space Marine"
                placement="right"
                onClose={onClose}
                open={open}
                footer={footer}
            >
                <CreateMarineForm ref={form}/>
            </Drawer>
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
                loading={isLoading}
                bordered
                dataSource={data}
                columns={columnsConfig}
                onChange={onChange}
            />
        </>
    )
}
