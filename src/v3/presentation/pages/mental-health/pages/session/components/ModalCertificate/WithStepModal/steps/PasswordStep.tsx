import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { CBaseContainer, CInputControlled } from '@/v3/presentation/newComponents'
import { useFetchReadAppointment } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useFetchReadAppointment'

export const PasswordStep = () => {
  const router = useRouter()
  const appointmentId = Number(router.query.id)
  const { appointment } = useFetchReadAppointment({ appointmentId })
  const isAccident = appointment?.isAccident

  return (
    <Box pt={1}>
      <CBaseContainer sx={{ backgroundColor: 'var(--mui-palette-grey-100)', mb: 1, mt: 1 }}>
        <Typography variant='h5' mb={1}>
          Dados do atendimento
        </Typography>

        <Typography variant='body1' color='var(--mui-palette-grey-500)'>
          Foi um acidente dentro da instituição?*
        </Typography>

        <Typography variant='body1' mb={1}>
          {isAccident === true ? 'Sim' : 'Não'}
        </Typography>

        <Typography variant='body1' color='var(--mui-palette-grey-500)'>
          Tipo de queixa
        </Typography>

        <Typography variant='body1'>{appointment?.getComplaintText()}</Typography>
      </CBaseContainer>
      <Typography variant='h4'>Senha do certificado digital</Typography>
      <CInputControlled
        placeholder='Digite sua senha'
        name='certificatePass'
        variant='outlined'
        inputType='password'
        rules={{ required: true }}
        type='password'
        label='Digite sua senha'
        fullWidth
        sx={{ mt: 1 }}
      />
    </Box>
  )
}
