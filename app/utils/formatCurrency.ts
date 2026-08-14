export function formatCurrency(amount: number, currencySymbol = "₹") {
  const sign = amount < 0 ? "-" : ""
  const formatted = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Math.abs(amount),
  )
  return `${sign}${currencySymbol}${formatted}`
}
