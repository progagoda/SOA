import { TChapter, TCoordinates } from '../../types';
import { bol, chapter, meleeWeapon } from '../../constants';
import { Popconfirm } from 'antd';
import React from 'react';
import { deleteSpaceMarine } from '../../api';

export const columns =(handleDeleteSpaceMarine: { (id: string): Promise<void>; (arg0: string): void; }) => [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    sorter: true
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: true
  },
  {
    title: 'Coordinates',
    children: [
      {
        title: 'X',
        dataIndex: ['coordinates', 'x'],
        key: 'x',
        sorter: true,
        sorterField: 'CoordinatesX'
      },
      {
        title: 'Y',
        dataIndex: 'coordinates',
        key: 'coordinates',
        sorter: true,
        render: (item: TCoordinates) => `${item.y}`,
      },
    ],
  },
  {
    title: 'Creation Date',
    dataIndex: 'creationDate',
    key: 'creationDate',
    sorter: true,
    render: (item: Date) => `${new Date(item).toISOString().replace(/T/, ' ').      // replace T with a space
      replace(/\..+/, '')}`,
  },
  {
    title: 'Health',
    dataIndex: 'health',
    key: 'health',
    sorter: true,
  },
  {
    title: 'Loyal',
    dataIndex: 'loyal',
    key: 'loyal',
    sorter: true,
    render: (item: boolean) => `${item ? bol.ok : bol.no}`,
  },
  {
    title: 'Height',
    dataIndex: 'height',
    key: 'height',
    sorter: true,
  },
  {
    title: 'MeleeWeapon',
    dataIndex: 'meleeWeapon',
    key: 'meleeWeapon',
    sorter: true,
  },
  {
    title: 'Chapter',
    children: [
      {
        title: 'Name',
        dataIndex: 'chapter',
        key: 'name',
        sorter: true,
        render: (item: TChapter) => `${item.name}`,
      },
      {
        title: 'ParentLegion',
        dataIndex: 'chapter',
        key: 'parentLegion',
        sorter: true,
        render: (item: TChapter) => `${item.parentLegion}`,
      },
      {
        title: 'World',
        dataIndex: 'chapter',
        key: 'world',
        sorter: true,
        render: (item: TChapter) => `${item.world}`,
      },

    ],
  },
  {
    title: 'StarshipId',
    dataIndex: 'starshipId',
    key: 'starshipId',
    sorter: true,
  },
  {
    title: 'Action',
    dataIndex: 'id',
    render: (id: string) =>
      <Popconfirm title='Sure to delete?' onConfirm={() => handleDeleteSpaceMarine(id)}
      >
        <a>Delete</a>
      </Popconfirm>,
  },
];