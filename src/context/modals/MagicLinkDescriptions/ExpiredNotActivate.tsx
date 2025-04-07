import { Box, Typography } from '@mui/material'

export const ExpiredNotActivate = () => {
  return (
    <Box display='flex' flexDirection='column' gap={1}>
      <Typography fontWeight='bold'>Olá este link não está mais ativo.</Typography>
      <Typography>
        Para ter acesso a plataforma da Coala, basta{' '}
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
