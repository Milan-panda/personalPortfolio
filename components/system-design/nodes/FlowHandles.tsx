import { Handle, Position } from "@xyflow/react";

const handleClassName =
  "!h-2.5 !w-2.5 !border-2 !border-accent !bg-bg-raised transition-colors hover:!bg-accent/20";

export function FlowHandles() {
  return (
    <>
      <Handle
        type="target"
        id="input"
        position={Position.Left}
        isConnectableStart={false}
        isConnectableEnd
        className={handleClassName}
        title="Input — connections end here"
      />
      <Handle
        type="source"
        id="output"
        position={Position.Right}
        isConnectableStart
        isConnectableEnd={false}
        className={handleClassName}
        title="Output — drag from here to connect"
      />
    </>
  );
}
