import type { Edge, Node, Viewport } from "@xyflow/react";
import { MarkerType } from "@xyflow/react";
import { serviceComponentMap } from "../data";
import type {
  BoxNodeData,
  DiagramSnapshot,
  FlowEdgeData,
  GroupNodeData,
  ServiceNodeData,
  StrokePath,
  TextNodeData,
} from "../types";

export const DIAGRAM_FORMAT = "milan-system-design" as const;
export const DIAGRAM_FORMAT_VERSION = 1;
export const DIAGRAM_FILE_EXTENSION = ".msd";

/** Site-only signing key — rejects files not produced by this exporter. */
const SIGNING_SECRET = "milan-personal-portfolio-system-design-v1";

const ALLOWED_NODE_TYPES = new Set(["service", "text", "box", "group"]);

export type DiagramFile = {
  format: typeof DIAGRAM_FORMAT;
  version: typeof DIAGRAM_FORMAT_VERSION;
  exportedAt: string;
  diagram: DiagramSnapshot;
  signature: string;
};

export type DiagramImportResult =
  | { ok: true; snapshot: DiagramSnapshot }
  | { ok: false; error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function canonicalize(value: unknown): string {
  return JSON.stringify(value, (_key, nested) => {
    if (nested && typeof nested === "object" && !Array.isArray(nested)) {
      return Object.fromEntries(
        Object.entries(nested as Record<string, unknown>).sort(([a], [b]) =>
          a.localeCompare(b),
        ),
      );
    }
    return nested;
  });
}

async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function getSigningPayload(file: Pick<DiagramFile, "format" | "version" | "diagram">) {
  return {
    format: file.format,
    version: file.version,
    diagram: file.diagram,
  };
}

export async function signDiagramPayload(
  file: Pick<DiagramFile, "format" | "version" | "diagram">,
): Promise<string> {
  return sha256Hex(`${SIGNING_SECRET}\n${canonicalize(getSigningPayload(file))}`);
}

function sanitizeViewport(value: unknown): Viewport {
  if (!isRecord(value)) {
    return { x: 0, y: 0, zoom: 1 };
  }

  return {
    x: isFiniteNumber(value.x) ? value.x : 0,
    y: isFiniteNumber(value.y) ? value.y : 0,
    zoom: isFiniteNumber(value.zoom) && value.zoom > 0 ? value.zoom : 1,
  };
}

function sanitizePosition(value: unknown): { x: number; y: number } | null {
  if (!isRecord(value) || !isFiniteNumber(value.x) || !isFiniteNumber(value.y)) {
    return null;
  }
  return { x: value.x, y: value.y };
}

function sanitizeServiceNode(data: unknown): ServiceNodeData | null {
  if (!isRecord(data) || typeof data.serviceId !== "string" || typeof data.label !== "string") {
    return null;
  }

  if (!serviceComponentMap[data.serviceId]) {
    return null;
  }

  return {
    serviceId: data.serviceId,
    label: data.label.slice(0, 120),
  };
}

function sanitizeLabelData(data: unknown): { label: string } | null {
  if (!isRecord(data) || typeof data.label !== "string") {
    return null;
  }
  return { label: data.label.slice(0, 2000) };
}

function sanitizeNodeStyle(value: unknown): Node["style"] | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const style: Node["style"] = {};
  if (isFiniteNumber(value.width) && value.width > 0) {
    style.width = value.width;
  }
  if (isFiniteNumber(value.height) && value.height > 0) {
    style.height = value.height;
  }

  return Object.keys(style).length > 0 ? style : undefined;
}

