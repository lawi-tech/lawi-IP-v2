import { JURISDICTIONS_DATA, type JurisdictionId } from "@/data/pricing";
import { Check } from "lucide-react";

interface Props {
  selected: JurisdictionId[];
  onToggle: (id: JurisdictionId) => void;
}

const REGIONS = ["LATAM", "North America", "Europe"] as const;

export function StepJurisdictions({ selected, onToggle }: Props) {
  return (
    <div>
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Where do you want to protect your trademark?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Select one or more jurisdictions. Filings are submitted before each national or regional IP office.
        </p>
      </header>

      <div className="space-y-8">
        {REGIONS.map((region) => {
          const jurisdictions = JURISDICTIONS_DATA.filter((j) => j.region === region);
          return (
            <div key={region}>
              <div className="mb-3 flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{region}</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {jurisdictions.map((j) => {
                  const isOn = selected.includes(j.id);
                  return (
                    <button
                      key={j.id}
                      type="button"
                      onClick={() => onToggle(j.id)}
                      className={[
                        "group relative flex items-center justify-between rounded-xl border-2 p-4 text-left transition-all",
                        isOn
                          ? "border-accent bg-accent-soft shadow-[0_4px_20px_-8px_var(--accent)]"
                          : "border-border bg-card hover:border-primary/40 hover:bg-secondary",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{j.flag}</span>
                        <div>
                          <div className="font-semibold text-foreground">{j.name}</div>
                          <div className="mt-0.5 inline-flex items-center rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                            {j.office}
                          </div>
                        </div>
                      </div>
                      <span
                        className={[
                          "flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                          isOn ? "border-accent bg-accent text-accent-foreground" : "border-border",
                        ].join(" ")}
                      >
                        {isOn && <Check className="size-3.5" strokeWidth={3} />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {selected.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {selected.map((id) => {
            const j = JURISDICTIONS_DATA.find((x) => x.id === id)!;
            return (
              <span
                key={id}
                className="inline-flex items-center gap-1.5 rounded-full border border-accent bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-foreground"
              >
                {j.flag} {j.name}
                <button
                  type="button"
                  onClick={() => onToggle(id)}
                  className="ml-0.5 rounded-full text-accent-foreground/60 hover:text-accent-foreground"
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
