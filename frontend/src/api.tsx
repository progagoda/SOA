import axios from 'axios'
import { TSpaceMarine } from './types'
import { buildMarineXML } from './helpers'
import { meleeWeapon } from './constants'
import React from 'react'
import { NotificationInstance } from 'antd/es/notification/interface'

const FirstServiceURL = process.env.REACT_APP_URL1

export const apiService = async (
  api: NotificationInstance,
  fun?: (arg: any) => Promise<any>,
  arg?: any,
) => {
  if(fun && arg) {
    await fun(arg).catch((error) => {
      api.error({
        message: `ERROR`,
        description: <>{ `${error.message}` }</>,
      })
    })
  }
  await axios.get(`${FirstServiceURL}/space-marines`).catch((error) => {
    api.error({
      message: `ERROR`,
      description: <>{ `${error.message}` }</>,
    })
  });
}

export async function createSpaceMarine(spaceMarine: TSpaceMarine): Promise<any> {
  console.error('HIHIHI')
  const xmlObject = buildMarineXML(spaceMarine);
  const { data } = await axios.post(`${FirstServiceURL}/space-marines`, xmlObject, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
  return data
}

export async function getSpaceMarines(
  sorter?: any,
  filters?: any,
  pagination?: any,
) {
  const { data } = await axios.get(`${FirstServiceURL}/space-marines`, {
    params: {
      sort: sorter.field,
      order: sorter.order,
      page: pagination?.page,
      size: pagination?.size,
      ...filters,
    },
  })
  return data
}

export async function deleteSpaceMarine(id: number) {
  const { data } = await axios.delete(`${FirstServiceURL}/space-marines/${id}`)
  return data
}
export async function editSpaceMarine(spaceMarine: TSpaceMarine, id: number): Promise<any>{
  const xmlObject=buildMarineXML(spaceMarine)
  const {data} = await axios.put(`${FirstServiceURL}/space-marines/${id}`,xmlObject,{
    headers: {
      'Content-Type': 'application/xml',
    },
  })
  return data;
}

export async function deleteSpaceMarineForMelee(meleeWeapon: meleeWeapon): Promise<any> {
  const { data } = await axios.delete(`${FirstServiceURL}/space-marines/melee-weapon/${meleeWeapon}`)
  return data
}
export async function getSpaceMarineForMinCoords(): Promise<any> {
  const { data } = await axios.get(`${FirstServiceURL}/space-marines/coords/min`)
  return data
}
export async function getSpaceMarineForHealth(health: number): Promise<any> {
  const { data } = await axios.get(`${FirstServiceURL}/space-marines/health/${health}`)
  return data
}
