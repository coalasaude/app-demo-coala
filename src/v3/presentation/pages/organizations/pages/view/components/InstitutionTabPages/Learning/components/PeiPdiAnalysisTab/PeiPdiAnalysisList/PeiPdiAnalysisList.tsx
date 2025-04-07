import { Box } from '@mui/material'

import { BrowseInstitutionalPeiPdiPlans } from '@/v3/domain/@v2/mental-health/learning/browse-institutional-pei-pdi.model'
import CPagination from '@/v3/presentation/newComponents/molecules/CPagination'
import { NotFound } from '@/v3/presentation/components/NotFound'

import PeiPdiAnalysisCard from '../PeiPdiAnalysisCard/PeiPdiAnalysisCard'
import PeiPdiAnalysisBodySkeleton from '../../PeiPdiAnalysisBodySkeleton/PeiPdiAnalysisBodySkeleton'

interface PeiPdiAnalysisListProps {
  plans: BrowseInstitutionalPeiPdiPlans
  setOffset: (offset: number) => void
  pageCounter: number
  setPageCounter: (page: number) => void
  isLoading?: boolean
}

const PeiPdiAnalysisList = ({
  plans,
  setOffset,
  pageCounter,
  setPageCounter,
  isLoading,
}: PeiPdiAnalysisListProps) => {
  if (isLoading) return <PeiPdiAnalysisBodySkeleton />

  return (
    <Box>
      {plans.data &&
        !isLoading &&
        plans.data?.map((plan) => <PeiPdiAnalysisCard key={plan.id} plan={plan} />)}
      {plans.pagination && plans.pagination.total > plans.pagination.limit && !isLoading && (
        <CPagination
          totalCount={plans.pagination.total}
          page={plans.pagination.offset / plans.pagination.limit + 1}
          defaultPage={pageCounter}
          count={Math.ceil((plans.pagination.total || 0) / plans.pagination.limit)}
          onChange={(e, page) => {
            setPageCounter(page)
            setOffset((page - 1) * (plans?.pagination?.limit || 10))
          }}
        />
      )}
      {plans.data?.length === 0 && <NotFound />}
    </Box>
  )
}

export default PeiPdiAnalysisList
