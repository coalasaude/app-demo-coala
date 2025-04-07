import { Box, Stack, Typography } from '@mui/material'
import { useEffect, useRef } from 'react'

import { ModalCard } from '@/v3/presentation/components/Modal/ModalCard/ModalCard'

import AppMobileRedirect from '/public/assets/svg/AppMobileRedirect.svg'

import { useModalContext } from '@/v3/presentation/components/Modal'
import { CButton } from '@/v3/presentation/newComponents'

import { useAppRedirect } from '../../hooks/useAppRedirect'
import { useStoreRedirect } from '../../hooks/useStoreRedirect'

export const AppRedirectModal = () => {
  const { handleModal } = useModalContext()
  const { onGoToStore } = useStoreRedirect()
  const { onGoToApp } = useAppRedirect()
  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleGoToApp = () => {
    onGoToApp({
      fallBack: () => {
        timeoutRef.current = setTimeout(onGoToStore, 2000)
      },
    })
    handleModal()
  }

  useEffect(() => {
    const cleanup = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }

    window.addEventListener('blur', () => cleanup())
    return () => window.removeEventListener('blur', () => cleanup())
  }, [])

  return (
    <ModalCard hideCloseButton sx={{ maxWidth: '295px' }}>
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
        <AppMobileRedirect />
        <Box width='100%'>
          <Box display='flex' flexDirection='column' mb={1}>
            <Typography sx={{ fontSize: '28px !important', fontWeight: 900 }}>
              Você quer abrir
            </Typography>
            <Typography
              sx={{
                fontSize: '28px !important',
                fontWeight: '900',
                color: 'var(--mui-palette-primary-main)',
              }}
            >
              o App da Coala?
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '16px !important', fontWeight: 300 }} mb={2}>
            Clique em <b>“ir para o App”</b> para ser redirecionado.
          </Typography>
          <Stack direction='row' gap={1} mt={4}>
            <CButton variant='secondary' onClick={() => handleModal()} fullWidth>
              Cancelar
            </CButton>
            <CButton onClick={handleGoToApp} fullWidth>
              Ir para App
            </CButton>
          </Stack>
        </Box>
      </Box>
    </ModalCard>
  )
}
