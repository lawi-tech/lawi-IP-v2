// =============================================================================
// LAWI — IP Cost Simulator · Pricing Data
// =============================================================================
// HOW TO UPDATE:
//   1. EUR → USD rate: edit EUR_TO_USD below (conversion happens at runtime).
//   2. Prices: find the jurisdiction and update lawiFirst/officialFirst/etc.
//      EUR-denominated entries stay in EUR — do not pre-convert them.
// =============================================================================

// ─── EXCHANGE RATE (edit here to update) ─────────────────────────────────────
export const EUR_TO_USD = 1.10;
export const EUR_RATE_DATE = "April 2026";
// ─────────────────────────────────────────────────────────────────────────────

export type JurisdictionId =
  | "AR" | "BR" | "MX" | "UY" | "CL" | "PY" | "PE" | "EC" | "CO"
  | "CR" | "DO" | "PA" | "BO" | "HN" | "GT" | "NI" | "SV" | "VE" | "CU"
  | "US" | "EU" | "UK" | "DE" | "FR" | "ES" | "BX";

export type ClassModel = "per_class" | "single_class" | "fixed_3" | "tiered";

export interface ClassPricing {
  model: ClassModel;
  // All amounts in source currency (USD or EUR per JurisdictionData.currency).
  // Lawi service fee
  lawiFirst: number;
  lawiAdditional?: number;
  lawiSecond?: number;
  lawiThirdPlus?: number;
  // Official government filing fee
  officialFirst: number;
  officialAdditional?: number;
  officialSecond?: number;
  officialThirdPlus?: number;
  // Chile: extra grant fee per class (due only if trademark is granted)
  grantedFeePerClass?: number;
}

export interface JurisdictionData {
  id: JurisdictionId;
  name: string;
  office: string;
  flag: string;
  region: "LATAM" | "North America" | "Europe";
  currency: "USD" | "EUR";
  trademark: ClassPricing;
  notes?: string;
}

