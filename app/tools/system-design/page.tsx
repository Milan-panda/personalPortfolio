import type { Metadata } from "next";
import { SystemDesignEditorLoader } from "@/components/system-design/SystemDesignEditorLoader";

export const metadata: Metadata = {
  title: "Blueprint | Milan Panda",
  description:
    "Drag-and-drop system design canvas with AWS components, flow connectors, and freehand annotations.",
};

export default function SystemDesignPage() {
  return <SystemDesignEditorLoader />;
}
