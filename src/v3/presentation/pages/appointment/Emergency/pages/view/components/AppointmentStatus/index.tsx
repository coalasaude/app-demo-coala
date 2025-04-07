import { ArrowForward } from '@mui/icons-material'
import { Button, Typography, Box } from '@mui/material'

import { GridView, GridWrapper } from '@/components/Grid'
import { Appointment } from '@/types/appointment'
import { AppointmentStatusDescription } from '@/constants/status'
import Paper from '@/v3/presentation/components/Paper'
import { ComplaintDescription } from '@/constants/complaint'
import { AppointmentFinishedStatusDescription } from '@/constants/appointment'
import ContentWrapper from '@/v3/presentation/components/layout/ContentWrapper'

import { AppointmentStatusChip } from '../../../../components/AppointmentStatusChip'
import { getAppointmentStatusColor } from '../../../../utils/getAppointmentStatusColor'

export const AppointmentStatus = ({
  data,
  showModal,
  canChangeAppointmentStatus,
}: {
  data: Appointment
  showModal: () => void
  canChangeAppointmentStatus: boolean
}) => {
  const color = getAppointmentStatusColor(data.status)
  const statusDescription = AppointmentStatusDescription[data.status || '']
  const finishedStatus = AppointmentFinishedStatusDescription[data.finished_status || '']

  return (
    <Paper>
      <ContentWrapper display='flex' flexDirection='column'>
        <Box display='flex' alignItems='center' justifyContent='space-between' width='100%'>
          <AppointmentStatusChip title={statusDescription} bgColor={color} />
          {canChangeAppointmentStatus && (
            <Button
              sx={{ background: 'var(--mui-palette-background-default)' }}
              color='inherit'
              onClick={showModal}
              variant='contained'
              data-testid='ArrowStartAppointmentIcon'
            >
              <ArrowForward sx={{ color: 'var(--mui-palette-grey-600)' }} />
            </Button>
          )}
        </Box>
        {finishedStatus && (
          <Typography ml={3} variant='h5' fontWeight={400}>
            {finishedStatus}
          </Typography>
        )}
      </ContentWrapper>
      <GridWrapper px={2} pb={2}>
        <GridView xs={12}>
          <Typography variant='h6' color='var(--mui-palette-grey-500)' fontWeight={600}>
            {(ComplaintDescription as any)[data.complaint] || '-'}
          </Typography>
          <Typography>{data.resume}</Typography>
        </GridView>
      </GridWrapper>
    </Paper>
  )
}
