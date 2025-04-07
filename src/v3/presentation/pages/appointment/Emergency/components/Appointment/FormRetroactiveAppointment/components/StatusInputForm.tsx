import { Box, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { get } from 'lodash'

import { CAutoComplete } from '@/components/Forms'
import { AppointmentFinishedStatus } from '@/constants/appointment'

const autoCompleteOptions = [
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
]

export const StatusInputForm = () => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <Box mb={1}>
        <Typography variant='h4'>Qual foi o desfecho desse atendimento?*</Typography>
      </Box>

      <CAutoComplete
        name='finishedReason'
        options={autoCompleteOptions}
        error={get(errors, 'data.finishedReason') as unknown as string}
        value={
          autoCompleteOptions?.find((option) => option.value === watch('finishedReason')?.value) ||
          null
        }
        onInputChange={(e, value, reason) => {
          if (!!e && reason === 'clear') {
            return setValue('finishedReason', null)
          }
        }}
        onChange={(_, option) => {
          setValue('finishedReason', option?.value)
        }}
      />
    </>
  )
}
