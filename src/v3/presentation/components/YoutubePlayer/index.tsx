import React, { useEffect, useRef } from 'react'

interface YouTubeVideoProps {
  videoId: string
  onPlay?: () => void
}

interface MyWindow extends Window {
  onYouTubeIframeAPIReady: () => void
  YT: any
}

declare let window: MyWindow

const YouTubeVideo = ({ videoId, onPlay }: YouTubeVideoProps) => {
  const videoRef = useRef<any>()

  useEffect(() => {
    const onPlayerReady = (event: any) => {
      if (event?.target) {
        videoRef.current = event.target
        onPlay && onPlay()
      }
    }

    const initPlayer = () => {
      if (videoRef.current?.loadVideoById) {
        videoRef.current.cueVideoById(videoId)
        return
      }
      new window.YT.Player('player', {
        videoId,
        playerVars: {
          autoplay: 0,
        },
        events: {
          onReady: onPlayerReady,
        },
      })
    }

    if (!window.YT) {
      window.onYouTubeIframeAPIReady = initPlayer
      const playerElement = document.querySelector('div#player')
      if (playerElement?.parentNode) {
        const parent = (playerElement.parentNode as Element).getElementsByTagName('script')
        if (parent.length > 0) return
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        playerElement.parentNode?.appendChild(tag)
      }
    } else {
      initPlayer()
    }
  }, [onPlay, videoId])

  return <div id={'player'}></div>
}

export default YouTubeVideo
