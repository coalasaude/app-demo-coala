import { Box, Typography } from '@mui/material'

export const AppointmentActivate = () => {
  return (
    <Box display='flex' flexDirection='column' gap={1}>
      <Typography fontWeight='bold'>Esse atendimento já foi finalizado.</Typography>
      <Typography>
        Você pode ter acesso aos dados dessa consulta dentro da aba de atendimentos.
      </Typography>
      <Typography>Se precisar de ajuda, entre em contato conosco. </Typography>
    </Box>
  )
}
