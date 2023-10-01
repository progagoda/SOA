import {TChapter, TCoordinates, TFilters} from '../../types';
import { bol, chapter, meleeWeapon } from '../../constants';
import { Popconfirm } from 'antd';
import React from 'react';
import { deleteSpaceMarine } from '../../api';

export const columns =(handleDeleteSpaceMarine: { (id: string): Promise<void>; (arg0: string): void; }) => [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
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
      },
      {
        title: 'Y',
        dataIndex: ['coordinates', 'y'],
        key: 'coordinatesY',
        sorter: true,
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
        dataIndex: ['chapter','name'],
        key: 'chapterName',
        sorter: true,
      },
      {
        title: 'ParentLegion',
        dataIndex: ['chapter', 'parentLegion'],
        key: 'chapterParentLegion',
        sorter: true,
      },
      {
        title: 'World',
        dataIndex: ['chapter', 'world'],
        key: 'chapterWorld',
        sorter: true,
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