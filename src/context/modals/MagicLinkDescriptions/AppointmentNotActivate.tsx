import { Box, Typography } from '@mui/material'

export const AppointmentNotActivate = () => {
  return (
    <Box display='flex' flexDirection='column' gap={1}>
      <Typography fontWeight='bold'>Esse atendimento já foi finalizado.</Typography>
      <Typography>
        Você pode acessar os dados dessa consulta na aba de atendimentos. Para isso, basta{' '}
        <Box component='span' fontWeight='bold'>
          {' '}
          ativar sua conta{' '}
        </Box>{' '}
        com e-mail e telefone, é rápido e leva menos de cinco minutos.
      </Typography>
      <Typography>Se precisar de ajuda, entre em contato conosco. </Typography>
    </Box>
  )
}
