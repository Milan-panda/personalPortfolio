"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ServiceIcon } from "./icons";
import {
  getCommandItemKey,
  scoreCommandItem,
  type CommandItem,
} from "./utils/keyboardShortcuts";

type CommandPaletteProps = {
  open: boolean;
  commands: CommandItem[];
  onClose: () => void;
  onSelect: (item: CommandItem) => void;
};

export function CommandPalette({
  open,
  commands,
  onClose,
  onSelect,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const ranked = commands
      .map((command) => ({ command, score: scoreCommandItem(command, query) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }

        if (a.command.kind !== b.command.kind) {
          return a.command.kind === "action" ? -1 : 1;
        }

        return a.command.label.localeCompare(b.command.label);
      });

    return ranked.map((entry) => entry.command);
  }, [commands, query]);

  useEffect(() => {
    if (!open) {
      return;
    }

    setQuery("");
    setActiveIndex(0);
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, Math.max(filtered.length - 1, 0)));
  }, [filtered.length]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((current) => (current + 1) % Math.max(filtered.length, 1));
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((current) =>
          current === 0 ? Math.max(filtered.length - 1, 0) : current - 1,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filtered.length, onClose, open]);

  if (!open) {
    return null;
  }

  const sections = filtered.reduce<Record<string, CommandItem[]>>((acc, command) => {
    acc[command.section] = acc[command.section] ?? [];
    acc[command.section].push(command);
    return acc;
  }, {});

  let runningIndex = -1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-bg/70 px-4 pt-[12vh] backdrop-blur-[2px]"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-lg overflow-hidden rounded-lg border border-border bg-bg-raised shadow-lg"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="border-b border-border px-3 py-2.5">
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                filtered[activeIndex] &&
                !(filtered[activeIndex].kind === "action" && filtered[activeIndex].disabled)
              ) {
                event.preventDefault();
                onSelect(filtered[activeIndex]);
                onClose();
              }
            }}
            placeholder="Search commands and components..."
            className="w-full bg-transparent font-mono text-sm text-text outline-none placeholder:text-text-faint"
          />
        </div>

        <div className="max-h-[50vh] overflow-y-auto py-1">
          {filtered.length === 0 ? (
            <p className="px-3 py-6 text-center font-mono text-xs text-text-muted">
              {query.trim() ? "No matching commands or components" : "Type to search components"}
            </p>
          ) : (
            Object.entries(sections).map(([section, sectionCommands]) => (
              <div key={section} className="px-1 py-1">
                <p className="px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-text-faint">
                  {section}
                </p>
                {sectionCommands.map((command) => {
                  runningIndex += 1;
                  const index = runningIndex;
                  const isActive = index === activeIndex;
                  const isDisabled = command.kind === "action" && command.disabled;

                  return (
                    <button
                      key={getCommandItemKey(command)}
                      type="button"
                      disabled={isDisabled}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => {
                        if (!isDisabled) {
                          onSelect(command);
                          onClose();
                        }
                      }}
                      className={`flex w-full items-center justify-between gap-3 rounded-md px-2 py-2 text-left font-mono text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                        isActive
                          ? "bg-accent/10 text-accent"
                          : "text-text hover:bg-bg"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        {command.kind === "component" ? (
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-bg text-accent">
                            <ServiceIcon serviceId={command.serviceId} className="h-3 w-3" />
                          </span>
                        ) : null}
                        <span className="truncate">
                          {command.kind === "component"
                            ? `Add ${command.label}`
                            : command.label}
                        </span>
                      </span>
                      {command.kind === "action" && command.shortcut ? (
                        <span className="shrink-0 text-[10px] text-text-faint">
                          {command.shortcut}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
