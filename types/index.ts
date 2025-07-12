export interface Dataset {
  id: string
  title: string
  description: string
  created: string
  modified: string
  download_count: number
  has_charts: boolean
  sectors: string[]
  formats: string[]
  tags: string[]
  organization: {
    name: string
    logo: string
  }
  metadata: Array<{
    metadata_item: {
      label: string
    }
    value: string
  }>
}

export interface ApiResponse {
  results: Dataset[]
  total: number
  aggregations: {
    Geography: Record<string, number>
    sectors: Record<string, number>
    tags: Record<string, number>
    formats: Record<string, number>
  }
}

export interface FilterState {
  sectors: string[]
  geography: string[]
  tags: string[]
  formats: string[]
}

export interface FilterChip {
  category: keyof FilterState
  value: string
  label: string
}
