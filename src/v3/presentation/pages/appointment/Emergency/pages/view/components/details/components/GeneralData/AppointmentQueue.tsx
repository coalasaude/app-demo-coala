import { Box } from '@mui/material'

import { GridItem } from '@/components/Grid'
import { Appointment, AppointmentStatus } from '@/v3/domain/Appointment'
import { AppointmentQueueOptions } from '@/constants/queue'
import { CSelectControlled } from '@/components/Forms'

export const AppointmentQueueChange = ({
  onSubmit,
  data,
}: {
  data?: Appointment
  onSubmit: (body: any) => Promise<void>
}) => {
  const isFinished =
    data?.status === AppointmentStatus.FINISHED || data?.status === AppointmentStatus.FOLLOW_UP
  return (
    <GridItem xs={12} md={12}>
      <Box ml={2} display='flex'>
        <CSelectControlled
          name='queue'
          variant='outlined'
          label='Fila'
          disabledNullOption
          options={AppointmentQueueOptions}
          disabled={isFinished}
          onChange={onSubmit}
        />
      </Box>
    </GridItem>
  )
}

export default AppointmentQueueChange
