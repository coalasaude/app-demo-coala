import { Box } from '@mui/material'
import { useRouter } from 'next/router'

import Paper from '@/v3/presentation/components/Paper'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'

import { LastHealthHistoryTable } from './components/LastHealthHistoryTable'
import { FillHealthHistory } from './components/FillHealthHistory'

export const HealthHistoryContent = ({
  institutionId,
}: {
  institutionId: number
  isMobile: boolean
}) => {
  const router = useRouter()

  const onClickChartCard = () => {
    router.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.ORGANIZATION.INSTITUTION.path, {
        id: institutionId,
      }),
    )
  }

  return (
    <>
      <Paper height={460} display='flex' flexDirection='column'>
        <LastHealthHistoryTable institutionId={institutionId} />
        <Box
          flex={1}
          display='flex'
          alignItems='center'
          sx={{ cursor: 'pointer' }}
          onClick={onClickChartCard}
        >
          <FillHealthHistory institutionId={institutionId} />
        </Box>
      </Paper>
    </>
  )
}
