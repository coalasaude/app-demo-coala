import { useRouter } from 'next/router'
import { Box, Stack, Typography } from '@mui/material'

import { CButton } from '@/v3/presentation/newComponents'
import { ModalCard, useModalContext } from '@/v3/presentation/components/Modal'
import { useLayout } from '@/hooks/useLayout'
import { AUTHENTICATED_ROUTES, ROUTES } from '@/constants/routes'
import { StyledModalTitle } from '@/v3/presentation/newComponents/layout/CDialogue/styles'

export const ModalOccupational = () => {
  const { handleModal } = useModalContext()
  const { showSnackBar } = useLayout()
  const router = useRouter()

  const onConfirm = () => {
    showSnackBar({ type: 'success', message: 'Você foi adicionado à lista de espera!' })
    handleModal()
    router.push(`${ROUTES.MODULES.APP}${AUTHENTICATED_ROUTES.HELLO}`)
  }

  return (
    <ModalCard sx={{ maxWidth: 384 }}>
      <Stack spacing={4}>
        <StyledModalTitle variant='inherit'>Recebemos seu interesse!</StyledModalTitle>

        <Typography fontSize={14} fontWeight={400} color='var(--mui-palette-grey-600)'>
          Um de nossos docs entrará em contato em breve para discutir como nosso produto pode te
          ajudar.
        </Typography>

        <Typography fontSize={14} fontWeight={400} color='var(--mui-palette-grey-600)'>
          Fique de olho na sua caixa de entrada e Whatsapp!
        </Typography>
        <Box display='flex' justifyContent='right'>
          <CButton onClick={onConfirm} size='medium' sx={{ width: 172, height: 36 }}>
            Entendi
          </CButton>
        </Box>
      </Stack>
    </ModalCard>
  )
}
