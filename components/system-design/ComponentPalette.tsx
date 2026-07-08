"use client";

import { useMemo, useRef, useState } from "react";
import {
  paletteCategories,
  serviceComponents,
  subcategoryLabels,
} from "./data";
import { ServiceIcon } from "./icons";
import type { ComponentCategory, ServiceComponentDef, ServiceId } from "./types";

const DRAG_TYPE = "application/reactflow";

type ComponentPaletteProps = {
  onAddComponent: (serviceId: ServiceId, label: string) => void;
};

function PaletteItem({
  component,
  onAddComponent,
}: {
  component: ServiceComponentDef;
  onAddComponent: (serviceId: ServiceId, label: string) => void;
}) {
  const didDrag = useRef(false);

  return (
    <button
      type="button"
      draggable
      onDragStart={(event) => {
        didDrag.current = true;
        event.dataTransfer.setData(
          DRAG_TYPE,
          JSON.stringify({
            serviceId: component.id,
            label: component.label,
          }),
        );
        event.dataTransfer.effectAllowed = "move";
      }}
      onDragEnd={() => {
        window.setTimeout(() => {
          didDrag.current = false;
        }, 0);
      }}
      onClick={() => {
        if (didDrag.current) {
          return;
        }
        onAddComponent(component.id, component.label);
      }}
      className="flex w-full cursor-grab items-center gap-2.5 rounded-md border border-border bg-bg px-2.5 py-2 text-left transition-colors hover:border-border-strong hover:bg-bg-raised active:cursor-grabbing"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-bg-raised text-accent">
        <ServiceIcon serviceId={component.id} className="h-4 w-4" />
      </span>
      <span className="truncate font-mono text-xs text-text">{component.label}</span>
    </button>
  );
}

function groupBySubcategory(components: ServiceComponentDef[]) {
  const groups = new Map<string, ServiceComponentDef[]>();

  for (const component of components) {
    const key = component.subcategory ?? "";
    const existing = groups.get(key) ?? [];
    existing.push(component);
    groups.set(key, existing);
  }

  return groups;
}

export function ComponentPalette({ onAddComponent }: ComponentPaletteProps) {
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState<Partial<Record<ComponentCategory, boolean>>>({});

  const filteredComponents = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return serviceComponents;
    }
    return serviceComponents.filter((component) =>
      component.label.toLowerCase().includes(query),
    );
  }, [search]);

  const componentsByCategory = useMemo(() => {
    const map = new Map<ComponentCategory, ServiceComponentDef[]>();
    for (const component of filteredComponents) {
      const existing = map.get(component.category) ?? [];
      existing.push(component);
      map.set(component.category, existing);
    }
    return map;
  }, [filteredComponents]);

  const visibleCategories = paletteCategories.filter((category) =>
    componentsByCategory.has(category.id),
  );

  const toggleCategory = (categoryId: ComponentCategory) => {
    setCollapsed((current) => ({
      ...current,
      [categoryId]: !current[categoryId],
    }));
  };

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-bg-raised">
      <div className="border-b border-border px-4 py-3">
        <p className="font-mono text-xs text-text-faint">components</p>
        <h2 className="font-mono text-sm text-text">Palette</h2>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search components..."
          className="mt-2.5 w-full rounded-md border border-border bg-bg px-2.5 py-1.5 font-mono text-xs text-text outline-none placeholder:text-text-faint focus:border-accent"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {visibleCategories.length === 0 ? (
          <p className="px-1 font-mono text-xs text-text-faint">No components found.</p>
        ) : (
          visibleCategories.map((category) => {
            const components = componentsByCategory.get(category.id) ?? [];
            const isCollapsed = collapsed[category.id] ?? false;
            const subcategoryGroups = groupBySubcategory(components);
            const subcategoryKeys = [...subcategoryGroups.keys()].sort((a, b) => {
              if (!a) return -1;
              if (!b) return 1;
              return a.localeCompare(b);
            });

            return (
              <section key={category.id} className="mb-4">
                <button
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  className="mb-2 flex w-full items-center justify-between font-mono text-[11px] uppercase tracking-wide text-text-faint hover:text-text"
                >
                  <span>
                    {category.label}
                    <span className="ml-1.5 text-text-faint">({components.length})</span>
                  </span>
                  <span className="text-[10px]">{isCollapsed ? "+" : "−"}</span>
                </button>

                {!isCollapsed && (
                  <div className="flex flex-col gap-3">
                    {subcategoryKeys.map((subcategoryKey) => {
                      const items = subcategoryGroups.get(subcategoryKey) ?? [];
                      const subcategoryLabel = subcategoryKey
                        ? subcategoryLabels[subcategoryKey] ?? subcategoryKey
                        : null;

                      return (
                        <div key={subcategoryKey || "default"}>
                          {subcategoryLabel && subcategoryKeys.length > 1 && (
                            <h4 className="mb-1.5 px-0.5 font-mono text-[10px] text-text-faint">
                              {subcategoryLabel}
                            </h4>
                          )}
                          <ul className="flex flex-col gap-1.5">
                            {items.map((component) => (
                              <li key={component.id}>
                                <PaletteItem
                                  component={component}
                                  onAddComponent={onAddComponent}
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })
        )}
      </div>
    </aside>
  );
}

export { DRAG_TYPE };
