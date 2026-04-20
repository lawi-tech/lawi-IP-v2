import { Printer, AlertTriangle, Info } from "lucide-react";
import { EUR_TO_USD, EUR_RATE_DATE, type ComputedLine } from "@/data/pricing";

interface Props {
  lines: ComputedLine[];
  generatedAt: Date;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export function StepResult({ lines, generatedAt }: Props) {
  const totalFiling = lines.reduce((s, l) => s + l.filingTotal, 0);
  const totalGranted = lines.reduce((s, l) => s + l.grantedFee, 0);
  const grandTotal = lines.reduce((s, l) => s + l.grandTotal, 0);
  const hasGrantedFees = totalGranted > 0;
  const hasEurJurisdictions = lines.some((l) => l.jurisdiction.currency === "EUR");
  const jurisdictionCount = new Set(lines.map((l) => l.jurisdiction.id)).size;

  return (
    <div className="print-compact">
      {/* Header */}
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Your estimate</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Generated on{" "}
            {generatedAt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="no-print inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] transition-all hover:bg-primary-glow"
        >
          <Printer className="size-4" />
          Export summary
        </button>
      </header>

      {lines.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
          No jurisdictions configured. Go back and select at least one.
        </div>
      ) : (
        <>
          {/* Main table */}
          <div className="print-avoid-break overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Jurisdiction</th>
                  <th className="px-4 py-3 text-left font-semibold">Classes</th>
                  <th className="px-4 py-3 text-right font-semibold">Filing total (USD)</th>
                  {hasGrantedFees && (
                    <th className="px-4 py-3 text-right font-semibold">If granted (USD)</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {lines.map((l, i) => (
                  <tr key={i} className="transition-colors hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span>{l.jurisdiction.flag}</span>
                        <div>
                          <div className="font-semibold text-foreground">{l.jurisdiction.name}</div>
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                            {l.jurisdiction.office}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {l.nClasses} class{l.nClasses > 1 ? "es" : ""}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-semibold text-foreground">
                      {fmt(l.filingTotal)}
                    </td>
                    {hasGrantedFees && (
                      <td className="px-4 py-3 text-right font-mono text-muted-foreground">
                        {l.grantedFee > 0 ? `+ ${fmt(l.grantedFee)}` : "—"}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals + breakdown */}
          <div className="mt-5 grid gap-4 lg:grid-cols-3 print:grid-cols-3">
            {/* Breakdown */}
            <div className="print-avoid-break lg:col-span-2 print:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">Summary</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted-foreground">
                    Trademark filings ({jurisdictionCount} jurisdiction{jurisdictionCount > 1 ? "s" : ""})
                  </dt>
                  <dd className="font-mono font-semibold text-foreground">{fmt(totalFiling)}</dd>
                </div>

                {hasGrantedFees && (
                  <div className="flex justify-between border-b border-border pb-2">
                    <dt className="text-muted-foreground">
                      Conditional grant fee{" "}
                      <span className="text-[10px] text-muted-foreground">(Chile — due only if granted)</span>
                    </dt>
                    <dd className="font-mono font-semibold text-foreground">+ {fmt(totalGranted)}</dd>
                  </div>
                )}

                <div className="flex justify-between pt-2">
                  <dt className="font-semibold text-foreground">
                    {hasGrantedFees ? "Total (incl. conditional fees)" : "Total"}
                  </dt>
                  <dd className="font-mono font-bold text-foreground">{fmt(grandTotal)}</dd>
                </div>
              </dl>

              <div className="mt-4 rounded-lg bg-accent-soft px-3 py-2 text-xs text-foreground">
                <strong>Included:</strong> Lawi professional fees + official government filing fees.
                Translation, notarization, apostille, and POA registration costs (where applicable)
                are itemized separately in the formal proposal.
              </div>

              {hasEurJurisdictions && (
                <div className="mt-2 flex items-start gap-2 rounded-lg bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                  <Info className="mt-0.5 size-3.5 shrink-0" />
                  <span>
                    European fees originally quoted in EUR, converted at a fixed rate of{" "}
                    <strong>1 EUR = {EUR_TO_USD} USD</strong> ({EUR_RATE_DATE}).
                    The formal proposal will reflect the rate applicable at the time of invoicing.
                  </span>
                </div>
              )}
            </div>

            {/* Total highlight */}
            <div className="print-avoid-break rounded-2xl bg-[var(--gradient-brand)] p-6 text-primary-foreground shadow-[var(--shadow-elegant)] print:[print-color-adjust:exact] print:[-webkit-print-color-adjust:exact]">
              <div className="text-xs font-semibold uppercase tracking-wider opacity-80">
                Estimated total
              </div>
              <div className="mt-2 font-mono text-4xl font-extrabold">{fmt(grandTotal)}</div>
              <div className="mt-1 text-xs opacity-80">USD · Lawi fees + official fees</div>
              {hasGrantedFees && (
                <div className="mt-2 text-[11px] opacity-70">
                  Includes {fmt(totalGranted)} conditional grant fee (Chile)
                </div>
              )}
              <div className="mt-4 border-t border-white/20 pt-3 text-xs opacity-90">
                {lines.length} jurisdiction{lines.length > 1 ? "s" : ""} selected
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="print-avoid-break mt-4 rounded-xl border-l-4 border-accent bg-accent-soft p-4 text-sm text-foreground">
            <div className="flex gap-3">
              <AlertTriangle className="size-5 shrink-0 text-accent-foreground" />
              <div>
                <p className="font-semibold">Disclaimer</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  This estimate is provided for informational purposes only and does not constitute
                  a formal offer or binding proposal. Final pricing is subject to Lawi's official
                  engagement letter and may vary based on specific case requirements, applicable
                  official fees, regulatory updates, and the EUR/USD exchange rate at time of
                  invoicing. Valid for reference only — generated on{" "}
                  {generatedAt.toLocaleDateString("en-US", { dateStyle: "medium" })}.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
