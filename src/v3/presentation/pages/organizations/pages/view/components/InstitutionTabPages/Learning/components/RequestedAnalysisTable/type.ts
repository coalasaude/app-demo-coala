import { InstitutionRequestedAnalysisModel } from '@/v3/domain/@v2/mental-health/reports/request-analysis/institution-requested-analysis.model'

export interface IInstitutionRequestedAnalysisListTable {
  data?: InstitutionRequestedAnalysisModel[]
  count?: number
  isLoading?: boolean
  onChangePage?: (page: number, offset: number) => void
  offset?: number
}

export interface IInstitutionRequestedAnalysisFilterFields {
  name?: string
  offset?: number
  limit?: number
}

export interface IDrawerFilterInstitutionRequestedAnalysisListTable {
  open: boolean
  onClose: () => Promise<void> | void
  setFilters: (filter: IInstitutionRequestedAnalysisFilterFields) => void
  filters: IInstitutionRequestedAnalysisFilterFields
  profiles: { value: number; label: string }[]
}
