import type { Node } from "@xyflow/react";

export function createCustomNode(label: string = ''): Node {
    return {
        id: crypto.randomUUID(),
        type: 'custom',
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        data: {
            label,
            width: 200,
            height: 120,
            bgColor: '#fef08a',
            borderColor: '#facc15',
            borderRadius: '1rem',
        },
    };
}