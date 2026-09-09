const CURRENCY_SYMBOL = "GH₵";

/**
 * Formats a monetary value to a fixed 2 decimal places with thousands
 * separators, e.g. formatCurrency(2648.3) -> "GH₵2,648.30".
 * Accepts a number or a string (any non-numeric characters, including an
 * existing "GH₵" prefix, are stripped before parsing).
 */
export function formatCurrency(value: number | string): string {
  const numeric =
    typeof value === "number" ? value : Number(String(value).replace(/[^0-9.-]/g, ""));
  const safe = Number.isFinite(numeric) ? numeric : 0;

  const fixed = safe.toFixed(2);
  const negative = fixed.startsWith("-");
  const [whole, decimals] = (negative ? fixed.slice(1) : fixed).split(".");
  const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `${negative ? "-" : ""}${CURRENCY_SYMBOL}${withCommas}.${decimals}`;
}
