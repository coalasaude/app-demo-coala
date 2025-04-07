import { Box, Skeleton } from '@mui/material'

import { useFetchSaaSSettings } from '@/v3/presentation/hooks/useFetchSaaSSettings'
import Paper from '@/v3/presentation/components/Paper'
import { useFeatureFlag } from '@/v3/presentation/hooks/useFeatureFlag'
import { FeatureFlag } from '@/v3/presentation/constants/feature-flag.constants'

import { Jitsi } from './Jitsi'
import { Videosdk } from './Videosdk'
import { EndCallMeeting } from './components'

type MeetingProps = {
  roomId: string
  token: string

  handleIsEndCall: () => void
  isEndCall: boolean
}

export function Meeting({ roomId, token, handleIsEndCall, isEndCall }: MeetingProps) {
  const { data, isLoading } = useFetchSaaSSettings()

  const videoCallNative = useFeatureFlag({ flag: FeatureFlag.MOBILE_APP_NATIVE_VIDEO_CALL })

  const props = { roomId, jwt: token, handleIsEndCall, isNative: videoCallNative.isActive }

  if (isLoading) {
    return (
      <Box width='100%' mt={0}>
        <Skeleton variant='rectangular' height='90vh' style={{ borderRadius: 15 }} />
      </Box>
    )
  }

  if (data?.videoCallType === 'VIDEOSDK') {
    return (
      <Paper p={1} height='90vh'>
        {!!isEndCall ? <EndCallMeeting /> : <Videosdk {...props} />}
      </Paper>
    )
  }

  return (
    <Paper p={1} height='90vh'>
      {!!isEndCall ? <EndCallMeeting /> : <Jitsi {...props} />}
    </Paper>
  )
}
