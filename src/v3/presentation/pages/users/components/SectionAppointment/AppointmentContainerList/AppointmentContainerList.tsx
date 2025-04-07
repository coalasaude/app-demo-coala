import CircleIcon from '@mui/icons-material/Circle'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Box, Typography } from '@mui/material'
import Router from 'next/router'
import { useEffect, useState } from 'react'

import { GridItem, GridWrapper } from '@/components/Grid'
import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { AppointmentBrowseDataModel } from '@/v3/domain/@v2/appointment/appointment-browse-data.model'
import { AppointmentStatus } from '@/v3/domain/Appointment'
import { CContainerContent, CDisplayRecord, CDivider } from '@/v3/presentation/newComponents'
import CPagination from '@/v3/presentation/newComponents/molecules/CPagination'

interface AppointmentContainerListProps {
  listAppointment: AppointmentBrowseDataModel[]
  listTitle: string
  circleColor: string
}
const limit = 9

export const AppointmentContainerList = ({
  listAppointment,
  listTitle,
  circleColor,
}: AppointmentContainerListProps) => {
  const [filteredAppointment, setFilteredAppointment] = useState<AppointmentBrowseDataModel[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const hasPagination = listAppointment.length > limit

  const functionToLimitAppointment = (offset: number) => {
    if (!hasPagination) return
    const listAppointmentFinished = listAppointment.filter(
      ({ status }) => status === AppointmentStatus.FINISHED,
    )
    const sliceFinishedAppointment = listAppointmentFinished.slice(offset, limit + offset)
    return setFilteredAppointment(sliceFinishedAppointment)
  }

  useEffect(() => {
    if (hasPagination) {
      return functionToLimitAppointment(limit * (currentPage - 1))
    }
    setFilteredAppointment(listAppointment)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listAppointment, hasPagination, currentPage])

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'var(--mui-palette-grey-50)',
          width: '100%',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginBottom: '16px',
          marginTop: '16px',
        }}
        style={{ borderRadius: '4px' }}
        p={1}
      >
        <CircleIcon sx={{ width: '8px', color: circleColor }} />
        <Typography variant='h4'>{listTitle}</Typography>
      </Box>
      <GridWrapper>
        {filteredAppointment.map((appointment) => (
          <GridItem xs={12} md={4} key={appointment.id} data-testid='AppointmentContainerListCard'>
            <CContainerContent
              title={`Ticket #${appointment.id}`}
              hover
              subtitle={appointment.complaint || ''}
              icon={<KeyboardArrowRightIcon />}
              onClick={() => {
                Router.push(
                  bindPathParams(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.VIEW.path, {
                    id: String(appointment.id),
                  }),
                )
              }}
            >
              <CDivider />
              <GridWrapper spacing={0} mt={1}>
                <GridItem xs={9}>
                  <CDisplayRecord
                    label='Solicitação'
                    value={appointment.getCreatedAtDate()}
                    withDivider={false}
                    clickable
                  />
                </GridItem>
                <GridItem>
                  <CDisplayRecord
                    label='Finalização'
                    value={appointment.getClosedAtDate()}
                    withDivider={false}
                    clickable
                  />
                </GridItem>
              </GridWrapper>
            </CContainerContent>
          </GridItem>
        ))}
        {hasPagination && (
          <Box px={1}>
            <CPagination
              count={Math.ceil(listAppointment?.length / limit)}
              page={currentPage}
              onChange={(e, page) => {
                setCurrentPage(page)
                functionToLimitAppointment(limit * (page - 1))
              }}
              color='primary'
              totalCount={listAppointment?.length}
            />
          </Box>
        )}
      </GridWrapper>
    </>
  )
}
