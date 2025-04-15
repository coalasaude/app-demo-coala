import { Box, IconButton, Typography } from '@mui/material'

import HomeLoveSvg from '/public/assets/svg/HomeLove.svg'

import { Instagram } from '@mui/icons-material'

import { instagramCoala } from '@/constants/links'
import { WebViewManager } from '@/services/WebView'

export function HomeHeader({ isMobile }: { isMobile?: boolean }) {

  return (
    <>
      <Box display='flex' alignItems='center' mb={2} px={['16px', 0]}>
        <Box display='flex' alignItems='center' gap={2} flex={1}>
          <HomeLoveSvg />
          <Typography variant='h2'>Olá, Visitante!</Typography>
        </Box>

        {isMobile && (
          <IconButton
            sx={{ display: ['inherit', 'none'] }}
            onClick={() => WebViewManager.open(instagramCoala, '_blank')}
          >
            <Instagram sx={{ color: 'var(--mui-palette-grey-500)' }} />
          </IconButton>
        )}
      </Box>
    </>
  )
}
