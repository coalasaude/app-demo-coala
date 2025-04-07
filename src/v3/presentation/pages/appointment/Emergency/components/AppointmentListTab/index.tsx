import React from 'react'

import { CFilterHeaderTable } from '@/v3/presentation/components/Table'
import useMediaQuery from '@/hooks/useMediaQuery'

import { useAppointmentEmergency } from '../../hooks/useAppointmentEmergency'
import { useAppointmentListFilters } from '../../hooks/useAppointmentListFilters'
import { AppointmentListTable } from '../AppointmentListTable/AppointmentListTable'
import { DrawerFilterAppointment } from '../AppointmentListTable/components/DrawerFilterAppointmentTable'
import { AppointmentStatusCard } from '../AppointmentStatusCard'
import AppointmentListMobile from '../AppointmentListMobile/AppointmentListMobile'

export const AppointmentsListTab = () => {
  const isSmallDevice = useMediaQuery('sm')

  const { appointments, isLoading, canManageAppointment, onViewAppointment, participantsMap } =
    useAppointmentEmergency()

  const { isOpen, setIsOpen, filters, chipsList, onSetFilters, removeChipFilter } =
    useAppointmentListFilters()

  return (
    <>
      <AppointmentStatusCard appointments={appointments?.data} />
      <CFilterHeaderTable
        boxProps={{ width: '100%' }}
        placeholder='Nome do paciente'
        onSearch={(value) => onSetFilters({ searchName: value })}
        inputValue={filters.searchName}
        filterAction={() => setIsOpen(true)}
        chipsList={chipsList}
        onChipDelete={removeChipFilter}
        isAppointmentFilter
      />
      {!isSmallDevice ? (
        <AppointmentListTable
          appointments={appointments?.data}
          count={appointments?.pagination.total}
          isLoading={isLoading}
          onClickRow={onViewAppointment}
          direction={filters.direction}
          orderBy={filters.orderBy}
          offset={filters.offset}
          onChangePage={(_, offset) => onSetFilters({ offset })}
          setFilters={onSetFilters}
          canManageAppointment={canManageAppointment}
          participantsMap={participantsMap}
        />
      ) : (
        <AppointmentListMobile
          appointments={appointments?.data}
          onClickRow={onViewAppointment}
          canManageAppointment={canManageAppointment}
          isLoading={isLoading}
          onChangePage={(_, offset) => onSetFilters({ offset })}
          count={appointments?.pagination.total}
          offset={filters.offset}
        />
      )}
      <DrawerFilterAppointment
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        filters={filters}
        onSetFilters={onSetFilters}
      />
    </>
  )
}

export default AppointmentsListTab
