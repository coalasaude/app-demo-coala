import NotificationsIcon from '@mui/icons-material/NotificationsOutlined'
import { useCounts } from '@novu/react/hooks'
import { useEffect } from 'react'
import { Box } from '@mui/material'

import {
  NotificationListenerKey,
  useNotificationListenerContext,
} from '@/v3/presentation/contexts/notifications/NotificationListenerProvider'

import { CBadge } from '../../../../newComponents'

interface NotificationBellProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void
  id?: string
}

export const NotificationBell = ({ onClick, id }: NotificationBellProps) => {
  const { counts, refetch } = useCounts({ filters: [{ read: false }] })

  const { onNewNotification, onReadNotification } = useNotificationListenerContext()

  useEffect(() => {
    onNewNotification({ cb: refetch, key: NotificationListenerKey.COUNT_ALL })
    onReadNotification({ cb: refetch, key: NotificationListenerKey.COUNT_ALL })
  }, [onNewNotification, onReadNotification, refetch])

  return (
    <Box onClick={onClick}>
      <CBadge
        aria-describedby={id}
        badgeContent={counts?.[0].count || 0}
        state='secondary'
        type='medium'
      >
        <Box sx={{ color: ['var(--mui-palette-grey-500)'] }}>
          <NotificationsIcon color='inherit' className='cursor-pointer' />
        </Box>
      </CBadge>
    </Box>
  )
}
