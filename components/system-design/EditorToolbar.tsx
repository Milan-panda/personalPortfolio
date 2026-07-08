"use client";

import type { EditorTool } from "./types";
import { modKeyLabel, TOOL_SHORTCUTS } from "./utils/keyboardShortcuts";

type EditorToolbarProps = {
  activeTool: EditorTool;
  onToolChange: (tool: EditorTool) => void;
  onOpenCommandPalette: () => void;
  onFitView: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onExportPng: () => void;
  onExportDiagram: () => void;
  onImportDiagram: () => void;
  onClear: () => void;
  onGroup: () => void;
  onUngroup: () => void;
  canGroup: boolean;
  canUngroup: boolean;
};

const tools: { id: EditorTool; label: string; title: string }[] = [
  { id: "select", label: "Select", title: "Select and move nodes (V)" },
  { id: "pan", label: "Pan", title: "Pan the canvas (H)" },
  { id: "pen", label: "Pen", title: "Draw freehand annotations (P). Switches to Select when done — press Delete to remove." },
  { id: "text", label: "Text", title: "Add text annotations (T)" },
  { id: "box", label: "Box", title: "Add box annotations (B)" },
];

export function EditorToolbar({
  activeTool,
  onToolChange,
  onOpenCommandPalette,
  onFitView,
  onZoomIn,
  onZoomOut,
  onExportPng,
  onExportDiagram,
  onImportDiagram,
  onClear,
  onGroup,
  onUngroup,
  canGroup,
  canUngroup,
}: EditorToolbarProps) {
  const mod = modKeyLabel();

  return (
    <header className="flex items-center justify-between gap-4 border-b border-border bg-bg-raised px-4 py-2.5">
      <div className="flex items-center gap-3">
        <a
          href="/"
          className="font-mono text-xs text-text-muted no-underline hover:text-accent"
        >
          ← home
        </a>
        <span className="font-mono text-sm text-text">Blueprint</span>
        <button
          type="button"
          onClick={onOpenCommandPalette}
          title={`Command palette (${mod}K)`}
          className="rounded-md border border-border px-2 py-1 font-mono text-[10px] text-text-muted hover:border-border-strong hover:text-text"
        >
          {mod}K
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {tools.map((tool) => (
          <button
            key={tool.id}
            type="button"
            aria-label={tool.title}
            title={tool.title}
            onClick={() => onToolChange(tool.id)}
            className={`rounded-md border px-2.5 py-1.5 font-mono text-xs transition-colors ${
              activeTool === tool.id
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-text-muted hover:border-border-strong hover:text-text"
            }`}
          >
            <span>{tool.label}</span>
            {TOOL_SHORTCUTS[tool.id] ? (
              <span className="ml-1 text-[10px] text-text-faint">{TOOL_SHORTCUTS[tool.id]}</span>
            ) : null}
          </button>
        ))}
        <span className="mx-1 h-5 w-px bg-border" aria-hidden />
        <button
          type="button"
          aria-label="Group selected components"
          title="Group selected (⌘G)"
          disabled={!canGroup}
          onClick={onGroup}
          className="rounded-md border px-2.5 py-1.5 font-mono text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-40 border-border text-text-muted hover:border-border-strong hover:text-text enabled:border-border"
        >
          Group
        </button>
        <button
          type="button"
          aria-label="Ungroup selected components"
          title="Ungroup (⌘⇧G)"
          disabled={!canUngroup}
          onClick={onUngroup}
          className="rounded-md border px-2.5 py-1.5 font-mono text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-40 border-border text-text-muted hover:border-border-strong hover:text-text enabled:border-border"
        >
          Ungroup
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          aria-label="Zoom out"
          title={`Zoom out (${mod}-)`}
          onClick={onZoomOut}
          className="rounded-md border border-border px-2.5 py-1.5 font-mono text-xs text-text-muted hover:border-border-strong hover:text-text"
        >
          −
        </button>
        <button
          type="button"
          aria-label="Fit view"
          title={`Fit view (${mod}0)`}
          onClick={onFitView}
          className="rounded-md border border-border px-2.5 py-1.5 font-mono text-xs text-text-muted hover:border-border-strong hover:text-text"
        >
          Fit
        </button>
        <button
          type="button"
          aria-label="Zoom in"
          title={`Zoom in (${mod}+)`}
          onClick={onZoomIn}
          className="rounded-md border border-border px-2.5 py-1.5 font-mono text-xs text-text-muted hover:border-border-strong hover:text-text"
        >
          +
        </button>
        <button
          type="button"
          aria-label="Import diagram file"
          title={`Import diagram (${mod}O)`}
          onClick={onImportDiagram}
          className="rounded-md border border-border px-2.5 py-1.5 font-mono text-xs text-text-muted hover:border-border-strong hover:text-text"
        >
          Import
        </button>
        <button
          type="button"
          aria-label="Save diagram file"
          title={`Save diagram (${mod}S)`}
          onClick={onExportDiagram}
          className="rounded-md border border-border px-2.5 py-1.5 font-mono text-xs text-text-muted hover:border-border-strong hover:text-text"
        >
          Save
        </button>
        <button
          type="button"
          aria-label="Export diagram as PNG"
          title={`Export PNG (${mod}⇧E)`}
          onClick={onExportPng}
          className="rounded-md border border-border px-2.5 py-1.5 font-mono text-xs text-text-muted hover:border-border-strong hover:text-text"
        >
          PNG
        </button>
        <button
          type="button"
          aria-label="Clear canvas"
          onClick={onClear}
          className="rounded-md border border-border px-2.5 py-1.5 font-mono text-xs text-text-muted hover:border-border-strong hover:text-text"
        >
          Clear
        </button>
      </div>
    </header>
  );
}