export const JURISDICTIONS_DATA: JurisdictionData[] = [
  // ── LATAM ──────────────────────────────────────────────────────────────────
  {
    id: "AR", name: "Argentina", office: "INPI AR", flag: "🇦🇷", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", lawiFirst: 150, officialFirst: 15, lawiAdditional: 120, officialAdditional: 15 },
  },
  {
    id: "BR", name: "Brazil", office: "INPI BR", flag: "🇧🇷", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", lawiFirst: 200, officialFirst: 170, lawiAdditional: 125, officialAdditional: 170 },
  },
  {
    id: "MX", name: "Mexico", office: "IMPI", flag: "🇲🇽", region: "LATAM", currency: "USD",
    trademark: { model: "single_class", lawiFirst: 180, officialFirst: 150 },
    notes: "Single class system — one filing per class required.",
  },
  {
    id: "UY", name: "Uruguay", office: "DNPI", flag: "🇺🇾", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", lawiFirst: 210, officialFirst: 187, lawiAdditional: 210, officialAdditional: 187 },
    notes: "Multiclass system.",
  },
  {
    id: "CL", name: "Chile", office: "INAPI", flag: "🇨🇱", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", lawiFirst: 285, officialFirst: 100, lawiAdditional: 285, officialAdditional: 100, grantedFeePerClass: 190 },
    notes: "An additional fee of USD 190 per class is due only if the trademark is granted.",
  },
  {
    id: "PY", name: "Paraguay", office: "DINAPI", flag: "🇵🇾", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", lawiFirst: 285, officialFirst: 45, lawiAdditional: 285, officialAdditional: 45 },
    notes: "Certificate is free of charge.",
  },
  {
    id: "PE", name: "Peru", office: "INDECOPI", flag: "🇵🇪", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", lawiFirst: 315, officialFirst: 170, lawiAdditional: 315, officialAdditional: 170 },
    notes: "Search is free of charge.",
  },
  {
    id: "EC", name: "Ecuador", office: "SENADI", flag: "🇪🇨", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", lawiFirst: 330, officialFirst: 210, lawiAdditional: 330, officialAdditional: 210 },
    notes: "Search is free of charge.",
  },
  {
    id: "CO", name: "Colombia", office: "SIC", flag: "🇨🇴", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", lawiFirst: 255, officialFirst: 369, lawiAdditional: 255, officialAdditional: 369 },
    notes: "Search is free of charge.",
  },
  {
    id: "CR", name: "Costa Rica", office: "RNPIC", flag: "🇨🇷", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", lawiFirst: 285, officialFirst: 120, lawiAdditional: 285, officialAdditional: 120 },
    notes: "Search fee of USD 75 is deductible from the filing fee.",
  },
  {
    id: "DO", name: "Dominican Rep.", office: "ONAPI", flag: "🇩🇴", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", lawiFirst: 262.5, officialFirst: 180, lawiAdditional: 262.5, officialAdditional: 180 },
    notes: "Simple POA accepted signed by email.",
  },
  {
    id: "PA", name: "Panama", office: "DIGERPI", flag: "🇵🇦", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", lawiFirst: 315, officialFirst: 174, lawiAdditional: 315, officialAdditional: 174 },
    notes: "Search fee of USD 75 is deductible from the filing fee.",
  },
  {
    id: "BO", name: "Bolivia", office: "SENAPI", flag: "🇧🇴", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", lawiFirst: 255, officialFirst: 290, lawiAdditional: 255, officialAdditional: 290 },
    notes: "Mandatory POA registration fee of USD 40 applies.",
  },
  {
    id: "HN", name: "Honduras", office: "PI Honduras", flag: "🇭🇳", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", lawiFirst: 315, officialFirst: 180, lawiAdditional: 315, officialAdditional: 180 },
    notes: "Certificate issuance takes approximately 2–3 months.",
  },
  {
    id: "GT", name: "Guatemala", office: "MINECO", flag: "🇬🇹", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", lawiFirst: 277.5, officialFirst: 195, lawiAdditional: 277.5, officialAdditional: 195 },
    notes: "Mandatory POA registration (USD 50) and translation fees may apply.",
  },
  {
    id: "NI", name: "Nicaragua", office: "MIFIC", flag: "🇳🇮", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", lawiFirst: 345, officialFirst: 190, lawiAdditional: 345, officialAdditional: 190 },
    notes: "Registration number is required for legal entities.",
  },
  {
    id: "SV", name: "El Salvador", office: "CNR", flag: "🇸🇻", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", lawiFirst: 315, officialFirst: 150, lawiAdditional: 315, officialAdditional: 150 },
    notes: "POA must be notarized and apostilled.",
  },
  {
    id: "VE", name: "Venezuela", office: "SAPI", flag: "🇻🇪", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", lawiFirst: 465, officialFirst: 180, lawiAdditional: 465, officialAdditional: 180 },
    notes: "Fee includes search and POA registration.",
  },
  {
    id: "CU", name: "Cuba", office: "OCPI", flag: "🇨🇺", region: "LATAM", currency: "USD",
    trademark: { model: "fixed_3", lawiFirst: 759, officialFirst: 333 },
    notes: "Fixed fee covers up to 3 classes. A final grant fee of USD 365 applies later.",
  },
  // ── NORTH AMERICA ──────────────────────────────────────────────────────────
  {
    id: "US", name: "United States", office: "USPTO", flag: "🇺🇸", region: "North America", currency: "USD",
    trademark: { model: "per_class", lawiFirst: 480, officialFirst: 350, lawiAdditional: 480, officialAdditional: 350 },
    notes: "Fee is per class. Declaration of use required during prosecution.",
  },
  // ── EUROPE — values in EUR, converted to USD at runtime ────────────────────
  {
    id: "EU", name: "European Union", office: "EUIPO", flag: "🇪🇺", region: "Europe", currency: "EUR",
    trademark: { model: "tiered", lawiFirst: 300, officialFirst: 850, lawiSecond: 150, officialSecond: 50, lawiThirdPlus: 75, officialThirdPlus: 150 },
    notes: "Priority rights: EUR 50. Prices in EUR — converted to USD at the rate shown.",
  },
  {
    id: "UK", name: "United Kingdom", office: "UKIPO", flag: "🇬🇧", region: "Europe", currency: "EUR",
    trademark: { model: "tiered", lawiFirst: 300, officialFirst: 200, lawiSecond: 150, officialSecond: 60, lawiThirdPlus: 150, officialThirdPlus: 60 },
    notes: "Priority rights: EUR 50. Prices in EUR — converted to USD at the rate shown.",
  },
  {
    id: "DE", name: "Germany", office: "DPMA", flag: "🇩🇪", region: "Europe", currency: "EUR",
    trademark: { model: "fixed_3", lawiFirst: 450, officialFirst: 290 },
    notes: "Fixed fee covers up to 3 classes. Priority rights: EUR 50. Prices in EUR — converted to USD at the rate shown.",
  },
  {
    id: "FR", name: "France", office: "INPI FR", flag: "🇫🇷", region: "Europe", currency: "EUR",
    trademark: { model: "tiered", lawiFirst: 450, officialFirst: 190, lawiSecond: 225, officialSecond: 40, lawiThirdPlus: 225, officialThirdPlus: 40 },
    notes: "Priority rights: EUR 50. Prices in EUR — converted to USD at the rate shown.",
  },
  {
    id: "ES", name: "Spain", office: "OEPM", flag: "🇪🇸", region: "Europe", currency: "EUR",
    trademark: { model: "tiered", lawiFirst: 450, officialFirst: 130, lawiSecond: 225, officialSecond: 90, lawiThirdPlus: 225, officialThirdPlus: 90 },
    notes: "Priority rights: EUR 50. Prices in EUR — converted to USD at the rate shown.",
  },
  {
    id: "BX", name: "Benelux", office: "BOIP", flag: "🇧🇪", region: "Europe", currency: "EUR",
    trademark: { model: "tiered", lawiFirst: 450, officialFirst: 250, lawiSecond: 225, officialSecond: 30, lawiThirdPlus: 150, officialThirdPlus: 90 },
    notes: "Priority rights: EUR 50. Prices in EUR — converted to USD at the rate shown.",
  },
];

