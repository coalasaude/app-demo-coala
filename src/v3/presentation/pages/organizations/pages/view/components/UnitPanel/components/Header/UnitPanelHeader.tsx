import React from 'react'
import { useRouter } from 'next/router'
import { Grid } from '@mui/material'

import { useFetchAppointmentCount } from '@/v3/presentation/hooks/api/@v2/dashboard/useFetchAppointmentCount'

import SkeletonCardsChart from '../../../InstitutionCharts/Skeleton/SkeletonCards'

import UnitPanelMessages from './MessageInfoUnit/UnitPanelHeaderMessages'
import RequestedAppointments from './RequestedAppointments'
import ResolvedAppointmentsByCall from './ResolvedAppointmentsByCall'

export const UnitPanelHeader = () => {
  const router = useRouter()
  const { countAppointments, onlyCallsPerc, isLoading } = useFetchAppointmentCount({
    institutionId: Number(router.query.id),
  })

  if (isLoading) {
    return <SkeletonCardsChart />
  }

  return (
    <Grid container p={2}>
      <Grid item xl={5} lg={5} md={5} sm={12} xs={12} pr={[, , 1, 2]}>
        <UnitPanelMessages requestedAppointments={countAppointments || 0} />
      </Grid>
      <Grid item xl={3.5} lg={3.5} md={3.3} sm={12} xs={12} pr={[, , 1, 2]}>
        <RequestedAppointments requestedAppointments={countAppointments || 0} />
      </Grid>
      <Grid item xl={3.5} lg={3.5} md={3.7} sm={12} xs={12}>
        <ResolvedAppointmentsByCall closedAppointments={onlyCallsPerc || 0} />
      </Grid>
    </Grid>
  )
}

export default UnitPanelHeader
