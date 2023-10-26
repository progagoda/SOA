import { TSpaceMarine } from '../../types'
import { bol } from '../../constants'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, InputRef, Space, Tooltip } from 'antd'
import React, { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { FilterConfirmProps } from 'antd/es/table/interface'
import type { ColumnType } from 'antd/es/table'
import _ from 'lodash'

type DataIndex = keyof TSpaceMarine

export const columns = ({
  handleDeleteSpaceMarine,
  handleEditSpaceMarine,
}: {
  handleDeleteSpaceMarine: { (id: number): Promise<void> }
  handleEditSpaceMarine: { (record: TSpaceMarine): Promise<void> }
}) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)
  const handleSearch = (
    selectedKey: string,
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm()
    setSearchText(selectedKey)
    setSearchedColumn(dataIndex)
  }
  const checkLength = (item: string | number, width: number ) =>{
    if(item.toString().length > 10*width){
     const shortItem = _.truncate(item.toString(),{'length': 10*width})
     return(
       <Tooltip title={ item }>
         { shortItem }
       </Tooltip>)
   }
     return item;
}
  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (
    dataIndex: DataIndex,
  ): ColumnType<TSpaceMarine> => ({
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
            handleSearch(selectedKeys[0] as string, confirm, dataIndex) }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={ () =>
              handleSearch(selectedKeys[0] as string, confirm, dataIndex) }
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
      width: '1vh',
      sorter: true,
      editable: true,
      render: (item: any)=>checkLength(item,1)
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '1vh',
      sorter: true,
      ...getColumnSearchProps('name'),
      render: (item: any)=>checkLength(item,1),
    },
    {
      title: 'Coordinates',
      children: [
        {
          title: 'X',
          dataIndex: 'coordinatesX',
          key: 'coordinatesX',
          width: '1vh',
          sorter: true,
          editable: true,
          ...getColumnSearchProps('coordinatesX'),
          render: (item: any)=>checkLength(item, 1)
        },

        {
          title: 'Y',
          width: '1vh',
          dataIndex: 'coordinatesY',
          key: 'coordinatesY',
          sorter: true,
          ...getColumnSearchProps('coordinatesY'),
          render: (item: any)=>checkLength(item, 1)
        },
      ],
    },
    {
      title: 'Creation Date',
      dataIndex: 'creationDate',
      key: 'creationDate',
      width: '3vh',
      sorter: true,
      ...getColumnSearchProps('creationDate'),
      render: (item: Date) =>checkLength( `${new Date(item)
        .toISOString()
        .replace(/T/, ' ') // replace T with a space
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .replace(/\..+/, '')}`,3),
    },
    {
      title: 'Health',
      dataIndex: 'health',
      key: 'health',
      sorter: true,
      width: '1vh',
      render: (item: any)=>checkLength(item,1),
      ...getColumnSearchProps('health'),
    },
    {
      title: 'Loyal',
      dataIndex: 'loyal',
      key: 'loyal',
      sorter: true,
      width: '1vh',
      ...getColumnSearchProps('loyal'),
      render: (item: boolean) =>`${item ? bol.ok: bol.no}`,
    },
    {
      title: 'Height',
      dataIndex: 'height',
      key: 'height',
      sorter: true,
      width: '1vh',
      ...getColumnSearchProps('height'),
      render: (item: any)=>checkLength(item,1),
    },
    {
      title: 'MeleeWeapon',
      dataIndex: 'meleeWeapon',
      key: 'meleeWeapon',
      sorter: true,
      width: '2vh',
      ...getColumnSearchProps('meleeWeapon'),
    },
    {
      title: 'Chapter',
      children: [
        {
          title: 'Name',
          dataIndex: 'chapterName',
          key: 'chapterName',
          sorter: true,
          width: '3vh',
          ...getColumnSearchProps('chapterName'),
          render: (item: any)=>checkLength(item,2),
        },
        {
          title: 'ParentLegion',
          dataIndex: 'chapterParentLegion',
          key: 'chapterParentLegion',
          sorter: true,
          width: '3vh',
          ...getColumnSearchProps('chapterParentLegion'),
          render: (item: any)=>checkLength(item,2),
        },
        {
          title: 'World',
          dataIndex: 'chapterWorld',
          key: 'chapterWorld',
          sorter: true,
          width: '3vh',
          ...getColumnSearchProps('chapterWorld'),
          render: (item: any)=>checkLength(item,2),
        },
      ],
    },
    {
      title: 'StarshipId',
      dataIndex: 'starshipId',
      key: 'starshipId',
      sorter: true,
      width: '1vh',
      ...getColumnSearchProps('starshipId'),
      render: (item: any)=>checkLength(item,2),
    },
    {
      title: 'Action',
      width: '1vh',
      render: (record: TSpaceMarine) => (
        <>
          <EditOutlined
            onClick={ () => {
              handleEditSpaceMarine(record)
            } }
          />
          <DeleteOutlined
            onClick={ () => handleDeleteSpaceMarine(record.id) }
            style={{ color: 'red', marginLeft: 12 }}
          />
        </>
      ),
    },
  ]
}
