"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { NodeResizer, useReactFlow, type NodeProps } from "@xyflow/react";
import type { BoxNodeData } from "../types";
import { FlowHandles } from "./FlowHandles";

const MIN_WIDTH = 100;
const MIN_HEIGHT = 60;
const MAX_WIDTH = 420;
const PADDING_X = 20;
const PADDING_Y = 20;
const CHAR_WIDTH = 7.2;
const LINE_HEIGHT = 18;

function measureBoxSize(text: string, boxWidth?: number): { width: number; height: number } {
  const lines = text.length > 0 ? text.split("\n") : [""];
  const wrapWidth = boxWidth ?? MAX_WIDTH - PADDING_X;
  const wrappedLines: string[] = [];

  for (const line of lines) {
    if (line.length === 0) {
      wrappedLines.push("");
      continue;
    }
    const charsPerLine = Math.max(1, Math.floor(wrapWidth / CHAR_WIDTH));
    for (let index = 0; index < line.length; index += charsPerLine) {
      wrappedLines.push(line.slice(index, index + charsPerLine));
    }
  }

  const longestLine = wrappedLines.reduce((max, line) => Math.max(max, line.length), 0);
  const width = Math.min(
    MAX_WIDTH,
    Math.max(MIN_WIDTH, Math.ceil(longestLine * CHAR_WIDTH) + PADDING_X),
  );
  const height = Math.max(MIN_HEIGHT, wrappedLines.length * LINE_HEIGHT + PADDING_Y);

  return { width, height };
}

function BoxNodeComponent({ id, data, selected }: NodeProps) {
  const nodeData = data as BoxNodeData;
  const { setNodes, getNode } = useReactFlow();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(nodeData.label);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const updateNodeSize = useCallback(
    (text: string, nextLabel?: string) => {
      const node = getNode(id);
      const currentWidth = Number(node?.style?.width) || undefined;
      const { width, height } = measureBoxSize(text, currentWidth);

      setNodes((nodes) =>
        nodes.map((entry) =>
          entry.id === id
            ? {
                ...entry,
                ...(nextLabel !== undefined
                  ? { data: { ...(entry.data as BoxNodeData), label: nextLabel } }
                  : {}),
                style: {
                  ...entry.style,
                  width,
                  height,
                },
              }
            : entry,
        ),
      );
    },
    [getNode, id, setNodes],
  );

  const commitLabel = useCallback(() => {
    setIsEditing(false);
    updateNodeSize(draft, draft);
  }, [draft, updateNodeSize]);

  const startEditing = useCallback(() => {
    setDraft(nodeData.label);
    setIsEditing(true);
  }, [nodeData.label]);

  useEffect(() => {
    if (!isEditing) {
      return;
    }

    updateNodeSize(draft);

    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    textarea.style.height = "0px";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [draft, isEditing, updateNodeSize]);

  return (
    <div
      className={`flex h-full w-full min-h-[60px] min-w-[100px] flex-col overflow-hidden rounded-md border-2 border-dashed bg-accent/5 p-2 ${
        selected ? "border-accent" : "border-border-strong"
      }`}
    >
      <NodeResizer
        isVisible={selected}
        minWidth={MIN_WIDTH}
        minHeight={MIN_HEIGHT}
        lineClassName="!border-accent"
        handleClassName="!h-2 !w-2 !border-accent !bg-bg-raised"
      />
      <FlowHandles />

      {isEditing ? (
        <textarea
          ref={textareaRef}
          autoFocus
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commitLabel}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setIsEditing(false);
              setDraft(nodeData.label);
            }
          }}
          placeholder="Add a note..."
          rows={1}
          className="nodrag nopan w-full min-h-[24px] flex-1 resize-none overflow-hidden bg-transparent font-mono text-xs leading-[18px] text-text outline-none placeholder:text-text-faint"
          style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        />
      ) : (
        <div
          onDoubleClick={startEditing}
          className="nodrag nopan min-h-[24px] w-full flex-1 cursor-text overflow-hidden"
          title="Double-click to edit"
        >
          {nodeData.label ? (
            <p className="m-0 w-full whitespace-pre-wrap break-words font-mono text-xs leading-[18px] text-text-muted">
              {nodeData.label}
            </p>
          ) : (
            <span className="font-mono text-xs text-text-faint">Double-click to add text</span>
          )}
        </div>
      )}
    </div>
  );
}

export const BoxNode = memo(BoxNodeComponent);
