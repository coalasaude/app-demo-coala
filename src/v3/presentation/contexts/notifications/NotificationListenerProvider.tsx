import { useNovu } from '@novu/react/hooks'
import React, { useCallback, useEffect, useRef } from 'react'

export enum NotificationListenerKey {
  LIST = 'LIST',
  COUNT_ALL = 'COUNT_ALL',
  COUNT_TAG = 'COUNT_TAG',
}

interface NotificationCalback {
  key: NotificationListenerKey
  var?: string
  cb: () => void
}

export interface IPermissionsContext {
  onNewNotification: (params: NotificationCalback) => void
  onReadNotification: (params: NotificationCalback) => void
  onArchiveAllNotification: (params: NotificationCalback) => void
}

const NotificationContext = React.createContext<IPermissionsContext>({} as IPermissionsContext)

export const NotificationListenerProvider = ({ children }: { children: React.ReactNode }) => {
  const novu = useNovu()
  const newNotificationRef = useRef<NotificationCalback[]>([])
  const readNotificationRef = useRef<NotificationCalback[]>([])
  const archiveAllNotificationRef = useRef<NotificationCalback[]>([])

  useEffect(() => {
    const newNotficationListener = () => newNotificationRef.current.forEach(({ cb }) => cb())
    const readNotficationListener = () => readNotificationRef.current.forEach(({ cb }) => cb())
    const archiveAllNotficationListener = () =>
      archiveAllNotificationRef.current.forEach(({ cb }) => cb())

    const newNotficationListenerCleanup = novu.on(
      'notifications.notification_received',
      newNotficationListener,
    )
    const readNotficationListenerCleanup = novu.on(
      'notification.read.resolved',
      readNotficationListener,
    )

    const archiveAllNotficationListenerCleanup = novu.on(
      'notifications.archive_all.resolved',
      archiveAllNotficationListener,
    )

    return () => {
      newNotficationListenerCleanup()
      readNotficationListenerCleanup()
      archiveAllNotficationListenerCleanup()
    }
  }, [novu])

  const setNotificationRef = useCallback(
    (ref: React.MutableRefObject<NotificationCalback[]>, params: NotificationCalback) => {
      const existing = ref.current.findIndex(
        (item) => item.key == params.key && item.var == params.var,
      )

      if (existing > -1) {
        ref.current[existing] = params
      } else {
        ref.current.push(params)
      }
    },
    [],
  )

  const onNewNotification = useCallback(
    (params: NotificationCalback) => {
      setNotificationRef(newNotificationRef, params)
    },
    [setNotificationRef],
  )

  const onReadNotification = useCallback(
    (params: NotificationCalback) => {
      setNotificationRef(readNotificationRef, params)
    },
    [setNotificationRef],
  )

  const onArchiveAllNotification = useCallback(
    (params: NotificationCalback) => {
      setNotificationRef(archiveAllNotificationRef, params)
    },
    [setNotificationRef],
  )

  return (
    <NotificationContext.Provider
      value={{ onNewNotification, onReadNotification, onArchiveAllNotification }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationListenerContext = () => React.useContext(NotificationContext)
