import { Permissions } from '@/constants/permissions'
import { useHasPermission } from '@/hooks/useHasPermission'
import Paper from '@/v3/presentation/components/Paper'
import CTabs from '@/v3/presentation/components/TabsContainer'
import { AppointmentReadDataModel } from '@/v3/domain/@v2/appointment/appointment-read-data.model'

import AddRegister from '../AddRecord'
import { RecordsView } from '../Records'

type Props = {
  appointment?: AppointmentReadDataModel
  isResumeVideoLog?: boolean
}

const AppointmentData = ({ appointment, isResumeVideoLog }: Props) => {
  const [canManageAppointment] = useHasPermission([Permissions.MANAGE_APPOINTMENT])

  const canEdit = appointment?.patient?.id && canManageAppointment
  const tabsNames = canEdit ? ['Resumo', 'Adicionar registro'] : ['Resumo']

  return (
    <Paper p={0} height={!isResumeVideoLog ? undefined : '100%'} overflow='hidden' noBorder>
      <CTabs
        tabsNames={tabsNames}
        key={1}
        height={!isResumeVideoLog ? undefined : '100%'}
        isLoading={!appointment}
        containerProps={{ height: isResumeVideoLog ? '100%' : undefined, overflow: 'auto' }}
        boxShadow='none'
        border='none'
        tabsBody={[
          <RecordsView
            isResumeVideoLog={isResumeVideoLog}
            appointmentId={appointment?.id}
            hasPatient={!!appointment?.patient}
            key={1}
          />,
          canEdit ? <AddRegister isResumeVideoLog={isResumeVideoLog} key={2} /> : null,
        ]}
      />
    </Paper>
  )
}

export default AppointmentData
