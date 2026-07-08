"use client";

import { useCallback, useRef, useState } from "react";
import {
  applyEdgeChanges,
  applyNodeChanges,
  ReactFlowProvider,
  useReactFlow,
  type Edge,
  type Node,
  type Viewport,
} from "@xyflow/react";
import { AnnotationLayer } from "./AnnotationLayer";
import { CommandPalette } from "./CommandPalette";
import { ComponentPalette } from "./ComponentPalette";
import { DiagramCanvas } from "./DiagramCanvas";
import { EditorToolbar } from "./EditorToolbar";
import { useDebouncedPersistence } from "./hooks/useDebouncedPersistence";
import { useEditorShortcuts } from "./hooks/useEditorShortcuts";
import {
  shouldPushHistoryForEdgeChanges,
  shouldPushHistoryForNodeChanges,
} from "./hooks/useDiagramHistory";
import { clearDiagramStorage } from "./hooks/useDiagramPersistence";
import { useDiagramState } from "./hooks/useDiagramState";
import type { FlowEdgeData, ServiceId } from "./types";
import {
  buildDiagramFile,
  downloadDiagramFile,
  readDiagramFile,
} from "./utils/diagramFile";
import { exportDiagramAsPng } from "./utils/exportDiagram";
import {
  applyGroupDragChanges,
  canGroupNodes,
  canUngroupNodes,
  getGroupParentId,
  groupSelectedNodes,
  selectGroupNodes,
  ungroupSelectedNodes,
} from "./utils/nodeGrouping";

