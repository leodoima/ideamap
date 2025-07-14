import { memo, useEffect, useState, type ReactNode } from 'react';

import { Handle, NodeResizeControl, Position, useReactFlow, type Node, type NodeProps } from '@xyflow/react';
import { Expand } from 'lucide-react';

export type TurboNodeData = {
  title: string;
  icon?: ReactNode;
  subtitle?: string;
};

const controlStyle = {
  background: 'transparent',
  border: 'none',
};

export default memo(({ id, selected, data }: NodeProps<Node<TurboNodeData>>) => {
  const [title, setTitle] = useState(data.title);
  const { setNodes } = useReactFlow<Node<TurboNodeData>>();

  if (selected) {
    console.log(data.title);
  }

  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? {
            ...node,
            data: {
              ...node.data,
              title,
            },
          }
          : node
      )
    );
  }, [title]);

  return (
    <>
      <div className="wrapper gradient">
        <div className="inner">
          <div className="body justify-center">
            <input
              className="title bg-transparent text-white outline-none text-center w-auto truncate"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add text"
              type="text"
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="none"
            />
          </div>
          <Handle type="target" position={Position.Top} />

          <Handle
            type="source"
            position={Position.Bottom}
            className=' w-3 h-3'
          />

          {selected && (
            <>
              <NodeResizeControl style={controlStyle} minWidth={209} minHeight={50}>
                <Expand className='text-white' />
              </NodeResizeControl>
            </>
          )}
        </div>
      </div>
    </>
  );
});
