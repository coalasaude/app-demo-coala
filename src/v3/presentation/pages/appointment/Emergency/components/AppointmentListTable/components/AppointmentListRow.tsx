import React from 'react'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

import useMediaQuery from '@/hooks/useMediaQuery'
import { AppointmentBrowseDataModel } from '@/v3/domain/@v2/appointment/appointment-browse-data.model'
import CTableRow from '@/v3/presentation/newComponents/atoms/CTableRow'

import { AppointmentDate } from '../../AppointmentDate'
import { AttendingUsers } from '../../AttendingUsers'
import { ProfileType } from '../../ComplaintType'
import { PatientInfo } from '../../PatientInfo'
import { StatusChip } from '../../StatusChip'
import { ParticipantsMapType } from '../../../hooks/useAppointmentEmergency'
import { AppointmentResume } from '../../AppointmentResume'
import { AppointmentInstitution } from '../../AppointmentInstitution'

interface AppointmentRowProps {
  appointment: AppointmentBrowseDataModel
  onClickRow: () => void
  canManageAppointment?: boolean
  participantsMap?: ParticipantsMapType
  isLastItem?: boolean
}

export const AppointmentRow = ({
  appointment,
  onClickRow,
  canManageAppointment = false,
  participantsMap,
  isLastItem,
}: AppointmentRowProps) => {
  const isSmallDevice = useMediaQuery('sm')
  const sx = {
    maxWidth: 220,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }

  return (
    <CTableRow
      key={appointment.id}
      onClick={onClickRow}
      sx={{
        opacity: appointment.isFinishedRow ? 0.6 : 1.0,
        position: 'relative',
        [`& .${tableCellClasses.root}`]: {
          borderBottom: isLastItem && 'none',
        },
      }}
    >
      <TableCell sx={sx}>
        <PatientInfo patient={appointment.patient} />
      </TableCell>

      <TableCell sx={sx}>
        <AppointmentDate createdAt={appointment.createdAt} isNew={appointment.institution.isNew} />
      </TableCell>
      {!isSmallDevice && (
        <>
          <TableCell sx={sx}>
            <ProfileType profileName={appointment.patient?.profileName} />
          </TableCell>
          <TableCell sx={sx}>
            <AppointmentResume resume={appointment.resume} />
          </TableCell>
        </>
      )}
      <TableCell sx={sx}>
        <AppointmentInstitution institution={appointment.institution.fantasyName} />
      </TableCell>
      <TableCell sx={sx}>
        <StatusChip status={appointment.status} finishedStatus={appointment.finishedReason} />
      </TableCell>
      {canManageAppointment && (
        <TableCell>{<AttendingUsers users={participantsMap?.[appointment.id] || []} />}</TableCell>
      )}
    </CTableRow>
  )
}
