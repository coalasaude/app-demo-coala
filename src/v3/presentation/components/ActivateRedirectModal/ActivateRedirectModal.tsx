import { Box, Typography } from '@mui/material'

import { ModalCard } from '@/v3/presentation/components/Modal/ModalCard/ModalCard'

import ActivateModal from '/public/assets/svg/ActivateModal.svg'

import { CButton } from '@/v3/presentation/newComponents'

export const ActivateRedirectModal = ({
  handleActivateAccount,
}: {
  handleActivateAccount: () => void
}) => {
  return (
    <ModalCard hideCloseButton sx={{ maxWidth: '295px' }} onClose={handleActivateAccount}>
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
        <ActivateModal />
        <Box width='100%'>
          <Box mb={1}>
            <Typography
              sx={{
                fontSize: '28px !important',
                fontWeight: '700',
              }}
            >
              Ative sua conta
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '16px !important', fontWeight: 300 }} mb={2}>
            Para acessar os{' '}
            <Typography component='span' sx={{ fontSize: '16px !important', fontWeight: 900 }}>
              receituários
            </Typography>{' '}
            e outros dados desta consulta, é necessário que você ative sua conta na plataforma.
          </Typography>
          <CButton onClick={handleActivateAccount} fullWidth>
            Ativar conta
          </CButton>
        </Box>
      </Box>
    </ModalCard>
  )
}
