import React, { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Box } from '@mui/material'

import useMediaQuery from '@/hooks/useMediaQuery'
import CChip from '@/v3/presentation/newComponents/atoms/CChip'

export const appliedFiltersId = 'applied-filters'

export const AppliedFilters = ({
  appliedFilters,
}: {
  appliedFilters: { text: string; value: any; onClear?: () => void }[]
  portalId?: string
}) => {
  const isDevice = useMediaQuery('sm')
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const el = document.getElementById(appliedFiltersId)
    setPortalElement(el)
  }, [])

  const Component = (
    <Box display='flex' flexWrap='wrap' gap={1}>
      {appliedFilters?.map(({ value, text, onClear }) => {
        if (!value) return null
        return (
          <CChip
            variant='outlined'
            size='small'
            label={text}
            key={`${text}radio`}
            deletable
            onDelete={onClear}
          />
        )
      })}
    </Box>
  )

  if (portalElement && isDevice) {
    return createPortal(Component, portalElement) as ReactNode
  } else if (isDevice) {
    return null
  }
  return Component
}

export default AppliedFilters
