import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { LawiLogo } from "@/components/lawi/Logo";
import { Stepper } from "@/components/lawi/Stepper";
import { StepJurisdictions } from "@/components/lawi/StepJurisdictions";
import { StepClasses, type ClassesState, type DetailedState } from "@/components/lawi/StepClasses";
import { LeadGate } from "@/components/lawi/LeadGate";
import { StepResult } from "@/components/lawi/StepResult";
import { computeLine, computeDetailedLine, isDetailed, JURISDICTIONS_DATA, type JurisdictionId } from "@/data/pricing";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Lawi — Trademark Cost Simulator" },
      { name: "description", content: "Estimate trademark registration costs across global jurisdictions with Lawi's international IP team." },
    ],
  }),
});

// Steps: 0 = Jurisdictions, 1 = Services, 2 = Lead Gate, 3 = Result
const STEPPER_STEPS = [
  { label: "Jurisdictions", sub: "Where to protect" },
  { label: "Services",      sub: "Select & configure" },
  { label: "Result",        sub: "Your estimate" },
];

function Index() {
  const [step, setStep]                   = useState(0);
  const [jurisdictions, setJurisdictions] = useState<JurisdictionId[]>([]);
  const [classes, setClasses]             = useState<ClassesState>({} as ClassesState);
  const [detailed, setDetailed]           = useState<DetailedState>({} as DetailedState);
  const [company, setCompany]             = useState("");
  const [email, setEmail]                 = useState("");
  const [generatedAt, setGeneratedAt]     = useState<Date>(new Date());

  const toggleJurisdiction = (id: JurisdictionId) => {
    setJurisdictions((prev) => {
      const isRemoving = prev.includes(id);
      const next = isRemoving ? prev.filter((x) => x !== id) : [...prev, id];
      if (!isRemoving && !isDetailed(id)) {
        setClasses((c) => ({ ...c, [id]: 1 }));
      }
      return next;
    });
  };

  const lines = useMemo(() => {
    return jurisdictions.map((id) => {
      if (isDetailed(id)) return computeDetailedLine(id, detailed[id] ?? []);
      return computeLine(id, classes[id] ?? 1);
    });
  }, [jurisdictions, classes, detailed]);

  const jurisdictionNames = jurisdictions.map(
    (id) => JURISDICTIONS_DATA.find((j) => j.id === id)?.name ?? id
  );

  const handleLeadSubmit = (co: string, em: string) => {
    setCompany(co);
    setEmail(em);
    setGeneratedAt(new Date());
    setStep(3);
  };

  const reset = () => {
    setStep(0);
    setJurisdictions([]);
    setClasses({} as ClassesState);
    setDetailed({} as DetailedState);
    setCompany("");
    setEmail("");
  };

  // Map internal step to stepper index (gate is hidden from stepper)
  const stepperIndex = step >= 3 ? 2 : step;

  const canNext =
    (step === 0 && jurisdictions.length > 0) ||
    step === 1;

  const goNext = () => {
    if (step === 1) { setStep(2); return; } // go to gate
    setStep((s) => Math.min(3, s + 1));
  };

  const goBack = () => {
    if (step === 3) { setStep(2); return; }
    setStep((s) => Math.max(0, s - 1));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="no-print sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <LawiLogo className="text-2xl" />
          <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground sm:flex">
            <Sparkles className="size-3.5 text-accent" />
            Trademark Cost Simulator · Beta
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        {/* Hero — hide on result */}
        {step < 2 && (
          <div className="mb-10 max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
              <span className="size-1.5 rounded-full bg-accent" />
              Global IP Protection
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
              Estimate the cost of registering your trademark{" "}
              <span className="bg-[var(--gradient-brand)] bg-clip-text text-transparent">worldwide</span>.
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              A guided simulator powered by Lawi's international IP team. Select your target jurisdictions,
              configure your services, and get a transparent estimate in under a minute.
            </p>
          </div>
        )}

        {/* Stepper — hide on gate and result */}
        {step < 2 && (
          <div className="mb-10 no-print">
            <Stepper current={stepperIndex} steps={STEPPER_STEPS} onJump={setStep} />
          </div>
        )}

        {/* Content */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
          {step === 0 && (
            <StepJurisdictions selected={jurisdictions} onToggle={toggleJurisdiction} />
          )}
          {step === 1 && (
            <StepClasses
              jurisdictions={jurisdictions}
              classes={classes}
              onChangeClasses={setClasses}
              detailed={detailed}
              onChangeDetailed={setDetailed}
            />
          )}
          {step === 2 && (
            <LeadGate
              jurisdictions={jurisdictionNames}
              onSubmit={handleLeadSubmit}
            />
          )}
          {step === 3 && (
            <StepResult
              lines={lines}
              generatedAt={generatedAt}
              company={company}
              email={email}
            />
          )}
        </div>

        {/* Navigation — hide on gate (gate has its own submit) and result */}
        {step !== 2 && step !== 3 && (
          <nav className="no-print mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="size-4" />
              Back
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!canNext}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] transition-all hover:bg-primary-glow disabled:cursor-not-allowed disabled:opacity-40"
            >
              {step === 1 ? "View my estimate" : "Continue"}
              <ChevronRight className="size-4" />
            </button>
          </nav>
        )}

        {/* Result navigation */}
        {step === 3 && (
          <nav className="no-print mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-secondary"
            >
              <ChevronLeft className="size-4" />
              Back
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-secondary"
            >
              Start over
            </button>
          </nav>
        )}

        <footer className="no-print mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Lawi · Premium LawTech for global startups
        </footer>
      </section>
    </div>
  );
}
