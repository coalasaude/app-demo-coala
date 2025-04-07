import { useEffect, useRef, useState } from 'react'

export const useCountdown = () => {
  const [countdown, setCountdown] = useState<number>(60)
  const [startCountdown, setStartCountdown] = useState<boolean>(false)
  const interval = useRef<NodeJS.Timer>()

  useEffect(() => {
    if (startCountdown) {
      interval.current = setInterval(() => {
        setCountdown((prevState) => (prevState > 0 ? prevState - 1 : 0))
      }, 1000)
    }
    return () => {
      if (interval.current) {
        clearInterval(Number(interval.current))
      }
    }
  }, [startCountdown, setCountdown])

  return { countdown, setCountdown, startCountdown: setStartCountdown }
}
