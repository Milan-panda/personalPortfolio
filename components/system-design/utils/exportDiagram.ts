import { getViewportForBounds, type Node } from "@xyflow/react";
import { toPng } from "html-to-image";
import type { StrokePath } from "../types";

type Bounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type FlowPosition = { x: number; y: number };

const CONTENT_PADDING = 40;
const EDGE_MARGIN = 24;
const EXPORT_SCALE = 2;
const MAX_EXPORT_DIMENSION = 8192;

function getStrokeBounds(strokes: StrokePath[]): Bounds | null {
  if (strokes.length === 0) {
    return null;
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const stroke of strokes) {
    for (const [x, y] of stroke.points) {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }

  if (!Number.isFinite(minX)) {
    return null;
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

function mergeBounds(...bounds: Array<Bounds | null>): Bounds | null {
  const valid = bounds.filter((bound): bound is Bounds => bound !== null);

  if (valid.length === 0) {
    return null;
  }

  const x = Math.min(...valid.map((bound) => bound.x));
  const y = Math.min(...valid.map((bound) => bound.y));
  const x2 = Math.max(...valid.map((bound) => bound.x + bound.width));
  const y2 = Math.max(...valid.map((bound) => bound.y + bound.height));

  return {
    x,
    y,
    width: x2 - x,
    height: y2 - y,
  };
}

function normalizeBounds(bounds: Bounds): Bounds {
  return {
    ...bounds,
    width: Math.max(bounds.width, 1),
    height: Math.max(bounds.height, 1),
  };
}

function expandBounds(bounds: Bounds, margin: number): Bounds {
  return {
    x: bounds.x - margin,
    y: bounds.y - margin,
    width: bounds.width + margin * 2,
    height: bounds.height + margin * 2,
  };
}

function measureElementBounds(
  elements: NodeListOf<Element>,
  screenToFlowPosition: (position: FlowPosition) => FlowPosition,
): Bounds | null {
  if (elements.length === 0) {
    return null;
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  elements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const corners = [
      screenToFlowPosition({ x: rect.left, y: rect.top }),
      screenToFlowPosition({ x: rect.right, y: rect.top }),
      screenToFlowPosition({ x: rect.left, y: rect.bottom }),
      screenToFlowPosition({ x: rect.right, y: rect.bottom }),
    ];

    for (const corner of corners) {
      minX = Math.min(minX, corner.x);
      minY = Math.min(minY, corner.y);
      maxX = Math.max(maxX, corner.x);
      maxY = Math.max(maxY, corner.y);
    }
  });

  if (!Number.isFinite(minX)) {
    return null;
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

function measureDomBounds(
  container: HTMLElement,
  screenToFlowPosition: (position: FlowPosition) => FlowPosition,
): Bounds | null {
  const nodeBounds = measureElementBounds(
    container.querySelectorAll(".react-flow__node"),
    screenToFlowPosition,
  );
  const edgeLabelBounds = measureElementBounds(
    container.querySelectorAll(".react-flow__edgelabel-renderer > div"),
    screenToFlowPosition,
  );

  return mergeBounds(nodeBounds, edgeLabelBounds);
}

export function getDiagramBounds({
  nodes,
  strokes,
  container,
  getNodesBounds,
  screenToFlowPosition,
}: {
  nodes: Node[];
  strokes: StrokePath[];
  container: HTMLElement;
  getNodesBounds: (nodes: Node[]) => Bounds;
  screenToFlowPosition: (position: FlowPosition) => FlowPosition;
}): Bounds | null {
  const nodeBounds = nodes.length > 0 ? getNodesBounds(nodes) : null;
  const domBounds = measureDomBounds(container, screenToFlowPosition);
  const strokeBounds = getStrokeBounds(strokes);
  const merged = mergeBounds(nodeBounds, domBounds, strokeBounds);

  if (!merged) {
    return null;
  }

  return expandBounds(normalizeBounds(merged), EDGE_MARGIN);
}

function getExportBackgroundColor() {
  return (
    getComputedStyle(document.documentElement).getPropertyValue("--bg").trim() ||
    "#fafafa"
  );
}

function getExportDimensions(bounds: Bounds) {
  const paddedWidth = bounds.width + CONTENT_PADDING * 2;
  const paddedHeight = bounds.height + CONTENT_PADDING * 2;

  let imageWidth = Math.ceil(paddedWidth * EXPORT_SCALE);
  let imageHeight = Math.ceil(paddedHeight * EXPORT_SCALE);

  const largestSide = Math.max(imageWidth, imageHeight);
  if (largestSide > MAX_EXPORT_DIMENSION) {
    const scale = MAX_EXPORT_DIMENSION / largestSide;
    imageWidth = Math.ceil(imageWidth * scale);
    imageHeight = Math.ceil(imageHeight * scale);
  }

  return { imageWidth, imageHeight };
}

type ExportDiagramOptions = {
  container: HTMLElement;
  viewportElement: HTMLElement;
  nodes: Node[];
  strokes: StrokePath[];
  getNodesBounds: (nodes: Node[]) => Bounds;
  screenToFlowPosition: (position: FlowPosition) => FlowPosition;
};

export async function exportDiagramAsPng({
  container,
  viewportElement,
  nodes,
  strokes,
  getNodesBounds,
  screenToFlowPosition,
}: ExportDiagramOptions): Promise<string | null> {
  const bounds = getDiagramBounds({
    nodes,
    strokes,
    container,
    getNodesBounds,
    screenToFlowPosition,
  });

  if (!bounds) {
    return null;
  }

  const { imageWidth, imageHeight } = getExportDimensions(bounds);
  const exportViewport = getViewportForBounds(
    bounds,
    imageWidth,
    imageHeight,
    0.1,
    8,
    0,
  );

  const previousOverflow = viewportElement.style.overflow;
  viewportElement.style.overflow = "visible";

  try {
    return await toPng(viewportElement, {
      backgroundColor: getExportBackgroundColor(),
      width: imageWidth,
      height: imageHeight,
      pixelRatio: 1,
      cacheBust: true,
      style: {
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        transform: `translate(${exportViewport.x}px, ${exportViewport.y}px) scale(${exportViewport.zoom})`,
      },
    });
  } finally {
    viewportElement.style.overflow = previousOverflow;
  }
}
