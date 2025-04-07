import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { IJitsiMeetingProps } from '@jitsi/react-sdk/lib/types'

import { WebViewManager } from '@/services/WebView'
import { getJistisUrl } from '@/utils/getJitsiUrl'
import { MeetingTypes } from '@/constants/meetingTypes'

import { MeetingProps } from '../types/meetingProps'

const JitsiMeeting = dynamic(
  () => import('@jitsi/react-sdk').then(({ JitsiMeeting }) => JitsiMeeting) as any,
  {
    ssr: false,
  },
) as React.FC<IJitsiMeetingProps>

export function Jitsi({ roomId, jwt, handleIsEndCall, isNative }: MeetingProps) {
  const apiKey = `${process.env.JITSI_API_KEY ? `${process.env.JITSI_API_KEY}/` : ''}`
  const roomName = `${apiKey}${roomId}`

  useEffect(() => {
    if (WebViewManager.hasWebView()) {
      const message = `VIDEO_URL: ${getJistisUrl({ roomId, jwt })}`
      const videoCallType = `VIDEO_CALL_TYPE: ${MeetingTypes.JITSI}`
      const videoCallNative = `VIDEO_CALL_NATIVE: ${isNative}`
      WebViewManager.getWebView().postMessage(videoCallNative)
      WebViewManager.getWebView().postMessage(videoCallType)
      WebViewManager.getWebView().postMessage(message)
      return
    }
  }, [roomId, jwt, isNative])

  const handleIFrameRef = (iframeRef: HTMLDivElement) => {
    iframeRef.style.height = '87vh'
    iframeRef.style.width = '100%'
  }

  return (
    <JitsiMeeting
      roomName={roomName}
      domain={process.env.ROOM_MEET_BASE_URL}
      release='release-5082'
      jwt={jwt}
      configOverwrite={{ disableDeepLinking: true, lang: 'pt' }}
      getIFrameRef={handleIFrameRef}
      onReadyToClose={() => handleIsEndCall()}
    />
  )
}
