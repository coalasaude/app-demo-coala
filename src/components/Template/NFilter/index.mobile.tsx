import { Tune } from '@mui/icons-material'
import { Box, Dialog, DialogContent, Typography } from '@mui/material'
import React from 'react'

import Button from '@/components/Button'

export const NFilterMobile = ({
  children,
  onCleanAll,
  setIsOpen,
  onApplyFilters,
  isOpen,
  positionTop,
  positionRight,
}: {
  children: React.ReactNode
  onCleanAll?: () => void
  onApplyFilters?: () => void
  setIsOpen: (value: boolean) => void
  isOpen: boolean
  positionTop?: number
  positionRight?: number
}) => {
  return (
    <Box>
      <Box
        onClick={() => setIsOpen(true)}
        color='white'
        bgcolor='var(--mui-palette-primary-light)'
        marginLeft='auto'
        style={{ borderRadius: '100%' }}
        sx={{
          backgroundColor: 'var(--mui-palette-primary-light)',
          width: 35,
          height: 35,
          textAlign: 'center',
          position: 'absolute',
          top: positionTop ? positionTop : -2,
          right: positionRight ? positionRight : 5,
        }}
      >
        <Tune color='primary' sx={{ width: 19, marginTop: 0.6 }} />
      </Box>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogContent>
          <Box display='flex' alignItems='center' mb={2}>
            <Typography variant='h4'>Filtros</Typography>
            {onCleanAll && (
              <Typography
                color='info.main'
                variant='subtitle2'
                ml='auto'
                className='cursor-pointer'
                onClick={onCleanAll}
              >
                Limpar todos
              </Typography>
            )}
          </Box>
          {children}
          {onApplyFilters && (
            <Box display='flex' justifyContent='center' mt={2}>
              <Button
                variant='outlined'
                onClick={() => {
                  onApplyFilters()
                  setIsOpen(false)
                }}
                fullWidthOnSmallDevice
                color='primary'
                size='medium'
              >
                Aplicar
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default NFilterMobile
