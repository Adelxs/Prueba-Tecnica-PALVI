import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { DayMetrics } from '../types/metrics'
import { average, lastValue, getTrend } from '../utils/calculations'
import { KPICard } from './KPICard'

interface Props {
  days: DayMetrics[]
}

export function SupportSection({ days }: Props) {
  // Los días ya vienen filtrados por el rango seleccionado desde App.tsx
  const ticketsHoy = lastValue(days, 'support_tickets_opened')
  const ticketsPromedio = average(days, 'support_tickets_opened')
  const ticketsTrend = getTrend(ticketsHoy, ticketsPromedio, 'lower_is_better')

  const resolucionHoy = lastValue(days, 'support_avg_resolution_hours')
  const resolucionPromedio = average(days, 'support_avg_resolution_hours')
  const resolucionTrend = getTrend(resolucionHoy, resolucionPromedio, 'lower_is_better')

  const chartData = days.map(d => ({
    date: d.date.slice(5),
    Tickets: d.metrics.support_tickets_opened,
    'Resolución (hs)': d.metrics.support_avg_resolution_hours,
  }))

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid #e5e7eb',
    }}>
      <h2 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#111827' }}>
        Soporte
      </h2>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <KPICard
          label="Tickets (último dato)"
          value={ticketsHoy !== null ? String(ticketsHoy) : '—'}
          trend={ticketsTrend}
          subtitle={ticketsPromedio !== null ? `promedio período: ${ticketsPromedio.toFixed(1)}` : undefined}
        />
        <KPICard
          label="Resolución (último dato)"
          value={resolucionHoy !== null ? `${resolucionHoy.toFixed(1)} hs` : '—'}
          trend={resolucionTrend}
          subtitle={resolucionPromedio !== null ? `promedio período: ${resolucionPromedio.toFixed(1)} hs` : undefined}
        />
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="Tickets" stroke="#3b82f6" dot={false} />
          <Line type="monotone" dataKey="Resolución (hs)" stroke="#f59e0b" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
