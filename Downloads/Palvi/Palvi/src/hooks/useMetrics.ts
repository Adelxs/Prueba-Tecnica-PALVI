import { useState, useEffect } from 'react'
import type { MetricsData, Dataset, DatasetKey } from '../types/metrics'

interface UseMetricsReturn {
  data: MetricsData | null
  currentDataset: Dataset | null
  selectedKey: DatasetKey
  setSelectedKey: (key: DatasetKey) => void
  loading: boolean
  error: string | null
}

export function useMetrics(): UseMetricsReturn {
  const [data, setData] = useState<MetricsData | null>(null)
  const [selectedKey, setSelectedKey] = useState<DatasetKey>('A')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/metrics.json')
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar el archivo')
        return res.json()
      })
      .then((json: MetricsData) => {
        setData(json)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const currentDataset = data ? data[selectedKey] : null

  return { data, currentDataset, selectedKey, setSelectedKey, loading, error }
}