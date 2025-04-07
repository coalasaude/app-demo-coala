import { Box } from '@mui/material'
import { ReactNode } from 'react'

import { CAccordion } from '@/v3/presentation/newComponents'

import { AddIcconButton } from './AddIcconButton'

type AccordionContentProps = {
  label: string
  children: ReactNode
  pb?: number
  setIsOpen: (isOpen: boolean) => void
  isOpen: boolean
  onAdd: () => void
}

export const AccordionContent = ({
  label,
  children,
  pb = 2,
  isOpen,
  setIsOpen,
  onAdd,
}: AccordionContentProps) => {
  return (
    <Box pb={pb}>
      <CAccordion
        fontWeight='bold'
        color='primary'
        onChange={() => setIsOpen(!isOpen)}
        expanded={isOpen}
        endComponent={
          <AddIcconButton
            display={['none', 'flex']}
            onClick={(e) => {
              e.stopPropagation()
              onAdd()
            }}
            sx={{
              ml: 2,
              display: ['none', 'flex'],
            }}
          />
        }
        title={label}
        sx={{ background: 'var(--mui-palette-grey-100)', border: 'none' }}
      />
      {isOpen && <Box pt={2}>{children}</Box>}
    </Box>
  )
}
