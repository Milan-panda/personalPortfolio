"use client";

import { memo, useCallback, useState } from "react";
import { useReactFlow, type NodeProps } from "@xyflow/react";
import { ServiceIcon } from "../icons";
import type { ServiceNodeData } from "../types";
import { FlowHandles } from "./FlowHandles";

function ServiceNodeComponent({ id, data, selected }: NodeProps) {
  const nodeData = data as ServiceNodeData;
  const { updateNodeData } = useReactFlow();
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(nodeData.label);

  const commitLabel = useCallback(() => {
    const nextLabel = label.trim() || nodeData.label;
    setIsEditing(false);
    setLabel(nextLabel);
    updateNodeData(id, { label: nextLabel });
  }, [id, label, nodeData.label, updateNodeData]);

  return (
    <div
      className={`min-w-[140px] rounded-lg border bg-bg-raised px-3 py-2.5 shadow-sm transition-colors ${
        selected
          ? "border-accent ring-2 ring-accent/20"
          : "border-border hover:border-border-strong"
      }`}
    >
      <FlowHandles />

      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-bg text-accent">
          <ServiceIcon serviceId={nodeData.serviceId} className="h-5 w-5" />
        </div>
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
            className="nodrag nopan w-full rounded border border-border bg-bg px-1.5 py-0.5 font-mono text-xs text-text outline-none focus:border-accent"
          />
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)}
            className="nodrag nopan cursor-text text-left font-mono text-xs text-text"
            title="Double-click to rename"
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

export const ServiceNode = memo(ServiceNodeComponent);
