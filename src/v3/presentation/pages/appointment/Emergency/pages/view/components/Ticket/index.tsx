import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'

import { AppointmentFinishedStatusDescription } from '@/constants/appointment'
import { MEDICAL_RECORD_CLASSIFICATION_DESCRIPTION } from '@/constants/medicalRecordClassification'
import { Permissions } from '@/constants/permissions'
import { useHasPermission } from '@/hooks/useHasPermission'
import useMediaQuery from '@/hooks/useMediaQuery'
import { AppointmentReadDataModel } from '@/v3/domain/@v2/appointment/appointment-read-data.model'
import Paper from '@/v3/presentation/components/Paper'
import { StatusBar } from '@/v3/presentation/components/Ticket/StatusBar'
import ContentWrapper from '@/v3/presentation/components/layout/ContentWrapper'
import { CTooltip } from '@/v3/presentation/newComponents'

import { AppointmentPill } from '../../../../components/AppointmentPill'
import { getPillColor } from '../../../../utils/getPillColor'
import FinishedAppointment from '../Finished'
import StartAppointment from '../Modal/StartAppointment'

import QueueButtonGroup from './components/QueueButtonGroup'
import { AppointmentUserData } from './components/UserData'

export const CAppointmentTicketHeader = ({
  appointment,
  canChangeAppointmentStatus,
}: {
  appointment: AppointmentReadDataModel
  canChangeAppointmentStatus: boolean
}) => {
  const [showModal, setShowModal] = useState(false)
  const isMobile = useMediaQuery('sm')
  const [canManageAppointment] = useHasPermission([Permissions.MANAGE_APPOINTMENT])
  const [finishedModal, setFinishedModal] = useState(false)

  const medicalRecordLastStatus = appointment.medicalRecord?.classification
  const pillColor = getPillColor(medicalRecordLastStatus || '')

  const showQueue =
    !appointment.isWaitingAttendance && !appointment.isFinished && canManageAppointment

  const title = medicalRecordLastStatus
    ? MEDICAL_RECORD_CLASSIFICATION_DESCRIPTION[medicalRecordLastStatus]
    : 'Sem classificação'

  return (
    <>
      <Paper display='flex' flex={2} flexDirection='column'>
        <ContentWrapper pb='0 !important' height='100%' display='flex' flexDirection={'column'}>
          <StatusBar flex={0}>
            <Box display='flex' gap={0.5} flexDirection={isMobile ? 'column' : 'row'}>
              <Typography variant='h6'>
                Ticket - {appointment.id} {isMobile ? '' : '|'}
              </Typography>
              <AppointmentPill title={title} color={pillColor} />
            </Box>
            {showQueue && <QueueButtonGroup appointment={appointment} />}
            {appointment.isFinished && (
              <Box
                display='flex'
                gap={0.5}
                alignItems={isMobile ? 'flex-start' : 'center'}
                flexDirection={isMobile ? 'column' : 'row'}
                maxWidth={isMobile ? 150 : 300}
              >
                <Typography variant='body2'>Desfecho:</Typography>
                <Box display='flex' width='100%' gap={0.5}>
                  <CTooltip
                    description={AppointmentFinishedStatusDescription[appointment.finishedReason]}
                  >
                    <Typography
                      variant='h5'
                      whiteSpace='nowrap'
                      overflow='hidden'
                      textOverflow='ellipsis'
                      maxWidth='90%'
                    >
                      {AppointmentFinishedStatusDescription[appointment.finishedReason]}
                    </Typography>
                  </CTooltip>
                  <CreateOutlinedIcon
                    style={{ color: 'var(--mui-palette-grey-500)', cursor: 'pointer', height: 20 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setFinishedModal(true)
                    }}
                  />
                </Box>
              </Box>
            )}
          </StatusBar>
          <Box flex={2} display='flex' flexDirection='column'>
            <AppointmentUserData
              appointment={appointment}
              canChangeAppointmentStatus={canChangeAppointmentStatus}
              onShowStartAppointment={() => setShowModal(true)}
              onShowFinishAppointment={() => setFinishedModal(true)}
            />
          </Box>
        </ContentWrapper>
      </Paper>
      <StartAppointment
        appointmentId={appointment.id}
        open={showModal}
        onClose={() => setShowModal(false)}
      />
      <FinishedAppointment
        appointment={appointment}
        open={finishedModal}
        onClose={() => setFinishedModal(false)}
      />
    </>
  )
}
