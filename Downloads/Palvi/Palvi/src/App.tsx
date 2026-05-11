import { useState } from 'react'
import { useMetrics } from './hooks/useMetrics'
import { DatasetSelector } from './components/DatasetSelector'
import { TimeRangeSelector } from './components/TimeRangeSelector'
import type { TimeRange } from './components/TimeRangeSelector'
import { KPICard } from './components/KPICard'
import { FunnelChart } from './components/FunnelChart'
import { SupportSection } from './components/SupportSection'
import { MetricsTable } from './components/MetricsTable'
import { getLastNDays, lastValue, average, winRate, getTrend } from './utils/calculations'

const RANGE_DAYS: Record<TimeRange, number> = {
  day:   1,
  week:  7,
  month: 30,
  year:  365,
}

export default function App() {
  const { currentDataset, selectedKey, setSelectedKey, loading, error } = useMetrics()
  const [timeRange, setTimeRange] = useState<TimeRange>('week')

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      Cargando...
    </div>
  )

  if (error || !currentDataset) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#dc2626' }}>
      Error: {error}
    </div>
  )

  const { days, metadata } = currentDataset

  // Días filtrados según el rango seleccionado
  const filteredDays = getLastNDays(days, RANGE_DAYS[timeRange])

  // KPIs calculados sobre el rango filtrado
  const leadsHoy = lastValue(filteredDays, 'leads_created')
  const leadsPromedio = average(filteredDays, 'leads_created')
  const leadsTrend = getTrend(leadsHoy, leadsPromedio, 'higher_is_better')

  const responseHoy = lastValue(filteredDays, 'avg_response_time_min')
  const responsePromedio = average(filteredDays, 'avg_response_time_min')
  const responseTrend = getTrend(responseHoy, responsePromedio, 'lower_is_better')

  const staleHoy = lastValue(filteredDays, 'stale_deals')
  const stalePromedio = average(filteredDays, 'stale_deals')
  const staleTrend = getTrend(staleHoy, stalePromedio, 'lower_is_better')

  const wr = winRate(filteredDays)
  // Para win rate anterior usamos el período anterior de igual duración
  const rangeN = RANGE_DAYS[timeRange]
  const prevPeriod = getLastNDays(days, rangeN * 2).slice(0, rangeN)
  const wrPrev = winRate(prevPeriod)
  const wrTrend = getTrend(wr, wrPrev, 'higher_is_better')

  const lastDate = filteredDays.length > 0 ? filteredDays[filteredDays.length - 1].date : '—'
  const firstDate = filteredDays.length > 0 ? filteredDays[0].date : '—'

  const rangeLabel = filteredDays.length === 1
    ? lastDate
    : `${firstDate} → ${lastDate}`

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      padding: '24px 40px',
      fontFamily: 'system-ui, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', color: '#111827' }}>
            Executive Report
          </h1>
          <span style={{ fontSize: '13px', color: '#6b7280' }}>
            {rangeLabel}
          </span>
        </div>
        <DatasetSelector selected={selectedKey} onChange={setSelectedKey} />
      </div>

      {/* Filtro de rango temporal */}
      <div style={{ marginBottom: '24px' }}>
        <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
      </div>

      {/* KPIs */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <KPICard
          label="Leads (último dato)"
          value={leadsHoy !== null ? String(leadsHoy) : '—'}
          trend={leadsTrend}
          subtitle={leadsPromedio !== null ? `promedio período: ${leadsPromedio.toFixed(1)}` : undefined}
        />
        <KPICard
          label="Tiempo de respuesta"
          value={responseHoy !== null ? `${responseHoy.toFixed(0)} min` : '—'}
          trend={responseTrend}
          subtitle={responsePromedio !== null ? `promedio período: ${responsePromedio.toFixed(0)} min` : undefined}
        />
        <KPICard
          label="Stale deals"
          value={staleHoy !== null ? String(staleHoy) : '—'}
          trend={staleTrend}
          subtitle={stalePromedio !== null ? `promedio período: ${stalePromedio.toFixed(1)}` : undefined}
        />
        <KPICard
          label="Win rate (período)"
          value={wr !== null ? `${wr.toFixed(1)}%` : '—'}
          trend={wrTrend}
          subtitle={wrPrev !== null ? `período anterior: ${wrPrev.toFixed(1)}%` : undefined}
        />
      </div>

      {/* Funnel */}
      <div style={{ marginBottom: '24px' }}>
        <FunnelChart days={filteredDays} />
      </div>

      {/* Soporte */}
      <div style={{ marginBottom: '24px' }}>
        <SupportSection days={filteredDays} />
      </div>

      {/* Tabla */}
      <MetricsTable days={filteredDays} metricsMeta={metadata.metrics} />
    </div>
  )
}
