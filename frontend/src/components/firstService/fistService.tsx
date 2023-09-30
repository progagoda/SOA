import {Button, Col, Divider, Drawer, Row, Space, Table} from 'antd';
import {columns} from './use-colums-config';
import React, {useRef, useState} from 'react';
import {CreateMarineForm} from './createMarineForm';
import {TSpaceMarineFormRef} from '../../types';
import {FetchQueryOptions, useQuery, useQueryClient} from 'react-query';
import {createSpaceMarine, deleteSpaceMarine, getSpaceMarines} from '../../api';
import { create } from 'xmlbuilder2';

export const FirstService = () => {
  const [open, setOpen] = useState(false);
  const form = useRef<TSpaceMarineFormRef>(null);
  const {data, isLoading} = useQuery('getSpaceMarines', getSpaceMarines);
  const queryClient = useQueryClient();
  const handleDeleteSpaceMarine = async (id: string) => {
    // Вызовите функцию для удаления SpaceMarine по id
    await deleteSpaceMarine(id);
    // После успешного удаления обновите данные SpaceMarines и перерисуйте таблицу
    await queryClient.invalidateQueries('getSpaceMarines');
  };
  const handleCreateSpaceMarine = async (): Promise<any>=>{
      const spaceMarine = form?.current?.getFieldsValue()
      setOpen(false);
      await queryClient.fetchQuery(['createSpaceMarines', {spaceMarine}], createSpaceMarine)
      await queryClient.invalidateQueries('getSpaceMarines');
  }
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = async (pagination: any, filters: any, sorter: any, extra: any) => {
      sorter.order = sorter.order === 'ascend' ? 'asc' : 'desc';
      sorter.field = sorter.columnKey;
      await getSpaceMarines(sorter);

    // eslint-disable-next-line no-console
    console.log('params', pagination, filters, sorter, extra);
  };

  const footer = (
    <Space>
      <Row gutter={[120, 10]}>
        <Col>
          <Button htmlType='button' onClick={onClose}>
            Close
          </Button>
        </Col>
        <Col>
          <Button htmlType='button' style={{ marginRight: '10px' }} onClick={() => form.current?.resetFields()}>
            Reset
          </Button>
          <Button type='primary' htmlType='submit' onClick={handleCreateSpaceMarine}>
            Submit
          </Button>
        </Col>
      </Row>
    </Space>
  );
  const columnsConfig = columns(handleDeleteSpaceMarine);
  return (
      <>
        <Divider> Space marines collection</Divider>
        <Button type='primary' onClick={showDrawer} style={{marginBottom: 16}}>
          Create
        </Button>
        <Drawer title='Create Space Marine' placement='right' onClose={onClose} open={open} footer={footer}>
          <CreateMarineForm ref={form}/>
        </Drawer>
          <Table loading={isLoading} bordered dataSource={data} columns={columnsConfig} onChange={onChange}/>
      </>
  );
};

