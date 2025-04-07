import { Box } from '@mui/system'
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined'
import { useCallback, useEffect, useState } from 'react'
import { ClickAwayListener, Typography } from '@mui/material'
import Router, { useRouter } from 'next/router'

import { useLazyFetch } from '@/hooks/useFetch'
import { IListResponse } from '@/types/request'
import { Notifications as TNotifications } from '@/types/notifications'
import { CDivider, CBadge } from '@/v3/presentation/newComponents'

import { Content } from '../styles'

import { NotificationText } from './styles'
import Item from './NotificationItem'
import Skeleton from './NotificationSkeleton'
import { NOTIFICATION_ACTIONS } from './NotificationActions'

export const Notifications: React.FC<{ color: string }> = ({ color }: { color?: string }) => {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined)
  const [apiRequest, { data }] = useLazyFetch<IListResponse<TNotifications>>()
  const [visualizeRequest] = useLazyFetch()
  const router = useRouter()
  const getNotifications = useCallback(async () => {
    await apiRequest({
      path: 'notification',
      method: 'GET',
    })
  }, [apiRequest])

  const setVisualized = async (id: number) => {
    await visualizeRequest({
      path: `notification/${id}`,
      method: 'POST',
    })
  }

  const setAllVisualized = async () => {
    await visualizeRequest({
      path: `notification/visualize-all`,
      method: 'POST',
    })
    await getNotifications()
  }

  const onVisualize = (notification: any) => {
    setIsOpen(false)
    setTimeout(async () => {
      const action = NOTIFICATION_ACTIONS[notification.type]
      if (action)
        action(notification.data, {
          push: (path: string) => Router.push(path),
        })
      const userNotificationId = notification.UserNotifications?.[0]?.id
      await setVisualized(userNotificationId)
      await getNotifications()
    }, 200)
  }

  useEffect(() => {
    getNotifications()
  }, [getNotifications])

  useEffect(() => {
    if (router.pathname) {
      getNotifications()
    }
  }, [router, getNotifications])

  return (
    <ClickAwayListener onClickAway={() => isOpen && setIsOpen(false)}>
      <Box position='relative'>
        <CBadge badgeContent={data?.count || 0} state='secondary' type='medium'>
          <NotificationsIcon
            color='disabled'
            onClick={() => setIsOpen(true)}
            className='cursor-pointer'
            sx={{ color: `${color}` }}
          />
        </CBadge>
        <Content
          isOpen={isOpen}
          style={{ top: 35, minWidth: '300px', minHeight: '60px', zIndex: 1 }}
        >
          {data?.count !== 0 && (
            <>
              <Box
                width='100%'
                px={2}
                py={1}
                className='cursor-pointer'
                display='flex'
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography>
                  <b>Notificações</b>
                </Typography>
                <Typography
                  color='info.main'
                  textAlign='end'
                  onClick={setAllVisualized}
                  variant='subtitle2'
                >
                  Limpar
                </Typography>
              </Box>
              <CDivider />
            </>
          )}
          {data === undefined && <Skeleton />}
          {data?.results?.map(({ id, title, description, ...data }) => (
            <Item key={id} onRemove={() => onVisualize({ title, description, ...data })}>
              <Typography>
                <b>{title}</b>
              </Typography>
              <Box mt={1} />
              <NotificationText>{description}</NotificationText>
            </Item>
          ))}
          {data !== undefined && (data?.results?.length || 0) < 1 && (
            <Box p={2} textAlign='center' height='100%'>
              <NotificationText>
                <span>Não foram encontradas notificações.</span>
              </NotificationText>
            </Box>
          )}
        </Content>
      </Box>
    </ClickAwayListener>
  )
}

export default Notifications
