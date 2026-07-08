import type { Node } from "@xyflow/react";

const GROUP_PADDING = 28;

const DEFAULT_SIZES: Record<string, { width: number; height: number }> = {
  service: { width: 140, height: 48 },
  text: { width: 120, height: 40 },
  box: { width: 160, height: 100 },
  group: { width: 200, height: 120 },
};

function getNodeSize(node: Node): { width: number; height: number } {
  const defaults = DEFAULT_SIZES[node.type ?? "service"] ?? DEFAULT_SIZES.service;
  const width = node.measured?.width ?? Number(node.style?.width) ?? defaults.width;
  const height = node.measured?.height ?? Number(node.style?.height) ?? defaults.height;
  return { width, height };
}

function getAbsolutePosition(node: Node, nodes: Node[]): { x: number; y: number } {
  if (!node.parentId) {
    return node.position;
  }

  const parent = nodes.find((entry) => entry.id === node.parentId);
  if (!parent) {
    return node.position;
  }

  const parentAbs = getAbsolutePosition(parent, nodes);
  return {
    x: parentAbs.x + node.position.x,
    y: parentAbs.y + node.position.y,
  };
}

export function isGroupChild(node: Node, nodes: Node[]): boolean {
  if (!node.parentId) {
    return false;
  }
  const parent = nodes.find((entry) => entry.id === node.parentId);
  return parent?.type === "group";
}

export function getGroupParentId(node: Node, nodes: Node[]): string | null {
  if (node.type === "group") {
    return node.id;
  }
  if (!node.parentId) {
    return null;
  }
  const parent = nodes.find((entry) => entry.id === node.parentId);
  return parent?.type === "group" ? parent.id : null;
}

export function selectGroupNodes(nodes: Node[], groupId: string): Node[] {
  return nodes.map((node) => ({
    ...node,
    selected: node.id === groupId,
  }));
}

export function canGroupNodes(nodes: Node[]): boolean {
  const selected = nodes.filter((node) => node.selected && !node.parentId && node.type !== "group");
  return selected.length >= 2;
}

export function canUngroupNodes(nodes: Node[]): boolean {
  const selected = nodes.filter((node) => node.selected);
  if (selected.length === 0) {
    return false;
  }

  return selected.some((node) => getGroupParentId(node, nodes) !== null);
}

export function groupSelectedNodes(nodes: Node[]): Node[] {
  const selected = nodes.filter((node) => node.selected && !node.parentId && node.type !== "group");
  if (selected.length < 2) {
    return nodes;
  }

  const selectedIds = new Set(selected.map((node) => node.id));
  const bounds = selected.map((node) => {
    const abs = getAbsolutePosition(node, nodes);
    const size = getNodeSize(node);
    return {
      minX: abs.x,
      minY: abs.y,
      maxX: abs.x + size.width,
      maxY: abs.y + size.height,
    };
  });

  const minX = Math.min(...bounds.map((b) => b.minX)) - GROUP_PADDING;
  const minY = Math.min(...bounds.map((b) => b.minY)) - GROUP_PADDING;
  const maxX = Math.max(...bounds.map((b) => b.maxX)) + GROUP_PADDING;
  const maxY = Math.max(...bounds.map((b) => b.maxY)) + GROUP_PADDING;

  const groupId = crypto.randomUUID();
  const groupNode: Node = {
    id: groupId,
    type: "group",
    position: { x: minX, y: minY },
    style: { width: maxX - minX, height: maxY - minY },
    data: { label: "Group" },
    draggable: true,
    selectable: true,
    selected: true,
  };

  const updated = nodes.map((node) => {
    if (!selectedIds.has(node.id)) {
      return { ...node, selected: false };
    }

    const abs = getAbsolutePosition(node, nodes);
    return {
      ...node,
      parentId: groupId,
      extent: "parent" as const,
      expandParent: true,
      draggable: true,
      selectable: true,
      selected: false,
      position: {
        x: abs.x - minX,
        y: abs.y - minY,
      },
    };
  });

  // Parent must come before children for React Flow sub-flows.
  return [groupNode, ...updated];
}

export function ungroupSelectedNodes(nodes: Node[]): Node[] {
  const selected = nodes.filter((node) => node.selected);
  const groupIds = new Set<string>();

  for (const node of selected) {
    const groupId = getGroupParentId(node, nodes);
    if (groupId) {
      groupIds.add(groupId);
    }
  }

  if (groupIds.size === 0) {
    return nodes;
  }

  const withoutGroups = nodes.filter((node) => !groupIds.has(node.id));

  return withoutGroups.map((node) => {
    if (!node.parentId || !groupIds.has(node.parentId)) {
      return node;
    }

    const parent = nodes.find((entry) => entry.id === node.parentId);
    if (!parent) {
      return node;
    }

    const parentAbs = getAbsolutePosition(parent, nodes);
    const { parentId, extent, expandParent, ...rest } = node;

    return {
      ...rest,
      draggable: true,
      selectable: true,
      position: {
        x: parentAbs.x + node.position.x,
        y: parentAbs.y + node.position.y,
      },
      selected: true,
    };
  });
}

/**
 * When a child inside a group is dragged, move the whole group instead.
 */
export function applyGroupDragChanges(
  nodes: Node[],
  changes: import("@xyflow/react").NodeChange[],
  beforeNodes: Node[],
): Node[] {
  let next = nodes;

  for (const change of changes) {
    if (change.type !== "position" || !change.position || change.dragging === false) {
      continue;
    }

    const draggedNode = beforeNodes.find((node) => node.id === change.id);
    if (!draggedNode?.parentId) {
      continue;
    }

    const parent = beforeNodes.find((node) => node.id === draggedNode.parentId);
    if (parent?.type !== "group") {
      continue;
    }

    const dx = change.position.x - draggedNode.position.x;
    const dy = change.position.y - draggedNode.position.y;
    if (dx === 0 && dy === 0) {
      continue;
    }

    next = next.map((node) => {
      if (node.id === parent.id) {
        return {
          ...node,
          position: {
            x: node.position.x + dx,
            y: node.position.y + dy,
          },
        };
      }
      if (node.id === draggedNode.id) {
        return {
          ...node,
          position: draggedNode.position,
        };
      }
      return node;
    });
  }

  return next;
}
