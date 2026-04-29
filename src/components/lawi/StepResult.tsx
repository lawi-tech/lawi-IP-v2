import { useState } from "react";
import { Printer, AlertTriangle, Info, Mail, X } from "lucide-react";
import { EUR_TO_USD, EUR_RATE_DATE, type ComputedLine } from "@/data/pricing";

interface Props {
  lines: ComputedLine[];
  generatedAt: Date;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export function StepResult({ lines, generatedAt }: Props) {
  const [showModal, setShowModal]       = useState(false);
  const [company, setCompany]           = useState("");
  const [email, setEmail]               = useState("");
  const [submitted, setSubmitted]       = useState(false);
  const [clientName, setClientName]     = useState("");

  const totalLawi     = lines.reduce((s, l) => s + l.lawiTotal, 0);
  const totalOfficial = lines.reduce((s, l) => s + l.officialTotal, 0);
  const totalFiling   = lines.reduce((s, l) => s + l.filingTotal, 0);
  const totalGranted  = lines.reduce((s, l) => s + l.grantedFee, 0);
  const grandTotal    = lines.reduce((s, l) => s + l.grandTotal, 0);

  const hasGrantedFees      = totalGranted > 0;
  const hasEurJurisdictions = lines.some((l) => l.jurisdiction.currency === "EUR");
  const jurisdictionCount   = new Set(lines.map((l) => l.jurisdiction.id)).size;

  const handleExport = () => {
    if (!submitted) { setShowModal(true); return; }
    window.print();
  };

  const handleSubmit = () => {
    if (!company.trim() || !email.trim()) return;
    setClientName(company.trim());
    setSubmitted(true);
    setShowModal(false);
    setTimeout(() => window.print(), 300);
  };

  return (
    <div className="print-compact">

      {/* Export modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 no-print">
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground hover:bg-secondary"
            >
              <X className="size-4" />
            </button>
            <div className="mb-1 flex items-center gap-2">
              <Mail className="size-5 text-primary" />
              <h3 className="text-base font-semibold text-foreground">Export your estimate</h3>
            </div>
            <p className="mb-5 text-sm text-muted-foreground">
              We'll generate a personalized report with your company name. Your email helps us follow up if needed.
            </p>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Company / brand name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Acme Corp"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!company.trim() || !email.trim()}
              className="mt-5 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-glow disabled:cursor-not-allowed disabled:opacity-40"
            >
              Generate & export
            </button>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              Your data is used only to personalize this report and will not be shared.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          {submitted && clientName ? (
            <>
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                Trademark Cost Estimate
              </div>
              <h2 className="text-2xl font-bold text-foreground">{clientName}</h2>
            </>
          ) : (
            <h2 className="text-2xl font-bold text-foreground">Your estimate</h2>
          )}
          <p className="mt-1 text-sm text-muted-foreground">
            Generated on{" "}
            {generatedAt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
          </p>
        </div>
        <button
          onClick={handleExport}
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
          {/* Main breakdown table */}
          <div className="print-avoid-break overflow-x-auto rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Jurisdiction</th>
                  <th className="px-4 py-3 text-left font-semibold">Classes</th>
                  <th className="px-4 py-3 text-right font-semibold">Lawi fee</th>
                  <th className="px-4 py-3 text-right font-semibold">Official fee</th>
                  <th className="px-4 py-3 text-right font-semibold">Total</th>
                  {hasGrantedFees && (
                    <th className="px-4 py-3 text-right font-semibold">If granted</th>
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
                    <td className="px-4 py-3 text-right font-mono text-muted-foreground">
                      {fmt(l.lawiTotal)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-muted-foreground">
                      {fmt(l.officialTotal)}
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
              <tfoot className="border-t-2 border-border bg-secondary/50">
                <tr>
                  <td colSpan={2} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Total ({jurisdictionCount} jurisdiction{jurisdictionCount > 1 ? "s" : ""})
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-semibold text-muted-foreground">
                    {fmt(totalLawi)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-semibold text-muted-foreground">
                    {fmt(totalOfficial)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-base font-bold text-foreground">
                    {fmt(totalFiling)}
                  </td>
                  {hasGrantedFees && (
                    <td className="px-4 py-3 text-right font-mono font-semibold text-muted-foreground">
                      + {fmt(totalGranted)}
                    </td>
                  )}
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Summary + total card */}
          <div className="mt-5 grid gap-4 lg:grid-cols-3 print:grid-cols-3">
            <div className="print-avoid-break lg:col-span-2 print:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">Fee summary</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted-foreground">Lawi professional fees</dt>
                  <dd className="font-mono font-semibold text-foreground">{fmt(totalLawi)}</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted-foreground">Official government filing fees</dt>
                  <dd className="font-mono font-semibold text-foreground">{fmt(totalOfficial)}</dd>
                </div>
                {hasGrantedFees && (
                  <div className="flex justify-between border-b border-border pb-2">
                    <dt className="text-muted-foreground">
                      Conditional grant fee{" "}
                      <span className="text-[10px]">(Chile — due only if granted)</span>
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
                <strong>Not included:</strong> Translation, notarization, apostille, and POA registration
                costs (where applicable) are itemized separately in the formal proposal.
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
              <div className="text-xs font-semibold uppercase tracking-wider opacity-80">Estimated total</div>
              <div className="mt-2 font-mono text-4xl font-extrabold">{fmt(grandTotal)}</div>
              <div className="mt-1 text-xs opacity-80">USD · all fees included</div>
              <div className="mt-4 space-y-1 border-t border-white/20 pt-3 text-xs opacity-90">
                <div className="flex justify-between">
                  <span>Lawi fees</span>
                  <span className="font-mono">{fmt(totalLawi)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Official fees</span>
                  <span className="font-mono">{fmt(totalOfficial)}</span>
                </div>
                {hasGrantedFees && (
                  <div className="flex justify-between opacity-70">
                    <span>If granted (Chile)</span>
                    <span className="font-mono">+ {fmt(totalGranted)}</span>
                  </div>
                )}
              </div>
              <div className="mt-3 text-[11px] opacity-70">
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
