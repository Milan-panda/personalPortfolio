import type { DiagramSnapshot } from "../types";

const MAX_HISTORY = 50;

export function cloneHistorySnapshot(snapshot: DiagramSnapshot): DiagramSnapshot {
  return JSON.parse(JSON.stringify(snapshot)) as DiagramSnapshot;
}

export type DiagramHistoryState = {
  past: DiagramSnapshot[];
  future: DiagramSnapshot[];
};

export function createInitialHistory(): DiagramHistoryState {
  return { past: [], future: [] };
}

export function pushHistoryEntry(
  history: DiagramHistoryState,
  snapshot: DiagramSnapshot,
): DiagramHistoryState {
  return {
    past: [...history.past.slice(-(MAX_HISTORY - 1)), cloneHistorySnapshot(snapshot)],
    future: [],
  };
}

export function undoHistory(
  history: DiagramHistoryState,
  current: DiagramSnapshot,
): { history: DiagramHistoryState; snapshot: DiagramSnapshot | null } {
  if (history.past.length === 0) {
    return { history, snapshot: null };
  }

  const previous = history.past[history.past.length - 1];
  return {
    history: {
      past: history.past.slice(0, -1),
      future: [cloneHistorySnapshot(current), ...history.future],
    },
    snapshot: cloneHistorySnapshot(previous),
  };
}

export function redoHistory(
  history: DiagramHistoryState,
  current: DiagramSnapshot,
): { history: DiagramHistoryState; snapshot: DiagramSnapshot | null } {
  if (history.future.length === 0) {
    return { history, snapshot: null };
  }

  const [next, ...rest] = history.future;
  return {
    history: {
      past: [...history.past, cloneHistorySnapshot(current)],
      future: rest,
    },
    snapshot: cloneHistorySnapshot(next),
  };
}

export function shouldPushHistoryForNodeChanges(
  changes: Array<{ type: string; dragging?: boolean }>,
  isDragging: boolean,
): { push: boolean; nextDragging: boolean } {
  let nextDragging = isDragging;

  for (const change of changes) {
    if (change.type === "position") {
      if (change.dragging === true) {
        nextDragging = true;
      }
      if (change.dragging === false) {
        nextDragging = false;
      }
    }
  }

  const startedDrag =
    !isDragging &&
    changes.some((change) => change.type === "position" && change.dragging === true);

  const structural = changes.some(
    (change) =>
      change.type === "remove" ||
      change.type === "add" ||
      change.type === "dimensions" ||
      change.type === "replace",
  );

  return {
    push: startedDrag || structural,
    nextDragging,
  };
}

export function shouldPushHistoryForEdgeChanges(
  changes: Array<{ type: string }>,
): boolean {
  return changes.some((change) => change.type === "remove" || change.type === "add");
}
