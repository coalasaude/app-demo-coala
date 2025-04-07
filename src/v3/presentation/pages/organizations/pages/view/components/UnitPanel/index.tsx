import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'

import { InstitutionProvider } from '@/context/ContextByRoute/Institution/InstitutionProvider'
import { DateFilterProvider } from '@/context/ContextByRoute/Institution/DateFilterProvider'
import { target } from '@/v3/presentation/newComponents/atoms/CJoyride/constants'
import { useFeatureFlag } from '@/v3/presentation/hooks/useFeatureFlag'
import { FeatureFlag } from '@/v3/presentation/constants/feature-flag.constants'
import { validateUserAndOpenModal } from '@/containers/HelloPage/utils/validateUserAndOpenModal'
import { useJoyrideContext } from '@/v3/presentation/newComponents/atoms/CJoyride/useJoyrideContext'

import RankingCourse from '../InstitutionCharts/Ranking/components/RankingCourse'
import { StyledChartsCard } from '../styles'
import { UsersCharts } from '../UsersCharts'
import InstitutionRanking from '../InstitutionCharts/Ranking'

import UnitPanelHeader from './components/Header/UnitPanelHeader'

const FinishedAppointmentsCharts = dynamic(
  () => import('../InstitutionCharts/FinishedAppointment'),
  { ssr: false },
)
const RequestAppointmentsCharts = dynamic(
  () => import('../InstitutionCharts/RequestAppointments'),
  { ssr: false },
)
const ComplaintAppointmentsCharts = dynamic(
  () => import('../InstitutionCharts/ComplaintAppointment'),
  { ssr: false },
)

const AverageTime = dynamic(() => import('../InstitutionCharts/AvarageTime'), { ssr: false })

export const UnitPanel = ({ type }: { type: string }) => {
  const { setState } = useJoyrideContext()
  const guideTourHealthUnit = useFeatureFlag({
    flag: FeatureFlag.GUIDE_TOUR_HEALTH_UNIT,
  })
  const router = useRouter()
  const institutionId = Number(router.query.id)

  const handleOpenGuideTourModal = (guideTourType: string) => {
    setState({ run: true, guideTourType })
  }

  useEffect(() => {
    const validateOpenModal = () =>
      validateUserAndOpenModal({
        guideTourCollaborator: { isActive: false },
        guideTourManager: { isActive: false },
        guideTourResponsible: { isActive: false },
        guideTourHealthUnit,
        handleOpenGuideTourModal,
      })

    validateOpenModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DateFilterProvider>
      <InstitutionProvider orgType={type}>
        <Grid container>
          <Grid item xl={12} lg={12} md={12} xs={12}>
            <UnitPanelHeader />
          </Grid>
          <Grid container>
            <Grid item xl={6} lg={6} md={6} xs={12} id={target.coalaHealthCases}>
              <ComplaintAppointmentsCharts />
            </Grid>
            <Grid item xl={6} lg={6} md={6} xs={12} id={target.coalaFinishedStatus}>
              <StyledChartsCard>
                <FinishedAppointmentsCharts institutionId={institutionId} />
              </StyledChartsCard>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xl={4} lg={4} md={4} xs={12}>
              <StyledChartsCard>
                <InstitutionRanking institutionId={institutionId} />
              </StyledChartsCard>
            </Grid>
            <Grid item xl={8} lg={8} md={8} xs={12} id={target.coalaAppointmentCount}>
              <RequestAppointmentsCharts />
            </Grid>
          </Grid>
          <Grid container>
            <UsersCharts />
          </Grid>
          <Grid container>
            <Grid item xl={7} lg={7} md={7} xs={12} id={target.coalaRequestedPerHour}>
              <AverageTime />
            </Grid>
            <Grid item xl={5} lg={5} md={5} xs={12} id={target.coalaCourseUser}>
              <StyledChartsCard>
                <RankingCourse institutionId={institutionId} />
              </StyledChartsCard>
            </Grid>
          </Grid>
        </Grid>
      </InstitutionProvider>
    </DateFilterProvider>
  )
}

export default UnitPanel
