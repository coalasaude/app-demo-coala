import { Box, Typography } from '@mui/material'

import FinishedSvg from 'public/assets/svg/AppointmentsView/MedicalRecordFinished.svg'

export const MedicalRecordFinished = () => {
  return (
    <Box height='90vh' display='flex' justifyContent='center' alignItems='center'>
      <Box textAlign='center'>
        <Box mb={2}>
          <FinishedSvg />
        </Box>
        <Box mb={2}>
          <Typography variant='h3' fontWeight='bold' color='var(--mui-palette-primary-dark)'>
            As Informações desse
          </Typography>
          <Typography variant='h3' fontWeight='bold' color='var(--mui-palette-primary-dark)'>
            ticket foram registradas!
          </Typography>
        </Box>
        <Box mb={1}>
          <Typography variant='body1' color='var(--mui-palette-grey-500)'>
            Visualize o documento de
          </Typography>
        </Box>
        <Box>
          <Typography variant='body1' color='var(--mui-palette-grey-500)'>
            atendimento na aba de registros
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default MedicalRecordFinished
