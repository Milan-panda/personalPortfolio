import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://milanpanda.dev"),
  title: "Milan Panda | Full Stack Software Engineer",
  description:
    "I build and own products end-to-end: React/Next.js frontends, Python backends, and AWS infrastructure. Production experience shipping RAG systems built for low latency and reliability.",
  openGraph: {
    title: "Milan Panda | Full Stack Software Engineer",
    description:
      "I build and own products end-to-end: React/Next.js frontends, Python backends, and AWS infrastructure.",
    type: "website",
    siteName: "Milan Panda",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Milan Panda | Full Stack Software Engineer",
    description:
      "I build and own products end-to-end: React/Next.js frontends, Python backends, and AWS infrastructure.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
