import { TSpaceMarineFilters } from '../../types'
import { bol, meleeWeapon } from '../../constants'
import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, InputRef, Popconfirm, Space } from 'antd'
import React, { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { FilterConfirmProps } from 'antd/es/table/interface'
import type { ColumnType } from 'antd/es/table'

type DataIndex = keyof TSpaceMarineFilters
export const columns = (handleDeleteSpaceMarine: {
  (id: string): Promise<void>
  (arg0: string): void
}) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (
    dataIndex: DataIndex,
  ): ColumnType<TSpaceMarineFilters> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={ (e) => e.stopPropagation() }>
        <Input
          ref={ searchInput }
          placeholder={ `Search ${dataIndex}` }
          value={ selectedKeys[0] }
          onChange={ (e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : []) }
          onPressEnter={ () =>
            handleSearch(selectedKeys as string[], confirm, dataIndex) }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={ () =>
              handleSearch(selectedKeys as string[], confirm, dataIndex) }
            icon={ <SearchOutlined /> }
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={ () => clearFilters && handleReset(clearFilters) }
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={ () => {
              confirm({ closeDropdown: false })
              setSearchText((selectedKeys as string[])[0])
              setSearchedColumn(dataIndex)
            } }
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={ () => {
              close()
            } }
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={ [searchText] }
          autoEscape
          textToHighlight={ text ? text.toString() : '' }
        />
      ) : (
        text
      ),
  })

  return [
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
      sorter: true,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Coordinates',
      children: [
        {
          title: 'X',
          dataIndex: ['coordinates', 'x'],
          key: 'coordinatesX',
          sorter: true,
          ...getColumnSearchProps('coordinatesX'),
        },

        {
          title: 'Y',
          dataIndex: ['coordinates', 'y'],
          key: 'coordinatesY',
          sorter: true,
          ...getColumnSearchProps('coordinatesY'),
        },
      ],
    },
    {
      title: 'Creation Date',
      dataIndex: 'creationDate',
      key: 'creationDate',
      sorter: true,
      render: (item: Date) =>
        `${new Date(item)
          .toISOString()
          .replace(/T/, ' ') // replace T with a space
          .replace(/\..+/, '')}`,
      ...getColumnSearchProps('creationDate'),
    },
    {
      title: 'Health',
      dataIndex: 'health',
      key: 'health',
      sorter: true,
      ...getColumnSearchProps('health'),
    },
    {
      title: 'Loyal',
      dataIndex: 'loyal',
      key: 'loyal',
      sorter: true,
      render: (item: boolean) => `${item ? bol.ok : bol.no}`,
      ...getColumnSearchProps('loyal'),
    },
    {
      title: 'Height',
      dataIndex: 'height',
      key: 'height',
      sorter: true,
      ...getColumnSearchProps('height'),
    },
    {
      title: 'MeleeWeapon',
      dataIndex: 'meleeWeapon',
      key: 'meleeWeapon',
      sorter: true,
      filters:[
        {text: meleeWeapon.CHAIN_AXE, value: meleeWeapon.CHAIN_AXE},
        {text: meleeWeapon.MANREAPER, value: meleeWeapon.MANREAPER},
        {text: meleeWeapon.POWER_BLADE, value: meleeWeapon.POWER_BLADE},
      ],
    },
    {
      title: 'Chapter',
      children: [
        {
          title: 'Name',
          dataIndex: ['chapter', 'name'],
          key: 'chapterName',
          sorter: true,
          ...getColumnSearchProps('chapterName'),
        },
        {
          title: 'ParentLegion',
          dataIndex: ['chapter', 'parentLegion'],
          key: 'chapterParentLegion',
          sorter: true,
          ...getColumnSearchProps('chapterParentLegion'),
        },
        {
          title: 'World',
          dataIndex: ['chapter', 'world'],
          key: 'chapterWorld',
          sorter: true,
          ...getColumnSearchProps('chapterWorld'),
        },
      ],
    },
    {
      title: 'StarshipId',
      dataIndex: 'starshipId',
      key: 'starshipId',
      sorter: true,
      ...getColumnSearchProps('starshipId'),
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id: string) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={ () => handleDeleteSpaceMarine(id) }
        >
          <a>Delete</a>
        </Popconfirm>
      ),
    },
  ]
}
