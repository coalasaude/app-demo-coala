import { useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'

import { useAuth } from '@/v3/presentation/hooks/useAuth'

type UseSocketProps = {
  path?: string
}

export const useSocket = (options: UseSocketProps = {}) => {
  const { path = '' } = options

  const { auth } = useAuth()
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_API}/${path}`.replace(`//${path}`, `/${path}`)
    const newSocket = io(url, {
      extraHeaders: { Authorization: `Bearer ${auth.accessToken}` },
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.accessToken])

  return { socket }
}
