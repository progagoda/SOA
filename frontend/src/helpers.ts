import { TApiSpaceMarine, TSpaceMarine } from './types'
import { create } from 'xmlbuilder2'

export const buildFilters = (pagination: any, filters: any, sorter: any) => {
  const sorterCopy = {...sorter}
  const paginationCopy = {...pagination}
  sorterCopy.order = sorter.order === 'ascend' ? 'asc' : 'desc'
  sorterCopy.field = sorter.columnKey
  paginationCopy.page = pagination.current
  paginationCopy.size = pagination.pageSize
  return {sorterCopy, paginationCopy, filters }
}
export const buildMarineXML = (spaceMarine: TSpaceMarine): string => create()
  .ele('SpaceMarine')
  .ele('name')
  .txt(spaceMarine.name)
  .up()
  .ele('coordinates')
  .ele('x')
  .txt(spaceMarine.coordinatesX.toString())
  .up()
  .ele('y')
  .txt(spaceMarine.coordinatesY.toString())
  .up()
  .ele('coordinates')
  .ele('health')
  .txt(spaceMarine.health.toString())
  .up()
  .ele('height')
  .txt(spaceMarine?.height.toString())
  .up()
  .ele('meleeWeapon')
  .txt(spaceMarine?.meleeWeapon)
  .up()
  .ele('Chapter')
  .ele('name')
  .txt(spaceMarine?.chapterName)
  .up()
  .ele('parentLegion')
  .txt(spaceMarine?.chapterParentLegion)
  .up()
  .ele('world')
  .txt(spaceMarine?.chapterWorld)
  .up()
  .end({ prettyPrint: true })


export const mapSpaceMarines= (spaceMarines: TApiSpaceMarine[]): TSpaceMarine[] =>
  spaceMarines.map((spaceMarine)=>({
    id: spaceMarine.id,
    name: spaceMarine.name,
    coordinatesX: spaceMarine.coordinates.x,
    coordinatesY: spaceMarine.coordinates.y,
    creationDate: spaceMarine.creationDate,
    health: spaceMarine.health,
    loyal: spaceMarine.loyal,
    height: spaceMarine.height,
    meleeWeapon: spaceMarine.meleeWeapon,
    chapterName: spaceMarine.chapter.name,
    chapterParentLegion: spaceMarine.chapter.parentLegion,
    chapterWorld: spaceMarine.chapter.world,
    starshipId: spaceMarine.starshipId
  }))


