import { Skeleton, Typography } from '@mui/material'

import Paper from '@/v3/presentation/components/Paper'
import { useFetchLastDependentsAppointments } from '@/v3/presentation/hooks/api/@v2/dashboard/useFetchLastDependentsAppointments'

import { AppointmentCardList } from './components/AppointmentCardList'

export const LastApointmentsList = () => {
  const { data, isLoading } = useFetchLastDependentsAppointments()

  if (isLoading) return <Skeleton variant='rectangular' width='100%' height={'100%'} />

  return (
    <>
      <Paper p={'20px'} flex={1}>
        <Typography variant={'h4'} fontWeight={700} mb={[3]}>
          Últimos atendimentos
        </Typography>
        <AppointmentCardList person={data || []} />
      </Paper>
    </>
  )
}
