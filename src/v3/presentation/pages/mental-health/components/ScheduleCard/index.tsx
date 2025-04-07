import Router from 'next/router'
import { Typography } from '@mui/material'

import { MentalHealthSchedule } from '@/v3/domain/MentalHealth'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import { MentalHealthScheduleStatus } from '@/v3/domain/api/ApiMentalHealthSchedule'

import { statusColor } from '../../constants/status'

import {
  StyledScheduleCardFooter,
  StyledScheduleCardHeader,
  StyledScheduleCardInfo,
  StyledWrapperInfo,
  StyledScheduleCardWrapper,
  StyledScheduleCardWrapperStatus,
  StyledStatusCircle,
  StyledTitleInfo,
  StyledInfo,
} from './styles'

function ScheduleCard({ session }: { session: MentalHealthSchedule }) {
  return (
    <>
      <StyledScheduleCardWrapper
        onClick={() => {
          Router.push(
            bindPathParams(NEW_ROUTES.AUTHENTICATED.MENTAL_HEALTH.SESSION.path, {
              id: session.id,
            })
          )
        }}
      >
        <StyledScheduleCardHeader>
          <span>Profissional</span>
          <StyledScheduleCardWrapperStatus>
            <span>
              {session.status === MentalHealthScheduleStatus.NaoRealizada
                ? 'Não Realizada'
                : session.status}
            </span>
            <StyledStatusCircle $statusColor={statusColor[session.status]} />
          </StyledScheduleCardWrapperStatus>
        </StyledScheduleCardHeader>
        <Typography variant='h5'>{session.professional?.getFormattedName()}</Typography>
        <StyledWrapperInfo>
          <StyledScheduleCardInfo>
            <StyledTitleInfo>Aluno</StyledTitleInfo>
            <StyledInfo>{session.appointment?.patient?.getFormattedName()}</StyledInfo>
          </StyledScheduleCardInfo>
          <StyledScheduleCardInfo>
            <StyledTitleInfo>Instituição</StyledTitleInfo>
            <StyledInfo>{session.appointment?.institution?.fantasyName}</StyledInfo>
          </StyledScheduleCardInfo>
        </StyledWrapperInfo>
        <StyledScheduleCardFooter>
          <span>{session.getFormattedDateFromStartTime()}</span>
          <span>{session.getStartToEndTimeRange()}</span>
        </StyledScheduleCardFooter>
      </StyledScheduleCardWrapper>
    </>
  )
}

export default ScheduleCard
