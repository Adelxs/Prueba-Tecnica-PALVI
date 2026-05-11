import type { DayMetrics, MetricMeta } from '../types/metrics'

interface Props {
  days: DayMetrics[]
  metricsMeta: MetricMeta[]
}

export function MetricsTable({ days, metricsMeta }: Props) {
  // Los días ya vienen filtrados por el rango seleccionado desde App.tsx
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid #e5e7eb',
      overflowX: 'auto',
    }}>
      <h2 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#111827' }}>
        Detalle — {days.length} {days.length === 1 ? 'día' : 'días'}
      </h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ textAlign: 'left', padding: '8px', color: '#6b7280' }}>Métrica</th>
            {days.map(d => (
              <th key={d.date} style={{ textAlign: 'right', padding: '8px', color: '#6b7280' }}>
                {d.date.slice(5)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {metricsMeta.map((meta, i) => (
            <tr
              key={meta.key}
              style={{ backgroundColor: i % 2 === 0 ? '#f9fafb' : 'white' }}
            >
              <td style={{ padding: '8px', color: '#374151', fontWeight: 500 }}>
                {meta.label}
              </td>
              {days.map(d => {
                const val = d.metrics[meta.key as keyof DayMetrics['metrics']]
                return (
                  <td key={d.date} style={{ textAlign: 'right', padding: '8px', color: '#111827' }}>
                    {val !== null && val !== undefined ? Number(val).toFixed(1) : '—'}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
