import React from 'react'
import { useRouter } from 'next/router'

import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { CFilterHeaderTable } from '@/v3/presentation/components/Table'
import { limit } from '@/constants/api'
import { useFetchBrowseInstitutionRequestedAnalysis } from '@/v3/presentation/hooks/api/@v2/mental-health/reports/request-analysis/useFetchBrowseInstitutionRequestedAnalysis'

import { IInstitutionRequestedAnalysisFilterFields } from './type'
import { RequestedAnalysisTable } from './RequestedAnalysisTable'

export const InstitutionRequestedAnalysisTable = ({ institutionId }: { institutionId: number }) => {
  const router = useRouter()
  const queryParams = router.query as IInstitutionRequestedAnalysisFilterFields
  const { replaceManyQueryParam } = useUrlQueryControl({})

  const { data: response, isPending } = useFetchBrowseInstitutionRequestedAnalysis({
    limit: limit,
    offset: queryParams.offset,
    name: queryParams.name,
    institutionId,
  })

  const onSetFilters = (filters: IInstitutionRequestedAnalysisFilterFields) => {
    if (!filters.offset) filters.offset = 0
    replaceManyQueryParam(filters)
  }

  return (
    <>
      <CFilterHeaderTable
        placeholder='Nome do aluno'
        onSearch={(value) => onSetFilters({ name: value })}
        inputValue={queryParams.name}
        boxProps={{ mb: 2 }}
      />

      <RequestedAnalysisTable
        data={response?.data}
        isLoading={isPending}
        count={response?.pagination.total}
        offset={queryParams.offset}
        onChangePage={(_, offset) => onSetFilters({ offset })}
      />
    </>
  )
}

export default InstitutionRequestedAnalysisTable
