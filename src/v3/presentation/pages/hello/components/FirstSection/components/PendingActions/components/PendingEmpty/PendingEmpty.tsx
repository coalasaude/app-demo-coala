import { Box, Typography } from '@mui/material'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'

export const PendingEmpty = () => {
  return (
    <Box
      display='flex'
      flexDirection='row'
      alignItems='center'
      justifyContent='center'
      gap={2}
      bgcolor='white'
      borderRadius={2}
      height='5rem'
      padding={2}
    >
      <VerifiedUserIcon color='success' />
      <Typography>Que maravilha, você está em dia com seus dados de saúde!</Typography>
    </Box>
  )
}
