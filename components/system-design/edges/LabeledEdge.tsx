"use client";

import { memo, useCallback, useEffect, useState } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  useReactFlow,
  type Edge,
  type EdgeProps,
} from "@xyflow/react";
import type { FlowEdgeData } from "../types";

function LabeledEdgeComponent({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
  markerEnd,
  style,
}: EdgeProps) {
  const edgeData = (data ?? {}) as FlowEdgeData;
  const { setEdges } = useReactFlow();
  const [label, setLabel] = useState(edgeData.label ?? "");
  const isEditing = Boolean(edgeData.isEditing);

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  useEffect(() => {
    setLabel(edgeData.label ?? "");
  }, [edgeData.label]);

  const stopEditing = useCallback(() => {
    setEdges((edges) =>
      edges.map((edge: Edge) =>
        edge.id === id
          ? { ...edge, data: { ...(edge.data as FlowEdgeData), isEditing: false } }
          : edge,
      ),
    );
  }, [id, setEdges]);

  const commitLabel = useCallback(() => {
    const nextLabel = label.trim();
    setLabel(nextLabel);
    setEdges((edges) =>
      edges.map((edge: Edge) =>
        edge.id === id
          ? {
              ...edge,
              data: { ...(edge.data as FlowEdgeData), label: nextLabel, isEditing: false },
            }
          : edge,
      ),
    );
  }, [id, label, setEdges]);

  const startEditing = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      setEdges((edges) =>
        edges.map((edge: Edge) => ({
          ...edge,
          data: {
            ...(edge.data as FlowEdgeData),
            isEditing: edge.id === id,
          },
        })),
      );
    },
    [id, setEdges],
  );

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
          onDoubleClick={startEditing}
        >
          {isEditing ? (
            <input
              autoFocus
              value={label}
              onChange={(event) => setLabel(event.target.value)}
              onBlur={commitLabel}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  commitLabel();
                }
                if (event.key === "Escape") {
                  setLabel(edgeData.label ?? "");
                  stopEditing();
                }
              }}
              placeholder="Label"
              className="min-w-[80px] rounded border border-accent bg-bg-raised px-2 py-0.5 font-mono text-[11px] text-text shadow-sm outline-none"
            />
          ) : label ? (
            <span
              className={`rounded border bg-bg-raised px-2 py-0.5 font-mono text-[11px] shadow-sm ${
                selected
                  ? "border-accent text-text"
                  : "border-border text-text-muted"
              }`}
            >
              {label}
            </span>
          ) : null}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export const LabeledEdge = memo(LabeledEdgeComponent);
