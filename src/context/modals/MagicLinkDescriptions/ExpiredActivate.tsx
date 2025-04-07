import { Box, Typography } from '@mui/material'

export const ExpiredActivate = () => {
  return (
    <Box display='flex' flexDirection='column' gap={1}>
      <Typography fontWeight='bold'>Olá este link não está mais ativo.</Typography>
      <Typography>Se precisar de ajuda, entre em contato conosco. </Typography>
    </Box>
  )
}
