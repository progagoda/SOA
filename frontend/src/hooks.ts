import { useQuery } from 'react-query'
import { getSpaceMarines } from './api'
import {  mapSpaceMarines } from './helpers'
import { TSpaceMarine, TApiSpaceMarine} from './types'

export const useSpaceMarines = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    'getSpaceMarines',
    getSpaceMarines,
    {
      retry:2,
      select: (data: TApiSpaceMarine[]):TSpaceMarine[]=>mapSpaceMarines(data)
    },
  )
  const update = ():string | null => {
    let error: string | null = null
    refetch().catch((reason) => {
      error = reason
    })
    return error
  }
  return { data, isLoading, isError, update }
}
