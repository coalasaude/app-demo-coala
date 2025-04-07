import { Box, Typography } from '@mui/material'

type Props = {
  children: React.ReactNode
}

export const BaseTitlePasswordForm = ({ children }: Props) => {
  return (
    <Box>
      <Typography variant='h1' mb={1}>
        Digite sua senha
      </Typography>
      <Typography variant='body1' mb={3}>
        Para dar continuidade a alteração, digite sua senha atual no campo abaixo.
      </Typography>

      {children}
    </Box>
  )
}
