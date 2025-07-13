import { memo } from "react";
import colors from "tailwindcss/colors"

import { NodeResizer, type NodeProps } from "@xyflow/react";

const Square = memo(({ selected }: NodeProps) => {
    return (
        <div className="border bg-white rounded-md w-full h-full">
            <NodeResizer
                color={colors.indigo[600]}
                isVisible={selected}
                minWidth={100}
                minHeight={30}
            />
            <input className="bg-transparent focus:outline-hidden text-center p-2 w-full h-full font-medium text-xs text-zinc-700" />
        </div>
    );
});

export default Square;