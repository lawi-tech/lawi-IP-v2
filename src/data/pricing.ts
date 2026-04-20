// =============================================================================
// LAWI — IP Cost Simulator · Pricing Data
// =============================================================================
// HOW TO UPDATE:
//   1. EUR → USD rate: edit EUR_TO_USD below — no rebuild needed for the rate
//      to take effect in calculations (conversion happens at runtime).
//   2. Prices: find the jurisdiction in JURISDICTIONS_DATA and update the values.
//      EUR-denominated entries stay in EUR — do not pre-convert them.
//   3. Add a new jurisdiction: add an entry to JURISDICTIONS_DATA following the
//      same shape, then add its id to the JurisdictionId union type.
// =============================================================================

// ─── EXCHANGE RATE (edit here to update) ─────────────────────────────────────
export const EUR_TO_USD = 1.10;
export const EUR_RATE_DATE = "April 2026"; // update this label when you change the rate
// ─────────────────────────────────────────────────────────────────────────────

export type JurisdictionId =
  | "AR" | "BR" | "MX" | "UY" | "CL" | "PY" | "PE" | "EC" | "CO"
  | "CR" | "DO" | "PA" | "BO" | "HN" | "GT" | "NI" | "SV" | "VE" | "CU"
  | "US" | "EU" | "UK" | "DE" | "FR" | "ES" | "BX";

export type ClassModel = "per_class" | "single_class" | "fixed_3" | "tiered";

