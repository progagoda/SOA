import { useQuery } from 'react-query'
import { getSpaceMarines } from './api'

export const useSpaceMarines = ()=>{
  const {data, isLoading,isError} = useQuery('getSpaceMarines', getSpaceMarines,{
    retry:1
  })
  return {data, isLoading, isError}
}
