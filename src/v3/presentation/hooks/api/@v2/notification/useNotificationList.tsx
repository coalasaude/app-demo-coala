import { Notification } from '@novu/react'
import { useNovu } from '@novu/react/hooks'
import { useMemo } from 'react'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { parseJson } from '@/v3/utils/parse-json'
import { removeAccents } from '@/v3/utils/remove-accents'

import { useFetch } from '../@shared/useFetch'

interface NotificationDataProps {
  body?: string
  icon?: string
  sentBy?: string
  inbox?: string[]
}

export type NotificationProps = Notification & {
  data: NotificationDataProps | null
}

export const useNotificationList = ({ profileName }: { profileName: string }) => {
  const novu = useNovu()

  const listNotifications = async () => {
    const { data } = await novu.notifications.list()

    const notifications = data?.notifications.map((notification: Notification) => {
      return {
        ...notification,
        data: parseJson(notification.body) as NotificationDataProps | null,
      }
    })

    return notifications as NotificationProps[]
  }

  const { data, ...props } = useFetch({
    queryFn: () => listNotifications(),
    queryKey: [QueryKeyEnum.NOTIFICATIONS],
  })

  const notifications = useMemo(
    () =>
      data?.filter(({ data }) => {
        return data?.inbox
          ? data.inbox?.find(
              (inbox) =>
                removeAccents(inbox).toLocaleLowerCase() ==
                removeAccents(profileName).toLocaleLowerCase(),
            )
          : true
      }) || [],
    [data, profileName],
  )

  return { notifications, ...props }
}
