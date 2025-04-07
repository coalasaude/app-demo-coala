import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Box, Typography } from '@mui/material'

import { WebViewManager } from '@/services/WebView'
import { CDialogue } from '@/v3/presentation/components/Modal'

type Props = {
  onConfirm: () => void
  description: React.ReactNode
  confirmButtonLabel: string
}

export const MagicLinkExpiredNotActivateModal = ({
  onConfirm,
  description,
  confirmButtonLabel,
}: Props) => {
  const onCancel = () => {
    WebViewManager.open(process.env.WHATSAPP_SUPPORT_URL, '_blank')
  }

  return (
    <CDialogue
      title='Ops!'
      description={description}
      confirmButtonLabel={confirmButtonLabel}
      cancelButtonLabel={
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 1 }}>
          <WhatsAppIcon />
          <Typography color='var(--mui-palette-primary-main)'>WhatsApp</Typography>
        </Box>
      }
      confirmButtonVariant='contained'
      cancelButtonVariant='outlined'
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  )
}
