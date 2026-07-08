import { paletteCategories, serviceComponents, subcategoryLabels } from "../data";
import type { EditorTool } from "../types";

export type EditorActionId =
  | "open-command-palette"
  | "tool-select"
  | "tool-pan"
  | "tool-pen"
  | "tool-text"
  | "tool-box"
  | "undo"
  | "redo"
  | "group"
  | "ungroup"
  | "fit-view"
  | "zoom-in"
  | "zoom-out"
  | "import"
  | "save"
  | "export-png"
  | "clear";

export type ActionCommand = {
  kind: "action";
  id: EditorActionId;
  label: string;
  section: string;
  keywords?: string;
  shortcut?: string;
  disabled?: boolean;
};

export type ComponentCommand = {
  kind: "component";
  serviceId: string;
  label: string;
  section: string;
  keywords?: string;
};

export type CommandItem = ActionCommand | ComponentCommand;

const IS_MAC =
  typeof navigator !== "undefined" && /Mac|iPhone|iPod|iPad/i.test(navigator.platform);

export function modKeyLabel() {
  return IS_MAC ? "⌘" : "Ctrl";
}

export function formatShortcut(parts: string[]) {
  if (IS_MAC) {
    return parts
      .map((part) =>
        part === "mod"
          ? "⌘"
          : part === "shift"
            ? "⇧"
            : part === "alt"
              ? "⌥"
              : part.length === 1
                ? part.toUpperCase()
                : part,
      )
      .join("");
  }

  return parts
    .map((part) =>
      part === "mod"
        ? "Ctrl"
        : part === "shift"
          ? "Shift"
          : part === "alt"
            ? "Alt"
            : part.length === 1
              ? part.toUpperCase()
              : part,
    )
    .join("+");
}

export const TOOL_SHORTCUTS: Record<EditorTool, string | undefined> = {
  select: "V",
  pan: "H",
  pen: "P",
  text: "T",
  box: "B",
};

const categoryLabelById = Object.fromEntries(
  paletteCategories.map((category) => [category.id, category.label]),
) as Record<string, string>;

export function buildEditorCommands(options: {
  canGroup: boolean;
  canUngroup: boolean;
  canUndo: boolean;
  canRedo: boolean;
}): ActionCommand[] {
  const mod = modKeyLabel();

  return [
    {
      kind: "action",
      id: "open-command-palette",
      label: "Command palette",
      section: "General",
      keywords: "search commands menu",
      shortcut: `${mod}K`,
    },
    {
      kind: "action",
      id: "undo",
      label: "Undo",
      section: "Edit",
      keywords: "revert back",
      shortcut: `${mod}Z`,
      disabled: !options.canUndo,
    },
    {
      kind: "action",
      id: "redo",
      label: "Redo",
      section: "Edit",
      keywords: "repeat forward",
      shortcut: `${mod}⇧Z`,
      disabled: !options.canRedo,
    },
    {
      kind: "action",
      id: "tool-select",
      label: "Select tool",
      section: "Tools",
      keywords: "move pointer",
      shortcut: "V",
    },
    {
      kind: "action",
      id: "tool-pan",
      label: "Pan tool",
      section: "Tools",
      keywords: "hand drag move canvas",
      shortcut: "H",
    },
    {
      kind: "action",
      id: "tool-pen",
      label: "Pen tool",
      section: "Tools",
      keywords: "draw annotate freehand",
      shortcut: "P",
    },
    {
      kind: "action",
      id: "tool-text",
      label: "Text tool",
      section: "Tools",
      keywords: "label annotation",
      shortcut: "T",
    },
    {
      kind: "action",
      id: "tool-box",
      label: "Box tool",
      section: "Tools",
      keywords: "rectangle note boundary",
      shortcut: "B",
    },
    {
      kind: "action",
      id: "group",
      label: "Group selection",
      section: "Edit",
      keywords: "combine nodes",
      shortcut: `${mod}G`,
      disabled: !options.canGroup,
    },
    {
      kind: "action",
      id: "ungroup",
      label: "Ungroup selection",
      section: "Edit",
      keywords: "separate nodes",
      shortcut: `${mod}⇧G`,
      disabled: !options.canUngroup,
    },
    {
      kind: "action",
      id: "fit-view",
      label: "Fit to view",
      section: "View",
      keywords: "zoom reset frame",
      shortcut: `${mod}0`,
    },
    {
      kind: "action",
      id: "zoom-in",
      label: "Zoom in",
      section: "View",
      keywords: "magnify closer",
      shortcut: `${mod}+`,
    },
    {
      kind: "action",
      id: "zoom-out",
      label: "Zoom out",
      section: "View",
      keywords: "shrink farther",
      shortcut: `${mod}-`,
    },
    {
      kind: "action",
      id: "import",
      label: "Import diagram",
      section: "File",
      keywords: "open load msd file",
      shortcut: `${mod}O`,
    },
    {
      kind: "action",
      id: "save",
      label: "Save diagram",
      section: "File",
      keywords: "download export msd file",
      shortcut: `${mod}S`,
    },
    {
      kind: "action",
      id: "export-png",
      label: "Export PNG",
      section: "File",
      keywords: "image screenshot picture",
      shortcut: `${mod}⇧E`,
    },
    {
      kind: "action",
      id: "clear",
      label: "Clear canvas",
      section: "File",
      keywords: "delete reset empty",
      shortcut: "",
    },
  ];
}

