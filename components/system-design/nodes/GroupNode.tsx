"use client";

import { memo, useCallback, useState } from "react";
import { NodeResizer, useReactFlow, type NodeProps } from "@xyflow/react";
import type { GroupNodeData } from "../types";

function GroupNodeComponent({ id, data, selected }: NodeProps) {
  const nodeData = data as GroupNodeData;
  const { updateNodeData } = useReactFlow();
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(nodeData.label);

  const commitLabel = useCallback(() => {
    const nextLabel = label.trim() || "Group";
    setIsEditing(false);
    setLabel(nextLabel);
    updateNodeData(id, { label: nextLabel });
  }, [id, label, updateNodeData]);

  return (
    <div
      className={`h-full w-full min-h-[80px] min-w-[120px] rounded-lg border-2 bg-bg-raised/40 ${
        selected ? "border-accent ring-2 ring-accent/15" : "border-border-strong"
      }`}
    >
      <NodeResizer
        isVisible={selected}
        minWidth={120}
        minHeight={80}
        lineClassName="!border-accent"
        handleClassName="!h-2 !w-2 !border-accent !bg-bg-raised"
      />

      <div className="absolute left-2 top-2 right-2 nodrag nopan">
        {isEditing ? (
          <input
            autoFocus
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            onBlur={commitLabel}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                commitLabel();
              }
            }}
            className="nodrag nopan w-full rounded border border-border bg-bg px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-text outline-none focus:border-accent"
          />
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)}
            className="nodrag nopan cursor-text font-mono text-[10px] uppercase tracking-wide text-text-faint"
            title="Double-click to rename group"
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

export const GroupNode = memo(GroupNodeComponent);
