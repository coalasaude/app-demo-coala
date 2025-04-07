import { Box } from '@mui/material'
import React from 'react'

export const Content = ({ children }: { children: React.ReactNode }) => {
  return <Box p={2}>{children}</Box>
}

export default Content
