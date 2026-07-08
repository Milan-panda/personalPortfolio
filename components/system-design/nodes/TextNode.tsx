"use client";

import { memo, useCallback, useState } from "react";
import { NodeResizer, useReactFlow, type NodeProps } from "@xyflow/react";
import type { TextNodeData } from "../types";
import { FlowHandles } from "./FlowHandles";

function TextNodeComponent({ id, data, selected }: NodeProps) {
  const nodeData = data as TextNodeData;
  const { updateNodeData } = useReactFlow();
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(nodeData.label);

  const commitLabel = useCallback(() => {
    const nextLabel = label.trim() || "Text";
    setIsEditing(false);
    setLabel(nextLabel);
    updateNodeData(id, { label: nextLabel });
  }, [id, label, updateNodeData]);

  return (
    <div
      className={`min-w-[80px] rounded-md border border-dashed bg-bg-raised/90 px-2 py-1.5 ${
        selected ? "border-accent" : "border-border-strong"
      }`}
    >
      <NodeResizer
        isVisible={selected}
        minWidth={80}
        minHeight={32}
        lineClassName="!border-accent"
        handleClassName="!h-2 !w-2 !border-accent !bg-bg-raised"
      />
      <FlowHandles />

      {isEditing ? (
        <textarea
          autoFocus
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          onBlur={commitLabel}
          className="nodrag nopan w-full resize-none bg-transparent font-mono text-xs text-text outline-none"
          rows={2}
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          className="nodrag nopan cursor-text whitespace-pre-wrap text-left font-mono text-xs text-text-muted"
        >
          {label}
        </span>
      )}
    </div>
  );
}

export const TextNode = memo(TextNodeComponent);
