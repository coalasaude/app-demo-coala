import { FC, ReactNode, useContext, useMemo, createContext, useState, useEffect } from 'react'
import dayjs from 'dayjs'

import { MentalHealthSchedule } from '@/v3/domain/MentalHealth'

import { UserViewConfig, userViewConfigDic } from '../hooks/useUserViewConfigDic'
import { useGetUserViewConfig } from '../hooks/useGetUserViewConfig'
import { useFetchMentalHealth } from '../hooks/useFetchMentalHealth'
import { formatDateToPayload } from '../utils/date'
import { UserViewConfigKeys } from '../types/userViewConfigKeys'
import { CalendarViewType } from '../constants/calendarViewType'

export interface MentalHealthContextData {
  userViewConfig: UserViewConfig | undefined
  activeTab: number
  handleTabChange?: (tabIndex: number) => void
  selectedDate?: string | null
  handleDateChange: (date: any) => void
  sessionsList?: MentalHealthSchedule[]
  handleFilterChange: (filter: Record<string, any>) => void
  getSchedule: (filter: Record<string, any>) => void
  userViewKey: UserViewConfigKeys
  loading?: boolean
  filters: Record<string, any>
}

const mentalHealthContext = createContext<MentalHealthContextData>({
  userViewConfig: undefined,
  activeTab: 0,
  selectedDate: null,
  handleTabChange: () => {
    return
  },
  handleDateChange: () => {
    return
  },
  sessionsList: [],
  handleFilterChange: () => {
    return
  },
  getSchedule: () => null,
  userViewKey: UserViewConfigKeys.NO_PERMISSION,
  loading: false,
  filters: {},
})

export const MentalHealthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const currentDate = new Date()
  const formattedDate = currentDate.toString()
  const [activeTab, setActiveTab] = useState(0)
  const [filters, setFilters] = useState<Record<string, any>>({})
  const { data, schedules, apiRequest } = useFetchMentalHealth()
  const [selectedDate, setSelectedDate] = useState<string | null>(formattedDate)
  const userViewKey = useGetUserViewConfig()
  const userViewConfig = userViewConfigDic[userViewKey]

  useEffect(() => {
    if (Object.keys(filters).length) {
      apiRequest(filters)
    }
  }, [apiRequest, filters])

  useEffect(() => {
    if (selectedDate) {
      if (userViewConfig.calendar === CalendarViewType.PER_DAY) {
        const { startFrom, startTo } = formatDateToPayload(selectedDate)
        setFilters((prevFilters: Record<string, any>) => ({ ...prevFilters, startTo, startFrom }))
      } else if (userViewConfig.calendar === CalendarViewType.PER_MONTH) {
        const dayjsObj = dayjs(selectedDate)
        const startFrom = dayjsObj.clone().startOf('month').format('YYYY-MM-DD')
        const startTo = dayjsObj.clone().endOf('month').format('YYYY-MM-DD')
        setFilters((prevFilters: Record<string, any>) => ({ ...prevFilters, startTo, startFrom }))
      }
    }
  }, [selectedDate, userViewConfig.calendar])

  const handleDateChange = useMemo(
    () => (date: string) => {
      setSelectedDate(date)
    },
    [],
  )

  const handleTabChange = useMemo(
    () => (tabIndex: number) => {
      setActiveTab(tabIndex)
    },
    [],
  )

  const handleFilterChange = useMemo(
    () => (filter: Record<string, any>) => {
      setFilters((prevFilters: Record<string, any>) => ({ ...prevFilters, ...filter }))
    },
    [],
  )

  const state: MentalHealthContextData = useMemo(
    () => ({
      userViewConfig,
      activeTab,
      handleTabChange,
      selectedDate,
      handleDateChange,
      sessionsList: data,
      filters,
      loading: schedules.loading,
      getSchedule: apiRequest,
      handleFilterChange,
      userViewKey,
    }),
    [
      userViewConfig,
      activeTab,
      handleTabChange,
      selectedDate,
      handleDateChange,
      apiRequest,
      data,
      filters,
      schedules.loading,
      handleFilterChange,
      userViewKey,
    ],
  )

  return <mentalHealthContext.Provider value={state}>{children}</mentalHealthContext.Provider>
}

export const useMentalHealthContext = () => useContext(mentalHealthContext)
