export function money(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

export function ratio(value: number): string {
  return value.toFixed(2);
}

export function percentFromFraction(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function percentPoints(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function parseNumber(raw: string): number {
  const cleaned = raw.replace(/[$,%\s]/g, "");
  if (cleaned === "" || cleaned === "." || cleaned === "-") return Number.NaN;
  return Number(cleaned);
}

export function optionalNumber(raw: string): number {
  if (raw.trim() === "") return 0;
  const value = parseNumber(raw);
  return Number.isFinite(value) ? value : 0;
}
