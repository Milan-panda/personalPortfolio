import { getStroke } from "perfect-freehand";
import type { StrokePath } from "../types";

export function getSvgPathFromStroke(stroke: number[][]) {
  if (!stroke.length) {
    return "";
  }

  const d = stroke.reduce(
    (acc, [x, y], index, array) => {
      if (index === 0) {
        return `M ${x} ${y}`;
      }

      const [prevX, prevY] = array[index - 1];
      const midX = (prevX + x) / 2;
      const midY = (prevY + y) / 2;
      return `${acc} Q ${prevX} ${prevY} ${midX} ${midY}`;
    },
    "",
  );

  return d;
}

export function getStrokeSvgPath(stroke: StrokePath) {
  const outline = getStroke(stroke.points, {
    size: stroke.size,
    thinning: 0.6,
    smoothing: 0.5,
    streamline: 0.5,
  });

  return getSvgPathFromStroke(outline);
}

export function getStrokeHitPath(stroke: StrokePath) {
  const outline = getStroke(stroke.points, {
    size: Math.max(stroke.size * 4, 16),
    thinning: 0.6,
    smoothing: 0.5,
    streamline: 0.5,
  });

  return getSvgPathFromStroke(outline);
}

export function getPointsSvgPath(points: [number, number, number][]) {
  if (points.length < 2) {
    return "";
  }

  const outline = getStroke(points, {
    size: 2,
    thinning: 0.6,
    smoothing: 0.5,
    streamline: 0.5,
  });

  return getSvgPathFromStroke(outline);
}
