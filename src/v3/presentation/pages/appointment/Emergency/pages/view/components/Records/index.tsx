import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import OutlinedFlagOutlinedIcon from '@mui/icons-material/OutlinedFlagOutlined'
import { Stack } from '@mui/material'
import React, { useMemo, useState } from 'react'

import { Permissions } from '@/constants/permissions'
import RecordsModal from '@/containers/Appointment/Emergency/modal/RecordsModal'
import { useBreakpoint } from '@/hooks/useBreakpoints'
import { useHasPermission } from '@/hooks/useHasPermission'
import { RecordsType } from '@/types/records'
import { useFetchBrowseTimeline } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useFetchBrowseTimeline'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { CBaseContainer } from '@/v3/presentation/newComponents'
import Stethoscope from 'public/assets/svg/AppointmentsView/Stethoscope.svg'
import MedicalServices from 'public/assets/svg/AppointmentsView/MedicalServices.svg'

import { useAppointmentTicketRegister } from '../../hooks/useAppointmentStatusLog'
import { useRecordSelection } from '../../hooks/useRecordSelection'

import { EmptyRecords } from './Components/EmptyRecords'
import { RecordsList } from './Components/RecordsList'
import { contentMap } from './constants'

interface Props {
  appointmentId?: number
  hasPatient?: boolean
  isResumeVideoLog?: boolean
}

const iconComponents = {
  HealthAndSafetyIcon: HealthAndSafetyIcon,
  OutlinedFlagOutlinedIcon: OutlinedFlagOutlinedIcon,
  AccessTimeOutlinedIcon: AccessTimeOutlinedIcon,
  Stethoscope: Stethoscope,
  MedicalServices: MedicalServices,
}

export const RecordsView = ({ appointmentId, hasPatient, isResumeVideoLog }: Props) => {
  const isMobile = useBreakpoint('sm')
  const [canManage] = useHasPermission([Permissions.MANAGE_APPOINTMENT])
  const [showModal, setShowModal] = useState(false)

  const { timeline } = useFetchBrowseTimeline({ appointmentId })
  const { record, handleSelectRecord, handleDeselectRecord, viewOverlay } = useRecordSelection(
    timeline?.records.map((e) => e.data) || [],
    !!isResumeVideoLog,
  )
  const ticketsRegisters = useAppointmentTicketRegister(timeline)
  const { queryParam: recordId } = useUrlQueryControl({ queryName: 'recordId' })
  const { queryParam: type } = useUrlQueryControl({ queryName: 'type' })

  const content = useMemo(() => {
    const recordContent = record?.type ? contentMap[record.recordType] : null
    return recordContent || null
  }, [record])

  const registers = useMemo(
    () =>
      ticketsRegisters?.map((register) => ({
        ...register,
        icon: register.iconType ? React.createElement(iconComponents[register.iconType]) : null,
      })) || [],
    [ticketsRegisters],
  )

  return (
    <>
      <CBaseContainer
        withContentPadding={false}
        boxShadow='none'
        sx={{
          position: 'relative',
          height: !isResumeVideoLog ? undefined : '100%',
          overflow: viewOverlay ? 'hidden' : 'auto',
          py: 2,
          border: 'none',
        }}
      >
        <Stack
          direction='row'
          gap={2}
          width='100%'
          height={{ xs: !isResumeVideoLog ? undefined : '100%' }}
        >
          {!viewOverlay && (
            <RecordsList
              selected={{ recordId: Number(recordId), type: type as RecordsType }}
              onSelect={(record, type) => handleSelectRecord(Number(record), type)}
              isResumeVideoLog={isResumeVideoLog}
              hasPatient={hasPatient}
              registers={registers}
            />
          )}
          {!timeline?.records?.length && !isMobile && !isResumeVideoLog ? (
            <EmptyRecords hasPatient={hasPatient} isAuthorized={timeline?.meta.isAuthorized} />
          ) : (
            <>
              {record && content && (
                <content.component
                  onDeselect={handleDeselectRecord}
                  viewOverlay={viewOverlay}
                  canManage={canManage}
                  recordId={record.id}
                  appointmentId={appointmentId!}
                />
              )}
            </>
          )}
        </Stack>
      </CBaseContainer>

      <RecordsModal
        open={showModal}
        onClose={() => setShowModal(false)}
        appointmentId={appointmentId}
      />
    </>
  )
}

export default RecordsView
