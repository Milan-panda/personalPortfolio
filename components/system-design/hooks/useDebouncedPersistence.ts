"use client";

import { useCallback, useEffect, useRef } from "react";
import type { DiagramSnapshot } from "../types";
import { saveDiagramToStorage } from "./useDiagramPersistence";

export function useDebouncedPersistence(
  snapshot: DiagramSnapshot,
  enabled: boolean,
  delay = 500,
) {
  const isFirstRender = useRef(true);

  const persist = useCallback((data: DiagramSnapshot) => {
    saveDiagramToStorage(JSON.stringify(data));
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timeout = window.setTimeout(() => {
      persist(snapshot);
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [snapshot, enabled, delay, persist]);
}
