"use client";

import { useCallback, useRef, useState } from "react";
import {
  addEdge,
  MarkerType,
  type Connection,
  type Edge,
  type Node,
  type OnConnect,
  type Viewport,
} from "@xyflow/react";
import type { DiagramSnapshot, EditorTool, FlowEdgeData, StrokePath } from "../types";
import {
  createInitialHistory,
  pushHistoryEntry,
  redoHistory,
  undoHistory,
  type DiagramHistoryState,
} from "./useDiagramHistory";
import { loadDiagramFromStorage } from "./useDiagramPersistence";

const defaultViewport: Viewport = { x: 0, y: 0, zoom: 1 };

function parseStoredDiagram(): DiagramSnapshot | null {
  const raw = loadDiagramFromStorage();
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as DiagramSnapshot;
    if (!parsed.nodes || !parsed.edges || !parsed.strokes) {
      return null;
    }

    return {
      nodes: parsed.nodes,
      edges: parsed.edges.map((edge) => ({
        ...edge,
        type: "labeled",
        data: { label: (edge.data as FlowEdgeData | undefined)?.label ?? "", isEditing: false },
      })),
      strokes: parsed.strokes,
      viewport: parsed.viewport ?? defaultViewport,
    };
  } catch {
    return null;
  }
}

function normalizeLoadedSnapshot(next: DiagramSnapshot): DiagramSnapshot {
  return {
    nodes: next.nodes.map((node) => ({ ...node, selected: false, dragging: false })),
    edges: next.edges.map((edge) => ({
      ...edge,
      type: "labeled",
      selected: false,
      data: {
        label: (edge.data as FlowEdgeData | undefined)?.label ?? "",
        isEditing: false,
      },
    })),
    strokes: next.strokes,
    viewport: next.viewport ?? defaultViewport,
  };
}

export function useDiagramState() {
  const stored = parseStoredDiagram();

  const [nodes, setNodes] = useState<Node[]>(stored?.nodes ?? []);
  const [edges, setEdges] = useState<Edge[]>(stored?.edges ?? []);
  const [strokes, setStrokes] = useState<StrokePath[]>(stored?.strokes ?? []);
  const [viewport, setViewport] = useState<Viewport>(stored?.viewport ?? defaultViewport);
  const [activeTool, setActiveTool] = useState<EditorTool>("select");
  const [selectedStrokeIds, setSelectedStrokeIds] = useState<string[]>([]);
  const [history, setHistory] = useState<DiagramHistoryState>(createInitialHistory);

  const applyingHistoryRef = useRef(false);

  const buildSnapshot = useCallback(
    (): DiagramSnapshot => ({
      nodes: nodes.map((node) => ({ ...node, selected: false, dragging: false })),
      edges: edges.map((edge) => ({
        ...edge,
        selected: false,
        data: { ...(edge.data as FlowEdgeData), isEditing: false },
      })),
      strokes,
      viewport,
    }),
    [edges, nodes, strokes, viewport],
  );

  const applySnapshot = useCallback((next: DiagramSnapshot) => {
    const normalized = normalizeLoadedSnapshot(next);
    setNodes(normalized.nodes);
    setEdges(normalized.edges);
    setStrokes(normalized.strokes);
    setViewport(normalized.viewport);
    setSelectedStrokeIds([]);
    setActiveTool("select");
  }, []);

  const pushHistory = useCallback(() => {
    if (applyingHistoryRef.current) {
      return;
    }

    setHistory((current) => pushHistoryEntry(current, buildSnapshot()));
  }, [buildSnapshot]);

  const undo = useCallback(() => {
    setHistory((currentHistory) => {
      const result = undoHistory(currentHistory, buildSnapshot());
      if (!result.snapshot) {
        return currentHistory;
      }

      applyingHistoryRef.current = true;
      applySnapshot(result.snapshot);
      window.setTimeout(() => {
        applyingHistoryRef.current = false;
      }, 0);
      return result.history;
    });
  }, [applySnapshot, buildSnapshot]);

  const redo = useCallback(() => {
    setHistory((currentHistory) => {
      const result = redoHistory(currentHistory, buildSnapshot());
      if (!result.snapshot) {
        return currentHistory;
      }

      applyingHistoryRef.current = true;
      applySnapshot(result.snapshot);
      window.setTimeout(() => {
        applyingHistoryRef.current = false;
      }, 0);
      return result.history;
    });
  }, [applySnapshot, buildSnapshot]);

  const resetHistory = useCallback(() => {
    setHistory(createInitialHistory());
  }, []);

  const onConnect: OnConnect = useCallback((connection: Connection) => {
    if (connection.sourceHandle && connection.sourceHandle !== "output") {
      return;
    }

    if (connection.targetHandle && connection.targetHandle !== "input") {
      return;
    }

    setEdges((current) =>
      addEdge(
        {
          ...connection,
          type: "labeled",
          sourceHandle: connection.sourceHandle ?? "output",
          targetHandle: connection.targetHandle ?? "input",
          data: { label: "" },
          animated: true,
          style: { stroke: "var(--accent)", strokeWidth: 2 },
          markerEnd: { type: MarkerType.ArrowClosed, color: "var(--accent)" },
        },
        current,
      ),
    );
  }, []);

  const addStroke = useCallback((stroke: StrokePath) => {
    setStrokes((current) => [...current, stroke]);
  }, []);

  const removeSelectedStrokes = useCallback(() => {
    if (selectedStrokeIds.length === 0) {
      return;
    }

    setStrokes((current) =>
      current.filter((stroke) => !selectedStrokeIds.includes(stroke.id)),
    );
    setSelectedStrokeIds([]);
  }, [selectedStrokeIds]);

  const clearDiagram = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setStrokes([]);
    setSelectedStrokeIds([]);
    setViewport(defaultViewport);
  }, []);

  const loadSnapshot = useCallback(
    (next: DiagramSnapshot) => {
      applySnapshot(next);
      resetHistory();
    },
    [applySnapshot, resetHistory],
  );

  const snapshot: DiagramSnapshot = buildSnapshot();

  return {
    nodes,
    setNodes,
    edges,
    setEdges,
    strokes,
    setStrokes,
    viewport,
    setViewport,
    activeTool,
    setActiveTool,
    selectedStrokeIds,
    setSelectedStrokeIds,
    onConnect,
    addStroke,
    removeSelectedStrokes,
    clearDiagram,
    loadSnapshot,
    pushHistory,
    undo,
    redo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    resetHistory,
    snapshot,
  };
}
