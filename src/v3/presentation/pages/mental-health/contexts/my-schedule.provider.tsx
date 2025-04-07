import {
  FC,
  ReactNode,
  useContext,
  useMemo,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react'
import { groupBy } from 'lodash'

import { useFetchCalendarSettings } from '../hooks/useCalendarSettings'
import { TAvailableDays, daysOrder } from '../utils/days'

export type MyScheduleObject = {
  [key in TAvailableDays]?: MySchedule[]
}

export interface MySchedule {
  startTime: string
  endTime: string
  day: string
  id?: number
}

export interface MyScheduleContextData {
  mySchedule: MyScheduleObject | undefined
  setMySchedule: Dispatch<SetStateAction<MyScheduleObject | undefined>>
  idsTobeDeleted: number[]
  setIdsTobeDeleted: Dispatch<SetStateAction<number[]>>
  getCalendarSettings: any
}

const myScheduleContext = createContext<MyScheduleContextData>({
  mySchedule: undefined,
  setMySchedule: () => {
    return
  },
  idsTobeDeleted: [],
  setIdsTobeDeleted: () => {
    return
  },
  getCalendarSettings: () => null,
})

export const MyScheduleProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [mySchedule, setMySchedule] = useState<MyScheduleObject | undefined>(undefined)
  const [idsTobeDeleted, setIdsTobeDeleted] = useState<number[]>([])
  const { data: calendar, apiRequest } = useFetchCalendarSettings()

  useEffect(() => {
    apiRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (calendar) {
      const groupedCalendar = groupBy(calendar, 'day')
      const sortedData: Record<string, MySchedule[]> = {}
      for (const day of daysOrder) {
        if (groupedCalendar[day]) {
          sortedData[day] = groupedCalendar[day]
        }
      }
      setMySchedule(sortedData)
    }
  }, [calendar])

  const state: MyScheduleContextData = useMemo(
    () => ({
      mySchedule,
      setMySchedule,
      idsTobeDeleted,
      setIdsTobeDeleted,
      getCalendarSettings: apiRequest,
    }),
    [mySchedule, setMySchedule, idsTobeDeleted, setIdsTobeDeleted, apiRequest]
  )

  return <myScheduleContext.Provider value={state}>{children}</myScheduleContext.Provider>
}

export const useMyScheduleContext = () => useContext(myScheduleContext)
