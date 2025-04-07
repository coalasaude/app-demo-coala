import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

import { Permissions } from '@/constants/permissions'
import { useHasPermission } from '@/hooks/useHasPermission'
import Paper from '@/v3/presentation/components/Paper'
import { useFetchReadAppointment } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useFetchReadAppointment'

import { CAppointmentTicketHeader } from '../../Ticket'
import ArrowBackAppointment from '../ArrowBack'

interface RegisterAddWrapperProps {
  children: React.ReactNode
  isAppointmentResume?: boolean
  isMedicalRecord?: boolean
}

export const RegisterAddWrapper = ({
  children,
  isAppointmentResume,
  isMedicalRecord,
}: RegisterAddWrapperProps) => {
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
      <HasPaper>{children}</HasPaper>
    </>
  )
}

export default RegisterAddWrapper