function SystemDesignEditorInner() {
  const exportRef = useRef<HTMLDivElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);
  const isDraggingRef = useRef(false);
  const [isExporting, setIsExporting] = useState(false);
  const { fitView, zoomIn, zoomOut, screenToFlowPosition, getNodes, getNodesBounds } =
    useReactFlow();

  const {
    nodes,
    setNodes,
    edges,
    setEdges,
    strokes,
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
    canUndo,
    canRedo,
    resetHistory,
    snapshot,
  } = useDiagramState();

  useDebouncedPersistence(snapshot, true);

  const onNodesChange = useCallback(
    (changes: Parameters<typeof applyNodeChanges>[0]) => {
      const { push, nextDragging } = shouldPushHistoryForNodeChanges(
        changes,
        isDraggingRef.current,
      );
      isDraggingRef.current = nextDragging;

      if (push) {
        pushHistory();
      }

      setNodes((current) => {
        const withChanges = applyNodeChanges(changes, current);
        return applyGroupDragChanges(withChanges, changes, current);
      });
    },
    [pushHistory, setNodes],
  );

  const onSelectGroup = useCallback(
    (groupId: string) => {
      setNodes((current) => selectGroupNodes(current, groupId));
    },
    [setNodes],
  );

  const onEdgesChange = useCallback(
    (changes: Parameters<typeof applyEdgeChanges>[0]) => {
      if (shouldPushHistoryForEdgeChanges(changes)) {
        pushHistory();
      }

      setEdges((current) => applyEdgeChanges(changes, current));
    },
    [pushHistory, setEdges],
  );

  const onViewportChange = useCallback(
    (_event: unknown, nextViewport: Viewport) => {
      setViewport(nextViewport);
    },
    [setViewport],
  );

  const createServiceNode = useCallback(
    (serviceId: ServiceId, label: string, position: { x: number; y: number }) => {
      pushHistory();
      const newNode: Node = {
        id: crypto.randomUUID(),
        type: "service",
        position,
        data: { serviceId, label },
      };
      setNodes((current) => [...current, newNode]);
    },
    [pushHistory, setNodes],
  );

  const onAddComponent = useCallback(
    (serviceId: ServiceId, label: string) => {
      const bounds = exportRef.current?.getBoundingClientRect();
      const center = screenToFlowPosition({
        x: bounds ? bounds.left + bounds.width / 2 : window.innerWidth / 2,
        y: bounds ? bounds.top + bounds.height / 2 : window.innerHeight / 2,
      });
      const offset = nodes.length * 24;
      createServiceNode(serviceId, label, {
        x: center.x + offset,
        y: center.y + offset,
      });
    },
    [createServiceNode, nodes.length, screenToFlowPosition],
  );

  const onAddTextNode = useCallback(
    (position: { x: number; y: number }) => {
      pushHistory();
      const newNode: Node = {
        id: crypto.randomUUID(),
        type: "text",
        position,
        data: { label: "Text" },
      };
      setNodes((current) => [...current, newNode]);
      setActiveTool("select");
    },
    [pushHistory, setActiveTool, setNodes],
  );

  const onAddBoxNode = useCallback(
    (position: { x: number; y: number }) => {
      pushHistory();
      const newNode: Node = {
        id: crypto.randomUUID(),
        type: "box",
        position,
        data: { label: "" },
        style: { width: 160, height: 100 },
      };
      setNodes((current) => [...current, newNode]);
      setActiveTool("select");
    },
    [pushHistory, setActiveTool, setNodes],
  );

  const handleConnect = useCallback(
    (connection: Parameters<typeof onConnect>[0]) => {
      pushHistory();
      onConnect(connection);
    },
    [onConnect, pushHistory],
  );

  const clearEdgeEditing = useCallback(() => {
    setEdges((current) =>
      current.map((edge) => ({
        ...edge,
        data: { ...(edge.data as FlowEdgeData), isEditing: false },
      })),
    );
  }, [setEdges]);

  const onEdgeDoubleClick = useCallback(
    (edgeId: string) => {
      setEdges((current) =>
        current.map((edge) => ({
          ...edge,
          data: {
            ...(edge.data as FlowEdgeData),
            isEditing: edge.id === edgeId,
          },
        })),
      );
    },
    [setEdges],
  );

  const onPaneClick = useCallback(() => {
    setSelectedStrokeIds([]);
    clearEdgeEditing();
  }, [clearEdgeEditing, setSelectedStrokeIds]);

  const onStrokeSelect = useCallback(
    (strokeId: string) => {
      setSelectedStrokeIds([strokeId]);
      setNodes((current) => current.map((node) => ({ ...node, selected: false })));
      setEdges((current: Edge[]) =>
        current.map((edge) => ({ ...edge, selected: false })),
      );
    },
    [setEdges, setNodes, setSelectedStrokeIds],
  );

  const handleExport = useCallback(async () => {
    if (!exportRef.current) {
      return;
    }

    setIsExporting(true);
    setNodes((current) => current.map((node) => ({ ...node, selected: false })));
    setEdges((current) =>
      current.map((edge) => ({
        ...edge,
        selected: false,
        data: { ...(edge.data as FlowEdgeData), isEditing: false },
      })),
    );
    setSelectedStrokeIds([]);

    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });

    const viewportElement = exportRef.current.querySelector(
      ".react-flow__viewport",
    ) as HTMLElement | null;

    if (!viewportElement) {
      setIsExporting(false);
      return;
    }

    try {
      const dataUrl = await exportDiagramAsPng({
        container: exportRef.current,
        viewportElement,
        nodes: getNodes(),
        strokes,
        getNodesBounds,
        screenToFlowPosition,
      });

      if (!dataUrl) {
        window.alert("Add some content to the canvas before exporting.");
        return;
      }

      const link = document.createElement("a");
      link.download = "system-design-diagram.png";
      link.href = dataUrl;
      link.click();
    } finally {
      setIsExporting(false);
    }
  }, [getNodes, getNodesBounds, screenToFlowPosition, setEdges, setNodes, setSelectedStrokeIds, strokes]);

  const handleExportDiagram = useCallback(async () => {
    if (nodes.length === 0 && strokes.length === 0) {
      window.alert("Add some content to the canvas before saving.");
      return;
    }

    const file = await buildDiagramFile(snapshot);
    downloadDiagramFile(file);
  }, [nodes.length, snapshot, strokes.length]);

  const handleImportDiagram = useCallback(() => {
    importInputRef.current?.click();
  }, []);

  const handleImportFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = "";

      if (!file) {
        return;
      }

      const result = await readDiagramFile(file);
      if (!result.ok) {
        window.alert(result.error);
        return;
      }

      const hasContent =
        nodes.length > 0 || edges.length > 0 || strokes.length > 0;
      if (
        hasContent &&
        !window.confirm("Importing will replace the current diagram. Continue?")
      ) {
        return;
      }

      loadSnapshot(result.snapshot);
      window.requestAnimationFrame(() => fitView({ padding: 0.2 }));
    },
    [edges.length, fitView, loadSnapshot, nodes.length, strokes.length],
  );

  const handleClear = useCallback(() => {
    if (!window.confirm("Clear the entire canvas? This cannot be undone.")) {
      return;
    }

    clearDiagram();
    clearDiagramStorage();
    resetHistory();
    window.requestAnimationFrame(() => fitView());
  }, [clearDiagram, fitView, resetHistory]);

  const handleGroup = useCallback(() => {
    pushHistory();
    setNodes((current) => groupSelectedNodes(current));
  }, [pushHistory, setNodes]);

  const handleUngroup = useCallback(() => {
    pushHistory();
    setNodes((current) => ungroupSelectedNodes(current));
  }, [pushHistory, setNodes]);

  const handleAddStroke = useCallback(
    (stroke: Parameters<typeof addStroke>[0]) => {
      pushHistory();
      addStroke(stroke);
      setActiveTool("select");
    },
    [addStroke, pushHistory, setActiveTool],
  );

  const handleDeleteStrokes = useCallback(() => {
    pushHistory();
    removeSelectedStrokes();
  }, [pushHistory, removeSelectedStrokes]);

  const canGroup = canGroupNodes(nodes);
  const canUngroup = canUngroupNodes(nodes);

  const handleEscape = useCallback(() => {
    setActiveTool("select");
    setSelectedStrokeIds([]);
    clearEdgeEditing();
  }, [clearEdgeEditing, setActiveTool, setSelectedStrokeIds]);

  const { paletteOpen, setPaletteOpen, commands, runCommand } = useEditorShortcuts({
    canGroup,
    canUngroup,
    canUndo,
    canRedo,
    selectedStrokeIds,
    onToolChange: setActiveTool,
    onUndo: undo,
    onRedo: redo,
    onGroup: handleGroup,
    onUngroup: handleUngroup,
    onFitView: () => fitView({ padding: 0.2 }),
    onZoomIn: () => zoomIn(),
    onZoomOut: () => zoomOut(),
    onImport: handleImportDiagram,
    onSave: handleExportDiagram,
    onExportPng: handleExport,
    onClear: handleClear,
    onDeleteStrokes: handleDeleteStrokes,
    onEscape: handleEscape,
    onAddComponent,
  });

  return (
    <div className="flex h-dvh w-full flex-col">
      <input
        ref={importInputRef}
        type="file"
        accept=".msd,application/json"
        className="hidden"
        onChange={handleImportFileChange}
      />
      <CommandPalette
        open={paletteOpen}
        commands={commands}
        onClose={() => setPaletteOpen(false)}
        onSelect={runCommand}
      />
      <EditorToolbar
        activeTool={activeTool}
        onToolChange={setActiveTool}
        onOpenCommandPalette={() => setPaletteOpen(true)}
        onFitView={() => fitView({ padding: 0.2 })}
        onZoomIn={() => zoomIn()}
        onZoomOut={() => zoomOut()}
        onExportPng={handleExport}
        onExportDiagram={handleExportDiagram}
        onImportDiagram={handleImportDiagram}
        onClear={handleClear}
        onGroup={handleGroup}
        onUngroup={handleUngroup}
        canGroup={canGroup}
        canUngroup={canUngroup}
      />

      <div className="flex min-h-0 flex-1">
        <ComponentPalette onAddComponent={onAddComponent} />

        <div ref={exportRef} className="relative min-h-0 flex-1 h-full">
          <DiagramCanvas
            nodes={nodes}
            edges={edges}
            strokes={strokes}
            selectedStrokeIds={selectedStrokeIds}
            activeTool={activeTool}
            isExporting={isExporting}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={handleConnect}
            onViewportChange={onViewportChange}
            onAddServiceNode={createServiceNode}
            onAddTextNode={onAddTextNode}
            onAddBoxNode={onAddBoxNode}
            onPaneClick={onPaneClick}
            onEdgeDoubleClick={onEdgeDoubleClick}
            onSelectGroup={onSelectGroup}
            onStrokeSelect={onStrokeSelect}
            getGroupParentId={getGroupParentId}
            defaultViewport={viewport}
          />
          <AnnotationLayer
            activeTool={activeTool}
            viewport={viewport}
            onStrokeComplete={handleAddStroke}
            screenToFlowPosition={screenToFlowPosition}
          />
        </div>
      </div>
    </div>
  );
}

export default function SystemDesignEditor() {
  return (
    <ReactFlowProvider>
      <SystemDesignEditorInner />
    </ReactFlowProvider>
  );
}
