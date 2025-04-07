import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

import { Permissions } from '@/constants/permissions'
import { useHasPermission } from '@/hooks/useHasPermission'
import ContentWrapper from '@/v3/presentation/components/layout/ContentWrapper'
import Paper from '@/v3/presentation/components/Paper'
import { useFetchReadAppointment } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useFetchReadAppointment'

import { CAppointmentTicketHeader } from '../../Ticket'
import ArrowBackAppointment from '../ArrowBack'

export const RegisterAddWrapper = ({
  title,
  children,
  isAppointmentResume,
  isMedicalRecord,
}: {
  title: string
  children: React.ReactNode
  isAppointmentResume?: boolean
  isMedicalRecord?: boolean
}) => {
  const router = useRouter()
  const appointmentId = Number(router.query.id)
  const { appointment } = useFetchReadAppointment({ appointmentId })
  const [canManageAppointment] = useHasPermission([Permissions.MANAGE_APPOINTMENT])

  const HasPaper: React.ElementType = isAppointmentResume ? Box : Paper

  return (
    <>
      {!isAppointmentResume && <ArrowBackAppointment />}
      {isMedicalRecord && !isAppointmentResume && <Box mb={2} />}
      {appointment && !isAppointmentResume && (
        <CAppointmentTicketHeader
          appointment={appointment}
          canChangeAppointmentStatus={canManageAppointment}
        />
      )}
      {isMedicalRecord && !isAppointmentResume && <Box mb={2} />}
      <HasPaper>
        <ContentWrapper>
          <Typography variant='h4' component='h4' mt={2} mb={2}>
            {title}
          </Typography>
          {children}
        </ContentWrapper>
      </HasPaper>
    </>
  )
}

export default RegisterAddWrapper
