import React from 'react'
import { Edit, SvgIconComponent } from '@mui/icons-material'
import { Box } from '@mui/material'

export const ContentButton = ({
  onClick,
  Icon,
}: {
  onClick: () => void
  Icon?: SvgIconComponent
}) => {
  const CIcon = Icon || Edit
  return (
    <Box
      style={{ borderRadius: '50%' }}
      sx={{
        bgcolor: 'var(--mui-palette-grey-200)',
        width: '16px',
        height: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        bottom: 0,
        right: 0,
        ':hover': { cursor: 'pointer' },
        position: 'absolute',
      }}
      onClick={onClick}
    >
      <CIcon sx={{ fontSize: '10px', color: 'var(--mui-palette-grey-600)' }} />
    </Box>
  )
}
