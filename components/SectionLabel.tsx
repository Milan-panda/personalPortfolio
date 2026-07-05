type SectionLabelProps = {
  number: string;
  text: string;
};

export function SectionLabel({ number, text }: SectionLabelProps) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <span className="shrink-0 font-mono text-sm">
        <span className="text-accent">{number}</span>{" "}
        <span className="text-text-faint">{text}</span>
      </span>
      <span
        className="h-px flex-1 bg-border"
        aria-hidden="true"
      />
    </div>
  );
}
