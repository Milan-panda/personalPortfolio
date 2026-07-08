"use client";

import { ViewportPortal } from "@xyflow/react";
import type { EditorTool, StrokePath } from "./types";
import { getStrokeHitPath, getStrokeSvgPath } from "./utils/strokeRendering";

type StrokePathsProps = {
  strokes: StrokePath[];
  selectedStrokeIds: string[];
  activeTool: EditorTool;
  onStrokeSelect: (strokeId: string) => void;
};

export function StrokePaths({
  strokes,
  selectedStrokeIds,
  activeTool,
  onStrokeSelect,
}: StrokePathsProps) {
  if (strokes.length === 0) {
    return null;
  }

  return (
    <ViewportPortal>
      <svg
        className="pointer-events-none absolute inset-0 overflow-visible"
        style={{ width: "100%", height: "100%" }}
      >
        {strokes.map((stroke) => {
          const isSelected = selectedStrokeIds.includes(stroke.id);
          const path = getStrokeSvgPath(stroke);
          const hitPath = getStrokeHitPath(stroke);
          const isSelectable = activeTool === "select";

          return (
            <g key={stroke.id}>
              {isSelectable ? (
                <path
                  d={hitPath}
                  fill="transparent"
                  className="cursor-pointer"
                  style={{ pointerEvents: "fill" }}
                  onPointerDown={(event) => {
                    event.stopPropagation();
                    onStrokeSelect(stroke.id);
                  }}
                />
              ) : null}
              <path
                d={path}
                fill={isSelected ? "var(--accent)" : stroke.color}
                opacity={isSelected ? 0.9 : 0.85}
                style={{ pointerEvents: "none" }}
              />
            </g>
          );
        })}
      </svg>
    </ViewportPortal>
  );
}
