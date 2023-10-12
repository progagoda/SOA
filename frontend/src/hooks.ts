import { useMutation, useQuery } from 'react-query'
import {
  apiService,
  createSpaceMarine, createStarship,
  deleteSpaceMarine, deleteSpaceMarineForMelee, disembarkStarship,
  editSpaceMarine, getSpaceMarineForHealth, getSpaceMarineForMinCoords,
  getSpaceMarines,
  getStarships,
} from './api'
import { mapSpaceMarines } from './helpers'
import { TApiSpaceMarine, TDisembarkStarshipArg, TSpaceMarine, TStarship } from './types'
import { notification } from 'antd'
import { queryClient } from './index'
import { meleeWeapon } from './constants'
export const useSpaceMarines = (sorter?: any, filters?:any, pagination?: any) => {
  const { data, isLoading, isError } = useQuery(
    ['getSpaceMarines', sorter, filters, pagination],
    getSpaceMarines,
    {
      retry: 2,
      select: (data: TApiSpaceMarine[]): TSpaceMarine[] =>
        mapSpaceMarines(data),
    },
  )
  return { data, isLoading, isError }
}
export const useCreateSpaceMarine = () => {
  const [api] = notification.useNotification()
  const { mutate } = useMutation(
    ['createSpaceMarine'],
    (spaceMarine: TSpaceMarine) =>
      apiService(api, createSpaceMarine, spaceMarine),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getSpaceMarines');
      }
    }
  )
  return mutate
}
export const useEditSpaceMarine = () => {
  const [api] = notification.useNotification()
  const { mutate } = useMutation(
    ['editSpaceMarine'],
    (spaceMarine: TSpaceMarine) =>
      apiService(api, editSpaceMarine, spaceMarine),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getSpaceMarines');
      }
    }
  )
  return mutate
}
export const useDeleteSpace = () => {
  const [api] = notification.useNotification()
  const { mutate } = useMutation(['deleteSpaceMarine'], (id: number) =>
    apiService(api, deleteSpaceMarine, id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getSpaceMarines');
      }
    }
  )

  return mutate
}
export const useDeleteMarineForMelee= () => {
  const [api] = notification.useNotification()
  const { mutate } = useMutation(['deleteSpaceMarine'], (melee: meleeWeapon) =>
      apiService(api, deleteSpaceMarineForMelee, melee),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getSpaceMarines');
      }
    }
  )

  return  mutate
}
export const useGetSpaceMarineForHealth= () => {
  const [api] = notification.useNotification()
  const { mutate } = useMutation(['getSpaceMarineForHealth'], (health: number) =>
    apiService(api, getSpaceMarineForHealth, health),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getSpaceMarines');
      }
    }
  )

  return mutate
}
export const useGetSpaceMarineForMinCoords= () => {
  const [api] = notification.useNotification()
  const { mutate, data}= useMutation(['getSpaceMarineForMinCoords'], () =>
      apiService(api, getSpaceMarineForMinCoords),
    {
      onSuccess: () => {
        queryClient.setQueryData('getSpaceMarines', data)
      }
    }
  )

  return mutate
}

export const useGetStarship = ()=> {
  const { data, isLoading, isError } = useQuery<TStarship[]>(['getStarship'], getStarships)
  return { data, isLoading, isError }
}
export const useCreateStarship = () => {
  const [api] = notification.useNotification()
  const { mutate } = useMutation(
    ['createStarship'],
    (starship: TStarship) =>
      apiService(api, createStarship, starship),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getStarship');
      }
    }
  )
  return mutate
}
export const useDisembarkStarship = ()=>{
  const [api] = notification.useNotification()
  const { mutate } = useMutation(
    ['disembarkStarship'],
    (arg: TDisembarkStarshipArg) =>
      apiService(api, disembarkStarship, arg),{
      onSuccess: () => {
        queryClient.invalidateQueries('getStarship');
      }
    }

  )
  return mutate
}