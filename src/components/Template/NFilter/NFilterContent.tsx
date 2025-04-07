import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { Box } from '@mui/material'
import React, { useState } from 'react'

import { NFilterContent } from './styles'

export const FilterContent = ({
  children,
  label,
}: {
  children: React.ReactNode
  label: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Box mt={2}>
      <NFilterContent onClick={() => setIsOpen(!isOpen)} isActive={isOpen}>
        <span>{label}</span>
        {isOpen ? (
          <KeyboardArrowUp sx={{ marginLeft: 'auto' }} />
        ) : (
          <KeyboardArrowDown sx={{ marginLeft: 'auto' }} />
        )}
      </NFilterContent>
      {isOpen && children}
    </Box>
  )
}

export default FilterContent
