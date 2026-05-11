import type { DatasetKey } from '../types/metrics'

interface Props {
  selected: DatasetKey
  onChange: (key: DatasetKey) => void
}

const DATASETS: DatasetKey[] = ['A', 'B', 'C', 'D']

export function DatasetSelector({ selected, onChange }: Props) {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {DATASETS.map(key => (
        <button
          key={key}
          onClick={() => onChange(key)}
          style={{
            padding: '8px 20px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: selected === key ? 'bold' : 'normal',
            backgroundColor: selected === key ? '#2563eb' : '#e5e7eb',
            color: selected === key ? 'white' : '#374151',
          }}
        >
          Dataset {key}
        </button>
      ))}
    </div>
  )
}