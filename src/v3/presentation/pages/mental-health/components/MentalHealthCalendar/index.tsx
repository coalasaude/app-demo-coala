import React from 'react'
import dayjs from 'dayjs'
import { StaticDatePicker } from '@mui/x-date-pickers'
import { useRouter } from 'next/router'

import { NEW_ROUTES } from '@/constants/routes'

import { useMentalHealthContext } from '../../contexts/mental-health.provider'

import { StyledCalendarWrapper } from './styles'

function MentalHealthCalendar() {
  const { selectedDate, handleDateChange } = useMentalHealthContext()
  const router = useRouter()
  const { pathname } = router

  return (
    <StyledCalendarWrapper>
      <StaticDatePicker
        displayStaticWrapperAs='desktop'
        value={dayjs(selectedDate)}
        onChange={handleDateChange}
        disablePast={pathname === NEW_ROUTES.AUTHENTICATED.MENTAL_HEALTH.CREATE.path}
      />
    </StyledCalendarWrapper>
  )
}

export default MentalHealthCalendar
