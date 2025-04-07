import { useEffect, useRef } from 'react'
import { VideoSDKMeeting } from '@videosdk.live/rtc-js-prebuilt'

import { WebViewManager } from '@/services/WebView'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { MeetingTypes } from '@/constants/meetingTypes'

import { MeetingProps } from '../types/meetingProps'

import { MeetingContainer } from './styles'

export function Videosdk({ roomId, jwt, handleIsEndCall, isNative }: MeetingProps) {
  const leaveBtn = document.getElementById('leaveBtn')
  const meetInitiateRef = useRef(false)

  const { user } = useAuth()

  useEffect(() => {
    function initMeet() {
      const canInitiateMeet = !meetInitiateRef.current && roomId && user?.id && jwt
      if (!canInitiateMeet) return

      const config = {
        meetingId: roomId,
        token: jwt,
        name: `${user?.getFullName()} (${user?.id})`,

        containerId: 'meeting-container',

        micEnabled: true,
        webcamEnabled: true,
        participantCanToggleSelfWebcam: true,
        participantCanToggleSelfMic: true,

        chatEnabled: false,
        screenShareEnabled: false,
        pollEnabled: false,
        participantTabPanelEnabled: false,
        joinWithoutUserInteraction: true,

        joinScreen: {
          visible: true,
          title: 'Atendimento',
        },

        waitingScreen: {
          text: 'Conectando ao atendimento...',
        },

        permissions: {
          toggleVirtualBackground: false,
        },
      }

      meetInitiateRef.current = true

      const meeting = new VideoSDKMeeting()
      meeting.init(config).then(() => {
        if (WebViewManager.hasWebView()) {
          const element = document.getElementById('videosdk-frame') as HTMLIFrameElement
          const message = `VIDEO_URL: ${element.src}`
          const videoCallType = `VIDEO_CALL_TYPE: ${MeetingTypes.VIDEOSDK}`
          const videoCallNative = `VIDEO_CALL_NATIVE: ${isNative}`
          WebViewManager.getWebView().postMessage(videoCallNative)
          WebViewManager.getWebView().postMessage(videoCallType)
          WebViewManager.getWebView().postMessage(message)
          return
        }
      })
    }

    initMeet()
  }, [roomId, jwt, user, isNative])

  useEffect(() => {
    const handleClick = () => {
      handleIsEndCall()
    }

    if (leaveBtn) {
      leaveBtn.addEventListener('click', handleClick)
    }

    return () => {
      if (leaveBtn) {
        leaveBtn.removeEventListener('click', handleClick)
      }
    }
  }, [leaveBtn, handleIsEndCall])

  return <MeetingContainer id='meeting-container'></MeetingContainer>
}
