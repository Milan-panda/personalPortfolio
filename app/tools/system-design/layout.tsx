export default function SystemDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-dvh w-full overflow-hidden bg-bg">{children}</div>;
}
