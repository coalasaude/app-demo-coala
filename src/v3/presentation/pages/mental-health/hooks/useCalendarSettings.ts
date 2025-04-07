import { useCallback, useEffect, useState } from 'react'

import { useLazyFetch } from '@/v3/presentation/hooks/useFetch'
import { CalendarSettings } from '@/v3/domain/CalendarSettings'
import { TApiCalendarSettings } from '@/v3/domain/api/ApiCalendarSettings'

import { MySchedule } from '../contexts/my-schedule.provider'

export const useFetchCalendarSettings = () => {
  const [fetch, { data, ...rest }] = useLazyFetch<TApiCalendarSettings[]>()
  const [fetchAddCalendar, { data: addData, error: addError }] =
    useLazyFetch<TApiCalendarSettings[]>()
  const [calendarSettings, setCalendarSettings] = useState<CalendarSettings[]>([])
  const apiRequest = useCallback(
    async () =>
      await fetch({
        path: 'mental-health/calendar-settings',
        method: 'GET',
      }),
    [fetch]
  )

  const addCalendarSettings = useCallback(
    async (calendar: MySchedule[]) =>
      await fetchAddCalendar({
        path: 'mental-health/calendar-settings',
        method: 'POST',
        body: calendar,
      }),
    [fetchAddCalendar]
  )

  const deleteCalendarSettings = useCallback(
    async (ids: number[]) =>
      await fetch({
        path: 'mental-health/calendar-settings',
        method: 'DELETE',
        body: {
          ids,
        },
      }),
    [fetch]
  )

  const updateCalendarSettings = useCallback(
    async (calendar: MySchedule[]) =>
      await fetch({
        path: 'mental-health/calendar-settings',
        method: 'PUT',
        body: calendar,
      }),
    [fetch]
  )

  useEffect(() => {
    if (data && data?.length > 0) {
      setCalendarSettings(data.map((setting) => new CalendarSettings(setting)))
    }
  }, [data])

  return {
    apiRequest,
    addCalendarSettings,
    deleteCalendarSettings,
    updateCalendarSettings,
    data: calendarSettings,
    add: { data: addData, error: addError },
    ...rest,
  }
}
