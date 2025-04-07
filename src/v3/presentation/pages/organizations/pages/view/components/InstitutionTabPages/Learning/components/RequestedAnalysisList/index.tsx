import { CDivider } from '@/v3/presentation/newComponents'

import { RequestedAnalysisHeader } from '../RequestedAnalysisHeader'
import InstitutionRequestedAnalysisTable from '../RequestedAnalysisTable'

export const RequestedAnalysisList = ({ institutionId }: { institutionId: number }) => {
  return (
    <>
      <RequestedAnalysisHeader institutionId={institutionId} />
      <CDivider sx={{ borderBottomWidth: 2, mb: 2 }} />
      <InstitutionRequestedAnalysisTable institutionId={institutionId} />
    </>
  )
}
