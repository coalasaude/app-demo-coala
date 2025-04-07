import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'

import FinishedAppointmentsCharts from '../../../../../organizations/pages/view/components/InstitutionCharts/FinishedAppointment'
import RankingCourse from '../../../../../organizations/pages/view/components/InstitutionCharts/Ranking/components/RankingCourse'
import { ActivationChart } from '../../../MetricsComponents/ActivationChart/ActivationChart'
import { PendingActions } from '../../../FirstSection/components/PendingActions'

export function ManagerSection({
  institutionId,
  isMobile,
}: {
  isMobile: boolean
  institutionId: number
}) {
  const router = useRouter()

  const onClickChart = () => {
    router.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.ORGANIZATION.INSTITUTION.path, {
        id: institutionId,
      }),
    )
  }

  return (
    <>
      <PendingActions />
      <Typography variant='h2'>Saúde da sua instituição</Typography>
      <Box
        display='grid'
        gridTemplateColumns={'repeat(12, 1fr)'}
        gridTemplateRows={['repeat(3, fit-content)', 'repeat(1, 1fr)']}
        gap={2}
        minHeight={['auto', '400px']}
      >
        <Box gridColumn={['1 / 13', '1 / 5']} gridRow={['2', '1']}>
          <RankingCourse institutionId={institutionId} />
        </Box>
        <Box
          gridColumn={['1 / 13', '5 / 8']}
          gridRow={['1', '1']}
          onClick={onClickChart}
          sx={{ cursor: 'pointer' }}
        >
          <ActivationChart isMobile={isMobile} institutionId={institutionId} />
        </Box>
        <Box
          gridColumn={['1 / 13', '8 / 13']}
          gridRow={['3', '1']}
          onClick={onClickChart}
          sx={{ cursor: 'pointer' }}
        >
          <FinishedAppointmentsCharts institutionId={institutionId} />
        </Box>
      </Box>
    </>
  )
}
