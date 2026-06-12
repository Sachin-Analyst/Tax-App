export function fmt(num) {
  if (num === null || isNaN(Number(num)) || num === '') return '₹0'
  return `₹${Number(num).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
}

export function fmtNum(num) {
  if (!num || isNaN(Number(num))) return '0'
  return Number(num).toLocaleString('en-IN', { maximumFractionDigits: 0 })
}

export function toNum(val) {
  const num = Number(val)
  return isNaN(num) ? 0 : num
}

export function calc80CTotal(data) {
  if (!data || !data.has80CItems || data.has80CItems.length === 0) return 0
  let total = 0
  for (const key of data.has80CItems) {
    if (data.investments80C && data.investments80C[key]) {
      total += toNum(data.investments80C[key])
    }
  }
  return total
}
