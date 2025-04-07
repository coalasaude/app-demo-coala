import { Box, BoxProps } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

interface ICountdownProps extends BoxProps {
  seconds?: number
  renderComponent: (props: {
    timeLeft: number
    done: boolean
    setTimeLeft: (time: number) => void
  }) => React.ReactNode
}

export const Countdown = ({ seconds = 60, renderComponent, ...props }: ICountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(seconds)
  const intervalId = useRef<NodeJS.Timer | null>(null)

  useEffect(() => {
    if (!timeLeft) return

    intervalId.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => {
      if (intervalId.current) clearInterval(intervalId.current as unknown as number)
    }
  }, [timeLeft])

  return (
    <Box {...props}>
      {renderComponent({ timeLeft: timeLeft, done: timeLeft === 0, setTimeLeft })}
    </Box>
  )
}
