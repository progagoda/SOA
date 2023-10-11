import axios from 'axios'
import { TDisembarkStarshipArg, TSpaceMarine, TStarship } from './types'
import { buildMarineXML } from './helpers'
import { meleeWeapon } from './constants'
import React from 'react'
import { NotificationInstance } from 'antd/es/notification/interface'
import { queryClient } from './index'
import { parseString } from 'xml2js';

const FirstServiceURL = process.env.REACT_APP_URL1
const SecondServiceURL = process.env.REACT_APP_URL2
// const SecondServiceURL = process.env.REACT_APP_URL2
export const apiService = async (
  api: NotificationInstance,
  fun?: (arg: any) => Promise<any>,
  arg: any = null,
) => {
  if(fun) {
    await fun(arg).catch((error) => {
      api.error({
        message: `ERROR`,
        description: <>{ `${error.message}` }</>,
      })
    })
  }
  queryClient.invalidateQueries('getSpaceMarines').catch((error) => {
      api.error({
        message: `ERROR`,
        description: <>{ `${error.message}` }</>,
      })
    });
}

export async function createSpaceMarine(spaceMarine: TSpaceMarine): Promise<any> {
  const xmlObject = buildMarineXML(spaceMarine);
  const { data } = await axios.post(`${FirstServiceURL}`, xmlObject, {
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
  const  {data}  = await axios.get(`${FirstServiceURL}`, {
    params: {
      sort: sorter.field,
      order: sorter.order,
      page: pagination?.page,
      size: pagination?.size,
      ...filters,
    },
    headers: {
      'Content-Type': 'application/xml',
    },
  })
  let jsonData
  parseString(data, { explicitArray: false }, (err: any, result: any) => {
    if (err) {
      throw err
    }
    jsonData = result
  })
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
// eslint-disable-next-line no-console
console.log(jsonData?.SpaceMarines.spaceMarine)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore

  return jsonData?.SpaceMarines.spaceMarine;
}

export async function deleteSpaceMarine(id: number) {
  const { data } = await axios.delete(`${FirstServiceURL}/${id}`)
  return data
}
export async function editSpaceMarine(spaceMarine: TSpaceMarine): Promise<any>{
  const xmlObject=buildMarineXML(spaceMarine)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
// eslint-disable-next-line no-console
  console.log(spaceMarine)
  const {data} = await axios.put(`${FirstServiceURL}/${spaceMarine.id}`,xmlObject,{
    headers: {
      'Content-Type': 'application/xml',
    },
  })
  return data;
}

export async function deleteSpaceMarineForMelee(meleeWeapon: meleeWeapon): Promise<any> {
  const { data } = await axios.delete(`${FirstServiceURL}/melee-weapon/${meleeWeapon}`)
  return data
}
export async function getSpaceMarineForMinCoords(): Promise<any> {
  const { data } = await axios.get(`${FirstServiceURL}/coords/min`)
  return data
}
export async function getSpaceMarineForHealth(health: number): Promise<any> {
  const { data } = await axios.get(`${FirstServiceURL}/health/${health}`)
  return data
}
export async function getStarships(){
  const {data} = await axios.get(`${SecondServiceURL}`, { headers: {
      'Content-Type': 'application/xml',
    }})
  let jsonData
  parseString(data, { explicitArray: false }, (err: any, result: any) => {
    if (err) {
      throw err
    }
    jsonData = result
  })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return jsonData?.Starhips.starship
}
export async function createStarship(starship: TStarship): Promise<any> {
  const { data } = await axios.post(`${SecondServiceURL}/${starship.name}`)
  return data
}
export async function disembarkStarship(arg: TDisembarkStarshipArg){
  const {data} = await axios.put(`${SecondServiceURL}/${arg.starshipId}/unload/${arg.spaceMarineId}`)
  return data
}
