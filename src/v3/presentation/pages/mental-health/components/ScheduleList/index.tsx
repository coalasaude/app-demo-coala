import { Box } from '@mui/material'
import { Fragment, useEffect } from 'react'

import { MentalHealthScheduleStatus } from '@/v3/domain/api/ApiMentalHealthSchedule'
import { NotFound } from '@/components/NotFound'
import Paper from '@/v3/presentation/components/Paper'
import { CardSkeleton } from '@/components/Skeletons/CardSkeleton'
import { GridItem, GridWrapper } from '@/components/Grid'
import CSelect from '@/v3/presentation/newComponents/atoms/CSelect'

import { useMentalHealthContext } from '../../contexts/mental-health.provider'
import { formatISODateToString, getYearlyDateRanges } from '../../utils/date'
import { CalendarViewType } from '../../constants/calendarViewType'
import MentalHealthCalendar from '../MentalHealthCalendar'
import { useFetchMentalHealth } from '../../hooks/useFetchMentalHealth'

import {
  StyledScheduleListFilter,
  StyledScheduleListHeader,
  StyledScheduleListTitle,
  StyledScheduleListWrapper,
  StyledSelectWrapper,
} from './styles'

export default function ScheduleList({ isSelf }: { isSelf?: boolean }) {
  const {
    loading,
    userViewConfig,
    selectedDate,
    sessionsList,
    activeTab,
    handleFilterChange,
    getSchedule,
    filters,
  } = useMentalHealthContext()
  const { getSelf, selfData } = useFetchMentalHealth()

  const handleMonthFilter = (payload: any) => {
    if (!payload) {
      return
    }
    const toObject = JSON.parse(payload)
    handleFilterChange({
      ...toObject,
      startFrom: toObject.startFrom,
      startTo: toObject.startTo,
    })
  }

  useEffect(() => {
    if (isSelf) {
      getSelf(filters)
    } else {
      getSchedule(filters)
    }
  }, [getSelf, isSelf, filters, getSchedule])

  const data = isSelf ? selfData?.data : sessionsList
  const hasSchedule = data?.length ?? 0

  if ((isSelf && selfData.loading) || (!isSelf && loading)) {
    return <CardSkeleton />
  }

  const monthlyFilterValue = {
    value: `{
        "startFrom": "${filters.startFrom}",
        "startTo": "${filters.startTo}"
      }`,
  }
  return (
    <>
      {userViewConfig?.calendar === CalendarViewType.PER_DAY && (
        <Paper mt={2}>
          <MentalHealthCalendar />
        </Paper>
      )}
      <StyledScheduleListWrapper>
        <StyledScheduleListHeader>
          <StyledScheduleListTitle>
            <span>{userViewConfig?.labelSection}</span>
            <h1>
              {userViewConfig?.calendar == CalendarViewType.PER_DAY &&
                formatISODateToString(selectedDate)}
            </h1>
          </StyledScheduleListTitle>
          <StyledSelectWrapper>
            {userViewConfig?.calendar == CalendarViewType.PER_DAY && (
              <CSelect
                name='classification'
                nullOptionText='Todos'
                label='Classificação'
                onChange={(e) => handleFilterChange({ status: e.target.value as string })}
                value={filters.status}
                options={[
                  {
                    value: MentalHealthScheduleStatus.Cancelada,
                    label: 'Cancelado',
                  },
                  {
                    value: MentalHealthScheduleStatus.Realizada,
                    label: 'Realizada',
                  },
                  {
                    value: MentalHealthScheduleStatus.Confirmada,
                    label: 'Confirmado',
                  },
                  {
                    value: MentalHealthScheduleStatus.Agendada,
                    label: 'Agendado',
                  },
                  {
                    value: MentalHealthScheduleStatus.NaoRealizada,
                    label: 'Não Realizada',
                  },
                ]}
              />
            )}
            {userViewConfig?.calendar == CalendarViewType.PER_MONTH && (
              <CSelect
                label='Classificação'
                fullWidth
                value={monthlyFilterValue.value}
                onChange={(e) => handleMonthFilter(e.target.value)}
                options={getYearlyDateRanges()}
                disabledNullOption
              />
            )}
          </StyledSelectWrapper>
        </StyledScheduleListHeader>
        <StyledScheduleListFilter>
          {(hasSchedule ?? 0) > 0 ? (
            userViewConfig?.tabs?.[activeTab].cardComponent && (
              <GridWrapper>
                {data?.map((session) => (
                  <GridItem xs={12} md={4} lg={3} key={session.id}>
                    {userViewConfig?.tabs?.[activeTab].cardComponent?.(session)}
                  </GridItem>
                ))}
              </GridWrapper>
            )
          ) : (
            <Box margin='auto'>
              <NotFound />
            </Box>
          )}
        </StyledScheduleListFilter>
      </StyledScheduleListWrapper>
    </>
  )
}
