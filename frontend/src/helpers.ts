import { TSpaceMarine } from './types'

export const mapData = (data: TSpaceMarine[]) => {
  const result: any = {}
  data.forEach((item: TSpaceMarine) => {
    for (const key in item) {
      if (!result.hasOwnProperty(key)) {
        result[key] = []
      }
      // @ts-ignore
      result[key].push(item[key])
    }
  })
  console.log(result)
  return result
}
