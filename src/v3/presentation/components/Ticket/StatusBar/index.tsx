import { Box, BoxProps } from '@mui/material'

export const StatusBar = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      bgcolor='var(--mui-palette-grey-100)'
      py={1}
      px={2}
      style={{ borderRadius: '8px' }}
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      {...props}
    >
      {children}
    </Box>
  )
}
