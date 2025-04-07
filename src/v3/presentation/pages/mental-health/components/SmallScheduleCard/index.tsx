import { Fragment } from 'react'
import Router from 'next/router'

import { MentalHealthSchedule } from '@/v3/domain/MentalHealth'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import { MentalHealthScheduleStatus } from '@/v3/domain/api/ApiMentalHealthSchedule'

import { statusColor } from '../../constants/status'
import {
  StyledScheduleCardWrapper,
  StyledScheduleCardWrapperStatus,
  StyledScheduleCardFooter,
  StyledStatusCircle,
} from '../ScheduleCard/styles'

import { StyledScheduleCardHeader, StyledInstitutionName, StyledScheduleCardTitle } from './styles'

function SmallScheduleCard({ session }: { session: MentalHealthSchedule }) {
  return (
    <Fragment key={session.id}>
      <StyledScheduleCardWrapper
        onClick={() =>
          Router.push(
            bindPathParams(NEW_ROUTES.AUTHENTICATED.MENTAL_HEALTH.SESSION.path, {
              id: session.id,
            })
          )
        }
      >
        <StyledScheduleCardHeader>
          <StyledScheduleCardTitle>{session.appointment?.patient?.getFormattedName()}</StyledScheduleCardTitle>
          <StyledScheduleCardWrapperStatus>
            <span>
              {session.status === MentalHealthScheduleStatus.NaoRealizada
                ? 'Não Realizada'
                : session.status}
            </span>
            <StyledStatusCircle $statusColor={statusColor[session.status]} />
          </StyledScheduleCardWrapperStatus>
        </StyledScheduleCardHeader>
        <StyledInstitutionName>
          {session.appointment?.institution?.fantasyName}
        </StyledInstitutionName>
        <StyledScheduleCardFooter>
          <span>{session.getFormattedDateFromStartTime()}</span>
          <span>{session.getStartToEndTimeRange()}</span>
        </StyledScheduleCardFooter>
      </StyledScheduleCardWrapper>
    </Fragment>
  )
}

export default SmallScheduleCard
