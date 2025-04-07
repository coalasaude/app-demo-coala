import { useRef, useEffect } from 'react'

export const usePageTimeCounter = () => {
  const timeSpent = useRef(0)
  const intervalRef = useRef<NodeJS.Timeout>()

  const startCounting = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      timeSpent.current += 1
    }, 1000)
  }

  const stopCounting = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const resetCounting = () => {
    timeSpent.current = 0
    startCounting()
  }

  const getCount = () => {
    return timeSpent.current
  }

  useEffect(() => {
    startCounting()
    return () => stopCounting()
  }, [])

  return { getCount, stopCounting, resetCounting }
}
