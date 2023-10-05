import axios from 'axios'
import { TSpaceMarine } from './types'
import { buildMarineXML } from './helpers'

const FirstServiceURL = process.env.REACT_APP_URL1

export async function createSpaceMarine(spaceMarine: TSpaceMarine): Promise<any> {
  console.error(spaceMarine)
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