function sanitizeNode(value: unknown): Node | null {
  if (!isRecord(value) || typeof value.id !== "string" || typeof value.type !== "string") {
    return null;
  }

  if (!ALLOWED_NODE_TYPES.has(value.type)) {
    return null;
  }

  const position = sanitizePosition(value.position);
  if (!position) {
    return null;
  }

  let data: ServiceNodeData | TextNodeData | BoxNodeData | GroupNodeData | null = null;

  if (value.type === "service") {
    data = sanitizeServiceNode(value.data);
  } else if (value.type === "text" || value.type === "box" || value.type === "group") {
    data = sanitizeLabelData(value.data);
  }

  if (!data) {
    return null;
  }

  const node: Node = {
    id: value.id.slice(0, 80),
    type: value.type,
    position,
    data,
    selected: false,
    dragging: false,
  };

  const style = sanitizeNodeStyle(value.style);
  if (style) {
    node.style = style;
  }

  if (typeof value.parentId === "string") {
    node.parentId = value.parentId.slice(0, 80);
  }

  if (value.extent === "parent") {
    node.extent = "parent";
  }

  if (isFiniteNumber(value.width) && value.width > 0) {
    node.width = value.width;
  }

  if (isFiniteNumber(value.height) && value.height > 0) {
    node.height = value.height;
  }

  return node;
}

function sanitizeEdge(value: unknown, nodeIds: Set<string>): Edge | null {
  if (
    !isRecord(value) ||
    typeof value.id !== "string" ||
    typeof value.source !== "string" ||
    typeof value.target !== "string"
  ) {
    return null;
  }

  if (!nodeIds.has(value.source) || !nodeIds.has(value.target)) {
    return null;
  }

  const label =
    isRecord(value.data) && typeof value.data.label === "string"
      ? value.data.label.slice(0, 120)
      : "";

  return {
    id: value.id.slice(0, 80),
    source: value.source,
    target: value.target,
    type: "labeled",
    sourceHandle:
      typeof value.sourceHandle === "string" ? value.sourceHandle : "output",
    targetHandle:
      typeof value.targetHandle === "string" ? value.targetHandle : "input",
    animated: true,
    selected: false,
    data: { label, isEditing: false } satisfies FlowEdgeData,
    style: { stroke: "var(--accent)", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "var(--accent)" },
  };
}

function sanitizeStroke(value: unknown): StrokePath | null {
  if (
    !isRecord(value) ||
    typeof value.id !== "string" ||
    !Array.isArray(value.points) ||
    typeof value.color !== "string" ||
    !isFiniteNumber(value.size)
  ) {
    return null;
  }

  const points: StrokePath["points"] = [];
  for (const point of value.points) {
    if (
      !Array.isArray(point) ||
      point.length < 2 ||
      !isFiniteNumber(point[0]) ||
      !isFiniteNumber(point[1])
    ) {
      return null;
    }
    points.push([point[0], point[1], isFiniteNumber(point[2]) ? point[2] : 0.5]);
  }

  if (points.length < 2 || points.length > 10_000) {
    return null;
  }

  return {
    id: value.id.slice(0, 80),
    points,
    color: value.color.slice(0, 64),
    size: Math.min(Math.max(value.size, 0.5), 24),
  };
}

export function sanitizeDiagramSnapshot(value: unknown): DiagramSnapshot | null {
  if (
    !isRecord(value) ||
    !Array.isArray(value.nodes) ||
    !Array.isArray(value.edges) ||
    !Array.isArray(value.strokes)
  ) {
    return null;
  }

  const nodes = value.nodes
    .map(sanitizeNode)
    .filter((node): node is Node => node !== null);

  if (nodes.length !== value.nodes.length) {
    return null;
  }

  const nodeIds = new Set(nodes.map((node) => node.id));
  if (nodeIds.size !== nodes.length) {
    return null;
  }

  for (const node of nodes) {
    if (node.parentId && !nodeIds.has(node.parentId)) {
      return null;
    }
  }

  const edges = value.edges
    .map((edge) => sanitizeEdge(edge, nodeIds))
    .filter((edge): edge is Edge => edge !== null);

  if (edges.length !== value.edges.length) {
    return null;
  }

  const strokes = value.strokes
    .map(sanitizeStroke)
    .filter((stroke): stroke is StrokePath => stroke !== null);

  if (strokes.length !== value.strokes.length) {
    return null;
  }

  return {
    nodes,
    edges,
    strokes,
    viewport: sanitizeViewport(value.viewport),
  };
}

