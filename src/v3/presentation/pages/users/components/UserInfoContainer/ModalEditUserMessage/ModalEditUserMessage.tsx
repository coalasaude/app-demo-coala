import { Box, Typography } from '@mui/material'
import { WhatsApp } from '@mui/icons-material'

import { ModalCard } from '@/v3/presentation/components/Modal'
import { CButton } from '@/v3/presentation/newComponents'
import { WebViewManager } from '@/services/WebView'

const ModalEditUserMessage = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const onClickWhatsappModalEdit = () => {
    onCloseModal()
    return WebViewManager.open(process.env.WHATSAPP_SUPPORT_URL, '_blank')
  }

  return (
    <ModalCard title='Ops!' onClose={onCloseModal} sx={{ width: 390 }}>
      <Typography variant='body1' mt={3}>
        Esta conta já foi ativada e, por segurança, os dados só podem ser alterados pelo próprio
        usuário. Se precisar de ajuda, entre em contato conosco.
      </Typography>
      <Box display='flex' alignItems='center' width='100%' gap={1} mt={3}>
        <CButton
          variant='secondary'
          onClick={onClickWhatsappModalEdit}
          sx={{ width: '50%', display: 'flex', gap: 1 }}
        >
          <WhatsApp fontSize='small' sx={{}} /> Whatsapp
        </CButton>
        <CButton variant='primary' onClick={() => onCloseModal()} sx={{ width: '50%' }}>
          Entendido
        </CButton>
      </Box>
    </ModalCard>
  )
}

export default ModalEditUserMessage
