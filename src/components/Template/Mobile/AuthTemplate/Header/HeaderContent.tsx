import React from 'react'
import { Box, BoxProps } from '@mui/material'

import { appliedFiltersId } from '@/components/Template/NFilter/AppliedFilters'

export const HeaderContent = ({ children }: { children: React.ReactNode } & BoxProps) => {
  return (
    <>
      <Box
        display='flex'
        justifyContent='center'
        gap={2}
        flex={1}
        flexWrap='wrap'
        flexDirection='column'
        position='relative'
      >
        {children}
      </Box>
      <div id={appliedFiltersId} />
    </>
  )
}
