import { memo, useEffect, useState, type ReactNode } from 'react';

import { Handle, Position, useReactFlow, type Node, type NodeProps } from '@xyflow/react';

export type TurboNodeData = {
  title: string;
  icon?: ReactNode;
  subtitle?: string;
};

export default memo(({ id, data }: NodeProps<Node<TurboNodeData>>) => {
  const [title, setTitle] = useState(data.title);
  const { setNodes } = useReactFlow<Node<TurboNodeData>>();

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
          <div className="body">
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
          <Handle type="source" position={Position.Bottom} />
        </div>
      </div>
    </>
  );
});
