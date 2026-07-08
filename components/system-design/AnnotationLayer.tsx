"use client";

import { useCallback, useRef, useState } from "react";
import type { EditorTool, StrokePath } from "./types";
import { getPointsSvgPath } from "./utils/strokeRendering";

type AnnotationLayerProps = {
  activeTool: EditorTool;
  viewport: { x: number; y: number; zoom: number };
  onStrokeComplete: (stroke: StrokePath) => void;
  screenToFlowPosition: (position: { x: number; y: number }) => { x: number; y: number };
};

export function AnnotationLayer({
  activeTool,
  viewport,
  onStrokeComplete,
  screenToFlowPosition,
}: AnnotationLayerProps) {
  const [currentPoints, setCurrentPoints] = useState<[number, number, number][]>([]);
  const isDrawing = useRef(false);

  const finishStroke = useCallback(() => {
    if (currentPoints.length < 2) {
      setCurrentPoints([]);
      isDrawing.current = false;
      return;
    }

    onStrokeComplete({
      id: crypto.randomUUID(),
      points: currentPoints,
      color: "var(--text)",
      size: 2,
    });
    setCurrentPoints([]);
    isDrawing.current = false;
  }, [currentPoints, onStrokeComplete]);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<SVGSVGElement>) => {
      if (activeTool !== "pen") {
        return;
      }

      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      isDrawing.current = true;

      const flowPos = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      setCurrentPoints([[flowPos.x, flowPos.y, event.pressure || 0.5]]);
    },
    [activeTool, screenToFlowPosition],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<SVGSVGElement>) => {
      if (!isDrawing.current || activeTool !== "pen") {
        return;
      }

      const flowPos = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      setCurrentPoints((current) => [
        ...current,
        [flowPos.x, flowPos.y, event.pressure || 0.5],
      ]);
    },
    [activeTool, screenToFlowPosition],
  );

  const handlePointerUp = useCallback(() => {
    if (isDrawing.current) {
      finishStroke();
    }
  }, [finishStroke]);

  const currentPath = getPointsSvgPath(currentPoints);
  const capturePointerEvents = activeTool === "pen";

  if (!capturePointerEvents && !currentPath) {
    return null;
  }

  return (
    <svg
      className="absolute inset-0 z-10 h-full w-full"
      style={{ pointerEvents: capturePointerEvents ? "auto" : "none" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <g
        transform={`translate(${viewport.x}, ${viewport.y}) scale(${viewport.zoom})`}
      >
        {currentPath ? <path d={currentPath} fill="var(--text)" opacity={0.85} /> : null}
      </g>
    </svg>
  );
}
