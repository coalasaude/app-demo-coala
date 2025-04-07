import { Box, Typography } from '@mui/material'

import { NotFound } from '@/v3/presentation/components/NotFound'
import Paper from '@/v3/presentation/components/Paper'
import { useFetchAppointmentCount } from '@/v3/presentation/hooks/api/@v2/dashboard/useFetchAppointmentCount'

import SkeletonCharts from '../Skeleton/SkeletonCharts'

import { StyledDonutChart } from './styles'

export const FinishedAppointmentsCharts = ({ institutionId }: { institutionId: number }) => {
  const { finishedAppointmentStatus, isLoading } = useFetchAppointmentCount({ institutionId })

  if (isLoading) {
    return <SkeletonCharts title='Desfecho dos atendimentos' />
  }

  return (
    <Paper p={2} height='100%'>
      <Typography variant='h4'>Desfecho dos atendimentos</Typography>

      <Box my={2} height='100%'>
        {finishedAppointmentStatus?.length > 0 ? (
          <StyledDonutChart data={finishedAppointmentStatus} />
        ) : (
          <NotFound text='Não encontramos nenhum atendimento para esta instituição' />
        )}
      </Box>
    </Paper>
  )
}

export default FinishedAppointmentsCharts
