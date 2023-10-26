import { useMutation, useQuery } from 'react-query'
import {
  createSpaceMarine, createStarship,
  deleteSpaceMarine, deleteSpaceMarineForMelee, disembarkStarship,
  editSpaceMarine, getSpaceMarineForHealth, getSpaceMarineForMinCoords,
  getSpaceMarines,
} from './api'
import { mapSpaceMarines } from './helpers'
import { TApiSpaceMarine, TDisembarkStarshipArg, TSpaceMarine, TStarship } from './types'
import { queryClient } from './index'
import { meleeWeapon } from './constants'

export const useSpaceMarines = (sorter?: any, filters?:any, pagination?: any) => {
  const { data, isLoading, isError } = useQuery(
    ['getSpaceMarines', sorter, filters, pagination],
    getSpaceMarines,
    {
      select: (data: TApiSpaceMarine[]): TSpaceMarine[] =>
        mapSpaceMarines(data),
    },
  )
  return { data, isLoading, isError }
}

export const useCreateSpaceMarine = () => {
  const { mutate } = useMutation(
    ['createSpaceMarine'],
    (spaceMarine: TSpaceMarine) =>
       createSpaceMarine(spaceMarine),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('getSpaceMarines');
      }
    }
  )
  return mutate
}

export const useEditSpaceMarine = () => {
  const { mutate } = useMutation(
    ['editSpaceMarine'],
    (spaceMarine: TSpaceMarine) =>
      editSpaceMarine(spaceMarine),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('getSpaceMarines');
      }
    }
  )
  return mutate
}

export const useDeleteSpace = () => {
  const { mutate } = useMutation(['deleteSpaceMarine'], (id: number) =>
    deleteSpaceMarine(id),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('getSpaceMarines');
      }
    }
  )
  return mutate
}

export const useDeleteMarineForMelee= () => {
  const { mutate } = useMutation(['deleteSpaceMarine'], (mlWeapon: meleeWeapon) =>
      deleteSpaceMarineForMelee(mlWeapon),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('getSpaceMarines');
      }
    }
  )
  return mutate
}

export const useGetSpaceMarineForHealth= (health: number) => {
  const { data, refetch } = useQuery<number>(["getSpaceMarineForHealth", health], getSpaceMarineForHealth, {
    refetchOnWindowFocus: false,
    enabled: false
  });
  return {data, refetch}
}

export const useGetSpaceMarineForMinCoords = () => {
  const { data, refetch } = useQuery<TApiSpaceMarine>(["getSpaceMarineForMinCoords"], getSpaceMarineForMinCoords, {
    refetchOnWindowFocus: false,
    enabled: false,
    retry: 0,
  });
  return {data, refetch}
}

export const useCreateStarship = () => {
  const { mutate } = useMutation(
    ['createStarship'],
    (starship: TStarship) =>
     createStarship(starship),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('getStarship');
      }
    }
  )
  return mutate
}

export const useDisembarkStarship = ()=>{
  const { mutate } = useMutation(
    ['disembarkStarship'],
    (arg: TDisembarkStarshipArg) =>
      disembarkStarship(arg),{
      onSuccess:  async () => {
        await queryClient.invalidateQueries('getStarship');
      }
    }
  )
  return mutate
}