// =============================================================================
// HELPERS
// =============================================================================

export function getJurisdiction(id: JurisdictionId): JurisdictionData {
  return JURISDICTIONS_DATA.find((j) => j.id === id)!;
}

function toUSD(amount: number, currency: "USD" | "EUR"): number {
  return currency === "EUR" ? Math.round(amount * EUR_TO_USD) : Math.round(amount);
}

export function maxClasses(id: JurisdictionId): number {
  const j = getJurisdiction(id);
  if (j.trademark.model === "single_class") return 1;
  if (j.trademark.model === "fixed_3") return 3;
  return 10;
}

export function classModelLabel(id: JurisdictionId): string {
  const j = getJurisdiction(id);
  switch (j.trademark.model) {
    case "single_class": return "Single class system";
    case "fixed_3":      return "Fixed fee — up to 3 classes";
    case "tiered":       return "Tiered pricing per class";
    default:             return "Per class";
  }
}

export interface FeeBreakdown {
  lawiTotal: number;
  officialTotal: number;
  filingTotal: number;
  grantedFee: number;
  grandTotal: number;
}

function computeBreakdown(id: JurisdictionId, nClasses: number): FeeBreakdown {
  const j = getJurisdiction(id);
  const p = j.trademark;
  const c = j.currency;
  let lawi = 0;
  let official = 0;

  switch (p.model) {
    case "single_class":
    case "fixed_3":
      lawi = p.lawiFirst;
      official = p.officialFirst;
      break;

    case "per_class": {
      const extra = Math.max(0, nClasses - 1);
      lawi = p.lawiFirst + extra * (p.lawiAdditional ?? 0);
      official = p.officialFirst + extra * (p.officialAdditional ?? 0);
      break;
    }

    case "tiered": {
      lawi = p.lawiFirst;
      official = p.officialFirst;
      if (nClasses >= 2) { lawi += (p.lawiSecond ?? 0); official += (p.officialSecond ?? 0); }
      if (nClasses >= 3) { lawi += (p.lawiThirdPlus ?? 0) * (nClasses - 2); official += (p.officialThirdPlus ?? 0) * (nClasses - 2); }
      break;
    }
  }

  const lawiUSD = toUSD(lawi, c);
  const officialUSD = toUSD(official, c);
  const filing = lawiUSD + officialUSD;
  const granted = (p.grantedFeePerClass ?? 0) * nClasses;

  return { lawiTotal: lawiUSD, officialTotal: officialUSD, filingTotal: filing, grantedFee: granted, grandTotal: filing + granted };
}

export interface ComputedLine {
  jurisdiction: JurisdictionData;
  nClasses: number;
  lawiTotal: number;
  officialTotal: number;
  filingTotal: number;
  grantedFee: number;
  grandTotal: number;
}

export function computeLine(id: JurisdictionId, nClasses: number): ComputedLine {
  const j = getJurisdiction(id);
  const b = computeBreakdown(id, nClasses);
  return { jurisdiction: j, nClasses, ...b };
}

// Legacy helper — kept for StepClasses preview
export function computeTrademarkTotal(id: JurisdictionId, nClasses: number): number {
  return computeBreakdown(id, nClasses).filingTotal;
}

export function grantedFeeTotal(id: JurisdictionId, nClasses: number): number {
  return computeBreakdown(id, nClasses).grantedFee;
}
