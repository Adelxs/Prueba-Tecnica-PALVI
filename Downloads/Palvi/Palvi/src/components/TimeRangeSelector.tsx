export type TimeRange = 'day' | 'week' | 'month' | 'year'

interface Props {
  selected: TimeRange
  onChange: (range: TimeRange) => void
}

const RANGES: { key: TimeRange; label: string }[] = [
  { key: 'day',   label: 'Día'     },
  { key: 'week',  label: 'Semana'  },
  { key: 'month', label: 'Mes'     },
  { key: 'year',  label: 'Año'     },
]

export function TimeRangeSelector({ selected, onChange }: Props) {
  return (
    <div style={{ display: 'flex', gap: '4px', backgroundColor: '#e5e7eb', borderRadius: '8px', padding: '4px' }}>
      {RANGES.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          style={{
            padding: '6px 16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: selected === key ? 600 : 400,
            backgroundColor: selected === key ? 'white' : 'transparent',
            color: selected === key ? '#111827' : '#6b7280',
            boxShadow: selected === key ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            transition: 'all 0.15s ease',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
