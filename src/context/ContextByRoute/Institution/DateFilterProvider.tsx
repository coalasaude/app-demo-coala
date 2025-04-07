import dayjs, { Dayjs } from 'dayjs'
import React, { createContext, useRef, useState } from 'react'

interface DateState {
  startDate: Dayjs | null
  endDate: Dayjs | null
}
interface Props {
  dateFilter: DateState
  setDateFilter: (data: Partial<DateState>) => void
  lastFilters: React.MutableRefObject<Record<string, any>>
}

export const DateFilterContext = createContext<Props>({} as Props)

export const DateFilterProvider = ({ children }: { children: React.ReactNode }) => {
  const lastFilters = useRef<Record<string, any>>({
    dateTo: undefined,
    dateFrom: undefined,
  })
  const [dateFilter, setDateFilter] = useState<DateState>({
    startDate: dayjs().subtract(3, 'months'),
    endDate: dayjs(),
  })
  const setNewDate = (data: Partial<DateState>) =>
    setDateFilter((prevState) => ({
      ...prevState,
      ...(data || {}),
    }))

  return (
    <DateFilterContext.Provider
      value={{
        dateFilter,
        setDateFilter: setNewDate,
        lastFilters,
      }}
    >
      {children}
    </DateFilterContext.Provider>
  )
}
