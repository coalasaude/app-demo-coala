import { Box, Button, Drawer, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close'

import useMediaQuery from '@/hooks/useMediaQuery'

import { CDivider } from '../..'

export const CFilterDrawer = ({
  children,
  open,
  onClose,
  onApply,
  onClear,
  drawerTitle,
  hideButtons = false
}: {
  children: React.ReactNode
  open: boolean
  onClose: () => Promise<void> | void
  onApply: () => Promise<void> | void
  onClear: () => Promise<void> | void
  drawerTitle?: string
  hideButtons?: boolean
}) => {
  const isSmallDevice = useMediaQuery('sm')

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      event.stopPropagation()
      if (event.key === 'Enter' && onApply && open) {
        onApply()
      }
    }

    document.addEventListener('keypress', handleKeyPress)

    return () => {
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [onApply, open])

  return (
    <Drawer
      open={open}
      anchor='right'
      onClose={onClose}
      PaperProps={{ sx: { width: isSmallDevice ? '100%' : 320 } }}
      slotProps={{
        backdrop() {
          return {
            sx: {
              backdropFilter: 'blur(5px)',
            },
          }
        },
      }}
    >
      <Box px={3} pt={3} flexGrow={1}>
        <Box mb={3} display='flex' alignItems='center' justifyContent='space-between'>
          <Typography variant='h4'>{drawerTitle || 'Filtro'}</Typography>
          <CloseIcon fontSize='small' sx={{ cursor: 'pointer' }} onClick={onClose} />
        </Box>
        {children}
      </Box>
      {!hideButtons &&  
      ( <Box px={3} pb={3}>
        <CDivider sx={{ m: '16px auto' }} />
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Button variant='text' onClick={onClear}>
            Limpar
          </Button>
          <Button variant='contained' sx={{ px: 4 }} onClick={onApply}>
            Aplicar
          </Button>
        </Box>
      </Box>)
      }
    </Drawer>
  )
}
