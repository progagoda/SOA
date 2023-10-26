import axios from 'axios'
import { TDisembarkStarshipArg, TSpaceMarine, TStarship } from './types'
import { buildMarineXML, prepareFilters } from './helpers'
import { meleeWeapon } from './constants'
import _ from 'lodash'
import { parseString } from 'xml2js'


const FirstServiceURL = process.env.REACT_APP_URL1
const SecondServiceURL = process.env.REACT_APP_URL2


export async function createSpaceMarine(spaceMarine: TSpaceMarine): Promise<any> {
  const xmlObject = buildMarineXML(spaceMarine);
  return await axios
    .post(`${FirstServiceURL}`, xmlObject, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
}

export async function getSpaceMarines(
  args: any
) {
  const filters = prepareFilters(args.queryKey[2])
  const  { data }  = await axios.get(`${FirstServiceURL}`, {
    params: {
      sort: args.queryKey[1]?.field,
      order: args.queryKey[1]?.field ? args.queryKey[1]?.order.toUpperCase(): undefined,
      page: args.queryKey[3]?.page,
      size: args.queryKey[3]?.size,
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
  // @ts-ignore
  return jsonData?.SpaceMarines.spaceMarines;
  // return data
}

export async function deleteSpaceMarine(id: number) {
  const { data } = await axios.delete(`${FirstServiceURL}/${id}`)
  return data
}
export async function editSpaceMarine(spaceMarine: TSpaceMarine): Promise<any>{
  const xmlObject= buildMarineXML(spaceMarine)
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
  let jsonData
  parseString(data, { explicitArray: false }, (err: any, result: any) => {
    if (err) {
      throw err
    }
    jsonData = result
  })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return jsonData?.SpaceMarine;
}
export async function getSpaceMarineForHealth(args: any): Promise<any> {
  const { data } = await axios.get(`${FirstServiceURL}/health/${args.queryKey[1]}`)
  let jsonData
  parseString(data, { explicitArray: false }, (err: any, result: any) => {
    if (err) {
      throw err
    }
    jsonData = result
  })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return jsonData?.SpaceMarinesCount;
  }

export async function createStarship(starship: TStarship): Promise<any> {
  const id = _.random(0, 1000);
  const { data } = await axios.post(`${SecondServiceURL}/${id}/${starship.name}`)
  return data
}
export async function disembarkStarship(arg: TDisembarkStarshipArg){
  const {data} = await axios.put(`${SecondServiceURL}/${arg.starshipId}/unload/${arg.spaceMarineId}`)
  return data
}
