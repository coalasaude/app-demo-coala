import React from 'react'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead } from '@mui/material'

import { TableBodySkeleton } from '@/components/Skeletons/TableBodySkeleton'
import { limit as limitDefault } from '@/constants/api'
import { NotFound } from '@/v3/presentation/components/NotFound'
import { EXPERIMENTAL_TableSortLabel } from '@/v3/presentation/components/Table/EXPERIMENTAL_TableSortLabel/EXPERIMENTAL_TableSortLabel'
import { CTableRow } from '@/v3/presentation/newComponents/atoms/CTableRow/CTableRow'
import CPagination from '@/v3/presentation/newComponents/molecules/CPagination'

import { AppointmentRow } from './components/AppointmentListRow'
import { IAppointmentFilterFields, IAppointmentListTable } from './type'

export const AppointmentListTable = ({
  appointments,
  canManageAppointment,
  limit = limitDefault,
  offset = 0,
  count = 0,
  isLoading,
  direction,
  orderBy,
  onClickRow,
  onChangePage,
  setFilters,
  participantsMap,
}: IAppointmentListTable) => {
  function onSortChange(orderBy?: string, direction?: 'asc' | 'desc') {
    setFilters({ orderBy: orderBy as IAppointmentFilterFields['orderBy'], direction })
  }

  if (isLoading) return <TableBodySkeleton />

  return appointments?.length === 0 && !isLoading ? (
    <NotFound />
  ) : (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <CTableRow>
              <TableCell sx={{ maxWidth: 260 }}>Paciente</TableCell>
              <TableCell>
                <EXPERIMENTAL_TableSortLabel
                  direction={direction}
                  orderBy={orderBy}
                  name='created_at'
                  onChange={onSortChange}
                >
                  Solicitação
                </EXPERIMENTAL_TableSortLabel>
              </TableCell>

              <TableCell>Perfil</TableCell>
              <TableCell>
                <EXPERIMENTAL_TableSortLabel
                  direction={direction}
                  orderBy={orderBy}
                  name='resume'
                  onChange={onSortChange}
                  sx={{ maxWidth: 260 }}
                >
                  Queixa
                </EXPERIMENTAL_TableSortLabel>
              </TableCell>
              <TableCell>Instituição</TableCell>
              <TableCell sx={{ maxWidth: 260 }}>
                <EXPERIMENTAL_TableSortLabel
                  direction={direction}
                  orderBy={orderBy}
                  name='status'
                  onChange={onSortChange}
                >
                  Status
                </EXPERIMENTAL_TableSortLabel>
              </TableCell>
              {canManageAppointment && <TableCell>Participantes</TableCell>}
            </CTableRow>
          </TableHead>
          {!isLoading && (
            <TableBody>
              {appointments?.map((appointment, index) => (
                <AppointmentRow
                  onClickRow={() => onClickRow?.(appointment.id)}
                  key={appointment.id}
                  canManageAppointment={canManageAppointment}
                  appointment={appointment}
                  participantsMap={participantsMap}
                  isLastItem={index === appointments.length - 1}
                />
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <Box p={2}>
        {Boolean(appointments?.length) && (
          <CPagination
            count={Math.ceil(count / limit)}
            page={Math.ceil(offset / limit + 1)}
            totalCount={count}
            onChange={(_, page) => onChangePage?.(page, (page - 1) * limit)}
            siblingCount={0}
          />
        )}
      </Box>
    </>
  )
}
