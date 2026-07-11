/**
 * 格式化日期字符串
 * @param value 日期字符串
 * @returns 格式化后的日期字符串
 * @example formatDate('2023-01-01T00:00:00Z') // '2023-01-01 00:00:00'
 */
export function formatDate(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString()
}
