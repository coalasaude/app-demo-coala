import { UserModel } from '@/v3/domain/@v2/users/users.model'
import { Appointment } from '@/v3/domain/Appointment'
import { NotFound } from '@/v3/presentation/components/NotFound'
import { useFetchBrowseAppointments } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useFetchBrowseAppointments'
import Paper from '@/v3/presentation/components/Paper'

import AppointmentSectionSkeleton from '../Skeletons/AppointmentSectionSkeleton'
import { UserInfoSection } from '../UserInfoContainer'

import { AppointmentContainerList } from './AppointmentContainerList'

export const SectionAppointment = ({ user }: { user: UserModel }) => {
  const patientId = user.id
  const { appointments, isLoading } = useFetchBrowseAppointments({ patientId, limit: 50 })

  const sortedLists = Appointment.sortedAppointmentListByStatus(appointments?.data || [])
  const isAllEmpty = Object.values(sortedLists).every((array) => array.length === 0)

  return (
    <Paper noBorder sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
      {isLoading ? (
        <AppointmentSectionSkeleton repeat={8} />
      ) : (
        <UserInfoSection title='Lista de atendimentos' variant='onlyTitle'>
          {sortedLists.waitingList.length > 0 && (
            <AppointmentContainerList
              listAppointment={sortedLists.waitingList}
              circleColor='var(--mui-palette-success-main)'
              listTitle='Aguardando'
            />
          )}
          {sortedLists.inAttendanceList.length > 0 && (
            <AppointmentContainerList
              listAppointment={sortedLists.inAttendanceList}
              circleColor='var(--mui-palette-info-main)'
              listTitle='Atendimento'
            />
          )}
          {sortedLists.followUpList.length > 0 && (
            <AppointmentContainerList
              listAppointment={sortedLists.followUpList}
              circleColor='var(--mui-palette-emergency-main)'
              listTitle='Acompanhamento'
            />
          )}
          {sortedLists.finishedList.length > 0 && (
            <AppointmentContainerList
              listAppointment={sortedLists.finishedList}
              circleColor='var(--mui-palette-grey-600)'
              listTitle='Finalizado'
            />
          )}
          {isAllEmpty && (
            <NotFound mt={4} title='Nenhum atendimento encontrada para esse usuário' />
          )}
        </UserInfoSection>
      )}
    </Paper>
  )
}
