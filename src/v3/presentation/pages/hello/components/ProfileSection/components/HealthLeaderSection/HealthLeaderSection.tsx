import { Box, Typography } from '@mui/material'

import InstitutionRanking from '../../../../../organizations/pages/view/components/InstitutionCharts/Ranking'
import { HealthHistoryContent } from '../../../MetricsComponents/HealthHistoryContent/HealthHistoryContent'
import { PendingActions } from '../../../FirstSection/components/PendingActions'

export function HealthLeaderSection({
  institutionId,
  isMobile,
}: {
  isMobile: boolean
  institutionId: number
}) {
  return (
    <>
      <PendingActions />
      <Typography variant='h2'>Saúde da sua instituição</Typography>
      <Box display='grid' gridTemplateColumns={['1fr', '1fr 1fr']} gap={2}>
        <InstitutionRanking institutionId={institutionId} />
        <HealthHistoryContent isMobile={isMobile} institutionId={institutionId} />
      </Box>
    </>
  )
}
