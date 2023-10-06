// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import ELK from 'elkjs/lib/elk.bundled.js';
import React, { useCallback, useLayoutEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from 'reactflow';

import 'reactflow/dist/style.css';
import { useDiagramConfig } from './use-diagram-config'
import { useSpaceMarines } from '../../hooks'

const elk = new ELK();

// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.layered.spacing.nodeNodeBetweenLayers': '100',
  'elk.spacing.nodeNode': '80',
};

const getLayoutedElements = (nodes:any, edges:any, options:any = {}) => {
  const isHorizontal = options?.['elk.direction'] === 'RIGHT';
  const graph = {
    id: 'root',
    layoutOptions: options,
    children: nodes.map((node:any) => ({
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',

      // Hardcode a width and height for elk to use when layouting.
      width: 150,
      height: 50,
    })),
    edges: edges,
  };

  return elk
    .layout(graph)
    .then((layoutedGraph:any) => ({
      nodes: layoutedGraph.children.map((node:any) => ({
        ...node,
        // React Flow expects a position property on the node instead of `x`
        // and `y` fields.
        position: { x: node.x, y: node.y },
      })),

      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
};

function LayoutFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();
  const {data} = useSpaceMarines()
  const {initialNodes,initialEdges} = useDiagramConfig(data)
  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);
  const onLayout = useCallback(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ({ direction, useInitialNodes = false }) => {
      const opts = { 'elk.direction': direction, ...elkOptions };
      const ns = useInitialNodes ? initialNodes : nodes;
      const es = useInitialNodes ? initialEdges : edges;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      getLayoutedElements(ns, es, opts).then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);

        window.requestAnimationFrame(() => fitView());
      });
    },
    [nodes, edges]
  );

  // Calculate the initial layout on mount.
  useLayoutEffect(() => {
    onLayout({ direction: 'DOWN', useInitialNodes: true });
  }, []);

  return (
    <ReactFlow
      nodes={ nodes }
      edges={ edges }
      onConnect={ onConnect }
      onNodesChange={ onNodesChange }
      onEdgesChange={ onEdgesChange }
      fitView
    >
      <Panel position="top-right">
        <button onClick={ () => onLayout({ direction: 'DOWN' }) }>vertical layout</button>

        <button onClick={ () => onLayout({ direction: 'RIGHT' }) }>horizontal layout</button>
      </Panel>
    </ReactFlow>
  );
}


export const Diagram= () => (
  <ReactFlowProvider>
    <LayoutFlow />
  </ReactFlowProvider>
)
