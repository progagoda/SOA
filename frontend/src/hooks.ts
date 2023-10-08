import { useQuery } from 'react-query'
import { getSpaceMarines } from './api'
import {  mapSpaceMarines } from './helpers'
import { TSpaceMarine, TApiSpaceMarine} from './types'

export const useSpaceMarines = () => {
  const { data, isLoading, isError } = useQuery(
    'getSpaceMarines',
    getSpaceMarines,
    {
      retry:2,
      select: (data: TApiSpaceMarine[]):TSpaceMarine[]=> mapSpaceMarines(data)
    },
  )
  return { data, isLoading, isError }
}
