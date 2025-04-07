import { Box } from '@mui/material'

export const UserAvatarWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box display='flex' alignItems='center'>
      {children}
    </Box>
  )
}
