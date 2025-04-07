import { Box } from '@mui/material'

import { extractYouTubeVideoId } from '@/v3/utils/extractYouTubeVideoId'

import HomeVideoPlay from '/public/assets/svg/HelloPage/Video/HomeVideoPlay.svg'

import { WebViewManager } from '@/services/WebView'

export function VideoContent({ youtubeUrl }: { youtubeUrl: string }) {
  return (
    <Box
      onClick={() => WebViewManager.open(youtubeUrl, '_blank')}
      position='relative'
      height={292}
      borderRadius={2}
      overflow='hidden'
      sx={{
        cursor: 'pointer',
        backgroundSize: 'cover',
        backgroundImage: `url(https://img.youtube.com/vi/${extractYouTubeVideoId(youtubeUrl)}/maxresdefault.jpg)`,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '0',
          left: '1',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}
      >
        <HomeVideoPlay />
      </Box>
    </Box>
  )
}
