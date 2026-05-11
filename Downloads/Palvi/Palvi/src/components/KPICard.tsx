import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface Props {
  label: string
  value: string
  trend: 'good' | 'bad' | 'neutral'
  subtitle?: string
}

const TREND_CONFIG = {
  good: { color: '#16a34a', bg: '#f0fdf4', Icon: TrendingUp },
  bad: { color: '#dc2626', bg: '#fef2f2', Icon: TrendingDown },
  neutral: { color: '#6b7280', bg: '#f9fafb', Icon: Minus },
}

export function KPICard({ label, value, trend, subtitle }: Props) {
  const { color, bg, Icon } = TREND_CONFIG[trend]

  return (
    <div style={{
      backgroundColor: bg,
      border: `1px solid ${color}`,
      borderRadius: '12px',
      padding: '20px',
      flex: 1,
      minWidth: '180px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: 500 }}>{label}</span>
        <Icon size={20} color={color} />
      </div>
      <div style={{ fontSize: '32px', fontWeight: 'bold', color, marginTop: '8px' }}>
        {value}
      </div>
      {subtitle && (
        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
          {subtitle}
        </div>
      )}
    </div>
  )
}