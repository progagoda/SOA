import { useQuery } from 'react-query'
import { getSpaceMarines } from './api'

export const useSpaceMarines = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    'getSpaceMarines',
    getSpaceMarines,
    {
      retry:2,
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
