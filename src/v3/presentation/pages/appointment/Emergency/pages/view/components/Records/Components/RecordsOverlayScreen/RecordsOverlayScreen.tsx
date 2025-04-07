import React from 'react'
import { Box, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface RecordsOverlayScreenProps {
  children: React.ReactNode
  onClose: () => void
  title: string
}

const RecordsOverlayScreen = ({ children, onClose, title }: RecordsOverlayScreenProps) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 4,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box display='flex' justifyContent='space-between' alignItems='center' sx={{ padding: 1 }}>
        <Typography variant='h4'>{title}</Typography>
        <CloseIcon fontSize='small' onClick={onClose} sx={{ cursor: 'pointer' }} />
      </Box>
      {children}
    </Box>
  )
}

export default RecordsOverlayScreen
