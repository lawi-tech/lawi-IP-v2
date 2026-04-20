import { Check } from "lucide-react";

interface StepperProps {
  current: number;
  steps: { label: string; sub: string }[];
  onJump?: (i: number) => void;
}

export function Stepper({ current, steps, onJump }: StepperProps) {
  return (
    <ol className="grid grid-cols-4 gap-2 md:gap-4">
      {steps.map((s, i) => {
        const state = i < current ? "done" : i === current ? "active" : "todo";
        return (
          <li key={i}>
            <button
              type="button"
              disabled={i > current}
              onClick={() => onJump?.(i)}
              className="group w-full text-left disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-3">
                <span
                  className={[
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                    state === "done" && "bg-accent text-accent-foreground",
                    state === "active" && "bg-primary text-primary-foreground ring-4 ring-accent/20",
                    state === "todo" && "bg-muted text-muted-foreground",
                  ].filter(Boolean).join(" ")}
                >
                  {state === "done" ? <Check className="size-4" /> : i + 1}
                </span>
                <div className="hidden md:block">
                  <div className={`text-sm font-semibold ${state === "todo" ? "text-muted-foreground" : "text-foreground"}`}>{s.label}</div>
                  <div className="text-xs text-muted-foreground">{s.sub}</div>
                </div>
              </div>
              <div
                className={[
                  "mt-3 h-0.5 w-full rounded-full transition-colors",
                  state === "done" ? "bg-accent" : state === "active" ? "bg-primary" : "bg-border",
                ].join(" ")}
              />
            </button>
          </li>
        );
      })}
    </ol>
  );
}