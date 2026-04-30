import { useState } from "react";
import {
  JURISDICTIONS_DATA, BRAZIL_SERVICES, ARGENTINA_SERVICES,
  classModelLabel, maxClasses, computeTrademarkTotal, grantedFeeTotal,
  isDetailed, type JurisdictionId, type DetailedService, type SelectedService,
} from "@/data/pricing";

export type ClassesState = Record<JurisdictionId, number>;
export type DetailedState = Record<JurisdictionId, SelectedService[]>;

interface Props {
  jurisdictions: JurisdictionId[];
  classes: ClassesState;
  onChangeClasses: (next: ClassesState) => void;
  detailed: DetailedState;
  onChangeDetailed: (next: DetailedState) => void;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);

// ── Detailed service table (Brazil & Argentina) ────────────────────────────

type EntityType = "PF" | "PJ";

function DetailedServiceTable({
  id, services, selected, onChange,
}: {
  id: JurisdictionId;
  services: DetailedService[];
  selected: SelectedService[];
  onChange: (next: SelectedService[]) => void;
}) {
  const isBrazil = id === "BR";
  const [entityType, setEntityType] = useState<EntityType>("PJ");

  const isSelected = (svcId: string) => selected.some((s) => s.service.id === svcId);

  const toggle = (svc: DetailedService) => {
    if (isSelected(svc.id)) {
      onChange(selected.filter((s) => s.service.id !== svc.id));
      return;
    }
    const lawiFee = svc.lawiFee ?? 0;
    let officialFee = 0;
    if (isBrazil) {
      officialFee = entityType === "PF" ? (svc.officialFeePF ?? 0) : (svc.officialFeePJ ?? 0);
    } else {
      officialFee = svc.officialFee ?? 0;
    }
    onChange([...selected, { service: svc, entityType: isBrazil ? entityType : undefined, lawiFee, officialFee, total: lawiFee + officialFee }]);
  };

  // When entity type changes, recompute official fees for already selected items
  const handleEntityChange = (et: EntityType) => {
    setEntityType(et);
    if (!isBrazil) return;
    onChange(
      selected.map((s) => {
        const officialFee = et === "PF" ? (s.service.officialFeePF ?? 0) : (s.service.officialFeePJ ?? 0);
        return { ...s, entityType: et, officialFee, total: s.lawiFee + officialFee };
      })
    );
  };

  const subtotal = selected.reduce((s, x) => s + x.total, 0);
  const lawiSubtotal = selected.reduce((s, x) => s + x.lawiFee, 0);
  const officialSubtotal = selected.reduce((s, x) => s + x.officialFee, 0);

  return (
    <div className="space-y-4">
      {isBrazil && (
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
          <span className="text-sm font-semibold text-foreground">Entity type:</span>
          {(["PF", "PJ"] as EntityType[]).map((et) => (
            <button
              key={et}
              type="button"
              onClick={() => handleEntityChange(et)}
              className={[
                "rounded-lg border px-4 py-2 text-sm font-semibold transition-all",
                entityType === et
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:border-primary/40",
              ].join(" ")}
            >
              {et === "PF" ? "🧑 Natural person (PF)" : "🏢 Legal entity (PJ)"}
            </button>
          ))}
          <span className="ml-auto text-xs text-muted-foreground">
            Official fees vary by entity type (INPI Brazil)
          </span>
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="w-10 px-3 py-3"></th>
              <th className="px-3 py-3 text-left font-semibold">#</th>
              <th className="px-3 py-3 text-left font-semibold">Service</th>
              <th className="px-3 py-3 text-right font-semibold">Lawi fee</th>
              {isBrazil ? (
                <>
                  <th className="px-3 py-3 text-right font-semibold">Official (PF)</th>
                  <th className="px-3 py-3 text-right font-semibold">Official (PJ)</th>
                </>
              ) : (
                <th className="px-3 py-3 text-right font-semibold">Official fee</th>
              )}
              <th className="px-3 py-3 text-right font-semibold">
                Total {isBrazil ? `(${entityType})` : ""}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {services.map((svc) => {
              const on = isSelected(svc.id);
              const official = isBrazil
                ? (entityType === "PF" ? (svc.officialFeePF ?? 0) : (svc.officialFeePJ ?? 0))
                : (svc.officialFee ?? 0);
              const total = (svc.lawiFee ?? 0) + official;
              const isFree = (svc.lawiFee ?? 0) === 0 && official === 0;

              return (
                <tr
                  key={svc.id}
                  onClick={() => !isFree && toggle(svc)}
                  className={[
                    "transition-colors",
                    isFree ? "opacity-60" : "cursor-pointer hover:bg-muted/30",
                    on ? "bg-accent-soft" : "",
                  ].join(" ")}
                >
                  <td className="px-3 py-3">
                    {!isFree && (
                      <div className={[
                        "flex size-5 items-center justify-center rounded border-2 transition-all",
                        on ? "border-primary bg-primary" : "border-border",
                      ].join(" ")}>
                        {on && <span className="text-[10px] font-bold text-white">✓</span>}
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-3 font-mono text-xs text-muted-foreground">{svc.number}</td>
                  <td className="px-3 py-3 text-foreground">
                    {svc.description}
                    {svc.notes && <span className="ml-2 text-[10px] text-muted-foreground">({svc.notes})</span>}
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-muted-foreground">
                    {(svc.lawiFee ?? 0) === 0 ? <span className="text-xs font-semibold text-green-600">Free</span> : fmt(svc.lawiFee ?? 0)}
                  </td>
                  {isBrazil ? (
                    <>
                      <td className="px-3 py-3 text-right font-mono text-muted-foreground">
                        {(svc.officialFeePF ?? 0) === 0 ? "—" : fmt(svc.officialFeePF ?? 0)}
                      </td>
                      <td className="px-3 py-3 text-right font-mono text-muted-foreground">
                        {(svc.officialFeePJ ?? 0) === 0 ? "—" : fmt(svc.officialFeePJ ?? 0)}
                      </td>
                    </>
                  ) : (
                    <td className="px-3 py-3 text-right font-mono text-muted-foreground">
                      {(svc.officialFee ?? 0) === 0 ? "—" : fmt(svc.officialFee ?? 0)}
                    </td>
                  )}
                  <td className="px-3 py-3 text-right font-mono font-semibold text-foreground">
                    {isFree ? <span className="text-xs font-semibold text-green-600">Free</span> : fmt(total)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          {selected.length > 0 && (
            <tfoot className="border-t-2 border-border bg-secondary/50">
              <tr>
                <td colSpan={isBrazil ? 4 : 3} className="px-3 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {selected.length} service{selected.length > 1 ? "s" : ""} selected
                </td>
                <td className="px-3 py-3 text-right font-mono font-semibold text-muted-foreground">
                  {fmt(lawiSubtotal)}
                </td>
                {isBrazil && (
                  <td className="px-3 py-3 text-right font-mono font-semibold text-muted-foreground">
                    {fmt(officialSubtotal)}
                  </td>
                )}
                <td className="px-3 py-3 text-right font-mono text-base font-bold text-foreground">
                  {fmt(subtotal)}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {selected.length === 0 && (
        <div className="rounded-xl border border-dashed border-border bg-muted/20 p-4 text-center text-sm text-muted-foreground">
          Click on a service row to add it to your estimate.
        </div>
      )}
    </div>
  );
}

// ── Standard class selector ────────────────────────────────────────────────

function StandardClassCard({
  id, classes, onChange,
}: {
  id: JurisdictionId;
  classes: ClassesState;
  onChange: (next: ClassesState) => void;
}) {
  const j = JURISDICTIONS_DATA.find((x) => x.id === id)!;
  const max = maxClasses(id);
  const current = classes[id] ?? 1;
  const subtotal = computeTrademarkTotal(id, current);
  const granted = grantedFeeTotal(id, current);
  const modelLabel = classModelLabel(id);
  const isSingleClass = j.trademark.model === "single_class";
  const isFixed3 = j.trademark.model === "fixed_3";

  const setClasses = (n: number) => onChange({ ...classes, [id]: n });

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{j.flag}</span>
          <div>
            <div className="font-semibold text-foreground">{j.name}</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">{j.office}</div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">{modelLabel}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-lg font-bold text-foreground">
            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(subtotal)}
          </div>
          {granted > 0 && (
            <div className="text-[11px] text-muted-foreground">
              + {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(granted)} if granted
            </div>
          )}
          <div className="text-[11px] text-muted-foreground">{current} class{current > 1 ? "es" : ""}</div>
        </div>
      </div>

      <div className="mt-4">
        {isSingleClass ? (
          <div className="rounded-lg bg-muted/40 px-3 py-2.5 text-sm text-muted-foreground">
            Single class system — one class per filing.
          </div>
        ) : isFixed3 ? (
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Number of classes (1–3, fixed price)</div>
            <div className="flex gap-2">
              {[1, 2, 3].map((n) => (
                <button key={n} type="button" onClick={() => setClasses(n)}
                  className={["size-10 rounded-lg border text-sm font-semibold transition-all",
                    current === n ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary/40",
                  ].join(" ")}>{n}</button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Number of Nice classes</div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: Math.min(max, 10) }, (_, i) => i + 1).map((n) => (
                <button key={n} type="button" onClick={() => setClasses(n)}
                  className={["size-10 rounded-lg border text-sm font-semibold transition-all",
                    current === n ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary/40",
                  ].join(" ")}>{n === 10 ? "10+" : n}</button>
              ))}
            </div>
            {j.trademark.model === "tiered" && (
              <p className="text-[11px] text-muted-foreground">Tiered pricing: 1st, 2nd, and 3rd+ classes each have a different rate.</p>
            )}
          </div>
        )}
      </div>

      {j.notes && (
        <div className="mt-3 rounded-lg bg-accent-soft px-3 py-2 text-[11px] text-foreground">
          <span className="font-semibold">Note: </span>{j.notes}
        </div>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export function StepClasses({ jurisdictions, classes, onChangeClasses, detailed, onChangeDetailed }: Props) {
  const detailedJurs = jurisdictions.filter((id) => isDetailed(id));
  const standardJurs = jurisdictions.filter((id) => !isDetailed(id));

  const getServices = (id: JurisdictionId) => id === "BR" ? BRAZIL_SERVICES : ARGENTINA_SERVICES;

  return (
    <div>
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Configure your services</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Select the services you need. Brazil and Argentina show full fee schedules — click a row to add it to your estimate.
        </p>
      </header>

      <div className="space-y-10">
        {detailedJurs.map((id) => {
          const j = JURISDICTIONS_DATA.find((x) => x.id === id)!;
          return (
            <div key={id}>
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl">{j.flag}</span>
                <div>
                  <div className="text-lg font-bold text-foreground">{j.name}</div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary">{j.office} · Full fee schedule</div>
                </div>
              </div>
              <DetailedServiceTable
                id={id}
                services={getServices(id)}
                selected={detailed[id] ?? []}
                onChange={(next) => onChangeDetailed({ ...detailed, [id]: next })}
              />
            </div>
          );
        })}

        {standardJurs.length > 0 && (
          <div>
            {detailedJurs.length > 0 && (
              <div className="mb-4 flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Other jurisdictions</span>
                <div className="h-px flex-1 bg-border" />
              </div>
            )}
            <div className="space-y-4">
              {standardJurs.map((id) => (
                <StandardClassCard key={id} id={id} classes={classes} onChange={onChangeClasses} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
