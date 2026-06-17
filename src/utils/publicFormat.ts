export function uniqueValues(values: string[]) {
  return Array.from(new Set(values))
}

export function numericTextValue(value: string) {
  return Number(value.replace(/[^\d]/g, ''))
}

export function compactNumber(value: number) {
  if (value >= 1000) {
    return `${Math.round(value / 1000)}K`
  }
  return String(value)
}
