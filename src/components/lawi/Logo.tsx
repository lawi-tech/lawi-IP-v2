export function LawiLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-baseline gap-0.5 font-extrabold tracking-tight ${className}`}>
      <span className="text-primary">Law</span>
      <span className="text-accent">i</span>
      <span className="ml-0.5 inline-block size-1.5 rounded-full bg-accent self-end mb-1.5" />
    </div>
  );
}