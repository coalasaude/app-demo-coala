import Router from 'next/router'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { PageHeader } from '@/v3/presentation/newComponents'

import { StatusHeader } from '../../components/StatusHeader'
import { StyledSessionPageWrapper } from '../../styles'
import { useFetchMentalHealth } from '../../../../hooks/useFetchMentalHealth'
import { RegisterForm } from '../../components/RecordForm'

import { StyledCreateRecordWrapper } from './styles'

export const CreateRecord = () => {
  const { schedule: session, getMentalHealthSession } = useFetchMentalHealth()
  const { id } = Router.query
  const methods = useForm()

  useEffect(() => {
    getMentalHealthSession(Number(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <>
      {session && (
        <>
          <PageHeader title='Registro' />
          <StyledSessionPageWrapper>
            <StyledCreateRecordWrapper>
              <StatusHeader status={session.status} />
              <FormProvider {...methods}>
                <RegisterForm
                  studentId={session.appointment?.patient?.id}
                  scheduleId={session.id}
                  institutionId={session.appointment?.institution?.id}
                  appointmentId={session.appointment?.id}
                />
              </FormProvider>
            </StyledCreateRecordWrapper>
          </StyledSessionPageWrapper>
        </>
      )}
    </>
  )
}
