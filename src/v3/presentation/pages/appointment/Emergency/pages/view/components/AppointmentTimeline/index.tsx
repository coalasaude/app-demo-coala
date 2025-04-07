import { Box, Typography } from '@mui/material'
import Router from 'next/router'
import { useCallback, useEffect } from 'react'

import { AppointmentStatusLog } from '@/types/appointment'
import { AppointmentStatusDescription } from '@/constants/status'
import { useLazyFetch } from '@/v3/presentation/hooks/useFetch'
import { RECORDS_TYPE_DESCRIPTION_PROGRESS, RecordsReqData } from '@/types/records'
import { AppointmentQueue } from '@/v3/domain/Appointment'
import { QueueDescriptionList } from '@/constants/queue'
import ContentWrapper from '@/v3/presentation/components/layout/ContentWrapper'
import { NotFound } from '@/v3/presentation/components/NotFound'
import { StyledTimelineWrapper, CTimeline } from '@/v3/presentation/newComponents/layout'

export const AppointmentTimeline = ({
  queue,
  status,
}: {
  queue: AppointmentQueue
  status: AppointmentStatusLog[]
}) => {
  const [apiRequest, { data }] = useLazyFetch<RecordsReqData>()
  const dateFormat = 'DD/MM/YYYY - HH:mm:ss'
  const records = data?.results ? data.results : []
  const results = [...status, ...records]
    .map((item: any) => ({
      name:
        AppointmentStatusDescription[item?.newStatus] ||
        RECORDS_TYPE_DESCRIPTION_PROGRESS[item?.type] ||
        QueueDescriptionList[queue],
      createdAt: new Date(item.createdAt || item.created_at),
    }))
    .sort((a, b) => a.createdAt?.getTime() - b.createdAt?.getTime())

  const getRecords = useCallback(async () => {
    if (!Router.query.id) {
      return null
    }
    await apiRequest({
      path: `appointments/:id/records`,
      method: 'GET',
      pathParams: {
        id: Router.query.id,
      },
    })
  }, [apiRequest])

  useEffect(() => {
    getRecords()
  }, [getRecords])

  return (
    <>
      {results.length > 0 ? (
        <ContentWrapper>
          <Box mb={2} display='flex' alignItems='center' justifyContent='space-between'>
            <Typography variant='h4'>Progresso</Typography>
          </Box>
          <Box>
            <StyledTimelineWrapper>
              {results?.map(({ createdAt, name }, index) => {
                const isLast = index === results.length - 1
                const isFinished = name === 'Ticket finalizado'
                const isFollowUp = name === 'Acompanhamento'
                const isLastFlag = !!isFinished ? true : isFollowUp
                const isFinishedOrLast = isLast && isLastFlag

                return (
                  <CTimeline
                    key={index}
                    date={createdAt}
                    dateFormat={dateFormat}
                    isFinishedOrLast={isFinishedOrLast}
                    isLast={isLast}
                    name={name}
                  />
                )
              })}
            </StyledTimelineWrapper>
          </Box>
        </ContentWrapper>
      ) : (
        <ContentWrapper>
          <Box mb={2} display='flex' alignItems='center' justifyContent='space-between'>
            <Typography variant='h4'>Progresso</Typography>
          </Box>
          <NotFound text='Não foram encontrados progressos para este atendimento' />
        </ContentWrapper>
      )}
    </>
  )
}
