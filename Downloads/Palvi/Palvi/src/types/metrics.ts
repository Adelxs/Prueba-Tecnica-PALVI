export interface MetricMeta {
  key: string
  label: string
  unit: string
  direction: 'higher_is_better' | 'lower_is_better'
  description: string
}

export interface DayMetrics {
  date: string
  metrics: {
    traffic: number
    leads_created: number
    leads_qualified: number
    avg_response_time_min: number | null
    deals_created: number
    deals_won: number
    deals_lost: number
    avg_deal_cycle_days: number | null
    stale_deals: number
    support_tickets_opened: number
    support_avg_resolution_hours: number | null
  }
}

export interface Dataset {
  metadata: {
    start_date: string
    end_date: string
    days: number
    metrics: MetricMeta[]
  }
  days: DayMetrics[]
}

export interface MetricsData {
  A: Dataset
  B: Dataset
  C: Dataset
  D: Dataset
}

export type DatasetKey = 'A' | 'B' | 'C' | 'D'