import { Instagram } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { usePostHog } from 'posthog-js/react'

import { WebViewManager } from '@/services/WebView'
import { instagramCoala } from '@/constants/links'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'

export const InstagramButton: React.FC = () => {
  const posthog = usePostHog()
  const { getCount } = usePageTimeCounter()

  const handleClick = () => {
    posthog.capture('instagram_button_navbar', {
      time_on_page: getCount(),
    })

    WebViewManager.open(instagramCoala, '_blank')
  }

  return (
    <Box
      display='flex'
      alignItems='center'
      bgcolor='var(--mui-palette-grey-100)'
      gap={1}
      borderRadius={2}
      p='3px'
      onClick={handleClick}
      sx={{ cursor: 'pointer' }}
    >
      <Box display='flex' bgcolor='white' p='3px' borderRadius={2}>
        <Instagram sx={{ fill: 'var(--mui-palette-grey-500)' }} />
      </Box>
      <Typography variant='body1' color='var(--mui-palette-grey-500)' pr={1} noWrap>
        Siga nosso instagram!
      </Typography>
    </Box>
  )
}