export interface ClassPricing {
  model: ClassModel;
  // All amounts are in the jurisdiction's source currency (JurisdictionData.currency).
  // USD jurisdictions: amounts are in USD.
  // EUR jurisdictions: amounts are in EUR — converted to USD at runtime using EUR_TO_USD.
  first: number;
  additional?: number;
  second?: number;
  thirdPlus?: number;
  grantedFeePerClass?: number; // Chile only: due only if trademark is granted
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

// =============================================================================
// JURISDICTION DATA — sourced from Lawi official fee matrix
// EUR entries stored in EUR and converted at runtime via EUR_TO_USD
// =============================================================================
export const JURISDICTIONS_DATA: JurisdictionData[] = [
  // ── LATAM ──────────────────────────────────────────────────────────────────
  {
    id: "AR", name: "Argentina", office: "INPI AR", flag: "🇦🇷", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", first: 165, additional: 135 },
  },
  {
    id: "BR", name: "Brazil", office: "INPI BR", flag: "🇧🇷", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", first: 370, additional: 295 },
  },
  {
    id: "MX", name: "Mexico", office: "IMPI", flag: "🇲🇽", region: "LATAM", currency: "USD",
    trademark: { model: "single_class", first: 330 },
    notes: "Single class system — one filing per class required.",
  },
  {
    id: "UY", name: "Uruguay", office: "DNPI", flag: "🇺🇾", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", first: 397, additional: 397 },
    notes: "Multiclass system.",
  },
  {
    id: "CL", name: "Chile", office: "INAPI", flag: "🇨🇱", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", first: 385, additional: 385, grantedFeePerClass: 190 },
    notes: "An additional fee of USD 190 per class is due only if the trademark is granted.",
  },
  {
    id: "PY", name: "Paraguay", office: "DINAPI", flag: "🇵🇾", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", first: 330, additional: 330 },
    notes: "Certificate is free of charge.",
  },
  {
    id: "PE", name: "Peru", office: "INDECOPI", flag: "🇵🇪", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", first: 485, additional: 485 },
    notes: "Search is free of charge.",
  },
  {
    id: "EC", name: "Ecuador", office: "SENADI", flag: "🇪🇨", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", first: 540, additional: 540 },
    notes: "Search is free of charge.",
  },
  {
    id: "CO", name: "Colombia", office: "SIC", flag: "🇨🇴", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", first: 624, additional: 624 },
    notes: "Search is free of charge.",
  },
  {
    id: "CR", name: "Costa Rica", office: "RNPIC", flag: "🇨🇷", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", first: 405, additional: 405 },
    notes: "Search fee of USD 75 is deductible from the filing fee.",
  },
  {
    id: "DO", name: "Dominican Rep.", office: "ONAPI", flag: "🇩🇴", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", first: 443, additional: 443 },
    notes: "Simple POA accepted signed by email.",
  },
  {
    id: "PA", name: "Panama", office: "DIGERPI", flag: "🇵🇦", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", first: 489, additional: 489 },
    notes: "Search fee of USD 75 is deductible from the filing fee.",
  },
  {
    id: "BO", name: "Bolivia", office: "SENAPI", flag: "🇧🇴", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", first: 545, additional: 545 },
    notes: "Mandatory POA registration fee of USD 40 applies.",
  },
  {
    id: "HN", name: "Honduras", office: "PI Honduras", flag: "🇭🇳", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", first: 495, additional: 495 },
    notes: "Certificate issuance takes approximately 2–3 months.",
  },
  {
    id: "GT", name: "Guatemala", office: "MINECO", flag: "🇬🇹", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", first: 473, additional: 473 },
    notes: "Mandatory POA registration (USD 50) and translation fees may apply.",
  },
  {
    id: "NI", name: "Nicaragua", office: "MIFIC", flag: "🇳🇮", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", first: 535, additional: 535 },
    notes: "Registration number is required for legal entities.",
  },
  {
    id: "SV", name: "El Salvador", office: "CNR", flag: "🇸🇻", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", first: 465, additional: 465 },
    notes: "POA must be notarized and apostilled.",
  },
  {
    id: "VE", name: "Venezuela", office: "SAPI", flag: "🇻🇪", region: "LATAM", currency: "USD",
    trademark: { model: "per_class", first: 645, additional: 645 },
    notes: "Fee includes search and POA registration.",
  },
  {
    id: "CU", name: "Cuba", office: "OCPI", flag: "🇨🇺", region: "LATAM", currency: "USD",
    trademark: { model: "fixed_3", first: 1092 },
    notes: "Fixed fee covers up to 3 classes. A final grant fee of USD 365 applies later.",
  },
  // ── NORTH AMERICA ──────────────────────────────────────────────────────────
  {
    id: "US", name: "United States", office: "USPTO", flag: "🇺🇸", region: "North America", currency: "USD",
    trademark: { model: "per_class", first: 830, additional: 830 },
    notes: "Fee is per class. Declaration of use required during prosecution.",
  },
  // ── EUROPE — values stored in EUR, converted to USD at runtime ─────────────
  {
    id: "EU", name: "European Union", office: "EUIPO", flag: "🇪🇺", region: "Europe", currency: "EUR",
    trademark: { model: "tiered", first: 1150, second: 200, thirdPlus: 225 },
    notes: "Priority rights: EUR 50. Prices in EUR — converted to USD at the rate shown.",
  },
  {
    id: "UK", name: "United Kingdom", office: "UKIPO", flag: "🇬🇧", region: "Europe", currency: "EUR",
    trademark: { model: "tiered", first: 500, second: 210, thirdPlus: 210 },
    notes: "Priority rights: EUR 50. Prices in EUR — converted to USD at the rate shown.",
  },
  {
    id: "DE", name: "Germany", office: "DPMA", flag: "🇩🇪", region: "Europe", currency: "EUR",
    trademark: { model: "fixed_3", first: 740 },
    notes: "Fixed fee covers up to 3 classes. Priority rights: EUR 50. Prices in EUR — converted to USD at the rate shown.",
  },
  {
    id: "FR", name: "France", office: "INPI FR", flag: "🇫🇷", region: "Europe", currency: "EUR",
    trademark: { model: "tiered", first: 640, second: 265, thirdPlus: 265 },
    notes: "Priority rights: EUR 50. Prices in EUR — converted to USD at the rate shown.",
  },
  {
    id: "ES", name: "Spain", office: "OEPM", flag: "🇪🇸", region: "Europe", currency: "EUR",
    trademark: { model: "tiered", first: 580, second: 315, thirdPlus: 315 },
    notes: "Priority rights: EUR 50. Prices in EUR — converted to USD at the rate shown.",
  },
  {
    id: "BX", name: "Benelux", office: "BOIP", flag: "🇧🇪", region: "Europe", currency: "EUR",
    trademark: { model: "tiered", first: 700, second: 255, thirdPlus: 240 },
    notes: "Priority rights: EUR 50. Prices in EUR — converted to USD at the rate shown.",
  },
];

// =============================================================================
// HELPERS
// =============================================================================

export function getJurisdiction(id: JurisdictionId): JurisdictionData {
  return JURISDICTIONS_DATA.find((j) => j.id === id)!;
}

// Converts a source-currency amount to USD at runtime
function toUSD(amount: number, currency: "USD" | "EUR"): number {
  return currency === "EUR" ? Math.round(amount * EUR_TO_USD) : amount;
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

// Computes the trademark filing total in USD for n classes.
// EUR→USD conversion uses EUR_TO_USD at the moment of the call —
// changing the constant and redeploying is sufficient to update all EUR prices.
export function computeTrademarkTotal(id: JurisdictionId, nClasses: number): number {
  const j = getJurisdiction(id);
  const p = j.trademark;
  const c = j.currency;

  switch (p.model) {
    case "single_class":
      return toUSD(p.first, c);

    case "fixed_3":
      return toUSD(p.first, c);

    case "per_class": {
      if (nClasses <= 0) return 0;
      const extra = Math.max(0, nClasses - 1) * (p.additional ?? 0);
      return toUSD(p.first + extra, c);
    }

    case "tiered": {
      if (nClasses <= 0) return 0;
      let total = p.first;
      if (nClasses >= 2) total += (p.second ?? 0);
      if (nClasses >= 3) total += (p.thirdPlus ?? 0) * (nClasses - 2);
      return toUSD(total, c);
    }
  }
}

export function grantedFeeTotal(id: JurisdictionId, nClasses: number): number {
  const j = getJurisdiction(id);
  return (j.trademark.grantedFeePerClass ?? 0) * nClasses;
}

export interface ComputedLine {
  jurisdiction: JurisdictionData;
  nClasses: number;
  filingTotal: number;
  grantedFee: number;
  grandTotal: number;
}

export function computeLine(id: JurisdictionId, nClasses: number): ComputedLine {
  const j = getJurisdiction(id);
  const filing = computeTrademarkTotal(id, nClasses);
  const granted = grantedFeeTotal(id, nClasses);
  return {
    jurisdiction: j,
    nClasses,
    filingTotal: filing,
    grantedFee: granted,
    grandTotal: filing + granted,
  };
}
