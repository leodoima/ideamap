import { useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type OnConnect,
  Panel
} from '@xyflow/react';

import '@xyflow/react/dist/base.css';

import TurboNode, { type TurboNodeData } from '@/components/turboNode';
import TurboEdge from '@/components/turboEdge';
import { Dock } from './components/magicui/dock';
import { House, Image, Puzzle, StickyNote } from 'lucide-react';
import { Separator } from './components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from './components/ui/tooltip';
import { createNewNode } from './flow/nodeFactory';


const initialNodes: Node<TurboNodeData>[] = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { title: 'readFile', subtitle: 'api.ts' },
    type: 'turbo',
  },
  {
    id: '2',
    position: { x: 250, y: 0 },
    data: { title: 'bundle', subtitle: 'apiContents' },
    type: 'turbo',
  },
  {
    id: '3',
    position: { x: 0, y: 250 },
    data: { title: 'readFile', subtitle: 'sdk.ts' },
    type: 'turbo',
  },
  {
    id: '4',
    position: { x: 250, y: 250 },
    data: { title: 'bundle', subtitle: 'sdkContents' },
    type: 'turbo',
  },
  {
    id: '5',
    position: { x: 500, y: 125 },
    data: { title: 'concat', subtitle: 'api, sdk' },
    type: 'turbo',
  },
  {
    id: '6',
    position: { x: 750, y: 125 },
    data: { title: 'fullBundle' },
    type: 'turbo',
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
  },
  {
    id: 'e2-5',
    source: '2',
    target: '5',
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
  },
];

const nodeTypes = {
  turbo: TurboNode,
};

const edgeTypes = {
  turbo: TurboEdge,
};

const defaultEdgeOptions = {
  type: 'turbo',
  markerEnd: 'edge-circle',
};

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    [],
  );

  const handleAddNode = () => {
    const newNode = createNewNode();
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  return (
    <div className='w-screen h-screen bg-black'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <Controls showInteractive={false} />
        <Panel position='bottom-center' className='flex flex-1'>
          <Dock className='flex flex-1 border h-auto border-zinc-500 text-zinc-500 gap-6 py-4 px-10'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Puzzle
                  size={42}
                  onClick={() => handleAddNode()}
                  className='transition-transform hover:text-zinc-200 hover:-translate-y-2 hover:cursor-pointer'
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Add new node</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <StickyNote size={42} className='transition-transform hover:text-zinc-200 hover:-translate-y-2 hover:cursor-pointer' />
              </TooltipTrigger>
              <TooltipContent>
                <p>Add new stick</p>
              </TooltipContent>
            </Tooltip>

            <Separator orientation="vertical" className="h-full bg-zinc-600 m-4" />

            <Tooltip>
              <TooltipTrigger asChild>
                <Image size={42} className='transition-transform hover:text-zinc-200 hover:-translate-y-2 hover:cursor-pointer' />
              </TooltipTrigger>
              <TooltipContent>
                <p>Export image</p>
              </TooltipContent>
            </Tooltip>

            <Separator orientation="vertical" className="w-4 h-full bg-zinc-600 m-4" />

            <Tooltip>
              <TooltipTrigger asChild>
                <House size={42} className='transition-transform hover:text-zinc-200 hover:-translate-y-2 hover:cursor-pointer' />
              </TooltipTrigger>
              <TooltipContent>
                <p>Go to home</p>
              </TooltipContent>
            </Tooltip>
          </Dock>
        </Panel>
        <svg>
          <defs>
            <linearGradient id="edge-gradient">
              <stop offset="0%" stopColor="#ae53ba" />
              <stop offset="100%" stopColor="#2a8af6" />
            </linearGradient>

            <marker
              id="edge-circle"
              viewBox="-5 -5 10 10"
              refX="0"
              refY="0"
              markerUnits="strokeWidth"
              markerWidth="10"
              markerHeight="10"
              orient="auto"
            >
              <circle stroke="#2a8af6" strokeOpacity="0.75" r="2" cx="0" cy="0" />
            </marker>
          </defs>
        </svg>
      </ReactFlow>
    </div>
  );
};

export default Flow;
