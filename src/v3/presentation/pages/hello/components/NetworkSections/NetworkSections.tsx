import { Box, Typography } from '@mui/material'

import { FeatureFlag } from '@/v3/presentation/constants/feature-flag.constants'
import { useFeatureFlag } from '@/v3/presentation/hooks/useFeatureFlag'

import { VideoContent } from './components/VideoContent/VideoContent'

export function NetworkSections() {
  const { isActive, payload } = useFeatureFlag({ flag: FeatureFlag.HOME_NETWORK })

  if (!isActive) return null

  const youtubeUrl = payload?.youtube

  return (
    <>
      <Typography variant='h2'>Coala nas redes</Typography>
      <Box display='grid' gridTemplateColumns={['1fr', '1fr 1fr']} gap={2}>
        {youtubeUrl && <VideoContent youtubeUrl={youtubeUrl} />}
      </Box>
    </>
  )
}
