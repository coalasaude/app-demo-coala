import React from 'react'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import { Box, Typography } from '@mui/material'
import { useState } from 'react'

import { GridView, GridWrapper } from '@/components/Grid'
import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { AppointmentReadDataModel } from '@/v3/domain/@v2/appointment/appointment-read-data.model'
import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { CDisplayRecord, CDivider, CTooltip } from '@/v3/presentation/newComponents'
import { ComplaintModal } from '@/v3/presentation/pages/mental-health/pages/session/components/ModalCertificate/OnlyComplaintModal'
import { WebViewManager } from '@/services/WebView'

import { TelephoneModal } from '../TelephoneModal'
import { AttendingUsers } from '../AttendingUsers'

import { AppointmentActions } from './AppointmentActions'

export const AppointmentUserData = ({
  appointment,
  canChangeAppointmentStatus,
  onShowStartAppointment,
  onShowFinishAppointment,
}: {
  appointment: AppointmentReadDataModel
  canChangeAppointmentStatus: boolean
  onShowStartAppointment: () => void
  onShowFinishAppointment: () => void
}) => {
  const [showTelephoneModal, setShowTelephoneModal] = useState(false)
  const [showComplaintModal, setShowComplaintModal] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { user: requestedUser } = useFetchReadUser({ userId: appointment.requestedUser.id })

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const navigateToUserRouter = (id?: number) =>
    WebViewManager.open(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.VIEW.bindPath, {
        userId: String(id),
      }),
      '_blank',
    )

  const requestedUserName = requestedUser?.getFullName()
  const requestUserPhone = requestedUser?.getFormattedPhone()

  const onCloseTelephoneModal = () => {
    setShowTelephoneModal(false)
    setAnchorEl(null)
  }

  const onCloseComplaintModal = () => {
    setShowComplaintModal(false)
  }

  const isAppointmentFinishedInvalidOrEvasion = appointment.isFinishedForEvasionOrInvalid

  return (
    <>
      <GridWrapper alignItems='center' spacing={0}>
        <GridView xs={6} md={4} alignSelf='flex-start'>
          <Box width='fit-content'>
            <CDisplayRecord
              label='Solicitante'
              value={requestedUserName}
              valueProps={{ variant: 'h6', fontWeight: 'bold' }}
              labelProps={{ variant: 'h6' }}
              onClick={() => navigateToUserRouter(appointment.requestedUser.id)}
              withDivider={false}
            />
          </Box>
        </GridView>
        <GridView xs={6} md={4} alignSelf='flex-start'>
          <Box display='flex' alignItems='end'>
            <CDisplayRecord
              label='Telefone'
              value={requestUserPhone || '-'}
              valueProps={{ variant: 'h6', fontWeight: 'bold' }}
              labelProps={{ variant: 'h6' }}
              onClick={() => {
                if (requestUserPhone !== '') {
                  navigateToUserRouter(appointment.requestedUser.id)
                }
              }}
              withDivider={false}
            />
            {requestUserPhone === '' && canChangeAppointmentStatus && (
              <CreateOutlinedIcon
                style={{
                  color: 'var(--mui-palette-grey-500)',
                  cursor: 'pointer',
                  paddingLeft: 4,
                  height: 20,
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  setShowTelephoneModal(!showTelephoneModal)
                  handleClick(e)
                }}
              />
            )}
          </Box>
          {showTelephoneModal && requestedUser?.id && (
            <TelephoneModal
              id={requestedUser?.id}
              onClose={onCloseTelephoneModal}
              isOpen={showTelephoneModal}
              anchorEl={anchorEl}
            />
          )}
          {showComplaintModal && (
            <ComplaintModal open={showComplaintModal} onClose={onCloseComplaintModal} />
          )}
        </GridView>
        <GridView xs={12} md={4} alignSelf='flex-start'>
          <CTooltip description={appointment.resume || '-'}>
            <Box maxWidth='100%' width='fit-content'>
              <CDisplayRecord
                label='Queixa'
                value={appointment.resume || '-'}
                withDivider={false}
                valueProps={{
                  variant: 'h6',
                  fontWeight: 'bold',
                  maxWidth: '100%',
                }}
                labelProps={{ variant: 'h6' }}
              />
            </Box>
          </CTooltip>
        </GridView>
        <GridView
          xs={12}
          md={12}
          lg={12}
          alignSelf='flex-start'
          sx={{
            padding: '0 8px !important',
          }}
        >
          <CDivider />
        </GridView>
        <GridView xs={3} md={1} alignSelf='flex-start'>
          <CDisplayRecord
            label='Acidente'
            value={appointment?.complaint ? (appointment.isAccident ? 'Sim' : 'Não') : '-'}
            tooltipDescription='Acidente na instituição'
            withDivider={false}
            valueProps={{ variant: 'h6', fontWeight: 'bold' }}
            labelProps={{ variant: 'h6' }}
          />
        </GridView>
        <GridView xs={4} md={3} alignSelf='flex-start'>
          <Box display='flex' alignItems='end'>
            <CDisplayRecord
              label='Caso de saúde'
              value={appointment.complaint || '-'}
              withDivider={false}
              tooltipDescription='Tipo de caso de saúde'
              valueProps={{
                variant: 'h6',
                fontWeight: 'bold',
                maxWidth: 250,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              labelProps={{ variant: 'h6' }}
            />
            {canChangeAppointmentStatus && !isAppointmentFinishedInvalidOrEvasion && (
              <CreateOutlinedIcon
                style={{
                  color: 'var(--mui-palette-grey-500)',
                  cursor: 'pointer',
                  paddingLeft: 4,
                  height: 20,
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  setShowComplaintModal(true)
                }}
              />
            )}
          </Box>
        </GridView>
        <GridView xs={5} md={4} alignSelf='flex-start'>
          <Typography variant='h6' color='var(--mui-palette-grey-500)'>
            Participantes
          </Typography>
          <AttendingUsers users={appointment?.participantJoined || []} />
        </GridView>
        <GridView xs={6} md={4} alignSelf='flex-start'>
          <AppointmentActions
            appointment={appointment}
            canChangeAppointmentStatus={canChangeAppointmentStatus}
            onShowFinishAppointment={onShowFinishAppointment}
            onShowStartAppointment={onShowStartAppointment}
          />
        </GridView>
      </GridWrapper>
    </>
  )
}
