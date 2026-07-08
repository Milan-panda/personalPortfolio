"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { EditorTool } from "../types";
import {
  buildCommandItems,
  resolveShortcutAction,
  toolFromAction,
  type CommandItem,
  type EditorActionId,
} from "../utils/keyboardShortcuts";

type UseEditorShortcutsOptions = {
  canGroup: boolean;
  canUngroup: boolean;
  canUndo: boolean;
  canRedo: boolean;
  selectedStrokeIds: string[];
  onToolChange: (tool: EditorTool) => void;
  onUndo: () => void;
  onRedo: () => void;
  onGroup: () => void;
  onUngroup: () => void;
  onFitView: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onImport: () => void;
  onSave: () => void;
  onExportPng: () => void;
  onClear: () => void;
  onDeleteStrokes: () => void;
  onEscape: () => void;
  onAddComponent: (serviceId: string, label: string) => void;
};

export function useEditorShortcuts({
  canGroup,
  canUngroup,
  canUndo,
  canRedo,
  selectedStrokeIds,
  onToolChange,
  onUndo,
  onRedo,
  onGroup,
  onUngroup,
  onFitView,
  onZoomIn,
  onZoomOut,
  onImport,
  onSave,
  onExportPng,
  onClear,
  onDeleteStrokes,
  onEscape,
  onAddComponent,
}: UseEditorShortcutsOptions) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  const commands = useMemo(
    () =>
      buildCommandItems({
        canGroup,
        canUngroup,
        canUndo,
        canRedo,
      }),
    [canGroup, canRedo, canUndo, canUngroup],
  );

  const runAction = useCallback(
    (action: EditorActionId) => {
      const tool = toolFromAction(action);
      if (tool) {
        onToolChange(tool);
        return;
      }

      switch (action) {
        case "open-command-palette":
          setPaletteOpen(true);
          break;
        case "undo":
          if (canUndo) {
            onUndo();
          }
          break;
        case "redo":
          if (canRedo) {
            onRedo();
          }
          break;
        case "group":
          if (canGroup) {
            onGroup();
          }
          break;
        case "ungroup":
          if (canUngroup) {
            onUngroup();
          }
          break;
        case "fit-view":
          onFitView();
          break;
        case "zoom-in":
          onZoomIn();
          break;
        case "zoom-out":
          onZoomOut();
          break;
        case "import":
          onImport();
          break;
        case "save":
          onSave();
          break;
        case "export-png":
          onExportPng();
          break;
        case "clear":
          onClear();
          break;
      }
    },
    [
      canGroup,
      canRedo,
      canUndo,
      canUngroup,
      onClear,
      onExportPng,
      onFitView,
      onGroup,
      onImport,
      onRedo,
      onSave,
      onToolChange,
      onUndo,
      onUngroup,
      onZoomIn,
      onZoomOut,
    ],
  );

  const runCommand = useCallback(
    (item: CommandItem) => {
      if (item.kind === "component") {
        onAddComponent(item.serviceId, item.label);
        return;
      }

      runAction(item.id);
    },
    [onAddComponent, runAction],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const action = resolveShortcutAction(event, { paletteOpen });

      if (!action) {
        return;
      }

      if (action === "escape") {
        if (paletteOpen) {
          event.preventDefault();
          setPaletteOpen(false);
          return;
        }
        event.preventDefault();
        onEscape();
        return;
      }

      if (action === "delete-strokes") {
        if (selectedStrokeIds.length > 0) {
          event.preventDefault();
          onDeleteStrokes();
        }
        return;
      }

      event.preventDefault();
      runAction(action);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onDeleteStrokes, onEscape, paletteOpen, runAction, selectedStrokeIds.length]);

  return {
    paletteOpen,
    setPaletteOpen,
    commands,
    runCommand,
  };
}
