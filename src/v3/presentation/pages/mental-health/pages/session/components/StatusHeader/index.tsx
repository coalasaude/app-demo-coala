import CircleIcon from '@mui/icons-material/Circle'
import { Box } from '@mui/material'

import { MentalHealthScheduleStatus } from '@/v3/domain/api/ApiMentalHealthSchedule'
import { StatusBar } from '@/v3/presentation/components/Ticket/StatusBar'

import { statusColor, statusLabel } from '../../../../constants/status'

import { StyledStatusContainer } from './styles'

export const StatusHeader = ({ status }: { status: MentalHealthScheduleStatus }) => {
  const statusBgColor = {
    Confirmada: '#E3F6EC',
    Cancelada: '#FFEAED',
    Realizada: '#E3E5EA',
    Agendada: '#FFF8DF',
    NaoRealizada: '#FFEAED',
  }

  return (
    <StatusBar bgcolor={statusBgColor[status] || ''}>
      <Box component='span'>Sessão</Box>
      <StyledStatusContainer>
        <span>{statusLabel[status]}</span>
        <CircleIcon sx={{ width: '8px', color: statusColor[status] }} />
      </StyledStatusContainer>
    </StatusBar>
  )
}
