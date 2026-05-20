/**
 * 金额格式化，加千分位
 */
export function formatMoney(n: number, withSymbol = true): string {
  const fixed = Number(n).toFixed(0)
  const text = fixed.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return withSymbol ? `¥${text}` : text
}

/**
 * 距离格式化
 */
export function formatKm(n: number): string {
  return `${Number(n).toFixed(n < 100 ? 1 : 0)}km`
}

/**
 * 温度格式化
 */
export function formatTemp(n: number): string {
  return `${n > 0 ? '' : ''}${n.toFixed(1)}℃`
}
