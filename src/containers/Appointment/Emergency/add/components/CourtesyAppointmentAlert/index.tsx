import { Alert } from '@mui/material'

export const CourtesyAppointmentAlert = ({
  courtesy,
  appointment,
}: {
  courtesy: number
  appointment: number
}) => {
  return (
    <>
      <Alert severity='info'>
        Cortesias disponíveis: {courtesy - appointment < 0 ? 0 : courtesy - appointment} de{' '}
        {courtesy}
      </Alert>
    </>
  )
}

export default CourtesyAppointmentAlert
