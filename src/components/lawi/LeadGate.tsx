import { useState } from "react";
import { ChevronRight, Globe } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://lawi-ip-leads.verber.workers.dev";

interface Props {
  jurisdictions: string[];
  onSubmit: (company: string, email: string) => void;
}

export function LeadGate({ jurisdictions, onSubmit }: Props) {
  const [company, setCompany] = useState("");
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleSubmit = async () => {
    if (!company.trim() || !email.trim()) {
      setError("Please fill in both fields to continue.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          company: company.trim(),
          email: email.trim(),
          jurisdictions: jurisdictions.join(", "),
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (_) {
      // Silently fail — don't block user from seeing result
    } finally {
      setLoading(false);
      onSubmit(company.trim(), email.trim());
    }
  };

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="w-full max-w-md">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-[var(--gradient-brand)] shadow-[var(--shadow-elegant)]">
            <Globe className="size-7 text-white" />
          </div>
        </div>

        {/* Title */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-foreground">Almost there</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your details to view your personalized trademark cost estimate across{" "}
            <strong>{jurisdictions.length} jurisdiction{jurisdictions.length > 1 ? "s" : ""}</strong>.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Company / brand name
            </label>
            <input
              type="text"
              placeholder="e.g. Acme Corp"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              autoFocus
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !company.trim() || !email.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] transition-all hover:bg-primary-glow disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Saving..." : "View my estimate"}
            {!loading && <ChevronRight className="size-4" />}
          </button>
        </div>

        {/* Privacy note */}
        <p className="mt-4 text-center text-[11px] text-muted-foreground">
          Your information is used only to personalize this report and may be used by Lawi to follow up on your request. We do not share your data with third parties.
        </p>
      </div>
    </div>
  );
}
