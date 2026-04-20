import {
  JURISDICTIONS_DATA,
  classModelLabel,
  maxClasses,
  computeTrademarkTotal,
  grantedFeeTotal,
  type JurisdictionId,
} from "@/data/pricing";

export type ClassesState = Record<JurisdictionId, number>;

interface Props {
  jurisdictions: JurisdictionId[];
  classes: ClassesState;
  onChange: (next: ClassesState) => void;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export function StepClasses({ jurisdictions, classes, onChange }: Props) {
  const setClasses = (id: JurisdictionId, n: number) =>
    onChange({ ...classes, [id]: n });

  return (
    <div>
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">How many Nice classes per jurisdiction?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Nice classes define the product/service categories covered by your trademark. Each jurisdiction may have a different pricing model.
        </p>
      </header>

      <div className="space-y-4">
        {jurisdictions.map((id) => {
          const j = JURISDICTIONS_DATA.find((x) => x.id === id)!;
          const max = maxClasses(id);
          const current = classes[id] ?? 1;
          const subtotal = computeTrademarkTotal(id, current);
          const granted = grantedFeeTotal(id, current);
          const modelLabel = classModelLabel(id);
          const isSingleClass = j.trademark.model === "single_class";
          const isFixed3 = j.trademark.model === "fixed_3";

          return (
            <div
              key={id}
              className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                {/* Jurisdiction info */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{j.flag}</span>
                  <div>
                    <div className="font-semibold text-foreground">{j.name}</div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-primary">{j.office}</div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">{modelLabel}</div>
                  </div>
                </div>

                {/* Subtotal preview */}
                <div className="text-right">
                  <div className="font-mono text-lg font-bold text-foreground">{fmt(subtotal)}</div>
                  {granted > 0 && (
                    <div className="text-[11px] text-muted-foreground">
                      + {fmt(granted)} if granted
                    </div>
                  )}
                  <div className="text-[11px] text-muted-foreground">
                    {current} class{current > 1 ? "es" : ""}
                  </div>
                </div>
              </div>

              {/* Class selector */}
              <div className="mt-4">
                {isSingleClass ? (
                  <div className="rounded-lg bg-muted/40 px-3 py-2.5 text-sm text-muted-foreground">
                    Single class system — one class per filing. Additional classes require separate filings.
                  </div>
                ) : isFixed3 ? (
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Number of classes (1–3, fixed price)
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setClasses(id, n)}
                          className={[
                            "size-10 rounded-lg border text-sm font-semibold transition-all",
                            current === n
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background text-foreground hover:border-primary/40",
                          ].join(" ")}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      All 3 classes included at the same price.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Number of Nice classes
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: Math.min(max, 10) }, (_, i) => i + 1).map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setClasses(id, n)}
                          className={[
                            "size-10 rounded-lg border text-sm font-semibold transition-all",
                            current === n
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background text-foreground hover:border-primary/40",
                          ].join(" ")}
                        >
                          {n === 10 ? "10+" : n}
                        </button>
                      ))}
                    </div>
                    {j.trademark.model === "tiered" && (
                      <p className="text-[11px] text-muted-foreground">
                        Tiered pricing: 1st, 2nd, and 3rd+ classes each have a different rate.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Notes */}
              {j.notes && (
                <div className="mt-3 rounded-lg bg-accent-soft px-3 py-2 text-[11px] text-foreground">
                  <span className="font-semibold">Note: </span>{j.notes}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
