import type { TurboNodeData } from "@/components/turboNode";
import type { Node } from "@xyflow/react";

export function createNewNode(): Node<TurboNodeData> {
    return {
        id: crypto.randomUUID(),
        type: 'turbo',
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        data: {
            title: ''
        }
    };
}