import { CSelectControlled } from '@/components/Forms'
import { AppointmentFinishedStatus } from '@/constants/appointment'

export const StatusForm = ({
  onChange,
  finishedStatus,
}: {
  onChange?: (value: AppointmentFinishedStatus) => void
  finishedStatus?: AppointmentFinishedStatus
}) => {
  return (
    <CSelectControlled
      name='finishedReason'
      label='Desfecho'
      defaultValue={finishedStatus}
      sx={{ mb: 0 }}
      size='small'
      data-testid='outcomeSelect'
      fullWidth={true}
      disabledNullOption
      showClearButton={false}
      onChange={(event) => {
        onChange?.(event.target.value as AppointmentFinishedStatus)
      }}
      options={[
        {
          value: AppointmentFinishedStatus.CALL_CENTER,
          label: 'Resolução via teleatendimento',
        },
        {
          value: AppointmentFinishedStatus.SAMU_FIREFIGHTER,
          label: 'Remoção por SAMU/Bombeiro',
        },
        {
          value: AppointmentFinishedStatus.EMERGENCY_ROOM,
          label: 'Encaminhamento ao pronto-socorro',
        },

        {
          value: AppointmentFinishedStatus.OUTPATIENT_INVESTIGATION,
          label: 'Encaminhamento para investigação ambulatorial',
        },
        {
          value: AppointmentFinishedStatus.INVALID,
          label: 'Solicitação inválida',
        },
        {
          value: AppointmentFinishedStatus.EVASION,
          label: 'Evasão',
        },
      ]}
    />
  )
}

export default StatusForm
