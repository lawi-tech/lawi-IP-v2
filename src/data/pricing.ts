// =============================================================================
// LAWI — IP Cost Simulator · Pricing Data
// =============================================================================
// HOW TO UPDATE:
//   1. EUR → USD rate: edit EUR_TO_USD below (conversion happens at runtime).
//   2. Standard countries: find jurisdiction in JURISDICTIONS_DATA and update values.
//   3. Detailed countries (BR, AR): update DETAILED_SERVICES arrays below.
// =============================================================================

// ─── EXCHANGE RATE ────────────────────────────────────────────────────────────
export const EUR_TO_USD = 1.10;
export const EUR_RATE_DATE = "April 2026";
// ─────────────────────────────────────────────────────────────────────────────

// =============================================================================
// DETAILED SERVICES — Brazil & Argentina
// =============================================================================

export interface DetailedService {
  id: string;
  number: string;
  description: string;
  lawiFeePF?: number;   // Brazil only
  lawiFeePJ?: number;   // Brazil only
  lawiFee?: number;     // Argentina (single fee)
  officialFeePF?: number;
  officialFeePJ?: number;
  officialFee?: number;
  notes?: string;
}

export const BRAZIL_SERVICES: DetailedService[] = [
  { id: "br_01", number: "01", description: "Trademark application, in one or first class", lawiFee: 140, officialFeePF: 88, officialFeePJ: 176 },
  { id: "br_02", number: "02", description: "Trademark application in an additional class", lawiFee: 120, officialFeePF: 88, officialFeePJ: 176 },
  { id: "br_03", number: "03", description: "Trademark application in one class or first class (with free specification)", lawiFee: 140, officialFeePF: 172, officialFeePJ: 344 },
  { id: "br_04", number: "04", description: "Trademark application in an additional class (with free-form specification)", lawiFee: 120, officialFeePF: 172, officialFeePJ: 344 },
  { id: "br_05", number: "05", description: "Claiming priority (subsequent to the filing date)", lawiFee: 50, officialFeePF: 15, officialFeePJ: 15 },
  { id: "br_06a", number: "06", description: "Designation under the Madrid Protocol, in one or first class", lawiFee: 200, officialFeePF: 60, officialFeePJ: 60 },
  { id: "br_06b", number: "06b", description: "Madrid Protocol — for each country", lawiFee: 50, officialFeePF: 0, officialFeePJ: 0 },
  { id: "br_06c", number: "06c", description: "Madrid Protocol — in an additional class", lawiFee: 180, officialFeePF: 60, officialFeePJ: 60 },
  { id: "br_07", number: "07", description: "Completion of registration and issuance of the certificate", lawiFee: 30, officialFeePF: 0, officialFeePJ: 0 },
  { id: "br_08", number: "08", description: "Completion of registration and issuance of the certificate (Madrid Protocol)", lawiFee: 30, officialFeePF: 0, officialFeePJ: 0 },
  { id: "br_09", number: "09", description: "Response to formal requirements", lawiFee: 60, officialFeePF: 30, officialFeePJ: 30 },
  { id: "br_10", number: "10", description: "Legal opinion of trademark search", lawiFee: 80, officialFeePF: 0, officialFeePJ: 0 },
  { id: "br_11", number: "11", description: "Partial limitation of the protection (restriction of goods)", lawiFee: 50, officialFeePF: 34, officialFeePJ: 34 },
  { id: "br_12", number: "12", description: "Opposition to the registration of a new trademark", lawiFee: 220, officialFeePF: 25, officialFeePJ: 104 },
  { id: "br_13", number: "13", description: "Statement regarding opposition (response)", lawiFee: 190, officialFeePF: 18, officialFeePJ: 36 },
  { id: "br_14", number: "14", description: "Administrative nullity proceedings", lawiFee: 250, officialFeePF: 85, officialFeePJ: 170 },
  { id: "br_15", number: "15", description: "Response to administrative nullity proceedings", lawiFee: 220, officialFeePF: 18, officialFeePJ: 36 },
  { id: "br_16", number: "16", description: "Request for trademark cancellation due to non-use", lawiFee: 180, officialFeePF: 59, officialFeePJ: 118 },
  { id: "br_17", number: "17", description: "Change of corporate name", lawiFee: 100, officialFeePF: 11, officialFeePJ: 11 },
  { id: "br_18", number: "18", description: "Change of address", lawiFee: 60, officialFeePF: 10, officialFeePJ: 10 },
  { id: "br_19", number: "19", description: "Change of attorney", lawiFee: 60, officialFeePF: 18, officialFeePJ: 18 },
  { id: "br_20", number: "20", description: "Request for extension (trademark renewal) — ordinary term", lawiFee: 120, officialFeePF: 100, officialFeePJ: 200 },
  { id: "br_21", number: "21", description: "Request for extension (trademark renewal) — extraordinary term", lawiFee: 120, officialFeePF: 200, officialFeePJ: 400 },
  { id: "br_22", number: "22", description: "Appeal against rejection of trademark registration application", lawiFee: 220, officialFeePF: 70, officialFeePJ: 140 },
  { id: "br_23", number: "23", description: "Trademark monitoring — optional (annual)", lawiFee: 20, officialFeePF: 0, officialFeePJ: 0 },
  { id: "br_24", number: "24", description: "Registration of trademark assignment", lawiFee: 150, officialFeePF: 34, officialFeePJ: 34 },
  { id: "br_25", number: "25", description: "Registration of trademark assignment (per additional class)", lawiFee: 75, officialFeePF: 18, officialFeePJ: 18 },
  { id: "br_26", number: "26", description: "Second trademark certificate", lawiFee: 100, officialFeePF: 46, officialFeePJ: 46 },
];

