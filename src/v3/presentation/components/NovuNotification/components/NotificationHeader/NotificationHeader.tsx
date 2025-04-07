import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Box, IconButton, Typography } from '@mui/material'
import { useNovu } from '@novu/react/hooks'

import { CButton } from '../../../../newComponents'

export const NotificationHeader = ({
  profileName,
  onClose,
}: {
  profileName: string
  onClose?: () => void
}) => {
  const novu = useNovu()

  const onClean = () => {
    novu.notifications.archiveAll({ tags: [profileName] })
  }

  return (
    <Box display='flex' alignItems='center' justifyContent='space-between'>
      <Box display='flex' alignItems='center' gap={1} onClick={onClose}>
        <IconButton sx={{ display: ['inherit', 'none'] }}>
          <ArrowBackIosIcon sx={{ color: 'var(--mui-palette-primary-main)', fontSize: 12 }} />
        </IconButton>
        <Typography fontSize={16} fontWeight={700}>
          Notificações
        </Typography>
      </Box>
      <CButton variant='link' onClick={onClean}>
        <Typography variant='body1' color={(theme) => theme.palette.primary.main}>
          Limpar
        </Typography>
      </CButton>
    </Box>
  )
}
