import { Box, Typography } from '@mui/material'
import { useNotifications } from '@novu/react/hooks'
import SimpleBar from 'simplebar-react'
import { useEffect } from 'react'

import EmptySVG from '/public/assets/svg/Notifications/empty-box.svg'

import {
  NotificationListenerKey,
  useNotificationListenerContext,
} from '@/v3/presentation/contexts/notifications/NotificationListenerProvider'

import { NotificationItem } from '../NotificationItem'
import { NotificationItemSkeleton } from '../NotificationItemSkeleton'

export const NotificationList = ({
  profileName,
  onClose,
}: {
  profileName: string
  onClose: () => void
}) => {
  const { onNewNotification } = useNotificationListenerContext()
  const { notifications, hasMore, isFetching, isLoading, fetchMore, refetch } = useNotifications({
    tags: [profileName],
    limit: 5,
  })

  useEffect(() => {
    onNewNotification({ cb: refetch, key: NotificationListenerKey.LIST, var: profileName })
  }, [onNewNotification, profileName, refetch])

  const handleScroll = (e: React.UIEvent) => {
    const target = e.target as HTMLElement
    if (Math.ceil(target.scrollTop + target.clientHeight) >= target.scrollHeight) {
      if (hasMore) fetchMore()
    }
  }

  const isEmpty = !notifications?.length && !isLoading

  return (
    <Box flex={1} height='100%' position='relative' width='100%' mt={1}>
      {isEmpty && (
        <Box
          flex={1}
          display='flex'
          justifyContent='center'
          flexDirection='column'
          height='100%'
          pb={5}
        >
          <Typography variant='h4' textAlign='center' color='var(--mui-palette-grey-500)' mb={3}>
            No momento você não tem <br />
            nenhuma notificação
          </Typography>
          <EmptySVG style={{ width: '100%' }} />
        </Box>
      )}

      <SimpleBar
        scrollableNodeProps={{ onScroll: handleScroll }}
        style={{ position: 'absolute', top: 0, height: '100%', width: '100%' }}
      >
        {isLoading && (
          <Box display='flex' flexDirection='column' gap={2}>
            <NotificationItemSkeleton />
            <NotificationItemSkeleton />
            <NotificationItemSkeleton />
            <NotificationItemSkeleton />
            <NotificationItemSkeleton />
          </Box>
        )}
        {notifications?.map((notification) => {
          return (
            <Box key={notification.id}>
              <NotificationItem notification={notification} onClose={onClose} />
            </Box>
          )
        })}
        {isFetching && (
          <Box display='flex' flexDirection='column' gap={2}>
            <NotificationItemSkeleton />
          </Box>
        )}
      </SimpleBar>
    </Box>
  )
}
