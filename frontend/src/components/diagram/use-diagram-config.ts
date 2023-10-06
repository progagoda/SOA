import { TSpaceMarine } from '../../types'

export const useDiagramConfig = (data:TSpaceMarine[] | undefined) => {
  let xCounter = -100;
  console.error(data);
  const initialNodes = data? data.map(item=>{
    xCounter+=100
    return {
      id: item.id.toString(),
      position: {x: xCounter, y:0},
      data:{label: item.name,
          ...item}
    }
  }):[];
  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
  ]
  return {initialEdges, initialNodes}
}

