import { useMutation, useQuery } from 'react-query'
import {
  apiService,
  createSpaceMarine,
  deleteSpaceMarine,
  editSpaceMarine,
  getSpaceMarines,
} from './api'
import { mapSpaceMarines } from './helpers'
import { TApiSpaceMarine, TSpaceMarine } from './types'
import { notification } from 'antd'

export const useSpaceMarines = () => {
  const { data, isLoading, isError } = useQuery(
    'getSpaceMarines',
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
  )
  return mutate
}
export const useEditSpaceMarine = () => {
  const [api] = notification.useNotification()
  const { mutate } = useMutation(
    ['editSpaceMarine'],
    (spaceMarine: TSpaceMarine) =>
      apiService(api, editSpaceMarine, spaceMarine),
  )
  return mutate
}
export const useDeleteSpace = () => {
  const [api] = notification.useNotification()
  const { mutate } = useMutation(['deleteSpaceMarine'], (id: number) =>
    apiService(api, deleteSpaceMarine, id),
  )
  return mutate
}
