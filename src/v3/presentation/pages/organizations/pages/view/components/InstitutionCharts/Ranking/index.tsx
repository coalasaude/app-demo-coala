import { Box, Grid } from '@mui/material'

import Clock from '/public/assets/svg/UnitPanel/Clock.svg'
import Hourglass from '/public/assets/svg/UnitPanel/Hourglass.svg'

import { useFetchAverageTimeAppointments } from '@/v3/presentation/hooks/api/@v2/dashboard/useFetchAverageTimeAppointments'
import { useFetchRankPatient } from '@/v3/presentation/hooks/api/@v2/dashboard/useFetchRankPatient'
import { target } from '@/v3/presentation/newComponents/atoms/CJoyride/constants'

import Ranking from './components'
import Duration from './components/Duration'

export const InstitutionRanking = ({ institutionId }: { institutionId: number }) => {
  const { patients } = useFetchRankPatient({ institutionId })
  const { averageDurationTime, averageWaitingTime } = useFetchAverageTimeAppointments({
    institutionId,
  })

  return (
    <Box display='flex' flexDirection='column'>
      <Box id={target.coalaPatientWithMoreAppointment} flex={1}>
        <Ranking title='Pacientes com mais atendimentos' person={patients || []} />
      </Box>
      <Grid container mt={2}>
        <Grid item xs={6} md={6} pr={1} id={target.coalaAwaitingTime}>
          <Duration
            title={<>Tempo{'\n'}em espera</>}
            time={Number(averageWaitingTime) | 0}
            icon={<Hourglass style={{ minWidth: '3vh', marginRight: '-6px' }} />}
          />
        </Grid>
        <Grid item xs={6} md={6} pl={1} id={target.coalaDurationTime}>
          <Duration
            title={<>Duração{'\n'}do atendimento</>}
            time={Number(averageDurationTime) | 0}
            icon={<Clock style={{ minWidth: '3vh' }} />}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default InstitutionRanking