export function buildComponentCommands(): ComponentCommand[] {
  return serviceComponents.map((component) => {
    const categoryLabel = categoryLabelById[component.category] ?? "Components";
    const subcategoryLabel = component.subcategory
      ? subcategoryLabels[component.subcategory] ?? component.subcategory
      : "";

    return {
      kind: "component",
      serviceId: component.id,
      label: component.label,
      section: `Components · ${categoryLabel}`,
      keywords: [
        component.id,
        categoryLabel,
        subcategoryLabel,
        component.subcategory ?? "",
        "add insert component",
      ]
        .filter(Boolean)
        .join(" "),
    };
  });
}

export function buildCommandItems(options: {
  canGroup: boolean;
  canUngroup: boolean;
  canUndo: boolean;
  canRedo: boolean;
}): CommandItem[] {
  return [...buildEditorCommands(options), ...buildComponentCommands()];
}

type ShortcutBinding = {
  id: EditorActionId;
  match: (event: KeyboardEvent) => boolean;
};

function hasMod(event: KeyboardEvent) {
  return event.metaKey || event.ctrlKey;
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.isContentEditable
  );
}

export function getShortcutBindings(): ShortcutBinding[] {
  return [
    {
      id: "open-command-palette",
      match: (event) =>
        hasMod(event) && !event.shiftKey && event.key.toLowerCase() === "k",
    },
    {
      id: "undo",
      match: (event) =>
        hasMod(event) && !event.shiftKey && event.key.toLowerCase() === "z",
    },
    {
      id: "redo",
      match: (event) =>
        hasMod(event) &&
        (event.shiftKey
          ? event.key.toLowerCase() === "z"
          : event.key.toLowerCase() === "y"),
    },
    {
      id: "save",
      match: (event) =>
        hasMod(event) && !event.shiftKey && event.key.toLowerCase() === "s",
    },
    {
      id: "import",
      match: (event) =>
        hasMod(event) && !event.shiftKey && event.key.toLowerCase() === "o",
    },
    {
      id: "export-png",
      match: (event) =>
        hasMod(event) && event.shiftKey && event.key.toLowerCase() === "e",
    },
    {
      id: "group",
      match: (event) =>
        hasMod(event) && !event.shiftKey && event.key.toLowerCase() === "g",
    },
    {
      id: "ungroup",
      match: (event) =>
        hasMod(event) && event.shiftKey && event.key.toLowerCase() === "g",
    },
    {
      id: "fit-view",
      match: (event) => hasMod(event) && event.key === "0",
    },
    {
      id: "zoom-in",
      match: (event) =>
        hasMod(event) && (event.key === "=" || event.key === "+"),
    },
    {
      id: "zoom-out",
      match: (event) => hasMod(event) && event.key === "-",
    },
    {
      id: "tool-select",
      match: (event) =>
        !hasMod(event) &&
        !event.altKey &&
        !event.shiftKey &&
        event.key.toLowerCase() === "v",
    },
    {
      id: "tool-pan",
      match: (event) =>
        !hasMod(event) &&
        !event.altKey &&
        !event.shiftKey &&
        event.key.toLowerCase() === "h",
    },
    {
      id: "tool-pen",
      match: (event) =>
        !hasMod(event) &&
        !event.altKey &&
        !event.shiftKey &&
        event.key.toLowerCase() === "p",
    },
    {
      id: "tool-text",
      match: (event) =>
        !hasMod(event) &&
        !event.altKey &&
        !event.shiftKey &&
        event.key.toLowerCase() === "t",
    },
    {
      id: "tool-box",
      match: (event) =>
        !hasMod(event) &&
        !event.altKey &&
        !event.shiftKey &&
        event.key.toLowerCase() === "b",
    },
  ];
}

export function resolveShortcutAction(
  event: KeyboardEvent,
  options: { paletteOpen: boolean },
): EditorActionId | "escape" | "delete-strokes" | null {
  if (options.paletteOpen) {
    return null;
  }

  if (isTypingTarget(event.target)) {
    return null;
  }

  for (const binding of getShortcutBindings()) {
    if (binding.match(event)) {
      return binding.id;
    }
  }

  if (event.key === "Escape") {
    return "escape";
  }

  if (
    (event.key === "Delete" || event.key === "Backspace") &&
    !hasMod(event)
  ) {
    return "delete-strokes";
  }

  return null;
}

export function toolFromAction(action: EditorActionId): EditorTool | null {
  switch (action) {
    case "tool-select":
      return "select";
    case "tool-pan":
      return "pan";
    case "tool-pen":
      return "pen";
    case "tool-text":
      return "text";
    case "tool-box":
      return "box";
    default:
      return null;
  }
}

export function scoreCommandItem(item: CommandItem, query: string) {
  if (item.kind === "component" && !query.trim()) {
    return 0;
  }

  if (!query.trim()) {
    return 1;
  }

  const haystack = `${item.label} ${item.section} ${item.keywords ?? ""}`.toLowerCase();
  const needle = query.toLowerCase().trim();

  if (haystack.includes(needle)) {
    return item.label.toLowerCase().startsWith(needle) ? 3 : 2;
  }

  return 0;
}

export function getCommandItemKey(item: CommandItem) {
  return item.kind === "action" ? item.id : `component:${item.serviceId}`;
}
