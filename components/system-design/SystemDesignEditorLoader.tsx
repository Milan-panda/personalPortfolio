"use client";

import dynamic from "next/dynamic";

const SystemDesignEditor = dynamic(
  () => import("@/components/system-design/SystemDesignEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-dvh items-center justify-center">
        <p className="font-mono text-sm text-text-faint">Loading editor…</p>
      </div>
    ),
  },
);

export function SystemDesignEditorLoader() {
  return <SystemDesignEditor />;
}
