import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { DayMetrics } from '../types/metrics'

interface Props {
  days: DayMetrics[]
}

export function FunnelChart({ days }: Props) {
  // Los días ya vienen filtrados por el rango seleccionado desde App.tsx
  const totalTraffic = days.reduce((acc, d) => acc + d.metrics.traffic, 0)

  const data = days.map(d => ({
    date: d.date.slice(5),
    Leads: d.metrics.leads_created,
    Calificados: d.metrics.leads_qualified,
    Deals: d.metrics.deals_created,
    Ganados: d.metrics.deals_won,
  }))

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid #e5e7eb',
    }}>
      {/* Sección de KPI de Tráfico */}
      <div style={{
        paddingBottom: '16px',
        borderBottom: '1px solid #f3f4f6',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Tráfico Total (período)</span>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>
            {totalTraffic.toLocaleString()}
          </span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h2 style={{ margin: 0, fontSize: '16px', color: '#111827' }}>
            Pipeline de Ventas
          </h2>
          <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
            {days.length} {days.length === 1 ? 'día' : 'días'}
          </p>
        </div>
      </div>

      {/* Gráfico de Ventas */}
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            cursor={{ fill: '#f9fafb' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend />
          <Bar dataKey="Leads" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Calificados" fill="#2563eb" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Deals" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Ganados" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
