import { TStarship } from '../../types'
import type { ColumnsType } from 'antd/es/table'

export const columns: ColumnsType<TStarship> = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
]
