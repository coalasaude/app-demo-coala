import { GppMaybe } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'

export const WithoutPermission = () => {
  return (
    <Box textAlign='center' py={5}>
      <GppMaybe
        sx={{ fontSize: '8rem', textAlign: 'center', color: 'var(--mui-palette-grey-700)' }}
      />
      <Typography variant='h5' textAlign='center' color='var(--mui-palette-grey-700)' mt={2}>
        Ops, você não tem permissão para acessar esta página.
      </Typography>
    </Box>
  )
}

export default WithoutPermission