export const ARGENTINA_SERVICES: DetailedService[] = [
  { id: "ar_01", number: "01", description: "Trademark clearance search", lawiFee: 0, officialFee: 0, notes: "Free" },
  { id: "ar_02", number: "02", description: "Application submission in a class", lawiFee: 100, officialFee: 26 },
  { id: "ar_03", number: "03", description: "Application submission for additional classes", lawiFee: 75, officialFee: 26 },
  { id: "ar_04", number: "04", description: "Submission of renewal application", lawiFee: 100, officialFee: 26 },
  { id: "ar_05", number: "05", description: "Application for renewal in additional classes", lawiFee: 75, officialFee: 26 },
  { id: "ar_06", number: "06", description: "Submission of declaration of use in the medium term (5th–6th year)", lawiFee: 50, officialFee: 12 },
  { id: "ar_07", number: "07", description: "Priority claim", lawiFee: 75, officialFee: 0 },
  { id: "ar_08", number: "08", description: "Response to official review by formal examination prior to publication", lawiFee: 0, officialFee: 0, notes: "Free" },
  { id: "ar_09", number: "09", description: "Official response on substantial grounds", lawiFee: 200, officialFee: 0 },
  { id: "ar_10", number: "10", description: "Ratified opposition response", lawiFee: 250, officialFee: 14 },
  { id: "ar_11", number: "11", description: "Presentation of opposition (without development of grounds)", lawiFee: 150, officialFee: 26 },
  { id: "ar_12", number: "12", description: "Presentation of objection (with written grounds)", lawiFee: 250, officialFee: 26 },
  { id: "ar_13", number: "13", description: "Ratification of opposition (without further explanation)", lawiFee: 100, officialFee: 132 },
  { id: "ar_14", number: "14", description: "Ratification of opposition + presentation and expansion of grounds", lawiFee: 250, officialFee: 132 },
  { id: "ar_15", number: "15", description: "Production of evidence in the opposition process", lawiFee: 250, officialFee: 0 },
  { id: "ar_16", number: "16", description: "Presentation of final arguments in the opposition process", lawiFee: 150, officialFee: 0 },
  { id: "ar_17", number: "17", description: "Presentation of opposition in each additional class", lawiFee: 150, officialFee: 26 },
  { id: "ar_18", number: "18", description: "Transfer (assignment) of trademark", lawiFee: 200, officialFee: 0 },
  { id: "ar_19", number: "19", description: "Name change", lawiFee: 200, officialFee: 52 },
  { id: "ar_20", number: "20", description: "For each additional brand included in the same name change", lawiFee: 150, officialFee: 52 },
];

// =============================================================================
// STANDARD COUNTRIES
// =============================================================================