export function prepareSnapshotForExport(snapshot: DiagramSnapshot): DiagramSnapshot {
  return {
    nodes: snapshot.nodes.map((node) => {
      const next: Node = {
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data,
      };

      if (node.style) {
        next.style = node.style;
      }
      if (node.parentId) {
        next.parentId = node.parentId;
      }
      if (node.extent) {
        next.extent = node.extent;
      }
      if (typeof node.width === "number") {
        next.width = node.width;
      }
      if (typeof node.height === "number") {
        next.height = node.height;
      }

      return next;
    }),
    edges: snapshot.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: "labeled",
      sourceHandle: edge.sourceHandle ?? "output",
      targetHandle: edge.targetHandle ?? "input",
      data: {
        label: (edge.data as FlowEdgeData | undefined)?.label ?? "",
        isEditing: false,
      },
    })),
    strokes: snapshot.strokes,
    viewport: snapshot.viewport,
  };
}

export async function buildDiagramFile(snapshot: DiagramSnapshot): Promise<DiagramFile> {
  const diagram = prepareSnapshotForExport(snapshot);
  const unsigned = {
    format: DIAGRAM_FORMAT,
    version: DIAGRAM_FORMAT_VERSION,
    exportedAt: new Date().toISOString(),
    diagram,
  } as const;

  return {
    ...unsigned,
    signature: await signDiagramPayload(unsigned),
  };
}

export function downloadDiagramFile(file: DiagramFile, filename = "system-design-diagram.msd") {
  const blob = new Blob([JSON.stringify(file, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = filename.endsWith(DIAGRAM_FILE_EXTENSION)
    ? filename
    : `${filename}${DIAGRAM_FILE_EXTENSION}`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

export async function parseDiagramFile(raw: string): Promise<DiagramImportResult> {
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    return {
      ok: false,
      error: "Invalid file. Expected a JSON diagram exported from this site.",
    };
  }

  if (!isRecord(parsed)) {
    return { ok: false, error: "Invalid diagram file structure." };
  }

  if (parsed.format !== DIAGRAM_FORMAT) {
    return {
      ok: false,
      error: "This file was not created by this site’s system design tool.",
    };
  }

  if (parsed.version !== DIAGRAM_FORMAT_VERSION) {
    return {
      ok: false,
      error: `Unsupported diagram version (${String(parsed.version)}). Expected ${DIAGRAM_FORMAT_VERSION}.`,
    };
  }

  if (typeof parsed.signature !== "string" || !parsed.signature) {
    return {
      ok: false,
      error: "Missing site signature. Only diagrams exported here can be imported.",
    };
  }

  if (!isRecord(parsed.diagram)) {
    return { ok: false, error: "Diagram payload is missing." };
  }

  // Normalize then sign — must match how export builds the payload.
  const prepared = prepareSnapshotForExport({
    nodes: Array.isArray(parsed.diagram.nodes) ? (parsed.diagram.nodes as Node[]) : [],
    edges: Array.isArray(parsed.diagram.edges) ? (parsed.diagram.edges as Edge[]) : [],
    strokes: Array.isArray(parsed.diagram.strokes)
      ? (parsed.diagram.strokes as StrokePath[])
      : [],
    viewport: sanitizeViewport(parsed.diagram.viewport),
  });

  const expectedSignature = await signDiagramPayload({
    format: DIAGRAM_FORMAT,
    version: DIAGRAM_FORMAT_VERSION,
    diagram: prepared,
  });

  if (parsed.signature !== expectedSignature) {
    return {
      ok: false,
      error: "Signature check failed. This file may have been modified or was not exported here.",
    };
  }

  const snapshot = sanitizeDiagramSnapshot(prepared);
  if (!snapshot) {
    return {
      ok: false,
      error: "Diagram data is invalid or contains unsupported components.",
    };
  }

  return { ok: true, snapshot };
}

export async function readDiagramFile(file: File): Promise<DiagramImportResult> {
  const name = file.name.toLowerCase();
  if (!name.endsWith(".msd") && !name.endsWith(".json")) {
    return {
      ok: false,
      error: `Unsupported file type. Use a ${DIAGRAM_FILE_EXTENSION} file exported from this tool.`,
    };
  }

  const raw = await file.text();
  return parseDiagramFile(raw);
}
