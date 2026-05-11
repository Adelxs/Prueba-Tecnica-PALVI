import type { DayMetrics } from '../types/metrics'

// Retorna los últimos N días sin nulls en una métrica específica
export function getLastNDays(days: DayMetrics[], n: number): DayMetrics[] {
  return days.slice(-n)
}

// Calcula el promedio de una métrica ignorando nulls
export function average(days: DayMetrics[], key: keyof DayMetrics['metrics']): number | null {
  const values = days
    .map(d => d.metrics[key])
    .filter((v): v is number => v !== null && v !== undefined)

  if (values.length === 0) return null
  return values.reduce((a, b) => a + b, 0) / values.length
}

// Win rate = deals_won / (deals_won + deals_lost) en un período
export function winRate(days: DayMetrics[]): number | null {
  const won = days.reduce((a, d) => a + d.metrics.deals_won, 0)
  const lost = days.reduce((a, d) => a + d.metrics.deals_lost, 0)
  const total = won + lost
  if (total === 0) return null
  return (won / total) * 100
}

// Último valor disponible de una métrica (ignorando nulls)
export function lastValue(days: DayMetrics[], key: keyof DayMetrics['metrics']): number | null {
  for (let i = days.length - 1; i >= 0; i--) {
    const val = days[i].metrics[key]
    if (val !== null && val !== undefined) return val as number
  }
  return null
}

// Determina si el valor es bueno o malo según direction
export function getTrend(
  value: number | null,
  average: number | null,
  direction: 'higher_is_better' | 'lower_is_better'
): 'good' | 'bad' | 'neutral' {
  if (value === null || average === null) return 'neutral'
  if (direction === 'higher_is_better') return value >= average ? 'good' : 'bad'
  return value <= average ? 'good' : 'bad'
}