import { Box } from '@mui/material'
import React from 'react'

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box bgcolor='white' zIndex={1} height='100%' width='100%' minHeight='100vh'>
      {children}
    </Box>
  )
}

export default Container
