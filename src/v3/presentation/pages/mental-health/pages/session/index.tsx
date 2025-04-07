import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import Router from 'next/router'

import { CDivider } from '@/v3/presentation/newComponents'
import { Tab, Tabs } from '@/v3/presentation/components/Tabs'
import { UserActions } from '@/v3/presentation/components/Ticket/UserActions'
import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'

import { MentalHealthProvider } from '../../contexts/mental-health.provider'
import { useFetchMentalHealth } from '../../hooks/useFetchMentalHealth'

import { StyledInfoCard, StyledSessionPageWrapper, StyledSection } from './styles'
import { StatusHeader } from './components/StatusHeader'
import { InfoProfile } from './components/InfoProfile'
import { DetailsTab } from './components/DetailsTab'
import { SessionTable } from './components/SessionTable'
import { RegisterTable } from './components/RegisterTable'
import MentalHealthSessionAppBar from './components/MentalHealthSessionAppBar'

export default function RegisterView() {
  const [activeTab, setActiveTab] = useState(0)
  const [reload, setReload] = useState(true)
  const {
    schedule: session,
    getMentalHealthSession,
    apiRequest,
    data: schedules,
  } = useFetchMentalHealth()
  const { id } = Router.query

  useEffect(() => {
    if (id && reload) {
      setReload(false)
      getMentalHealthSession(Number(id))
    }
  }, [id, getMentalHealthSession, reload])

  useEffect(() => {
    if (session) {
      setActiveTab(0)
      apiRequest({ limit: null, patientId: session.appointment?.patient?.id })
    }
  }, [session, apiRequest])

  return (
    <MentalHealthProvider>
      {session ? (
        <>
          <MentalHealthSessionAppBar session={session} reload={() => setReload(true)} />
          <StyledSessionPageWrapper>
            <StyledInfoCard>
              <StatusHeader status={session.status} />
              <Box p={1}>
                <InfoProfile
                  age={session.appointment?.patient?.getAge()}
                  fullname={session.appointment?.patient?.getFormattedName() || undefined}
                  genre={session.appointment?.patient?.genre || undefined}
                  session={session}
                />
                <Box my={2}>
                  <CDivider />
                </Box>
                <Box mt={3} mb={2}>
                  <UserActions
                    fullName={session.appointment?.patient?.getFormattedName() || ''}
                    userId={session.appointment?.patientId || 0}
                  />
                </Box>
              </Box>
            </StyledInfoCard>
            <StyledSection>
              <Tabs value={activeTab} onChange={(e, value) => setActiveTab(value)}>
                {['Detalhes', 'Registro', 'Histórico'].map((label, index) => (
                  <Tab key={index} value={index} label={label} />
                ))}
              </Tabs>
              {activeTab === 0 && <DetailsTab session={session} />}
              {activeTab === 1 && (
                <RegisterTable records={session.records} sessionId={session.id} />
              )}
              {activeTab === 2 && (
                <SessionTable schedules={schedules} reload={() => setReload(true)} />
              )}
            </StyledSection>
          </StyledSessionPageWrapper>
        </>
      ) : (
        <ViewSkeleton />
      )}
    </MentalHealthProvider>
  )
}