export type JurisdictionId =
  | "AR" | "BR" | "MX" | "UY" | "CL" | "PY" | "PE" | "EC" | "CO"
  | "CR" | "DO" | "PA" | "BO" | "HN" | "GT" | "NI" | "SV" | "VE" | "CU"
  | "US" | "EU" | "UK" | "DE" | "FR" | "ES" | "BX";

export const DETAILED_JURISDICTION_IDS: JurisdictionId[] = ["BR", "AR"];

export type ClassModel = "per_class" | "single_class" | "fixed_3" | "tiered" | "detailed";

export interface ClassPricing {
  model: ClassModel;
  lawiFirst: number;
  lawiAdditional?: number;
  lawiSecond?: number;
  lawiThirdPlus?: number;
  officialFirst: number;
  officialAdditional?: number;
  officialSecond?: number;
  officialThirdPlus?: number;
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
  // AR and BR use detailed mode — minimal placeholder for shared logic
  {
    id: "AR", name: "Argentina", office: "INPI AR", flag: "🇦🇷", region: "LATAM", currency: "USD",
    trademark: { model: "detailed", lawiFirst: 0, officialFirst: 0 },
  },
  {
    id: "BR", name: "Brazil", office: "INPI BR", flag: "🇧🇷", region: "LATAM", currency: "USD",
    trademark: { model: "detailed", lawiFirst: 0, officialFirst: 0 },
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
  {
    id: "US", name: "United States", office: "USPTO", flag: "🇺🇸", region: "North America", currency: "USD",
    trademark: { model: "per_class", lawiFirst: 480, officialFirst: 350, lawiAdditional: 480, officialAdditional: 350 },
    notes: "Fee is per class. Declaration of use required during prosecution.",
  },
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

export function isDetailed(id: JurisdictionId): boolean {
  return DETAILED_JURISDICTION_IDS.includes(id);
}

function toUSD(amount: number, currency: "USD" | "EUR"): number {
  return currency === "EUR" ? Math.round(amount * EUR_TO_USD) : Math.round(amount * 100) / 100;
}

export function maxClasses(id: JurisdictionId): number {
  const j = getJurisdiction(id);
  if (j.trademark.model === "detailed") return 1;
  if (j.trademark.model === "single_class") return 1;
  if (j.trademark.model === "fixed_3") return 3;
  return 10;
}

export function classModelLabel(id: JurisdictionId): string {
  const j = getJurisdiction(id);
  switch (j.trademark.model) {
    case "detailed":     return "Full service menu";
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

export function computeStandardBreakdown(id: JurisdictionId, nClasses: number): FeeBreakdown {
  const j = getJurisdiction(id);
  const p = j.trademark;
  const c = j.currency;
  let lawi = 0;
  let official = 0;

  switch (p.model) {
    case "single_class":
    case "fixed_3":
    case "detailed":
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
  // Detailed mode
  isDetailed?: boolean;
  selectedServices?: SelectedService[];
}

export interface SelectedService {
  service: DetailedService;
  entityType?: "PF" | "PJ"; // Brazil only
  lawiFee: number;
  officialFee: number;
  total: number;
}

export function computeLine(id: JurisdictionId, nClasses: number): ComputedLine {
  const j = getJurisdiction(id);
  const b = computeStandardBreakdown(id, nClasses);
  return { jurisdiction: j, nClasses, ...b };
}

export function computeDetailedLine(
  id: JurisdictionId,
  selectedServices: SelectedService[]
): ComputedLine {
  const j = getJurisdiction(id);
  const lawiTotal = selectedServices.reduce((s, x) => s + x.lawiFee, 0);
  const officialTotal = selectedServices.reduce((s, x) => s + x.officialFee, 0);
  const filingTotal = lawiTotal + officialTotal;
  return {
    jurisdiction: j, nClasses: 0,
    lawiTotal, officialTotal, filingTotal,
    grantedFee: 0, grandTotal: filingTotal,
    isDetailed: true, selectedServices,
  };
}

export function computeTrademarkTotal(id: JurisdictionId, nClasses: number): number {
  return computeStandardBreakdown(id, nClasses).filingTotal;
}

export function grantedFeeTotal(id: JurisdictionId, nClasses: number): number {
  return computeStandardBreakdown(id, nClasses).grantedFee;
}
