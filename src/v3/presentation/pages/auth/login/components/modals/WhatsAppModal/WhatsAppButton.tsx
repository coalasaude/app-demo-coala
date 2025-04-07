import { WhatsApp } from '@mui/icons-material'
import { Button, Stack } from '@mui/material'

export const WhatsAppButton = () => {
  return (
    <Button
      LinkComponent='a'
      href={process.env.WHATSAPP_SUPPORT_URL!}
      target='_blank'
      variant='contained'
      sx={{ bgcolor: '#118578', '&:hover': { bgcolor: '#0d6e5b' } }}
    >
      <Stack direction='row' gap={1}>
        <WhatsApp />
        Fale pelo WhatsApp
      </Stack>
    </Button>
  )
}
