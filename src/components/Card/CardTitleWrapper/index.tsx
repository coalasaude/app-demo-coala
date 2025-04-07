import { Box } from '@mui/material'
import React from 'react'

export const CardTitleWrapper = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <Box
      style={{ borderRadius: '12px' }}
      sx={(theme) => ({
        ':after': {
          position: 'absolute',
          top: 0,
          content: '" "',
          height: '100%',
          width: 4,
          left: 0,
          bgcolor: theme.palette.primary.main,
        },
        height: 'fit-content',
        pl: 2,
        position: 'relative',
      })}
      mb={1}
      {...props}
    >
      {children}
    </Box>
  )
}

export default CardTitleWrapper
