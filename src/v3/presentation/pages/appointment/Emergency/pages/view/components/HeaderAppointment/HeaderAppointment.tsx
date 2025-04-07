import { useBreakpoint } from '@/hooks/useBreakpoints'
import { AppointmentReadDataModel } from '@/v3/domain/@v2/appointment/appointment-read-data.model'
import Paper from '@/v3/presentation/components/Paper'

import { CDivider } from '../../../../../../../newComponents'

import { AppointmentHeaderBodyData } from './components/AppointmentHeaderBodyData'
import { AppointmentHeaderUserData } from './components/AppointmentHeaderUserData'

interface CHeaderAppointmentProps {
  appointment: AppointmentReadDataModel
  canEdit: boolean
  refetchAppointment?: () => void
}

export const HeaderAppointment = ({
  appointment,
  canEdit,
  refetchAppointment,
}: CHeaderAppointmentProps) => {
  const isMobile = useBreakpoint('sm', 'down')
  const isDesktop = useBreakpoint('lg', 'up')

  return (
    <Paper
      px={2}
      py={2}
      display='flex'
      alignItems='center'
      justifyContent='center'
      gap={2}
      flexDirection={isMobile || isDesktop ? 'column' : 'row'}
      minWidth={340}
      flex={1}
    >
      <AppointmentHeaderUserData
        appointment={appointment}
        canEdit={canEdit}
        refetchAppointment={refetchAppointment}
      />

      <CDivider orientation={isMobile || isDesktop ? 'horizontal' : 'vertical'} flexItem />

      <AppointmentHeaderBodyData appointment={appointment} />
    </Paper>
  )
}
