import type { AmountCadence, DownPaymentMode, DscrInputs, OccupancyType } from "@/lib/dscr";

/**
 * Compact, URL-safe encoding of calculator inputs.
 * The report page re-runs `calculateDeal` so stored numbers cannot drift.
 */
type WireV1 = {
  v: 1;
  p: number;
  dm: "pct" | "amt";
  dv: number;
  r: number;
  o: OccupancyType;
  i: number;
  y: number;
  tx: number;
  txc: "m" | "a";
  ins: number;
  insc: "m" | "a";
  hoa: number;
  hoac: "m" | "a";
  vac: number;
  mnt: number;
  pm: number;
  io: 0 | 1;
};

function cadenceToWire(cadence: AmountCadence): "m" | "a" {
  return cadence === "annual" ? "a" : "m";
}

function cadenceFromWire(value: "m" | "a"): AmountCadence {
  return value === "a" ? "annual" : "monthly";
}

function toWire(inputs: DscrInputs): WireV1 {
  return {
    v: 1,
    p: inputs.purchasePrice,
    dm: inputs.downPaymentMode === "percent" ? "pct" : "amt",
    dv: inputs.downPaymentValue,
    r: inputs.monthlyGrossRent,
    o: inputs.occupancyType,
    i: inputs.annualInterestRatePercent,
    y: inputs.termYears,
    tx: inputs.taxes,
    txc: cadenceToWire(inputs.taxesCadence),
    ins: inputs.insurance,
    insc: cadenceToWire(inputs.insuranceCadence),
    hoa: inputs.hoa,
    hoac: cadenceToWire(inputs.hoaCadence),
    vac: inputs.vacancyPercent,
    mnt: inputs.maintenancePercent,
    pm: inputs.propertyManagementPercent,
    io: inputs.interestOnly ? 1 : 0,
  };
}

function fromWire(wire: WireV1): DscrInputs {
  const downPaymentMode: DownPaymentMode = wire.dm === "pct" ? "percent" : "amount";
  return {
    purchasePrice: wire.p,
    downPaymentMode,
    downPaymentValue: wire.dv,
    monthlyGrossRent: wire.r,
    occupancyType: wire.o,
    annualInterestRatePercent: wire.i,
    termYears: wire.y,
    taxes: wire.tx,
    taxesCadence: cadenceFromWire(wire.txc),
    insurance: wire.ins,
    insuranceCadence: cadenceFromWire(wire.insc),
    hoa: wire.hoa,
    hoaCadence: cadenceFromWire(wire.hoac),
    vacancyPercent: wire.vac,
    maintenancePercent: wire.mnt,
    propertyManagementPercent: wire.pm,
    interestOnly: wire.io === 1,
  };
}

function utf8ToBase64Url(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToUtf8(value: string): string {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeReportId(inputs: DscrInputs): string {
  return utf8ToBase64Url(JSON.stringify(toWire(inputs)));
}

export function decodeReportId(id: string): DscrInputs | null {
  if (!id) return null;
  try {
    const parsed: unknown = JSON.parse(base64UrlToUtf8(decodeURIComponent(id)));
    if (!parsed || typeof parsed !== "object") return null;
    const wire = parsed as WireV1;
    if (wire.v !== 1) return null;
    if (typeof wire.p !== "number" || typeof wire.r !== "number") return null;
    if (wire.o !== "ltr" && wire.o !== "str") return null;
    return fromWire(wire);
  } catch {
    return null;
  }
}
