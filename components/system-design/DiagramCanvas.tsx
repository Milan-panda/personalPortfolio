"use client";

import { useCallback, useMemo } from "react";
import {
  Background,
  BackgroundVariant,
  ConnectionMode,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlow,
  type Edge,
  type Node,
  type OnEdgesChange,
  type OnMove,
  type OnNodesChange,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { DRAG_TYPE } from "./ComponentPalette";
import { GroupNode } from "./nodes/GroupNode";
import { BoxNode } from "./nodes/BoxNode";
import { ServiceNode } from "./nodes/ServiceNode";
import { TextNode } from "./nodes/TextNode";
import { LabeledEdge } from "./edges/LabeledEdge";
import { StrokePaths } from "./StrokePaths";
import { useConnectionRules } from "./hooks/useConnectionRules";
import type { EditorTool, FlowEdgeData, ServiceId, StrokePath } from "./types";

const nodeTypes = {
  service: ServiceNode,
  text: TextNode,
  box: BoxNode,
  group: GroupNode,
};

const edgeTypes = {
  labeled: LabeledEdge,
};

type DiagramCanvasProps = {
  nodes: Node[];
  edges: Edge[];
  strokes: StrokePath[];
  selectedStrokeIds: string[];
  activeTool: EditorTool;
  isExporting: boolean;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: import("@xyflow/react").OnConnect;
  onViewportChange: OnMove;
  onAddServiceNode: (serviceId: ServiceId, label: string, position: { x: number; y: number }) => void;
  onAddTextNode: (position: { x: number; y: number }) => void;
  onAddBoxNode: (position: { x: number; y: number }) => void;
  onPaneClick: () => void;
  onEdgeDoubleClick: (edgeId: string) => void;
  onSelectGroup: (groupId: string) => void;
  onStrokeSelect: (strokeId: string) => void;
  getGroupParentId: (node: Node, nodes: Node[]) => string | null;
  defaultViewport: { x: number; y: number; zoom: number };
};

export function DiagramCanvas({
  nodes,
  edges,
  strokes,
  selectedStrokeIds,
  activeTool,
  isExporting,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onViewportChange,
  onAddServiceNode,
  onAddTextNode,
  onAddBoxNode,
  onPaneClick,
  onEdgeDoubleClick,
  onSelectGroup,
  onStrokeSelect,
  getGroupParentId,
  defaultViewport,
}: DiagramCanvasProps) {
  const { screenToFlowPosition } = useReactFlow();
  const { isValidConnection } = useConnectionRules();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const raw = event.dataTransfer.getData(DRAG_TYPE);
      if (!raw) {
        return;
      }

      const { serviceId, label } = JSON.parse(raw) as {
        serviceId: ServiceId;
        label: string;
      };
      const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      onAddServiceNode(serviceId, label, position);
    },
    [onAddServiceNode, screenToFlowPosition],
  );

  const handlePaneClick = useCallback(
    (event: React.MouseEvent) => {
      if (activeTool === "text") {
        const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
        onAddTextNode(position);
        return;
      }

      if (activeTool === "box") {
        const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
        onAddBoxNode(position);
        return;
      }

      onPaneClick();
    },
    [activeTool, onAddBoxNode, onAddTextNode, onPaneClick, screenToFlowPosition],
  );

  const handleEdgeDoubleClick = useCallback(
    (_event: React.MouseEvent, edge: Edge) => {
      onEdgeDoubleClick(edge.id);
    },
    [onEdgeDoubleClick],
  );

  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      if (activeTool !== "select") {
        return;
      }

      const groupId = getGroupParentId(node, nodes);
      if (groupId && node.type !== "group") {
        onSelectGroup(groupId);
      }
    },
    [activeTool, getGroupParentId, nodes, onSelectGroup],
  );

  const interactionProps = useMemo(() => {
    const isSelect = activeTool === "select";

    return {
      nodesDraggable: isSelect,
      nodesConnectable: isSelect,
      elementsSelectable: isSelect,
      panOnDrag: activeTool === "pan" || activeTool === "pen" ? true : [1, 2],
      selectionOnDrag: isSelect,
      zoomOnScroll: true,
      panOnScroll: false,
      selectNodesOnDrag: false,
    };
  }, [activeTool]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onMove={onViewportChange}
      isValidConnection={isValidConnection}
      connectionMode={ConnectionMode.Strict}
      defaultEdgeOptions={{
        type: "labeled",
        animated: true,
        data: { label: "" },
        style: { stroke: "var(--accent)", strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "var(--accent)" },
      }}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onPaneClick={handlePaneClick}
      onNodeClick={handleNodeClick}
      onEdgeDoubleClick={handleEdgeDoubleClick}
      defaultViewport={defaultViewport}
      proOptions={{ hideAttribution: true }}
      className="h-full w-full bg-bg"
      {...interactionProps}
    >
      <Background
        variant={BackgroundVariant.Dots}
        gap={20}
        size={1}
        color="var(--border-strong)"
      />
      <StrokePaths
        strokes={strokes}
        selectedStrokeIds={selectedStrokeIds}
        activeTool={activeTool}
        onStrokeSelect={onStrokeSelect}
      />
      {!isExporting ? (
        <>
          <MiniMap
            nodeColor="var(--accent)"
            maskColor="color-mix(in srgb, var(--bg) 75%, transparent)"
            className="!border !border-border !bg-bg-raised"
          />
          <Controls
            showInteractive={false}
            className="!border !border-border !bg-bg-raised !shadow-none [&>button]:!border-border [&>button]:!bg-bg-raised [&>button]:hover:!bg-bg"
          />
        </>
      ) : null}
    </ReactFlow>
  );
}
