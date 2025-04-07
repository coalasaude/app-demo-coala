import { Typography } from '@mui/material'

import { ComplaintInputForm } from '@/v3/presentation/pages/appointment/Emergency/components/Appointment/FormAppointment/components'

type AppointmentGeneralDataProps = {
  error?: string
}

export const InformationStep = ({ error }: AppointmentGeneralDataProps) => {
  return (
    <>
      <Typography variant='h5' mt={2}>
        Preencha os campos para completar sua ação
      </Typography>
      <ComplaintInputForm error={error} />
    </>
  )
}
