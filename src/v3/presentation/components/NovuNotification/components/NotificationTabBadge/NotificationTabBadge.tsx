import { Badge } from '@mui/material'
import { useNovu } from '@novu/react/hooks'
import { useEffect, useState } from 'react'

import {
  NotificationListenerKey,
  useNotificationListenerContext,
} from '@/v3/presentation/contexts/notifications/NotificationListenerProvider'

export const NotificationTabBadge = ({ profileName }: { profileName: string }) => {
  const novu = useNovu()
  const [count, setCount] = useState(0)
  const { onNewNotification, onReadNotification, onArchiveAllNotification } =
    useNotificationListenerContext()

  useEffect(() => {
    const count = () =>
      novu.notifications
        .count({ filters: [{ tags: [profileName], read: false }] })
        .then((response) => {
          setCount(response?.data?.counts?.[0]?.count || 0)
        })

    count()

    onNewNotification({ cb: count, key: NotificationListenerKey.COUNT_TAG, var: profileName })
    onReadNotification({ cb: count, key: NotificationListenerKey.COUNT_TAG, var: profileName })
    onArchiveAllNotification({
      cb: count,
      key: NotificationListenerKey.COUNT_TAG,
      var: profileName,
    })
  }, [
    novu.notifications,
    onArchiveAllNotification,
    onNewNotification,
    onReadNotification,
    profileName,
  ])

  if (!count) return null

  return (
    <Badge
      variant='dot'
      color='error'
      badgeContent={count}
      sx={{ position: 'absolute', top: 18, right: 8, zIndex: 2 }}
    />
  )
}
