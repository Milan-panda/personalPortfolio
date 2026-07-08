"use client";

import { useCallback } from "react";
import type { Connection, Edge, IsValidConnection } from "@xyflow/react";

function isValidFlowConnection(connection: Connection | Edge) {
  if (!connection.source || !connection.target) {
    return false;
  }

  if (connection.source === connection.target) {
    return false;
  }

  if (connection.sourceHandle && connection.sourceHandle !== "output") {
    return false;
  }

  if (connection.targetHandle && connection.targetHandle !== "input") {
    return false;
  }

  return true;
}

export function useConnectionRules() {
  const isValidConnection: IsValidConnection = useCallback(
    (connection) => isValidFlowConnection(connection),
    [],
  );

  return { isValidConnection };
}
