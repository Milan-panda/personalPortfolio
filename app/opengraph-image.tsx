import { ImageResponse } from "next/og";

export const alt = "Milan Panda | Full Stack Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#fafafa",
          color: "#16181d",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontFamily: "monospace",
            marginBottom: 36,
          }}
        >
          <span style={{ color: "#2f6f5e" }}>~$</span>
          <span style={{ color: "#16181d" }}> milan.panda</span>
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Milan Panda
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#6b7280",
            fontFamily: "monospace",
            marginBottom: 32,
          }}
        >
          Full Stack Software Engineer
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#6b7280",
            lineHeight: 1.5,
            maxWidth: 900,
          }}
        >
          React/Next.js frontends, Python backends, and AWS infrastructure.
          Production RAG systems built for low latency and reliability.
        </div>
      </div>
    ),
    { ...size },
  );
}
