import { useCallback, useEffect, useRef } from 'react'

import { useBreakpoint } from '@/hooks/useBreakpoints'

const oneHour = 1 * 60 * 60 * 1000
const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart']

const useReloadWindow = (timeoutDuration = oneHour) => {
  const isMobile = useBreakpoint('sm', 'down')
  const inactivityTimeout = useRef<NodeJS.Timeout>()
  const isInactive = useRef(false)

  const handleInactivity = useCallback(() => {
    isInactive.current = true
  }, [])

  const resetTimer = useCallback(() => {
    if (isInactive.current) {
      window.location.reload()
      isInactive.current = false
    }

    if (inactivityTimeout.current) {
      clearTimeout(inactivityTimeout.current)
    }

    inactivityTimeout.current = setTimeout(handleInactivity, timeoutDuration)
  }, [handleInactivity, timeoutDuration])

  useEffect(() => {
    if (!isMobile) {
      events.forEach((event) => window.addEventListener(event, resetTimer))
      resetTimer()
    }

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer))
      if (inactivityTimeout.current) {
        clearTimeout(inactivityTimeout.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetTimer])

  return { resetTimer }
}

export default useReloadWindow
